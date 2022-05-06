const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const { scrapRatehub, scrapHSBC, scrapVancity, scrapSimplii, scrapTangerine } = require("./scraper");
const  {yahooStock}  = require("./stockprice")
const RATES_TABLE = process.env.RATES_TABLE;
let dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  next();
});

app.get('/getstock/:id', function (req, res) {
  yahooStock(req.params.id).then((data, err)=>{
    if(err) console.log(err)
    res.json(data)
  })
})

app.get('/getrates', async function (req, res) {
  	let result = await Promise.all([ scrapRatehub(), scrapHSBC(), scrapVancity(), scrapSimplii(), scrapTangerine() ])
	const results = await [].concat.apply([], result) 
	return new Promise(resolve => {
		results.forEach(i=>{
			const params = {
				TableName: RATES_TABLE,
				Key: { rateId: i.provider.replace(/\s+/g,'').toLowerCase() },
				UpdateExpression: "set provider = :provider, fiveYearVariable = :fiveYearVariable, fiveYearFixed = :fiveYearFixed, threeYearFixed = :threeYearFixed, updated = :updated", 
				ConditionExpression: "fiveYearVariable <> :fiveYearVariable OR fiveYearFixed <> :fiveYearFixed OR threeYearFixed <> :threeYearFixed",
				ExpressionAttributeValues: {
					":provider": i.provider,
					":fiveYearVariable": i.fiveYearVariable,
					":fiveYearFixed": i.fiveYearFixed,
					":threeYearFixed": i.threeYearFixed,
					":updated": Date.now()
				}
			}
			dynamoDb.update(params, function(err, data) {})
		})
		resolve()
	}).then(()=> res.json(results))
})

app.get('/rates', function (req, res) {
  const params = { TableName: RATES_TABLE }
  dynamoDb.scan(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Could not get rates' });
    result.Items ? res.json(result.Items) : res.status(404).json({ error: "Rates not found" })
  });
})

app.post('/rates', function (req, res) {
  const { rateId, provider, fiveYearVariable, fiveYearFixed, threeYearFixed } = req.body;
  const params = {
    TableName: RATES_TABLE,
    Item: {
      rateId: rateId,
      provider: provider,
      fiveYearVariable: fiveYearVariable, 
      fiveYearFixed: fiveYearFixed, 
      threeYearFixed: threeYearFixed,
      updated: Date.now()
    }
  };
  dynamoDb.put(params, (err) => {
    if (err) res.status(400).json({ error: 'Could not create rate' });
    res.json({ rateId, provider });
  });
})

app.post('/chart', function (req, res) {
  const createData = (myPayments, a='', mortgageValues)=>{
    const myData = []
    let myBalance = mortgageValues.amount - mortgageValues.down - mortgageValues.extra
    let myDate = new Date(mortgageValues.date)
    for (let i = 0; i < myBalance; i++) {
      if (a){
        let newDate = new Date(myDate.setDate(myDate.getDate() + 14))
        let interestA = (myBalance * mortgageValues.interest)/2.166666666666667
        myBalance -= myPayments - interestA
        myData.push({
          name: `${newDate.toLocaleString('en-us', {month:'short'})} ${newDate.getDate()} ${newDate.getFullYear()}`,
          principle: myPayments - interestA,
          interest: interestA,
          balance: myBalance > 0 ? myBalance : 0,
        })
      } else {
        let newDate = new Date(myDate.setMonth(myDate.getMonth() + 1))
        myBalance -= myPayments - myBalance * mortgageValues.interest
        myData.push({
          name: `${newDate.toLocaleString('en-us', {month: 'short'})} ${newDate.getFullYear()}`,
          principle: myPayments - myBalance * mortgageValues.interest,
          interest: myBalance * mortgageValues.interest,
          balance: myBalance > 0 ? myBalance : 0,
        })
      }
    }
    return myData
  }
  const { standard, accelerated } = req.body
  const result = createData(standard.payments, standard.scenario, standard.mortgageValues)
  const resultA = createData(accelerated.payments, accelerated.scenario, accelerated.mortgageValues)
  res.json({standard: result, accelerated: resultA})
})

app.patch('/chart', function (req, res) {
  const { rateId, provider, fiveYearVariable, fiveYearFixed, threeYearFixed } = req.body
    const params = {
      TableName: RATES_TABLE,
      Key: { rateId: rateId },
      UpdateExpression: "set provider = :provider, fiveYearVariable = :fiveYearVariable, fiveYearFixed = :fiveYearFixed, threeYearFixed = :threeYearFixed, updated = :updated", 
      ConditionExpression: "fiveYearVariable <> :fiveYearVariable OR fiveYearFixed <> :fiveYearFixed OR threeYearFixed <> :threeYearFixed",
      ExpressionAttributeValues: {
          ":provider": provider,
          ":fiveYearVariable": fiveYearVariable,
          ":fiveYearFixed": fiveYearFixed,
          ":threeYearFixed": threeYearFixed,
          ":updated": Date.now()
      }
    };
    dynamoDb.update(params, function(err, data) {
      if (err) res.status(400).json({ error: 'Could not update rates' });
      res.json({ rateId, provider, fiveYearVariable, fiveYearFixed, threeYearFixed });
    });
})

module.exports.handler = serverless(app);


export const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const timeAgo = timestamp => {
    const times = [["second", 1], ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]] 
    let diff = Math.round((new Date() - timestamp) / 1000)
    for (let t = 0; t < times.length; t++) { 
        if (diff < times[t][1]) { 
            if(t === 0) { return "Just now" } else { 
             diff = Math.round(diff / times[t - 1][1]); return diff + " " + times[t - 1][0] + (diff === 1?" ago":"s ago") } 
         } 
    } 
}

export const createData = (myPayments, a='', mortgageValues)=>{
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

export const createStockData = (stockValues)=>{
    const stockData = []
    if (stockValues.percentage && stockValues.symbol && stockValues.price && stockValues.amount){
      for (let i = 0; i < 4; i++) {
          stockData.push({
            percentage: stockValues.percentage,
            symbol: stockValues.symbol,
            price: stockValues.price,
            amount: stockValues.amount,
          })
      }
    }
    return stockData
}
const yahooStockPrices = require('yahoo-stock-prices')

const yahooStock = async (param) => {
    const data = await yahooStockPrices.getCurrentPrice(param.toUpperCase());
    return data
  };
  
  module.exports =  {yahooStock} ;
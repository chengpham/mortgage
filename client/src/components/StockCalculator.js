import { useState, useEffect } from 'react'
import StockChart from './StockChart'
import StockValues from  './StockValues'
import StockSummary from './StockSummary'

export default function StockCalculator() {
  const [stockData, setStockData] = useState([])
  const [stockTotal, setStockTotal] = useState()
  const handleStockTotal = v=> setStockTotal(v)
  const handleStockData = v=> setStockData(v)
 
  useEffect(()=>{
  }, [stockTotal, stockData])
  return (
    <>
      <StockChart stockData={stockData} />
      <StockValues handleStockData={handleStockData} stockTotal={stockTotal} setStockTotal={handleStockTotal} />
      <StockSummary stockData={stockData} />
    </>
  )
}

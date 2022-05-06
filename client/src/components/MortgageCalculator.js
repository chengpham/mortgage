import { useState, useMemo } from 'react'
import Chart from './Chart'
import Header from './Header'
import MortgageValues from './MortgageValues'
import Summary from './Summary'
import { ChartsData } from '../requests';

export default function MortgageCalculator() {
  const [chartData, setChartData] = useState({standard:[], accelerated:[]})
  const [mortgageValues, setMortgageValues] = useState({amount:250000, term:300, interest:0.0025, down:0, extra:0, scenario:'standard', date: new Date()})
  const handleMortgageValues = v=> setMortgageValues(prev=>({...prev, ...v}))
  const payments = (mortgageValues.amount * mortgageValues.interest * Math.pow(1 + mortgageValues.interest, mortgageValues.term)) / (Math.pow(1 + mortgageValues.interest, mortgageValues.term) - 1)
  const paymentsA = payments/2.166666666666667
  
  useMemo(() => {
    ChartsData.create({standard: {"payments": payments, "scenario":'', "mortgageValues": mortgageValues}, accelerated: {"payments": paymentsA, "scenario":'accelerated', "mortgageValues": mortgageValues}})
    .then(data=>setChartData({standard: data.standard, accelerated: data.accelerated}))
  }, [mortgageValues, payments, paymentsA])

  return (
    <>
      <Header mortgageValues={mortgageValues} setMortgageValues={handleMortgageValues} />
      <Chart data={mortgageValues.scenario === 'accelerated' ? chartData.accelerated : chartData.standard} />
      <MortgageValues mortgageValues={mortgageValues} setMortgageValues={handleMortgageValues}/>
      <Summary payments={payments} paymentsA={paymentsA} chartData={chartData} />
    </>
  )
}

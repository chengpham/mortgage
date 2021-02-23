import { useState, useEffect } from 'react'
import Chart from './Chart'
import Header from './Header'
import MortgageValues from './MortgageValues'
import Summary from './Summary'
import Options from './Options'
import Acceleration from './Acceleration'
import Schedule from './Schedule'

export default function MortgageCalculator() {
  const [data, setData] = useState([])
  const [dataA, setDataA] = useState([])
  const [amount, setAmount] = useState(250000)
  const [term, setTerm] = useState(300)
  const [interest, setInterest] = useState(3)
  const [down, setDown] = useState(0)
  const [extra, setExtra] = useState(0)
  const [date, setDate] = useState(new Date())
  const [scenario, setScenario] = useState('standard')
  const handleAmount = (a) => setAmount(a)
  const handleTerm = (t) => setTerm(t)
  const handleInterest = (i) => setInterest(i)
  const handleDown = (d) => setDown(d)
  const handleExtra = (e) => setExtra(e)
  const handleDate = (d) => setDate(d)
  const handleScenario = (s) => setScenario(s)
  const I = interest / 100 / 12
  const M = (amount * I * Math.pow(1 + I, term)) / (Math.pow(1 + I, term) - 1)
  const P = (amount * I * Math.pow(1 + I, term)) / (Math.pow(1 + I, term) - 1)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalInterestA, setTotalInterestA] = useState(0)

  useEffect(() => {
    const myData = [],
      myDataA = []
    let myBalance = amount,
      myBalanceA = amount
    if (down || extra) {
      myBalance -= down
      myBalance -= extra
      myBalanceA -= down
      myBalanceA -= extra
    }
    let myDate = new Date(date),
      myDateA = new Date(date)
    let totalRate = 0,
      totalRateA = 0
    let biWeekly = 547.116
    for (let i = 0; i < myBalance; i++) {
      let newDate = new Date(myDate.setMonth(myDate.getMonth() + 1))
      myBalance -= M - myBalance * I
      totalRate += myBalance * I
      myData.push({
        name: `${newDate.toLocaleString('en-us', {
          month: 'short',
        })} ${newDate.getFullYear()}`,
        principle: M - myBalance * I,
        interest: myBalance * I > 0 ? myBalance * I : 0,
        balance: myBalance > 0 ? myBalance : 0,
      })
    }
    for (let i = 0; i < myBalanceA; i++) {
      let newDate = new Date(myDateA.setDate(myDateA.getDate() + 14))
      myBalanceA -= biWeekly - (myBalanceA * I) / 2.166666666666667
      totalRateA += (myBalanceA * I) / 2.166666666666667
      myDataA.push({
        name: `${newDate.toLocaleString('en-us', {
          month: 'short',
        })} ${newDate.getDate()} ${newDate.getFullYear()}`,
        principle: (P - myBalanceA * I) / 2.166666666666667,
        interest: myBalanceA * I > 0 ? (myBalanceA * I) / 2.166666666666667 : 0,
        balance: myBalanceA > 0 ? myBalanceA : 0,
      })
    }
    setData(myData)
    setDataA(myDataA)
    setTotalInterest(totalRate.toFixed(2))
    setTotalInterestA(totalRateA.toFixed(2))
  }, [amount, term, I, M, P, interest, down, extra, date, scenario])

  let dataSelection = scenario === 'accelerated' ? dataA : data
  return (
    <>
      <Header
        date={date}
        setDate={handleDate}
        scenario={scenario}
        setScenario={handleScenario}
      />
      <Chart data={dataSelection} />
      <MortgageValues
        amount={amount}
        setAmount={handleAmount}
        term={term}
        setTerm={handleTerm}
        interest={interest}
        setInterest={handleInterest}
        down={down}
        setDown={handleDown}
        extra={extra}
        setExtra={handleExtra}
      />
      <Summary data={data} dataA={dataA} />
    </>
  )
}

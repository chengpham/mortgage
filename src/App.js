import './App.css';
import { useState, useEffect } from 'react';
import Chart from './components/Chart';
import Header from './components/Header'
import Schedule from './components/Schedule'
import Acceleration from './components/Acceleration'
import Options from './components/Options'
import Summary from './components/Summary'
import MortgageValues from './components/MortgageValues'

const App = () => {
  const [data, setData] = useState([])
  const [dataA, setDataA] = useState([])
  const [amount, setAmount] = useState(250000);
  const [term, setTerm] = useState(300);
  const [interest, setInterest] = useState(3);
  const [down, setDown] = useState(0);
  const [extra, setExtra] = useState(0);
  const [date, setDate] = useState(new Date())
  const [scenario, setScenario] = useState('standard')
  const handleAmount = a=>setAmount(a)
  const handleTerm = t=>setTerm(t)
  const handleInterest = i=>setInterest(i)
  const handleDown = d=>setDown(d)
  const handleExtra = e=>setExtra(e)
  const handleDate = d=>setDate(d)
  const handleScenario = s=>setScenario(s)
  const I = interest/100/12
  const M = amount * I * (Math.pow(1 + I, term)) / (Math.pow(1 + I, term) - 1)
  const P = amount * I * (Math.pow(1 + I, term)) / (Math.pow(1 + I, term) - 1)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalInterestA, setTotalInterestA] = useState(0)
  const [schedule, setSchedule] = useState(false)
  const [acceleration, setAcceleration] = useState(false)
  const [options, setOptions] = useState(false)
  const handleSchedule = ()=> schedule ? setSchedule(false) : setSchedule(true)
  const handleAcceleration = ()=> acceleration ? setAcceleration(false) : setAcceleration(true)
  const handleOptions = ()=> options ? setOptions(false) : setOptions(true)
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      
  
  useEffect(()=> {
    const myData = [], myDataA = []
    let myBalance = amount, myBalanceA = amount
    if (down || extra) {myBalance-=down; myBalance-=extra; myBalanceA-=down; myBalanceA-=extra;}
    let myDate = new Date(date), myDateA = new Date(date)
    let totalRate = 0, totalRateA = 0
    let biWeekly = 547.116
    for (let i=0; i<myBalance; i++){
      let newDate = new Date(myDate.setMonth(myDate.getMonth()+1))
      myBalance -= (M - (myBalance*I)) 
      totalRate += (myBalance*I)
      myData.push({
        name: `${newDate.toLocaleString('en-us', {month: 'short'})} ${newDate.getFullYear()}`,
        principle: M - myBalance*I,
        interest: myBalance*I>0 ? myBalance*I : 0,
        balance: myBalance>0 ? myBalance : 0
      })
    }
    for (let i=0; i<myBalanceA; i++){
      let newDate = new Date(myDateA.setDate(myDateA.getDate()+14))
      myBalanceA -= (biWeekly - (myBalanceA*I)/2.166666666666667)
      totalRateA += (myBalanceA*I)/2.166666666666667
      myDataA.push({
        name: `${newDate.toLocaleString('en-us', {month: 'short'})} ${newDate.getDate()} ${newDate.getFullYear()}`,
        principle: (P - myBalanceA*I)/2.166666666666667,
        interest: myBalanceA*I>0 ? (myBalanceA*I)/2.166666666666667 : 0,
        balance: myBalanceA>0 ? myBalanceA : 0
      })
    }
    setData(myData)
    setDataA(myDataA)
    setTotalInterest(totalRate.toFixed(2))
    setTotalInterestA(totalRateA.toFixed(2))
  }, [amount, term, I, M, P, interest, down, extra, date, scenario])

  return(
    <div className='app container p-2'>
      <Header date={date} setDate={handleDate} scenario={scenario} setScenario={handleScenario} />
      <Chart data={scenario==="accelerated"? dataA:data} formatter={formatter} />
      <MortgageValues amount={amount} setAmount={handleAmount} term={term} setTerm={handleTerm} interest={interest} setInterest={handleInterest} down={down} setDown={handleDown} extra={extra} setExtra={handleExtra} />
      <Summary  M={acceleration?P/2.166666666666667:M} T={acceleration?Object.keys(dataA).length:Object.keys(data).length} totalInterest={acceleration?totalInterestA:totalInterest} formatter={formatter} schedule={schedule} setSchedule={handleSchedule} acceleration={acceleration} setAcceleration={handleAcceleration} options={options} setOptions={handleOptions} />
      {options && ( <Options /> )}
      {acceleration && ( <Acceleration M={P/2.166666666666667} data={dataA} formatter={formatter} /> )}
      {schedule && ( <Schedule M={M} data={data} formatter={formatter} /> )}
    </div>
  )
}

export default App;
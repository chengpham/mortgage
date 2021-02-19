import './App.css';
import { useState, useEffect } from 'react';
import Chart from './components/Chart';
import Header from './components/Header'
import Table from './components/Table'
import MortgageValues from './components/MortgageValues'

const App = () => {
  const [data, setData] = useState([])
  const [amount, setAmount] = useState(250000);
  const [term, setTerm] = useState(300);
  const [interest, setInterest] = useState(3);
  const handleAmount = data=>setAmount(data)
  const handleTerm = data=>setTerm(data)
  const handleInterest = data=>setInterest(data)
  const I = interest/100/12
  const M = amount * I * (Math.pow(1 + I, term)) / (Math.pow(1 + I, term) - 1)

  useEffect(()=> {
    const myData = [{
        name: `${new Date().toLocaleString('en-us', {month: 'short'})} ${new Date().getFullYear()}`,
        principle: M-(amount * I),
        interest: amount * I,
        balance: amount
    }]
    for (let i=0; i<term; i++){
      myData.push({
        name: myData[i].name.slice(0,4) + (new Date().getFullYear() + i),
        principle: (M - myData[i].interest).toFixed(2),
        interest: (myData[i].balance * (interest/100/12)).toFixed(2),
        balance: (myData[i].balance - M).toFixed(2)
      })
    }
    setData(myData)
  }, [amount,term,interest])

  return(
    <div className='app container p-2'>
      <Header />
      <Chart data={data}/>
      <MortgageValues amount={amount} setAmount={handleAmount} term={term} setTerm={handleTerm} interest={interest} setInterest={handleInterest} />
      <Table M={M} T={term} I={I}/>
      

    </div>
  )
}

export default App;
import './App.css'
import MortgageCalculator from './components/MortgageCalculator'
import StockCalculator from './components/StockCalculator'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';

const App = () => {
  return (
      <BrowserRouter>
      <Navbar />
      <div className='app container p-2'>
      <Switch>
      <Route path='/mortgage' component={MortgageCalculator} />
      <Route path='/stocks' component={StockCalculator} />
      </Switch>
      </div>
      </BrowserRouter>
  )
}

export default App

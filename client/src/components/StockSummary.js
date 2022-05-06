
import { formatter } from "../lib/helpers"

const StockSummary = ({ stockData }) => {
  
  return (
    <table className='table table-striped table-sm'>
      <thead>
        <tr>
          <th>Percentage</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Stock</th>
          <th>Buy</th>
          <th>Remain</th>
        </tr>
      </thead>
      <tbody>
      {stockData.map((e,i)=>{
        return(
          <tr key={i}>
            <td>{e.percentage + '%'}</td>
            <td>{e.symbol}</td>
            <td>{formatter.format(e.price)}</td>
            <td>{formatter.format(e.amount)}</td>
            <td>{e.stock.toFixed(2)}</td>
            <td>{formatter.format(e.buy.toFixed(2))}</td>
            <td>{formatter.format(e.remain.toFixed(2))}</td>
          </tr>
        )
      })}
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Total:</td>
        <td><strong>{formatter.format(stockData.reduce((a,b)=>{return a + b['buy']},0 ).toFixed(2))}</strong></td>
        <td><strong>{formatter.format(stockData.reduce((a,b)=>{return a + b['remain']},0 ).toFixed(2))}</strong></td>
      </tr>
      </tbody>
    </table>
  )
}

export default StockSummary

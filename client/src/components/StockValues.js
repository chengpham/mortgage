import { debounce } from 'lodash';
import { useState, useEffect } from 'react'
import { Stock } from '../requests';

const StockValues = ({ stockTotal, setStockTotal, handleStockData }) => {
    const [totalPercent, setTotalPercent] = useState(100)
    const [stockValue, setStockValue] = useState([{percentage:0, symbol:'', price:0}])
    const DebounceValues = debounce(({name, value}, i)=>{
        const list = [...stockValue];
        list[i][name] = value;
        setStockValue(list)
    }, 900);
    const DebounceSymbol = debounce(({name, value}, i)=>{
        Stock.getStock(value).then((data)=> {
            const list = [...stockValue]
            list[i][name] = value.toUpperCase()
            list[i]['price'] = data
            setStockValue(list)
        })
    },900)
    const DebounceTotal = debounce(v=>{setStockTotal(v)}, 1000);
    const handleSubmit = (e)=> {
        e.preventDefault()
        stockValue.forEach((item, i)=> {
            item['amount'] = stockTotal * (item['percentage']/100)
            item['stock'] = item['amount'] / item['price'] 
            item['buy'] = item['price'] * Math.floor(item['stock'])
            item['remain'] = item['amount'] - item['buy']
        })
        handleStockData(stockValue)
    }
    const handleRemoveClick = i => {
        const list = [...stockValue];
        list.splice(i, 1);
        setStockValue(list);
    };
    const handleAddClick = ()=> setStockValue([...stockValue, {percentage:0, symbol:'', price:0}]);
    
    useEffect(()=>{
        let result = 100
        stockValue.forEach((item, i)=> result -= item['percentage'] ) 
        setTotalPercent(result)
    },[stockValue, stockTotal])
    return(
    <div className='card-header border-top container p-1'>
    <form onSubmit={handleSubmit} >
        <div className='container d-flex justify-content-between p-1'>
            <div className='d-flex'>
                Total amount: 
                <input type="number" name="totalAmount" precision={2} min={0} className="form-control ml-2 heighttext" style={{ width:"150px" }} onChange={e=>DebounceTotal(e.target.value)} required />
            </div>
        </div>
        {stockValue.map((x, i) => {
            return (
            <div key={i}>
                <div className='container d-flex justify-content-between p-1'>
                    <div className='d-flex'>
                        Percent: 
                        <input type="number" name="percentage" min={0} max={totalPercent+x.percentage} className="form-control ml-2 heighttext" style={{ width:"65px" }} onChange={e=>DebounceValues(e.target, i)} required />
                    </div>
                    <div className='d-flex'>
                        Symbol: 
                        <input type="text" name="symbol" className="form-control ml-2 heighttext" style={{ margin: 0, width:"70px" }} onChange={e=>DebounceSymbol(e.target, i)} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" required />
                    </div>
                    <div className='d-flex'>
                        Price: 
                        <input type="number" name="price" value={x.price} precision={2} min={0} className="form-control ml-2 heighttext" style={{ width:"65px" }} onChange={e=>DebounceValues(e.target, i)} disabled />
                    </div>
                    <div className='d-flex'>
                        {stockValue.length !== 1 && <button className='btn btn-danger btn-sm px-2'
                        onClick={() => handleRemoveClick(i)}>-</button>}
                    </div>
                </div>
                <div className='container d-flex justify-content-between p-1'>
                    <div/>
                    {stockValue.length - 1 === i && <button className='btn btn-primary btn-sm' onClick={handleAddClick}>+</button>}
                </div>
            </div>
            );
        })}
        <div className='container d-flex justify-content-between p-1'>
            <div className='d-flex'>
                <input type="submit" value="Submit" className="btn btn-secondary btn-sm" />
            </div>
        </div>
    </form>     
    </div>
     )
   }
   
   export default StockValues;

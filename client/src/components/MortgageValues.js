import { debounce } from 'lodash';

const MortgageValues = ({mortgageValues, setMortgageValues}) => {

    const DebounceValues = debounce(v=>{setMortgageValues(v)}, 1000);
    const handleChange = e=> {
      DebounceValues(e)
    }

    return(
      <div className='card-header border-top container p-1'>
        <div className='container d-flex justify-content-between p-1'>
          <div className='d-flex'>
            Amount: 
            <input 
              type="number" 
              name="amount" 
              id="amount" 
              placeholder={mortgageValues.amount}
              step={10000}
              min={0} 
              max={100000000} 
              className="form-control ml-2 heighttext"
              style={{ margin: 0 }} 
              onChange={e=>handleChange({amount: e.target.value})} 
            />
          </div>
          <div className='d-flex'>
            Term: 
            <input 
              type="number" 
              name="term" 
              id="term" 
              placeholder={mortgageValues.term}
              step={12} 
              min={0} 
              max={300}
              className="form-control ml-2 heighttext" 
              style={{ width:"80px" }}
              onChange={e=>handleChange({term: e.target.value})} 
            />
          </div>
          <div className='d-flex'>
            Rate: 
            <input 
              type="number" 
              name="interest" 
              id="interest" 
              placeholder={mortgageValues.interest*100*12}
              step={0.1} 
              precision={2} 
              min={0} 
              max={100}
              className="form-control ml-2 heighttext" 
              style={{ width:"80px" }}
              onChange={e=>handleChange({interest: e.target.value/100/12})} 
             />
            </div>
        </div>
        <div className='container d-flex justify-content-between p-1'>
        <div className='d-flex'>
            Down Deposit: 
            <input 
              type="number" 
              name="down" 
              id="down" 
              placeholder={mortgageValues.down}
              step={1000} 
              min={0} 
              max={mortgageValues.amount}
              className="form-control ml-2 heighttext" 
              style={{ width:"100%" }}
              onChange={e=>handleChange({down: e.target.value})} 
            />
          </div>
          <div className='d-flex'>
            Extra Payments: 
            <input 
              type="number" 
              name="extra" 
              id="extra" 
              placeholder={mortgageValues.extra} 
              step={1000}
              min={0} 
              max={mortgageValues.amount}
              className="form-control ml-2 heighttext" 
              style={{ width:"100%" }}
              onChange={e=>handleChange({extra: e.target.value})} 
             />
            </div>
        </div>
      </div>
     )
   }
   
   export default MortgageValues;

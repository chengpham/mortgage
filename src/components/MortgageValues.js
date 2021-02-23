
const MortgageValues = ({mortgageValues, setMortgageValues}) => {
  
    return(
      <div className='card-header border-top container p-1'>
        <div className='container d-flex justify-content-between p-1'>
          <div className='d-flex'>
            Amount: 
            <input 
              type="number" 
              name="amount" 
              id="amount" 
              value={mortgageValues.amount}
              step={10000}
              min={0} 
              max={100000000} 
              className="form-control ml-2 heighttext"
              style={{ margin: 0 }} 
              onChange={e=>setMortgageValues({amount: e.target.value})} 
            />
          </div>
          <div className='d-flex'>
            Term: 
            <input 
              type="number" 
              name="term" 
              id="term" 
              value={mortgageValues.term}
              step={12} 
              min={0} 
              max={300}
              className="form-control ml-2 heighttext" 
              style={{ width:"80px" }}
              onChange={e=>setMortgageValues({term: e.target.value})} 
            />
          </div>
          <div className='d-flex'>
            Rate: 
            <input 
              type="number" 
              name="interest" 
              id="interest" 
              value={mortgageValues.interest*100*12}
              step={0.1} 
              precision={2} 
              min={0} 
              max={100}
              className="form-control ml-2 heighttext" 
              style={{ width:"80px" }}
              onChange={e=>setMortgageValues({interest: e.target.value/100/12})} 
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
              value={mortgageValues.down}
              step={1000} 
              min={0} 
              max={mortgageValues.amount}
              className="form-control ml-2 heighttext" 
              style={{ width:"100%" }}
              onChange={e=>setMortgageValues({down: e.target.value})} 
            />
          </div>
          <div className='d-flex'>
            Extra Payments: 
            <input 
              type="number" 
              name="extra" 
              id="extra" 
              value={mortgageValues.extra} 
              step={1000}
              min={0} 
              max={mortgageValues.amount}
              className="form-control ml-2 heighttext" 
              style={{ width:"100%" }}
              onChange={e=>setMortgageValues({extra: e.target.value})} 
             />
            </div>
        </div>
      </div>
     )
   }
   
   export default MortgageValues;

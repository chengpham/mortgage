
const MortgageValues = ({amount, term, interest, down, extra, setAmount, setTerm, setInterest, setDown, setExtra}) => {
  
    return(
      <div className='card-header border-top container p-1'>
        <div className='container d-flex justify-content-between p-1'>
          <div className='d-flex'>
            Amount: 
            <input 
              type="number" 
              name="amount" 
              id="amount" 
              value={amount}
              step={10000}
              min={0} 
              max={100000000} 
              className="form-control ml-2 heighttext"
              style={{ margin: 0 }} 
              onChange={e=>setAmount(e.target.value)} 
            />
          </div>
          <div className='d-flex'>
            Term: 
            <input 
              type="number" 
              name="term" 
              id="term" 
              value={term}
              step={12} 
              min={0} 
              max={300}
              className="form-control ml-2 heighttext" 
              style={{ width:"80px" }}
              onChange={e=>setTerm(e.target.value)} 
            />
          </div>
          <div className='d-flex'>
            Rate: 
            <input 
              type="number" 
              name="interest" 
              id="interest" 
              value={interest}
              step={0.1} 
              precision={2} 
              min={0} 
              max={100}
              className="form-control ml-2 heighttext" 
              style={{ width:"80px" }}
              onChange={e=>setInterest(e.target.value)} 
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
              value={down}
              step={1000} 
              min={0} 
              max={amount}
              className="form-control ml-2 heighttext" 
              style={{ width:"100%" }}
              onChange={e=>setDown(e.target.value)} 
            />
          </div>
          <div className='d-flex'>
            Extra Payments: 
            <input 
              type="number" 
              name="extra" 
              id="extra" 
              value={extra} 
              step={1000}
              min={0} 
              max={amount}
              className="form-control ml-2 heighttext" 
              style={{ width:"100%" }}
              onChange={e=>setExtra(e.target.value)} 
             />
            </div>
        </div>
      </div>
     )
   }
   
   export default MortgageValues;

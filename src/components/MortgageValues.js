
const MortgageValues = ({amount, term, interest, setAmount, setTerm, setInterest}) => {
  
    return(
        <div className='card-header border-top container d-flex justify-content-between'>
          <div className='d-flex'>
            Mortgage amount: 
            <input 
              type="number" 
              name="amount" 
              id="amount" 
              value={amount}
              min={0} 
              max={50000000} 
              className="form-control ml-2" 
              onChange={e=>setAmount(e.target.value)} 
               />
          </div>
          <div className='d-flex'>
            Mortgage term: 
            <input 
              type="number" 
              name="term" 
              id="term" 
              value={term} 
              min={0} 
              max={300}
              className="form-control ml-2" 
              style={{ width:"80px" }}
              onChange={e=>setTerm(e.target.value)} 
              />
          </div>
          <div className='d-flex'>
            Interest rate: 
            <input 
            type="number" 
            name="interest" 
            id="interest" 
            value={interest}
            step={0.1} 
            precision={2} 
            min={0} 
            max={100}
            className="form-control ml-2" 
            style={{ width:"80px" }}
            onChange={e=>setInterest(e.target.value)} 
             />
            </div>
        </div>
     )
   }
   
   export default MortgageValues;
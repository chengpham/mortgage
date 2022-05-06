const Header = ({ mortgageValues, setMortgageValues }) => {
    
 return(
    <div className='card-header border-top container d-flex justify-content-between p-1'>
        <div className='d-flex'>
          <strong>Scenario </strong>
          <select name="scenario" id="scenario" className="form-control ml-2 heighttext py-0 px-1" style={{ width:"100%" }} onChange={e=>setMortgageValues({scenario: e.target.value})} >
            <option value="standard">Standard</option>
            <option value="accelerated">Accelerated</option>
            <option value="express">Smith Manoevre</option>
          </select>
        </div>
        <div className='d-flex'>
          <strong>Start Date</strong>
          <input 
            type="date" 
            name="date" 
            id="date" 
            value={mortgageValues.date?new Date(mortgageValues.date).toISOString().split('T')[0]:null} 
            className="form-control ml-2 heighttext px-1" 
            style={{ width:"145px" }}
            onChange={e=>setMortgageValues({date: e.target.value})} 
          />
          </div>
      </div>
  )
}

export default Header;
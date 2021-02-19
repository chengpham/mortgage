const Header = () => {
    
 return(
    <div className='card-header border-top container d-flex justify-content-between'>
        <div className='d-flex'>
          <strong>Scenario </strong>
          <input 
            type="text" 
            name="scenario" 
            id="scenario" 
            value="Base Scenario" 
            className="form-control ml-2" 
            onChange={e=>console.log(e.target.value)} 
          />
        </div>
        <div className='d-flex'>
          <strong>Start Date</strong>
          <input 
            type="text" 
            name="start" 
            id="start" 
            value="2021-Feb-01" 
            className="form-control ml-2" 
            onChange={e=>console.log(e.target.value)} 
          />
          </div>
        <div className='d-flex'>
          <strong>Year</strong>
          <input 
            type="text" 
            name="year" 
            id="year" 
            value="2021" 
            className="form-control ml-2" 
            onChange={e=>console.log(e.target.value)} 
          />
          </div>
      </div>
  )
}

export default Header;
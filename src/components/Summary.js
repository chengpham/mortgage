import {formatter} from '../lib/helpers'

const Summary = ({ M, T, totalInterest, schedule, setSchedule, acceleration, setAcceleration, options, setOptions }) => {
   
    return(
       <div className='card-header border-top container p-1 my-2'>
          {acceleration? (
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>Bi-Weekly Payment: <strong>{formatter.format(M)}</strong></div>
            <div className='d-flex'>Term: <strong>{` ${(T/26.0).toFixed(2)} Years`}</strong></div>
            <div className='d-flex'>Total Interest: <strong> {formatter.format(totalInterest)}</strong></div>
           </div>
          ): (
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>Monthly Payment: <strong>{formatter.format(M)}</strong></div>
            <div className='d-flex'>Term: <strong>{` ${(T/12.0).toFixed(2)} Years`}</strong></div>
            <div className='d-flex'>Total Interest: <strong> {formatter.format(totalInterest)}</strong></div>
           </div>
          )
         }

           <div className='custom-control custom-switch d-flex justify-content-between my-2'>
               <div>
                  <input type='checkbox' className='custom-control-input' id='showSchedule' checked={schedule} onChange={setSchedule} readOnly />
                  <label className='custom-control-label' htmlFor='showSchedule'>Schedule</label>
               </div>
               <div>
                  <input type='checkbox' className='custom-control-input' id='showAcceleration' checked={acceleration} onChange={setAcceleration} readOnly />
                  <label className='custom-control-label' htmlFor='showAcceleration'>Acceleration</label>
               </div>
               <div>
                  <input type='checkbox' className='custom-control-input' id='showOptions' checked={options} onChange={setOptions}  readOnly
                  />
                  <label className='custom-control-label' htmlFor='showOptions'>Bank Rates</label>
               </div>
            </div>
        </div>
     )
   }
   
   export default Summary;
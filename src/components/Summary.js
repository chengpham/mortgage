import { useState } from 'react'
import { formatter } from '../lib/helpers'
import Acceleration from './Acceleration'
import Options from './Options'
import Schedule from './Schedule'

const Summary = ({ T, P, totalInterest, data, dataA }) => {
  const [options, setOptions] = useState(false)
  const [schedule, setSchedule] = useState(false)
  const [acceleration, setAcceleration] = useState(false)

  //   TODO: Try to calculate M inside here
  //   Try to calculate T inside here
  //   Try to calculate P inside here
  //   calculate TotalInterest in here

  const handleOptions = () => (options ? setOptions(false) : setOptions(true))
  const handleSchedule = () =>
    schedule ? setSchedule(false) : setSchedule(true)
  const handleAcceleration = () =>
    acceleration ? setAcceleration(false) : setAcceleration(true)

  return (
    <>
      <div className='card-header border-top container p-1 my-2'>
        {acceleration ? (
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              Bi-Weekly Payment: <strong>{formatter.format(M)}</strong>
            </div>
            <div className='d-flex'>
              Term: <strong>{` ${(T / 26.0).toFixed(2)} Years`}</strong>
            </div>
            <div className='d-flex'>
              Total Interest:{' '}
              <strong> {formatter.format(totalInterest)}</strong>
            </div>
          </div>
        ) : (
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              Monthly Payment: <strong>{formatter.format(M)}</strong>
            </div>
            <div className='d-flex'>
              Term: <strong>{` ${(T / 12.0).toFixed(2)} Years`}</strong>
            </div>
            <div className='d-flex'>
              Total Interest:{' '}
              <strong> {formatter.format(totalInterest)}</strong>
            </div>
          </div>
        )}

        <div className='custom-control custom-switch d-flex justify-content-between my-2'>
          <div>
            <input
              type='checkbox'
              className='custom-control-input'
              id='showSchedule'
              checked={schedule}
              onChange={handleSchedule}
              readOnly
            />
            <label className='custom-control-label' htmlFor='showSchedule'>
              Schedule
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              className='custom-control-input'
              id='showAcceleration'
              checked={acceleration}
              onChange={handleAcceleration}
              readOnly
            />
            <label className='custom-control-label' htmlFor='showAcceleration'>
              Acceleration
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              className='custom-control-input'
              id='showOptions'
              checked={options}
              onChange={handleOptions}
              readOnly
            />
            <label className='custom-control-label' htmlFor='showOptions'>
              Bank Rates
            </label>
          </div>
        </div>
      </div>
      {options && <Options />}
      {schedule && <Schedule M={M} data={data} />}
      {acceleration && <Acceleration M={P / 2.166666666666667} data={dataA} />}
    </>
  )
}

export default Summary

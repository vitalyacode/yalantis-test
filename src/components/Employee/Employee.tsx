import * as React from 'react';
import { IEmployeeProps } from './types'
import './style.css'
import { useDispatch } from 'react-redux'
import { toggleEmployee } from '../../actions/EmployeeActions'

export const Employee: React.FC<IEmployeeProps> = ({ employee, saveToStorage }) => {
  const dispatch = useDispatch()
  const handleChange = () => {
    dispatch(toggleEmployee(employee.id))
    //saveToStorage()
  }
  const style = { color: employee.selected ? 'blue' : 'black', fontSize: '20px' }
  return (
    <div>
      <div style={style}>
        {employee.firstName} {employee.lastName}
      </div>
      <form action="" className='form'>
        <div className='label-input'>
          <input type="radio" checked={employee.selected} onChange={handleChange} />
          <label htmlFor="">active</label>
        </div>
        <div className='label-input'>
          <input type="radio" checked={!employee.selected} onChange={handleChange} />
          <label htmlFor="">not active</label>
        </div>
      </form>
    </div>
  )
}
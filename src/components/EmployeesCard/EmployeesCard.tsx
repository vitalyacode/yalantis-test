import * as React from 'react';
import { IEmployeesCardProps } from './types'
import { Employee } from '../Employee/Employee'
import { IEmployee } from '../../reducers/employeeReducer'

export const EmployeesCard: React.FC<IEmployeesCardProps> = ({ letter, employees, saveToStorage }) => {

  if (employees.length === 0) return <div><p>{letter}</p>No Employees</div>


  return (
    <div key={letter}>
      <p>{letter}</p>
      {employees.map((e: IEmployee) => {
        return <Employee employee={e} key={e.id} saveToStorage={saveToStorage} />
      })}
    </div>
  )
}
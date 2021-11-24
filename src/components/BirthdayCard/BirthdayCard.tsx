import * as React from 'react';
import { IBirthdayCardProps } from './types'
import { BirthdayEmployee } from '../BirthdayEmployee/BirthdayEmployee'

export const BirthdayCard: React.FC<IBirthdayCardProps> = ({ month, employees }) => {

  if (employees.length === 0) return <div><h3>{month}</h3>No Employees</div>

  return (
    <div>
      <h3>{month}</h3>
      {employees.map(e => <BirthdayEmployee employee={e} key={e.id} />)}
    </div>
  )
}
import * as React from 'react';
import { IBirthdayEmployeeProps } from './types'

const style = {
  fontSize: '16px'
}

export const BirthdayEmployee: React.FC<IBirthdayEmployeeProps> = ({ employee }) => {
  const date = new Date(employee.dob)
  const year = date.getFullYear()
  const [month, day] = date.toLocaleString('default', { day: 'numeric', month: 'long' }).split(' ')
  return (
    <div>
      <p style={style}>
        {employee.firstName} {employee.lastName} - {day} {month}, {year} year
      </p>
    </div>
  )
}
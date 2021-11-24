import { IEmployee } from '../../reducers/employeeReducer'

export interface IEmployeesCardProps {
  letter: string
  employees: IEmployee[]
  saveToStorage: () => void
}
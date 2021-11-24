import { IEmployee } from '../../reducers/employeeReducer'

export interface IEmployeeProps {
  employee: IEmployee
  saveToStorage: () => void
}
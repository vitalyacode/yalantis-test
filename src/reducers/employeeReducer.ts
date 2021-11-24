import { Reducer } from 'redux'
import {
  EmployeeActions,
  EmployeeActionTypes
} from '../actions/EmployeeActions'

export interface IEmployee {
  id: string
  firstName: string
  lastName: string
  dob: Date
  selected: boolean
}

export interface IEmployeeState {
  readonly employees: IEmployee[]
}

const initialEmployeeState: IEmployeeState = {
  employees: []
}

export const employeeReducer: Reducer<IEmployeeState, EmployeeActions> = (
  state = initialEmployeeState,
  action
) => {
  switch (action.type) {
    case EmployeeActionTypes.GET_ALL: {
      console.log('asdasd')
      return {
        ...state,
        employees: action.employees
      }
    }
    case EmployeeActionTypes.TOGGLE_EMPLOYEE: {
      const employeeToChange = state.employees.find(e => e.id === action.id) as IEmployee
      const changedEmployee: IEmployee = { ...employeeToChange, selected: !employeeToChange?.selected }
      const updatedList: IEmployee[] = state.employees.map(e => e.id === changedEmployee.id ? changedEmployee : e)
      return {
        ...state,
        employees: updatedList
      }
    }
    case EmployeeActionTypes.GET_ALL_FROM_STORAGE: {
      return {
        ...state,
        employees: action.employees
      }
    }
    default: return state
  }
}

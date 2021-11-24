import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

import { IEmployee, IEmployeeState } from '../reducers/employeeReducer'

export enum EmployeeActionTypes {
  GET_ALL = 'GET_ALL',
  TOGGLE_EMPLOYEE = 'TOGGLE_EMPLOYEE',
  GET_ALL_FROM_STORAGE = 'GET_ALL_FROM_STORAGE'
}

export interface IEmployeeGetAllAction {
  type: EmployeeActionTypes.GET_ALL
  employees: IEmployee[]
}
export interface IEmployeeToggleAction {
  type: EmployeeActionTypes.TOGGLE_EMPLOYEE
  id: string
}
export interface IEmployeeGetStorage {
  type: EmployeeActionTypes.GET_ALL_FROM_STORAGE
  employees: IEmployee[]
}

//add to next export other action types with union(|)
export type EmployeeActions = IEmployeeGetAllAction | IEmployeeToggleAction | IEmployeeGetStorage

export const getAllEmployees: ActionCreator<ThunkAction<Promise<any>, IEmployeeState, null, IEmployeeGetAllAction>>
  = () => {
    return async (dispatch: Dispatch) => {
      try {
        const response = await axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
        const modifiedResponse = response.data.map((e: IEmployee) => e.selected ? e : { ...e, selected: false })
        dispatch({
          employees: modifiedResponse,
          type: EmployeeActionTypes.GET_ALL
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

export const toggleEmployee = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      id,
      type: EmployeeActionTypes.TOGGLE_EMPLOYEE
    })
  }
}

export const getFromStorage = (employees: IEmployee[]) => {
  return (dispatch: Dispatch) => {
    //const employees: IEmployee[] = JSON.parse(window.localStorage.getItem('employees') || '')
    dispatch({
      employees,
      type: EmployeeActionTypes.GET_ALL_FROM_STORAGE
    })
  }
}

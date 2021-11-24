import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import {
  employeeReducer,
  IEmployeeState
} from '../reducers/employeeReducer'

export interface IAppState {
  employees: IEmployeeState
}

const rootReducer = combineReducers<IAppState>({
  employees: employeeReducer,
})

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  return store
}
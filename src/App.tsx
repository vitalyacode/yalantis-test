import React, { useEffect } from 'react';
import { EmployeeList } from './components/EmployeeList/EmployeeList'
import { getAllEmployees, getFromStorage } from './actions/EmployeeActions'
import { useDispatch } from 'react-redux'
import { IEmployee } from './reducers/employeeReducer'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const localEmployees: IEmployee[] | null = JSON.parse(window.localStorage.getItem('employees') || 'null')
    if (localEmployees) {
      dispatch(getFromStorage(localEmployees))
    } else {
      console.log('api')
      dispatch(getAllEmployees())
    }
    //localEmployees ? dispatch(getFromStorage()) : dispatch(getAllEmployees())
  }, [dispatch])
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/employees' element={<EmployeeList />} />
          <Route path='*' element={<Navigate to='/employees' />} />
        </Routes>
        {/* <Navigate to='/employees' /> */}
      </HashRouter>
    </div>
  );
}

export default App;

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { IAppState } from '../../store/Store'
import { IEmployee } from '../../reducers/employeeReducer'
import { EmployeesCard } from '../EmployeesCard/EmployeesCard'
import './style.css'
import { BirthdayCard } from '../BirthdayCard/BirthdayCard';
//repeat(3, 1fr)



export const EmployeeList = () => {
  const employees = useSelector((state: IAppState) => state.employees.employees)
  const [alphabet, setAlphabet] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65)
    const alphabet = alpha.map((x) => String.fromCharCode(x))//upperCase alphabet
    setAlphabet(alphabet)

    const date = new Date('Wed Nov 24 2021 16:51:08 GMT+0200 (Eastern European Standard Time)');
    let months: string[] = []
    for (let i = 0; i < 12; i++) {
      const month = date.toLocaleString('default', { month: 'long' });
      months.push(month)
      date.setMonth(date.getMonth() + 1)
    }
    setMonths(months)
  }, [])

  const saveToStorage = () => {
    if (employees && employees.length > 0) window.localStorage.setItem('employees', JSON.stringify(employees))
  }
  useEffect(() => {
    saveToStorage()//eslint-disable-next-line
  }, [employees])

  const sortedByFirst: IEmployee[] = employees.sort((e1: IEmployee, e2: IEmployee): number => {
    if (e1.firstName.toLowerCase() > e2.firstName.toLowerCase()) return 1
    else if (e1.firstName.toLowerCase() < e2.firstName.toLowerCase()) return -1
    return 0
  })

  const selected = sortedByFirst.filter(e => e.selected)


  //const letterizedObject = Object.fromEntries(alphabet.map())

  // const list = sortedByFirst.filter((e: IEmployee): boolean => e.firstName[0] === letter)
  return (
    <div className='employee-container'>
      <div>
        <h2 style={{ textAlign: 'center' }}>Employees</h2>
        <div className='employee-list'>
          {alphabet.map((letter: string) => {
            const list: IEmployee[] = sortedByFirst.filter((e: IEmployee): boolean => e.firstName[0] === letter)
            return (
              <div key={letter}>
                <EmployeesCard letter={letter} employees={list} key={letter} saveToStorage={saveToStorage} />
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <h2 style={{ textAlign: 'center', borderBottom: '1px solid black' }}>Employees Birthday</h2>
        <div className='birthday-list'>
          {selected.length === 0
            ? <h4>Employees List is empty</h4>
            : months.map(m => {
              const list: IEmployee[] = selected.filter((e: IEmployee): boolean => {
                const month = months[(new Date(e.dob).getMonth() - (new Date().getMonth() - 12)) % 12]//toLocaleString is too bad from performance
                return month === m
              }).sort((e1: IEmployee, e2: IEmployee): number => {
                if (e1.firstName.toLowerCase() < e2.firstName.toLowerCase()) return 1
                else if (e1.firstName.toLowerCase() > e2.firstName.toLowerCase()) return -1
                return 0
              })
              return (
                <div key={m}>
                  <BirthdayCard month={m} employees={list} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
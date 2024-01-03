import React from 'react'
import { Outlet } from 'react-router-dom'
import BoardingProvider from './Provider'

const Clinic = () => {
  
  return (
    <BoardingProvider >
        <Outlet/>
    </BoardingProvider>
  )
}

export default Clinic
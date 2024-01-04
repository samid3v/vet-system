import React from 'react'
import { Outlet } from 'react-router-dom'
import ClinicProvider from './Provider'

const Clinic = () => {
  
  return (
    <ClinicProvider >
        <Outlet/>
    </ClinicProvider>
  )
}

export default Clinic
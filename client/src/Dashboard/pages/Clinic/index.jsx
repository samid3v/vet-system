import React from 'react'
import { Outlet } from 'react-router-dom'
import TreatmentProvider from './Provider'

const Clinic = () => {
  
  return (
    <TreatmentProvider >
        <Outlet/>
    </TreatmentProvider>
  )
}

export default Clinic
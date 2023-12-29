import React from 'react'
import { Outlet } from 'react-router-dom'
import TreatmentProvider from './Provider'

const Treatment = () => {
  
  return (
    <TreatmentProvider >
        <Outlet/>
    </TreatmentProvider>
  )
}

export default Treatment
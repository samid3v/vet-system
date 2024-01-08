import React from 'react'
import { Outlet } from 'react-router-dom'
import VaccineProvider from './Provider'

const Vaccine = () => {
  
  return (
    <VaccineProvider >
        <Outlet/>
    </VaccineProvider>
  )
}

export default Vaccine
import React from 'react'
import { usePatients } from '../../../Hooks/usePatients'
import TRow from './TableRow'
import { TableBody } from '@mui/material'

const TBody = () => {

  const {patients} = usePatients()

  return (
    <tbody>
    {patients.map((patient, index) => (
      
      <TRow patient={patient} index={index} />
    ))}
  </tbody>
  )
}

export default TBody
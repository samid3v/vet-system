import React from 'react'
import { usePatients } from '../../../Hooks/usePatients'
import TRow from './TableRow'
import { TableBody } from '@mui/material'

const TBody = () => {

  const {patients} = usePatients()

  return (
    
    <TableBody>
    {patients.map((patient,index) => (
      
      <TRow patient={patient} index={index} />
    ))}
  </TableBody>
  )
}

export default TBody
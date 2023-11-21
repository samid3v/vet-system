import React from 'react'
import { usePatients } from '../../../Hooks/usePatients'
import TRow from './TableRow'

const TBody = () => {

  const {patients} = usePatients()

  return (
    <tbody>
    {patients.map((patient, index) => (
      
      <TRow  key={patient._id} patient={patient} index={index} />
    ))}
  </tbody>
  )
}

export default TBody
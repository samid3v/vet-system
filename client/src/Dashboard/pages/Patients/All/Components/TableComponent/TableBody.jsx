import React from 'react'
import { usePatients } from '../../../Hooks/usePatients'
import TRow from './TableRow'
import { Skeleton } from '@mui/material'

const TBody = () => {

  const {patients} = usePatients()

  if (!patients || Object.keys(patients).length === 0) {
    return ( 
    <div className='flex w-full justify-center items-center'>
      <h3 className='text-xl text-center'>Loading Data...</h3>
    </div>
    );
  }

  return (
    <tbody>
    {patients.map((patient, index) => (
      
      <TRow  key={patient._id} patient={patient} index={index} />
    ))}
  </tbody>
  )
}

export default TBody
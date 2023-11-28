import React from 'react'
import { useOwners } from '../../../Hooks'
import TRow from './TableRow'
import { Skeleton } from '@mui/material'

const TBody = () => {

  const {patients} = useOwners()

  if (patients.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
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
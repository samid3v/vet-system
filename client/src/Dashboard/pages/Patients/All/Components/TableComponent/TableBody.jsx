import React from 'react'
import { usePatients } from '../../../Hooks/usePatients'
import TableRow from './TableRow'

const TableBody = () => {

  const {patients} = usePatients()

  return (
     <tbody >

    {patients.map((patient,index)=>(

    <TableRow patient={patient} index={index} />
    ))}
      
    </tbody>
  )
}

export default TableBody
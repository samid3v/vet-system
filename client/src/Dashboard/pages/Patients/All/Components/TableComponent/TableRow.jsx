import React from 'react'
import Actions from '../Actions'
import { Skeleton } from '@mui/material'
import { usePatients } from '../../../Hooks/usePatients'

const TRow = ({patient, index}) => {


  return (
    
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="p-3 border-b">{index+1}</td>
        <td className="p-3 border-b">{patient.name}</td>
        <td className="p-3 border-b">{patient.age}</td>
        <td className="p-3 border-b">{patient.breed}</td>
        <td className="p-3 border-b">{patient.species}</td>
        <td className="p-3 border-b">{patient.owner.name}</td>
        <td className="p-3 border-b"><Actions doc={patient}/></td>
      </tr>
  )
}

export default TRow
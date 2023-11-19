import React from 'react'
import Actions from '../Actions'

const TableRow = ({patient, index}) => {
  return (
    <tr className='border-none'>
     <th>{index+1}</th>
     <td>{patient.name}</td>
     <td>{patient.age}</td>
     <td>{patient.breed}</td>
     <td>{patient.species}</td>
     <td><Actions/></td>
   </tr>
  )
}

export default TableRow
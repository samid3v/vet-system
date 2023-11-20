import React from 'react'
import Actions from '../Actions'
import { TableCell, TableRow } from '@mui/material'

const TRow = ({patient, index}) => {
  return (
    
    <TableRow
    key={index}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    {/* <TableCell align="right">{index+1}</TableCell> */}

    <TableCell align="left">
    {patient.name}
    </TableCell>
    <TableCell align="left">{patient.age}</TableCell>
    <TableCell align="left">{patient.breed}</TableCell>
    <TableCell align="left">{patient.species}</TableCell>
    {/* <TableCell align="right"><Actions/></TableCell> */}
  </TableRow>
  )
}

export default TRow
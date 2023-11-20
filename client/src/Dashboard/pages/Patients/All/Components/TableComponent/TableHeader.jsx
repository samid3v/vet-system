import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const THeader = () => {
  return (
   <TableHead>
   <TableRow>
     {/* <TableCell align="right">No</TableCell> */}
     <TableCell align="left">Name</TableCell>
     <TableCell align="left">Age</TableCell>
     <TableCell align="left">Breed</TableCell>
     <TableCell align="left">Species</TableCell>
     {/* <TableCell align="right">Actions</TableCell> */}
   </TableRow>
 </TableHead>
  )
}

export default THeader
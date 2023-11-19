import React from 'react'

const TableHeader = () => {
  return (
    <thead>
     <tr className='border-none z-0'>
       <th>No</th>
       <th>Name</th>
       <th>Age</th>
       <th>Breed</th>
       <th>Species</th>
       <th>Actions</th>
     </tr>
   </thead>
  )
}

export default TableHeader
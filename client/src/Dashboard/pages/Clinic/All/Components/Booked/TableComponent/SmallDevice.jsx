import React, { useState } from 'react'
import { useClinic } from '../../../../Hooks'
import Pagination from '@mui/material/Pagination';
import SmallTable from './SmallTable';

const SmallDevice = () => {
     const {clinics,totalPages, currentPage, setCurrentPage } = useClinic()

  if (clinics.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
  }

  const handlePageChange = (event, newPage) => {
     setCurrentPage(newPage);
   };

 
  return (
    <div className='lg:hidden'>
     {
          clinics.map((doc,index)=>(
               <SmallTable i={index} doc={doc}/>
          ))
     }
     <div className='flex justify-center my-3'>
     <Pagination 
        count={totalPages} 
        variant="outlined" 
        color="primary" 
        onChange={handlePageChange}
        page={currentPage}
      />
     </div>
    </div>
  )
}

export default SmallDevice
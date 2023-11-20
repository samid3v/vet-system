import React from 'react'
import { usePatients } from '../../../Hooks/usePatients'
import Pagination from '@mui/material/Pagination';

import THeader from './TableHeader';
import TBody from './TableBody';

const LargeDevice = () => {

  const {patients} = usePatients()



  return (

        
    <div className='w-full p-4 '>
      <table className=" w-full border border-gray-300 mb-3">
        <THeader/>
        <TBody/>
      </table>
      <div className='flex justify-center items-center my-3 '>

      <Pagination count={4} variant="outlined" color="primary" />
      </div>
    </div>

   
    
     
  )
}

export default LargeDevice
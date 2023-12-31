import React, { useState } from 'react'
import { useApp } from '../../../../hooks/useApp';
import LargeDevice from './TableComponent/LargeDevice';
import BasicModal from '../../../../components/Modal';
import { useTreatment } from '../../Hooks';
import AddTreatment from './AddTreatment';

const TreatmentTable = () => {

  const {setModalOpen, setModalMessage, isModalOpen, modalMessage} = useApp();
  const {searchTerm, setSearchTerm} = useTreatment()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  return (
    <div className=''>
     <div className='flex justify-between items-center gap-2 p-6  '>
        <input className='w-full py-1 px-2 rounded-lg outline-none border-[1px] border-black' type="text" name="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search...' />
        <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-40 bg-primary px-3 py-2'>Add Treatment</button>
      </div>
      <LargeDevice />
      <BasicModal open={open} element={<AddTreatment handleClose={handleClose}/>}/>
    </div>
  )
}

export default TreatmentTable
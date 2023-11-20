import React, { useState } from 'react'
import { useApp } from '../../../../hooks/useApp';
import AddPatient from './AddPatient';
import LargeDevice from './TableComponent/LargeDevice';
import BasicModal from '../../../../components/Modal';

const PatientsTable = () => {

  const {setModalOpen, setModalMessage, isModalOpen, modalMessage} = useApp();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openModal = () => {
     setModalOpen(true)
     setModalMessage(<AddPatient/>)
    //  console.log(modalMessage)
}

  return (
    <div className=''>
     <div className='flex justify-end items-center gap-2 p-6  '>
        <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-32 bg-primary px-3 py-2'>Add Patient</button>
      </div>
      <LargeDevice />
      <BasicModal open={open} element={<AddPatient handleClose={handleClose}/>}/>
    </div>
  )
}

export default PatientsTable
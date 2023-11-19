import React, { useState } from 'react'
import { usePatients } from '../../Hooks/usePatients'
import { useApp } from '../../../../hooks/useApp';
import AddPatient from './AddPatient';
import LargeDevice from './TableComponent/LargeDevice';

const PatientsTable = () => {
  const {patients} = usePatients()

  const {setModalOpen, setModalMessage, isModalOpen, modalMessage} = useApp();

  const openModal = () => {
     setModalOpen(true)
     setModalMessage(<AddPatient/>)
    //  console.log(modalMessage)
}

  return (
    <div className='w-full'>
     <div className='flex justify-between items-center gap-2 my-4'>
        <input type="text" className='py-2 w-full px-2 border-[1px] border-neutral outline-none rounded-lg' name="search" id="search" placeholder='search...' />
        <button onClick={openModal} type="button" className='rounded-lg text-neutral w-32 bg-primary px-3 py-2'>Add Patient</button>
      </div>
      <LargeDevice />
    </div>
  )
}

export default PatientsTable
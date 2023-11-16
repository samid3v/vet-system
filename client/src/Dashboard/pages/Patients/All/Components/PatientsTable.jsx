import React, { useState } from 'react'
import { usePatients } from '../../Hooks/usePatients'
import { useApp } from '../../../../hooks/useApp';
import AddPatient from './AddPatient';

const PatientsTable = () => {
  const {patients} = usePatients()

  const {setModalOpen, setModalMessage, isModalOpen, modalMessage} = useApp();

  const openModal = () => {
     setModalOpen(true)
     setModalMessage(<AddPatient/>)
     console.log(modalMessage)
}

  return (
    <div>
     <div>
        <input type="text" className='py-1 px-2 rounded-lg' name="search" id="search" placeholder='search...' />
        <button onClick={openModal} type="button" className='rounded-lg text-neutral bg-primary px-3 py-1'>Add Patient</button>
      </div>
      <table className="table ">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Age</th>
        <th>Breed</th>
        <th>Species</th>
      </tr>
    </thead>
    <tbody>

    {patients.map((patient,index)=>(

    <tr>
      <th>{index+1}</th>
      <td>{patient.name}</td>
      <td>{patient.age}</td>
      <td>{patient.breed}</td>
      <td>{patient.species}</td>
    </tr>
    ))}
      
    </tbody>
      </table>
    </div>
  )
}

export default PatientsTable
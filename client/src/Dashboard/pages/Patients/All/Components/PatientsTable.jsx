import React, { useState } from 'react'
import { usePatients } from '../../Hooks/usePatients'
import { useApp } from '../../../../hooks/useApp';

const PatientsTable = () => {
  const {patients} = usePatients()

  const [isModalOpen, setModalOpen] = useApp();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
     <div>
        <input type="text" className='py-1 px-2 rounded-lg' name="search" id="search" placeholder='search...' />
        <button type="button" className='rounded-lg text-neutral bg-primary px-3 py-1'>Add Patient</button>
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
import React from 'react'
import { usePatients } from '../Hooks/usePatients'

const AllPatients = () => {
  const {patients} = usePatients()

  return (
    <div>
      <table className="table table-zebra">
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

export default AllPatients
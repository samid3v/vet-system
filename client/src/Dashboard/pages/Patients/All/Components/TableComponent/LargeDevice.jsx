import React from 'react'
import Pagination from '@mui/material/Pagination';
import { usePatients } from '../../../Hooks/usePatients'
import Actions from '../Actions';

const LargeDevice = () => {

  const {patients} = usePatients()


  return (
    
        
    <div className=" px-6 ">
      <table className=" w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-3 border-b text-left">No</th>
            <th className="p-3 border-b text-left">Name</th>
            <th className="p-3 border-b text-left">Age</th>
            <th className="p-3 border-b text-left">Breed</th>
            <th className="p-3 border-b text-left">Species</th>
            <th className="p-3 border-b text-left">Actions</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="p-3 border-b">{index+1}</td>
              <td className="p-3 border-b">{patient.name}</td>
              <td className="p-3 border-b">{patient.age}</td>
              <td className="p-3 border-b">{patient.breed}</td>
              <td className="p-3 border-b">{patient.species}</td>
              <td className="p-3 border-b"><Actions/></td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={10} variant="outlined" color="primary" />
    </div>
   
    
     
  )
}

export default LargeDevice
import React from 'react'
import ClinicCards from './Components/Booked/ClinicCards'
import ClinicTable from './Components/ClinicTable'

const AllClinics = () => {

  return (
    <>
      <ClinicCards />
      <div className='bg-white  '>
        <ClinicTable/>
      </div>
    </>
  )
}

export default AllClinics
import React from 'react'
import TreatmentInfo from './Components/TreatmentInfo'
import { useParams } from 'react-router-dom'

const ViewVaccine = () => {
     const {id} = useParams()
     
  return (
    <div className='bg-white p-4 rounded-md'>
       <TreatmentInfo id={id} />
    </div>
  )
}

export default ViewVaccine
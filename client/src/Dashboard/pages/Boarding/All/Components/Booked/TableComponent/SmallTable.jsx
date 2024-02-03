import React, { useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import Status from './Status'
import Actions from '../Actions';

const SmallTable = ({doc,i}) => {
     const [showMenu, setShowMenu] = useState(false)

     const humateDateFormat = (dateString) =>{
          const formattedDate = new Date(dateString).toLocaleString('en-US', {
            timeZone: 'Africa/Nairobi', // Nairobi is the capital of Kenya
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
      
          return formattedDate
        }

  return (
     <div className='my-3 p-3' key={i}>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Patient Name</h1>
          <h3>{doc?.patient_id?.name}</h3>
     </div>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Vet Name</h1>
          <h3>{doc?.patient_id?.owner?.name}</h3>
     </div>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Vet Name</h1>
          <h3>{humateDateFormat(doc?.start_date)}</h3>
     </div>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Vet Name</h1>
          <h3>{humateDateFormat(doc?.end_date)}</h3>
     </div>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Reason</h1>
          <h3>{ doc?.reason }</h3>
     </div>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Status</h1>
          <h3 className='flex justify-start gap-5 items-center'>
          {doc?.status || '---'}
          {(doc?.status === 'In Progress' || doc?.status == 'Booked') && 
          (
            <>
              <CiMenuKebab onClick={()=> setShowMenu(!showMenu)} className='text-xl font-semibold'/>
              {menuDisabled && <Status id={doc._id} status={doc?.status} setMenuDisabled={setShowMenu}/>}
            </>
          )
          }
          </h3>
     </div>
     <div className='flex justify-between items-center p-2'>
          <h1 className='text-lg font-semibold'>Actions</h1>
          <h3>{doc?.status !== 'Canceled' &&<Actions doc={doc}/>}</h3>
     </div>
</div>
  )
}

export default SmallTable
import React, { useEffect, useState } from 'react'
import { useBoarding } from '../../Hooks'
import boardingUrl from '../../../../urls/boarding'
import { toast } from 'react-toastify'
import { useApp } from '../../../../hooks/useApp'
import api from '../../../../helpers/axiosInstance'
import moment from 'moment-timezone';

const BoarderInfo = ({id}) => {
     const [loading, setLoading] = useState()
     const [boarding, setBoarding] = useState([])
     const { setShowLoader } = useApp();

     useEffect(()=>{
          getSingleBoarding()
     },[])

     const getSingleBoarding = async () => {
          try {
            setShowLoader(true)
      
            if (id !== 0) {
              const response = await api.get(boardingUrl.get_single_boarder.url, {
                params: { id: id },
              });
        
              if (response.status === 200) {
                console.log(response)
                setBoarding(response.data);
              } else {
                toast.error('Failed to fetch patient');
              }
            }
          } catch (error) {
            toast.error(error.message);
          } finally {
            setShowLoader(false);
          }
        };

        const dateFormat = (dateString) =>{
          const dateMoment = moment.utc(dateString);

          const nairobiDateMoment = dateMoment.tz('Africa/Nairobi');

          const formattedNairobiDate = nairobiDateMoment.format('dddd, MMMM Do YYYY, h:mm:ss a z');
         
          return formattedNairobiDate
        }

  return (
    <>
     <div className='flex justify-between w-[70%] mx-auto '>
          <div>
               <h3 className='font-semibold text-lg text-gray-600'>Owner Info</h3>
               <div>
                    <p className='text-md text-gray-600 font-semibold'>Name: <span className='text-gray-500'>{boarding?.module_id?.patient_id?.owner?.name}</span></p>
               </div>
          </div>
          <div>
               <h3 className='text-center font-semibold text-lg text-gray-600'>Patient Info</h3>
               <div>
                    <p className='text-md text-gray-600 font-semibold'>Name: <span className='text-gray-500'>{boarding?.module_id?.patient_id?.name}</span></p>
               </div>
          </div>
          
     </div>
     <div className='flex flex-col gap-2 w-[70%] mx-auto my-6'>
          <h3 className='font-semibold text-lg text-gray-600'>Boarding Info</h3>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Start Date: <span className='text-gray-500'>{dateFormat(boarding?.module_id?.start_date)}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>End Date: <span className='text-gray-500'>{dateFormat(boarding?.module_id?.end_date)}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Amount: <span className='text-gray-500'>{boarding?.amount}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Status: <span className={`text-black text-sm font-normal ${boarding.status==='Pending'? 'bg-yellow-600':'bg-green-600'} rounded-2xl px-3 py-1`}>{boarding?.status}</span></p>
          </div>
     </div>
    </>
  )
}

export default BoarderInfo
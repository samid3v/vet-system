import React from 'react'
import Card from '../../Components/Card'
import { LuPencilLine } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
import { MdOutlineFreeCancellation } from "react-icons/md"
import { useBoarding } from '../../Hooks';

const BookingCards = () => {
  const { bookingStatus,setBookingStatus, stats  } = useBoarding()
  return (
    <div className='my-4 flex items-center justify-between flex-nowrap'>
      <Card onClick={()=>setBookingStatus('Booked')} active={bookingStatus=='Booked'? true:false} variant={'Booked'} value={stats?.Booked || 0} title={'Booked'} icon={<LuPencilLine/>} />
      <Card onClick={()=>setBookingStatus('Completed')} active={bookingStatus=='Completed'? true:false} variant={'Completed'} value={stats?.Completed || 0} title={'Completed'} icon={<MdIncompleteCircle/>} />
      <Card onClick={()=>setBookingStatus('Canceled')} active={bookingStatus=='Canceled'? true:false} variant={'Canceled'} value={stats?.Canceled || 0} title={'Canceled'} icon={<MdOutlineFreeCancellation/>} />
    </div>
  )
}

export default BookingCards

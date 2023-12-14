import React from 'react'
import Card from '../../Components/Card'
import { LuPencilLine } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
import { MdOutlineFreeCancellation } from "react-icons/md"
import { useBoarding } from '../../Hooks';

const BookingCards = () => {
  const { bookingStatus,setBookingStatus } = useBoarding()
  return (
    <div className='my-4 flex items-center gap-5 flex-nowrap'>
      <Card onClick={()=>setBookingStatus('In Progress')} active={bookingStatus=='In Progress'? true:false} variant={'In Progress'} value={2} title={'In Progress'} icon={<GiProgression/>} />
      <Card onClick={()=>setBookingStatus('Booked')} active={bookingStatus=='Booked'? true:false} variant={'Booked'} value={13} title={'Booked'} icon={<LuPencilLine/>} />
      <Card onClick={()=>setBookingStatus('Completed')} active={bookingStatus=='Completed'? true:false} variant={'Completed'} value={3} title={'Completed'} icon={<MdIncompleteCircle/>} />
      <Card onClick={()=>setBookingStatus('Canceled')} active={bookingStatus=='Canceled'? true:false} variant={'Canceled'} value={10} title={'Canceled'} icon={<MdOutlineFreeCancellation/>} />
    </div>
  )
}

export default BookingCards

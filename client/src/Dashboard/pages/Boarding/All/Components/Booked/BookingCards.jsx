import React from 'react'
import Card from '../../../../../components/Card'
import { LuPencilLine } from "react-icons/lu";

const BookingCards = () => {
  return (
    <div className='my-4 flex items-center gap-5 flex-nowrap'>
      <Card onClick={alert('ello')} variant={'In Progress'} value={2} title={'In Progress'} icon={<LuPencilLine/>} />
      <Card variant={'Booked'} value={13} title={'Booked'} icon={<LuPencilLine/>} />
      <Card variant={'Completed'} value={3} title={'Completed'} icon={<LuPencilLine/>} />
      <Card variant={'Canceled'} value={10} title={'Canceled'} icon={<LuPencilLine/>} />
    </div>
  )
}

export default BookingCards

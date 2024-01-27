import React from 'react'
import Card from './Card'
import { LuUsers } from "react-icons/lu";


const DashStats = () => {
  return (
    <div className='flex w-screen justify-start gap-2 overscroll-contain scroll-hidden'>
     <Card variant={'success'} value={10} icon={<LuUsers/>} title={'Customers'} />
     <Card variant={'info'} value={23} icon={<LuUsers/>} title={'Patients'} />
     <Card variant={'warning'} value={45} icon={<LuUsers/>} title={'Vaccines'} />
     <Card variant={'danger'} value={100} icon={<LuUsers/>} title={'Treatments'} />
     <Card variant={'primary'} value={78} icon={<LuUsers/>} title={'Clinics'} />
    </div>
  )
}

export default DashStats
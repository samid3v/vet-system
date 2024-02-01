import React from 'react'
import Card from './Card'
import { LuUsers } from "react-icons/lu";
import useDash from '../../Hooks';


const DashStats = () => {
  const {stats} = useDash()
  console.log(stats);
  return (
    <div className='flex w-screen justify-start gap-2 overscroll-contain scroll-hidden'>
     <Card variant={'success'} value={stats?.customers || 0} icon={<LuUsers/>} title={'Customers'} />
     <Card variant={'info'} value={stats?.patients || 0} icon={<LuUsers/>} title={'Patients'} />
     <Card variant={'warning'} value={stats?.doses || 0} icon={<LuUsers/>} title={'Vaccines'} />
     <Card variant={'danger'} value={stats?.treatments || 0} icon={<LuUsers/>} title={'Treatments'} />
     <Card variant={'primary'} value={stats?.appointments || 0} icon={<LuUsers/>} title={'Clinics'} />
    </div>
  )
}

export default DashStats
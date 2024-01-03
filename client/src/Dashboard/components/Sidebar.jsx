import React from 'react'
import { GiPlagueDoctorProfile } from "react-icons/gi"
import { MdPets } from "react-icons/md";
import { PiSyringeDuotone } from "react-icons/pi";
import { GiCage } from "react-icons/gi";
import { MdOutlineLocalHospital } from "react-icons/md"
import { HiOutlineDocumentReport } from "react-icons/hi"
import { FaUsers } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
     const navigate = useNavigate()
  return (
     <div className='w-[80px] hidden h-[100vh]  md:flex flex-col  items-center shadow-lg'>
          <div className='bg-neutral text-gray-300 min-h-[320px] w-[45px] mt-2 py-3 rounded-t-[20px] rounded-b-[20px] '>
               <div className='flex justify-center items-center mb-4'>
                    <span>Pet</span>
               </div>
               <div className='flex flex-col justify-center items-center gap-4'>
                    <div onClick={()=>navigate("/dashboard")} className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <IoHomeOutline className='text-xl'/>
                    </div>
                    
                    <div onClick={()=>navigate("./patients")} className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <MdPets className='text-xl'/>
                    </div>

                    <div onClick={()=>navigate("./clinic")} className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <MdOutlineLocalHospital className='text-xl'/>
                    </div>
                    
                    <div onClick={()=>navigate("./boarding")} className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <GiCage className='text-xl'/>
                    </div>

                    <div onClick={()=>navigate("./treatment")} className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <PiSyringeDuotone className='text-xl'/>
                    </div>
                    <div className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <HiOutlineDocumentReport className='text-xl'/>
                    </div>
                    <div onClick={()=>navigate("./owners")} className='hover:bg-secondary  p-3 hover:border-l-2 hover:border-l-primary'>
                         <FaUsers className='text-xl'/>
                    </div>
               </div>
          </div>
     </div>
  )
}

export default Sidebar
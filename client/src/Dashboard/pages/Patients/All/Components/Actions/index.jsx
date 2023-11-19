import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

const Actions = () => {
  return (
    <div className='flex justify-center items-center gap-3'>
     <FaEye className='text-secondary' />
     <FaRegEdit className='text-primary' />
     <BsTrash className='text-error' />
    </div>
  )
}

export default Actions
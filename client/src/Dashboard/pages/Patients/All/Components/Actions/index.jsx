import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import DeleteModal from '../../../../../components/DeleteModal';
import api from '../../../../../helpers/axiosInstance';
import patientUrl from '../../../../../urls/patients';
import { toast } from 'react-toastify';
import { usePatients } from '../../../Hooks/usePatients';
import { useApp } from '../../../../../hooks/useApp';
import ViewPatient from '../ViewPatient';
import BasicModal from '../../../../../components/Modal';


const Actions = ({doc}) => {

  const [openDelete, setOpenDelete] = useState(false)
  const {getAllPatients, setCurrentId} = usePatients()

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setCurrentId(doc._id)
  };
  const handleClose = () => setOpen(false);

  const deleteDoc = async () =>{
    try {
      const response = await api.delete(patientUrl.delete_patient.url, {
        params: {id:doc._id },
      });
  
      if (response.status === 201) {
        setOpenDelete(false)
        toast.success('Patient Record Deleted Successfully')
        getAllPatients(1, 10)
      } else {
        toast.error('Failed to fetch patients');
      }
    } catch (error) {
      toast.error(error.response);
  
      
    }
  }

  return (
    <div className='flex justify-center items-center gap-3'>
     <FaEye onClick={handleOpen} className='text-secondary' />
     <FaRegEdit className='text-primary' />
     <BsTrash onClick={()=>setOpenDelete(true)} className='text-error' />
     <DeleteModal open={openDelete} handleClose={()=>setOpenDelete(false)} deleteFunc={deleteDoc} />
     <BasicModal open={open} element={<ViewPatient handleClose={handleClose}/>}/>
    
    </div>
  )
}

export default Actions
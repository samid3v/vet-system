import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../hooks/useApp'
import { useTreatment } from '../../Hooks'
import patientUrl from '../../../../urls/patients'
import api from '../../../../helpers/axiosInstance'
import { GiCancel } from 'react-icons/gi'
import { toast } from 'react-toastify'
import Loader from '../../../../components/Loader'
import LocationData from '../../../../urls/data/LocationData'
import customersUrl from '../../../../urls/customers'
import boardingUrl from '../../../../urls/boarding'
import moment from "moment-timezone";
import {DateTime} from 'luxon'

const EditBoarder = ({handleClose}) => {
     const { setShowLoader  } = useApp()
     const { currentBoarder, refreshBoarders, currentId, patients } = useTreatment()
     const [formData, setFormData] = useState({
      name:'', 
      patient:'', 
      vet:'', 
      notes:'', 
      date:'', 
      amount:'',
      pay_id: '',
      description:''
    });

     useEffect(() => {
    if (currentBoarder && Object.keys(currentBoarder).length > 0) {

      
      setFormData({
        patient: currentBoarder?.module_id?.patient_id || '---',
        name: currentBoarder?.module_id?.patient?.name || '---',
        date: moment.tz(currentBoarder?.module_id?.date, 'Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss'),
        notes: currentBoarder?.module_id?.notes || '---',
        pay_id: currentBoarder?._id || '---',
        amount: currentBoarder?.amount || '---',
        description: currentBoarder?.description || '---',
      });
    }
  }, [currentBoarder]);

 
      

  if (!currentBoarder || Object.keys(currentBoarder).length === 0) {
    return (
         <div></div>
    );
  }   
   
     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));
     };
   
     const handleEditBoarder = async (e) => {
        
      e.preventDefault()
      if (!formData.start_date || !formData.end_date || !formData.amount) {
        toast.error('Check required fields.');
        return;
      }
  
      if (formData.patient_id === 'select') {
        toast.error('Select Patient Name fields.');
        return;
      }
  
      try {
        setShowLoader(true);
        console.log(formData)
        
        const response = await api.put(boardingUrl.edit_boarding.url, formData,{
          headers: {
            'Content-Type': 'application/json',
          },
          params:{id:currentId}

        });
  
        if (response.status === 201) {
          refreshBoarders();
          handleClose();
          setFormData({
            patient_id:'', 
            start_date:'', 
            end_date:'', 
            notes:'', 
            pay_id:'', 
            amount:'', 
            description:''
          })
        toast.success('Boarding Updated successfully!');
  
        } else {
          console.error('Failed to add Boarding');
        }
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setShowLoader(false);
      }
      
    };
   
     return (
      <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Edit Boarding</h3>
     
      <form onSubmit={ handleEditBoarder }>
      <div className='flex justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="start_date">Treatment Name</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Treatment Name...'
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Vet Name</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                name="vet"
                id="vet"
                value={formData.vet}
                onChange={handleInputChange}
              >
                  <option value="">Select Vet </option>
                  { users && (users.map((user, index)=>(
                      <option key={index} value={user._id}>{user?.name || '---'}</option>

                    )))
                  }
              </select>
          </div>
          
          <div className="w-full">
            <label htmlFor="patient">Patient Name</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                
                name="patient"
                id="patient"
                value={formData.patient}
                onChange={handleInputChange}
              >
                  <option value="">Select Patient </option>
                  { patients && (patients.map((patient, index)=>(
                      <option key={index} value={patient?._id}>{patient?.name}</option>

                    )))
                  }
              </select>
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="amount">Amount</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Amount...'
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="date">Treatment Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                type="date"
                name="date"
                id="date"
                max={maxDate}
                value={formData.date}
                onChange={handleInputChange}
              />
          </div>
          
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
          
          <div className="w-full">
            <label htmlFor="species">Boarding Notes</label>
              <textarea
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Boarding Notes...'
                type="text"
                name="notes"
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={handleInputChange}
              >
                  
              </textarea>
          </div>
          <div className="w-full">
            <label htmlFor="species">Amount Description</label>
              <textarea
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Amount Description...'
                type="text"
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              >
                  
              </textarea>
          </div>
          
        </div>
        <div className='flex justify-between items-center my-3'>
          <button type='button' onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Edit Boarder</button>
        </div>
      </form>
    </div>
     );
}

export default EditBoarder
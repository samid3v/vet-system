import React, { useEffect, useState } from 'react';
import { useApp } from '../../../../../hooks/useApp';
import api from '../../../../../helpers/axiosInstance';
import boardingUrl from '../../../../../urls/boarding';
import { toast } from 'react-toastify';
import trasactionUrl from '../../../../../urls/transaction';
import { useVaccine } from '../../../Hooks';

const AddDose = ({handleClose, id, refreshData}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { users, refreshInfo } = useVaccine()


  const [formData, setFormData] = useState({
    vaccine:'', 
    vet:'', 
    date:'', 
    administered:false,
  });

  useEffect(()=>{
    refreshInfo()
  },[])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addDoseFn = async (e) => {
        
    e.preventDefault()

    formData.payment_id = id
    

    if (!formData.amount_paid || !formData.payment_date || !formData.payment_id) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.payment_type === 'Mpesa') {
      if (!formData.mpesa_transaction_id) {
        formData.bank_name=""
        formData.bank_transaction_reference=""
        toast.error('Mpesa transaction number is required');
        return;        
      }
    }

    if (formData.payment_type === 'Cash') {
        formData.bank_name=""
        formData.mpesa_transaction_id=""
        formData.bank_transaction_reference=""
    }

    if (formData.payment_type === 'Bank') {
      if (!formData.bank_transaction_reference || !formData.bank_name) {
        formData.mpesa_transaction_id=""
        toast.error('Bank Details are required');
        return;        
      }
    }

    console.log(formData)
    try {
      setShowLoader(true);
      
      const response = await api.post(trasactionUrl.add_transaction.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshData();
        setFormData({
          vaccine:'', 
          vet:'', 
          date:'', 
          administered:false,
        })
      toast.success('Dose Record added successfully!');

      } else {
        console.error('Failed to add Dose Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
    
  };

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Dose</h3>
      <form onSubmit={ addDoseFn }>
        <div className='flex justify-start gap-5 items-center my-4 '>
          
          <div className="w-full">
            <label htmlFor="payment_date">Payment Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='payment date...'
                type="date"
                name="date"
                id="date"
                value={formData.payment_date}
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
            <label className="flex mt-5 ">
              <input
                type="checkbox"
                name="administered"
                id="administered"
                value={formData.administered}
                checked={formData.administered}
                onChange={handleInputChange}
                className="form-radio text-blue-500 focus:ring-0 focus:outline-none"
              />
              <span className="ml-2">Administered</span>
            </label>
          </div>
          
        </div>
        
        <div className='flex justify-between items-center my-3'>
          <button type='button' onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Dose</button>
        </div>
      </form>
    </div>
  );
};

export default AddDose;

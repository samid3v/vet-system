import React from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';

const AddPatient = () => {

  const {setModalOpen} = useApp()

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Patient</h3>
      <form>
        <div className='flex justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="name">Name</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='name...'
                type="text"
                name="name"
                id="name"
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Breed</label>
              <input
                className='w-full rounded-lg border py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='breed...'
                type="text"
                name="breed"
                id="breed"
              />
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="name">Age</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='name...'
                type="text"
                name="name"
                id="name"
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Species</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='species...'
                type="text"
                name="species"
                id="species"
              />
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="name">Weight</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='weight...'
                type="text"
                name="weight"
                id="weight"
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Owner</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='owner...'
                type="text"
                name="owner"
                id="owner"
              />
          </div>
        </div>
        <div className='flex justify-between items-center my-3'>
          <button onClick={()=> setModalOpen(false)} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button className='bg-primary py-2 px-3 rounded-lg'>Add Patient</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;

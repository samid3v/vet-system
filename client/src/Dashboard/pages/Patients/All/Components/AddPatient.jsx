import React from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';

const AddPatient = () => {
  return (
    <div className='bg-white w-[60%] p-3 overflow-x-hidden  shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Patient</h3>
      <form>
        <div className=' '>
          <div className="w-full">
            <label htmlFor="name">Name</label>
            <div className=''>
              <input
                className='w-full border py-1 px-1 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='name...'
                type="text"
                name="name"
                id="name"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="species">Species</label>
            <div className='w-full'>
              <input
                className='w-full border py-1 px-3 border-black outline-none focus:border-[1px] p-0'
                placeholder='species...'
                type="text"
                name="species"
                id="species"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;

import React from 'react';
import { useApp } from '../../../../hooks/useApp';
import { usePatients } from '../../Hooks/usePatients';

const ViewPatient = ({handleClose}) => {

  const { setModalOpen  } = useApp()
  const { customers, getAllPatients } = usePatients()


  return (
    <div className='bg-white w-full p-3 overflow-x-hidden relative rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Patient</h3>
      
    </div>
  );
};

export default ViewPatient;

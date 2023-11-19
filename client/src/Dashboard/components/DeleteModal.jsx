import React from 'react';
import { useApp } from '../hooks/useApp';


const DeleteModal = () => {

     
  const { showDeleteModal, setShowDeleteModal,setConfirmDelete } = useApp();
  
   console.log(showDeleteModal)
  return (
    <>
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center  justify-center">
          <div className="absolute bg-gray-800 opacity-50 inset-0"></div>

          <div className="z-30 w-[30%] bg-sky-50 p-4 rounded-lg ">
            <h3 className='text-xl font-semibold my-4'>Are You Want To Delete? </h3>
            <div className='flex justify-between items-center my-3'>
              <button onClick={()=> setShowDeleteModal(false)} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
              <button onClick={()=> setConfirmDelete(true)}  className='bg-primary py-2 px-3 rounded-lg'>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;

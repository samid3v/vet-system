import React, { useContext } from 'react';
import { useApp } from '../hooks/useApp';


const Modal = () => {
     
  const { isModalOpen, modalMessage, setModalOpen } = useApp();

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex  justify-center">
          <div className="absolute bg-gray-800 opacity-75 inset-0"></div>
          <div className="z-10 w-1/2 p-4 rounded-lg shadow-lg">
            {modalMessage}
            {/* <button className="absolute top-0 right-0 p-4" onClick={()=>setModalOpen(false)}>
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute bg-gray-800 opacity-75 inset-0"></div>
          <div className="z-10 w-1/2 p-4 bg-white rounded-lg shadow-lg">
            {children}
            <button className="absolute top-0 right-0 p-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

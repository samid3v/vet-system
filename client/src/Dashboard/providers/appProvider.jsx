import React, { useState } from 'react'
import appContext from '../context/appContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppProvider = ({children}) => {
     
     const [isModalOpen, setModalOpen] = useState(false);
     const [modalMessage, setModalMessage] = useState(null);
     const [confirmDelete, setConfirmDelete] = useState(false)
     const [showDeleteModal, setShowDeleteModal] = useState(true)


  return (
    <appContext.Provider value={{
     isModalOpen,
     setModalOpen,
     modalMessage,
     setModalMessage,
     setConfirmDelete,
     confirmDelete,
     showDeleteModal,
     setShowDeleteModal
    }}>
      <ToastContainer />
     {children}
    </appContext.Provider>
  )
}

export default AppProvider
import React, { useState } from 'react'
import appContext from '../context/appContext'

const AppProvider = ({children}) => {
     
     const [isModalOpen, setModalOpen] = useState(false);
     const [modalMessage, setModalMessage] = useState(null);

  return (
    <appContext.Provider value={{
     isModalOpen,
     setModalOpen,
     modalMessage,
     setModalMessage
    }}>
     {children}
    </appContext.Provider>
  )
}

export default AppProvider
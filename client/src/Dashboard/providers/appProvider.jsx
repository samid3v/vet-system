import React, { useState } from 'react'
import appContext from '../context/appContext'

const AppProvider = ({children}) => {
     
     const [isModalOpen, setModalOpen] = useState(false);

  return (
    <appContext.Provider value={{
     isModalOpen,
     setModalOpen
    }}>
     {children}
    </appContext.Provider>
  )
}

export default AppProvider
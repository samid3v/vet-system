import React from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

const Layout = ({children}) => {
  return (
    <div className='flex'>
     <div><Sidebar/></div>
     <div className='w-full mr-4'>
     <div>
      <Topbar/>
     </div>

          {children}
     </div>
    </div>
  )
}

export default Layout
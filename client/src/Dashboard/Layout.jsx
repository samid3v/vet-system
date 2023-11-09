import React from 'react'

const Layout = ({children}) => {
  return (
    <div>
     <div>sidebar</div>
     <div>topbar</div>
     <div>
          {children}
     </div>
    </div>
  )
}

export default Layout
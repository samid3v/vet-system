import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

const LargeDevice = () => {
  return (
     <div className='hidden md:block table-fixed'>

          <table className="w-full table-xs">
          <TableHeader/>
          <TableBody/>
     
          </table>
     </div>
  )
}

export default LargeDevice
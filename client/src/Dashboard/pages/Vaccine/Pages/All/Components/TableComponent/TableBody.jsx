import React from 'react'
import { useVaccine } from '../../../../Hooks'
import TRow from './TableRow'

const TBody = () => {

  const {vaccines } = useVaccine()

  if (vaccines.length==0) {
    return <td colSpan={7} className='text-center text-xl'>No Data</td>
  }

  return (
    <tbody>
    {vaccines.map((treatment, index) => (
      
      <TRow  key={treatment._id} treatment={treatment} index={index} />
    ))}
  </tbody>
  )
}

export default TBody
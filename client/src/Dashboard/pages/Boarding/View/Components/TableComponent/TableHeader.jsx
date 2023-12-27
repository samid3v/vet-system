import React from 'react'
import { useBoarding } from '../../../../Hooks'

const THeader = () => {
  const {bookingStatus} = useBoarding()
  return (
    <thead>
    <tr>
      <th className="p-3 border-b text-left">No</th>
      <th className="p-3 border-b text-left">Patient Name</th>
      <th className="p-3 border-b text-left">Owner Name</th>
      <th className="p-3 border-b text-left">Start Date</th>
      <th className="p-3 border-b text-left">Payment Date</th>
      <th className="p-3 border-b text-left">Payment Type</th>
      <th className="p-3 border-b text-center">Actions</th>
    </tr>
  </thead>
  )
}

export default THeader
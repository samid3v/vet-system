import React from 'react'
import Actions from '../Actions'

const TRow = ({boarder, index}) => {
  
  const humateDateFormat = (dateString) =>{
    const formattedDate = new Date(dateString).toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi', // Nairobi is the capital of Kenya
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });

    return formattedDate
  }

  return (
    
    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
        <td className="p-3 border-b">{index+1}</td>
        <td className="p-3 border-b">{boarder?.patient_id?.name}</td>
        <td className="p-3 border-b">{boarder?.patient_id?.owner?.name}</td>
        <td className="p-3 border-b">{humateDateFormat(boarder?.start_date)}</td>
        <td className="p-3 border-b">{humateDateFormat(boarder?.end_date)}</td>
        <td className="p-3 border-b">{boarder?.status || '---'}</td>
        <td className="p-3 border-b"><Actions doc={boarder}/></td>
      </tr>
  )
}

export default TRow
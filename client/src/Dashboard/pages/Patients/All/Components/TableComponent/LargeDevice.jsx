import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import { usePatients } from '../../../Hooks/usePatients'
import { DataGrid  } from '@mui/x-data-grid';

const LargeDevice = () => {

  const {patients} = usePatients()


     const columns = [
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'name', headerName: 'Name', width: 150 },
          { field: 'age', headerName: 'Age', width: 150 },
          { field: 'breed', headerName: 'Breed', width: 150 },
          { field: 'species', headerName: 'Species', width: 150 },
          // { field: 'name', headerName: 'Name', width: 150 },
        ];

        const getRowId = (row) => row.id; 

  return (
     <div className='w-full'>

        
      <DataGrid
        rows={patients}
        columns={columns}
        pageSize={2}
      />
     
     </div>
  )
}

export default LargeDevice
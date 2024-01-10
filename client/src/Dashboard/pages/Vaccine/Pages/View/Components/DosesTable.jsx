import React, { useState } from 'react'
import BasicModal from '../../../../../components/Modal';
import AddDose from './AddDose';

const DosesTable = ({ id, refreshData}) => {

     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
  return (
     <div class="overflow-x-auto">
               <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-40 bg-primary px-3 py-2'>Add Dose</button>
               <BasicModal open={open} element={<AddDose refreshData={refreshData} id={id} handleClose={handleClose}/>}/>

          <table class="min-w-full border border-gray-300 divide-y divide-gray-300">
               <thead>
               <tr>
                    <th class="py-2 px-4 bg-gray-200">Date</th>
                    <th class="py-2 px-4 bg-gray-200">Email</th>
                    <th class="py-2 px-4 bg-gray-200">Vet Administered</th>
                    <th class="py-2 px-4 bg-gray-200">status</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                    <td class="py-2 px-4">1</td>
                    <td class="py-2 px-4">John Doe</td>
                    <td class="py-2 px-4">John Doe</td>
                    <td class="py-2 px-4">john@example.com</td>
               </tr>
               <tr>
                    <td class="py-2 px-4">2</td>
                    <td class="py-2 px-4">John Doe</td>
                    <td class="py-2 px-4">Jane Doe</td>
                    <td class="py-2 px-4">jane@example.com</td>
               </tr>
               </tbody>
          </table>
     </div>
  )
}

export default DosesTable
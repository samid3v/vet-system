import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
     const [formData, setFormData] = useState({
          username:'',
          password:'',
     })

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        };

        const logInFn = (e) => {
               e.preventDefault()
               if (formData.username === '' || formData.password === '' ) {
                    toast.error('Check required fields')
                    return
               }
        }
  return (
     <div className='flex justify-center items-center h-screen'>
          <div className='w-[30%] bg-white p-4 rounded-lg shadow-2xl'>
               <form onSubmit={logInFn} className='flex flex-col gap-3'>
                    <div className="w-full">
                         <label htmlFor="payment_date">Username</label>
                         <input
                              className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                              placeholder='Username...'
                              type="text"
                              name="username"
                              id="username"
                              value={formData.username}
                              onChange={handleInputChange}
                         />
                    </div>
                    <div className="w-full">
                         <label htmlFor="payment_date">Password</label>
                         <input
                              className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                              placeholder='Password...'
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleInputChange}
                         />
                    </div>
                    <button type='submit' className='bg-primary w-full py-2 px-3 rounded-lg'>Login</button>
               </form>
          </div>
     </div>
  )
}

export default Login
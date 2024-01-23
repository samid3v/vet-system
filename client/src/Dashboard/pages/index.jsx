import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import Loader from '../components/Loader'
import { clearLocalStorage, decryptData } from '../../utils'
import { useApp } from '../hooks/useApp'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify'
import api from '../helpers/axiosInstance'

const Dashboard = () => {
  const decryptUser = decryptData('user')
  // const decryptToken = decryptData('token')
  const [tokenStatus, setTokenStatus] = useState(null)
  const {setUser} = useApp()

  const navigate = useNavigate()

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    
    async (error) => {

      if (error.response && error.response.status === 401) {
        setTokenStatus(error.response.status)
        clearLocalStorage('user');
      // navigate('/')
    }
      return Promise.reject(error);
    }
  );

  
  useEffect(()=>{
    if (decryptUser) {
      setUser(decryptUser)
      navigate('/dashboard')
    }else{
      toast.info('Token expired, login again');
      
      navigate('/')
    }
   
  },[])

  return (
    <Layout>
      <Loader/>
      <Outlet/>
    </Layout>
    
  )
}

export default Dashboard

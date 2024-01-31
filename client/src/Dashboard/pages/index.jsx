import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import Loader from '../components/Loader';
import { clearLocalStorage, decryptData } from '../../utils';
import { useApp } from '../hooks/useApp';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../helpers/axiosInstance';
import FilterModal from '../components/FilterModal';

const Dashboard = () => {
  const decryptUser = decryptData('user');
  const { setUser,user } = useApp();
  const navigate = useNavigate();

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        clearLocalStorage('user');
        setUser(null)
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    userUpdateFn()
  }, []);

  useEffect(()=>{
    if(user===null && !decryptData('user')){
      
        toast.info('Token expired, login again ddd');
        navigate('/');
    }else{
      navigate('/dashboard');
    }
  },[user])

  const userUpdateFn = () => {
    if (decryptUser) {
      setUser(decryptUser);
      navigate('/dashboard');
    } 
  }

  return (
    <Layout>
      <Loader />
      <Outlet />
    </Layout>
  );
};


export default Dashboard;

import React, { useEffect, useState } from 'react'
import PatientContext from '../context/PatientContext'
import axios from "axios"
import patientUrl from '../../../urls/patients';
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import Modal from '../../../components/Modal';
import DeleteModal from '../../../components/DeleteModal';

const PatientProvider = ({children}) => {
     const [patients, setPatients] = useState([]);
     const [customers, setCustomers] = useState([]);
     
  useEffect(()=>{
     getAllPatients(1,10)
     getAllCustomers()
  },[])
  

  const getAllPatients = async (page, pageSize) => {
    try {
      const response = await api.get(patientUrl.get_all.url, {
        params: { page, pageSize },
      });
  
      if (response.status === 200) {
        const { data, hasNextPage, hasPreviousPage } = response.data;
  
        const dataWithIds = data.map((item, index) => ({
          ...item,
          id: index + 1, // Incremental numerical ID starting from 1
        }));
  
        setPatients(dataWithIds);
  
        console.log('Fetched patients:', dataWithIds);
        console.log('Has next page:', hasNextPage);
        console.log('Has previous page:', hasPreviousPage);
      } else {
        console.error('Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error.message);
  
      if (error.response && error.response.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server error message:', error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request');
      }
    }
  };
  
  

  const getAllCustomers = async () =>{
     
    await api.get(customersUrl.get_all.url).then((response) => {
      if (response.status !== 200) {
        throw new Error('Failed to fetch patients');
      }
      return response.data;
    })
    .then((data) => {
      console.log(data)
      setCustomers(data);
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up the request');
      }
    });

  //  console.log(res)
    
}
  return (
    <PatientContext.Provider value={{
     patients,
     setPatients,
     getAllPatients,
     customers,
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider
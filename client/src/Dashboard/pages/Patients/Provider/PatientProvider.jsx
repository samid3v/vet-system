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
     getAllPatients()
     getAllCustomers()
  },[])
  

  const getAllPatients = async () =>{
     
      await api.get(patientUrl.get_all.url).then((response) => {
        if (response.status !== 200) {
          throw new Error('Failed to fetch patients');
        }
        return response.data;
      })
      .then((data) => {
        console.log(data)
        setPatients(data);
      })
      .catch((error) => {
        console.error(error);
      });

    //  console.log(res)
      
  }

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
      console.error(error);
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
      <Modal/>
      <DeleteModal/>

          {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider
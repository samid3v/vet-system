import React, { useEffect, useState } from 'react'
import PatientContext from '../context/PatientContext'
import axios from "axios"
import patientUrl from '../../../urls/patients';
import api from '../../../helpers/axiosInstance';

const PatientProvider = ({children}) => {
     const [patients, setPatients] = useState([]);

  useEffect(()=>{
     getAllPatients()
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
  return (
    <PatientContext.Provider value={{
     patients,
     setPatients,
     getAllPatients
    }}>
          {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider
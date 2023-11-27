import React, { useEffect, useState } from 'react'
import PatientContext from '../context/PatientContext'
import patientUrl from '../../../urls/patients';
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import Fuse from 'fuse.js'


const PatientProvider = ({children}) => {
     const [patients, setPatients] = useState([]);
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [totalPages, setTotalPages] = useState(0)
     const [currentPatient, setCurrentPatient] = useState([])
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setShowLoader } = useApp();


     
  

     useEffect(()=>{
      if (searchTerm.trim() === '' && searchTerm.length<3) {
        getAllPatients(currentPage,10)
      }

   },[])

   useEffect(()=>{
    getAllPatients(currentPage,10)
 },[currentPage])

   useEffect(()=>{
     if (currentId!==0) {
      getSinglePatient()
     }
   },[currentId])

   useEffect(()=>{
    if (searchTerm.length>2) {
      getAllPatients()
    }
   },[searchTerm])
  

  const getAllPatients = async (page, pageSize) => {
    try {
      setShowLoader(true)
      const response = await api.get(patientUrl.get_all.url, {
        params: { page, pageSize },
      });
  
      if (response.status === 200) {
        const { data, hasNextPage, hasPreviousPage, totalPages } = response.data;
  
        const dataWithIds = data.map((item, index) => ({
          ...item,
          id: index + 1, // Incremental numerical ID starting from 1
        }));
  
        setPatients(dataWithIds);
        console.log(dataWithIds)
        setTotalPages(totalPages)
        updateSearchResults(dataWithIds)
      } else {
        console.error('Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error.message);
       
    } finally {
      setShowLoader(false);
    }
  };

  const getSinglePatient = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(patientUrl.get_single_patient.url, {
          params: { id: currentId },
        });
  
        if (response.status === 200) {
          setCurrentPatient(response.data);
        } else {
          toast.error('Failed to fetch patient');
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };
  
  const updateSearchResults = (data) => {
    // console.log(searchTerm)
    const fuse = new Fuse(data, {
      keys: ['name' ],
      includeMatches: true,
      includeScore:true,
    });

    if (searchTerm.trim() === '' && searchTerm.length<3) {
      setPatients(data);
    } else {
      const results = fuse.search(searchTerm);
      console.log(searchTerm)
      console.log(results)
      setPatients(results.map((result) => result.item));
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
      console.log(error)
    });

    
 
}
  return (
    <PatientContext.Provider value={{
     patients,
     setPatients,
     getAllPatients,
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     currentPatient, 
     setCurrentPatient,
     currentId, 
     setCurrentId,
     getAllCustomers,
     customers,
     searchTerm, 
     setSearchTerm
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider
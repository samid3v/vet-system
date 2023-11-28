import React, { useEffect, useState } from 'react'
import patientUrl from '../../../urls/patients';
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import OwnersContext from '../context';


const OwnerProvider = ({children}) => {
     const [patients, setPatients] = useState([]);
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [totalPages, setTotalPages] = useState(0)
     const [currentPatient, setCurrentPatient] = useState([])
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setShowLoader } = useApp();


     
  

     useEffect(()=>{
        getAllPatients(currentPage,10)

   },[])

   useEffect(()=>{
    if (searchTerm.length<3) {
      
      getAllPatients(currentPage,10)
    }

},[searchTerm])

   useEffect(()=>{
    getAllPatients(currentPage,10)
 },[currentPage])

   useEffect(()=>{
     if (currentId!==0) {
      getSinglePatient()
     }
   },[currentId])

   useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length>2) {
        updateSearchResults()
      }
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
    
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
  
  const updateSearchResults = async () => {
    
    try {
      setShowLoader(true);

      const response = await api.get(patientUrl.search_patient.url, {
        params: { value:searchTerm },
      });
      // console.log(searchTerm)
      if (response.status === 200) {
        setPatients(response.data);
      } else {
        toast.error('Failed to fetch patient');
      }
      
    }  catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
      setTotalPages(0)

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
    <OwnersContext.Provider value={{
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
     setSearchTerm,
     updateSearchResults
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </OwnersContext.Provider>
  )
}

export default OwnerProvider
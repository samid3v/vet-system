import React, { useEffect, useState } from 'react'
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import BoardingContext from '../context';
import boardingUrl from '../../../urls/boarding';
import TreatmentContext from '../context';
import treatmentUrl from '../../../urls/treatment';


const TreatmentProvider = ({children}) => {
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [statusId, setStatusId] = useState(null)
     const [totalPages, setTotalPages] = useState(0)
      const [treaments, setTreatments] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const { setShowLoader } = useApp();
      const [currentBoarder, setCurrentBoarder] =useState([])

 

useEffect(()=>{
      getAllTreatments(currentPage,10)
   },[])

   useEffect(()=>{
    if (searchTerm.length<3) {
      
      getAllTreatments(currentPage,10)
    }

},[searchTerm])

   useEffect(()=>{
    getAllTreatments(currentPage,10)
 },[currentPage])

 
   useEffect(()=>{
     if (currentId!==0) {
      getSingleBoarding()
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
  

 
  const getSingleBoarding = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(boardingUrl.get_single_boarder.url, {
          params: { id: currentId },
        });
  
        if (response.status === 200) {
          console.log(response)
          setCurrentBoarder(response.data);
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

  const refreshTreatments = () => {
    getAllTreatments(currentPage,10)
  }
  
  const updateSearchResults = async () => {
    
    // try {
    //   setShowLoader(true);

    //   const response = await api.get(customersUrl.search_customer.url, {
    //     params: { value:searchTerm },
    //   });
    //   // console.log(searchTerm)
    //   if (response.status === 200) {
    //     setCustomers(response.data);
    //   } else {
    //     toast.error('Failed to fetch customer');
    //   }
      
    // }  catch (error) {
    //   toast.error(error.message);
    // } finally {
    //   setShowLoader(false);
    //   setTotalPages(0)

    // }
    

    
  };

   

  const getAllTreatments = async (page, pageSize) =>{
     try{
      setShowLoader(true);

    const response = await api.get(treatmentUrl.get_all.url, {
      params: { 
        page, 
        pageSize,
      }
    })
    if (response.status === 200) {
      const { data, totalPages } = response.data;

     

      setTreatments(data);
      console.log(data)
      setTotalPages(totalPages)
    } else {
      console.error('Failed to fetch patients');
    }
    
    }catch(error){
        console.log(error)
    }finally {
      setShowLoader(false);

    };

    
 
}


  return (
    <TreatmentContext.Provider value={{
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     patients,
     currentId, 
     setCurrentId,
     treaments, 
     searchTerm, 
     setSearchTerm,
     updateSearchResults,
     refreshTreatments,
     currentBoarder, 
     setCurrentBoarder,
     statusId, 
     setStatusId
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </TreatmentContext.Provider>
  )
}

export default TreatmentProvider
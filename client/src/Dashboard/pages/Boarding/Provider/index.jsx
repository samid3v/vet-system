import React, { useEffect, useState } from 'react'
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import BoardingContext from '../context';
import boardingUrl from '../../../urls/boarding';


const BoardingProvider = ({children}) => {
     const [patients, setPatients] = useState([]);
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [totalPages, setTotalPages] = useState(0)
     const [currentCustomer, setCurrentCustomer] = useState([])
      const [boarders, setBoarders] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [stats, setStats] = useState([])
      const { setShowLoader } = useApp();

      const [bookingStatus, setBookingStatus] = useState('In Progress')
 

useEffect(()=>{
      getAllBoarders(currentPage,10)
      getBoardingStats()
   },[])

   useEffect(()=>{
    if (searchTerm.length<3) {
      
      getAllBoarders(currentPage,10)
    }

},[searchTerm])

   useEffect(()=>{
    getAllBoarders(currentPage,10)
 },[currentPage])

 useEffect(()=>{
  getAllBoarders(currentPage,10)
},[bookingStatus])

   useEffect(()=>{
     if (currentId!==0) {
      getSingleCustomer()
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
  

 
  const getSingleCustomer = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(customersUrl.get_single_customer.url, {
          params: { id: currentId },
        });
  
        if (response.status === 200) {
          console.log(response)
          setCurrentCustomer(response.data);
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

  const refreshBoarders = () => {
    getAllBoarders(currentPage,10)
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
  

  const getAllBoarders = async (page, pageSize) =>{
     try{
      setShowLoader(true);

    const response = await api.get(boardingUrl.get_all.url, {
      params: { 
        page, 
        pageSize,
        status:bookingStatus  
      }
    })
    if (response.status === 200) {
      const { data, totalPages } = response.data;

     

      setBoarders(data);
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

const refreshStats =()=>{
  getBoardingStats()
}

const getBoardingStats = async (page, pageSize) =>{
     try{

    const response = await api.get(boardingUrl.get_stats.url)
    if (response.status === 200) {
      // const { data, totalPages } = response.data;

     
      setStats(response.data)
      console.log(response.data)
    } else {
      console.error('Failed to fetch patients');
    }
    
    }catch(error){
        console.log(error)
    }

    
 
}
  return (
    <BoardingContext.Provider value={{
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     currentCustomer, 
     setCurrentCustomer,
     currentId, 
     setCurrentId,
     boarders, 
     searchTerm, 
     setSearchTerm,
     updateSearchResults,
     refreshBoarders,
     bookingStatus, 
     setBookingStatus,
     stats, 
     setStats,
     refreshStats
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </BoardingContext.Provider>
  )
}

export default BoardingProvider
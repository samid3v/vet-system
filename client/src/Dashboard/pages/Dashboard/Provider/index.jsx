import React, { useEffect, useState } from 'react'
import DashContext from '../Context'
import { toast } from 'react-toastify';
import api from '../../../helpers/axiosInstance';
import analytics from '../../../urls/analytics';

const DashProvider = ({children}) => {

     const [stats, setStats] = useState([])

     useEffect(()=>{
          getStats()
     },[])

     const getStats = async () => {
          try {
      
            
              const response = await api.get(analytics.module_stats.url);
        
              if (response.status === 200) {
                console.log(response.data)
                setStats(response.data);
              } else {
                toast.error('Failed to fetch patient');
              }
            
          } catch (error) {
            toast.error(error.message);
          }
        };
  return (
    <DashContext.Provider value={{
          stats
    }}>
     {children}
    </DashContext.Provider>
  )
}

export default DashProvider
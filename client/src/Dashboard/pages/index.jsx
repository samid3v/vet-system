import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import Loader from '../components/Loader'
import { decryptData } from '../../utils'
import { useApp } from '../hooks/useApp'

const Dashboard = () => {
  const decryptUser = decryptData('user')
  const decryptToken = decryptData('token')
  const {setUser, setToken} = useApp()

  const navigate = useNavigate()



  useEffect(()=>{
    if (decryptUser && decryptToken) {
      setUser(decryptUser)
      setToken(decryptToken)
    }else{
      navigate('/')
    }
  },[])
  console.log('decrypt',decryptUser)
  return (
    <Layout>
      <Loader/>
      <Outlet/>
    </Layout>
    
  )
}

export default Dashboard

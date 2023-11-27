import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../Layout'
import Loader from '../components/Loader'

const Dashboard = () => {
  return (
    <Layout>
      <Loader/>
      <Outlet/>
    </Layout>
    
  )
}

export default Dashboard

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dash from './pages/Dashboard'
import Patients from './pages/Patients'
import AllPatients from './pages/Patients/All'

function App() {

  return (
    <BrowserRouter basename='/dashboard'>
      <Routes>
        <Route index element={<Dash/>}/>
        <Route path='/patients' element={<Patients/>}>
          <Route index element={<AllPatients/>}/>
        </Route>
      </Routes>    
    </BrowserRouter>
  )
}

export default App

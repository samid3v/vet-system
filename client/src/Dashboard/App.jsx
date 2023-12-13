import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dash from './pages/Dashboard'
import Patients from './pages/Patients'
import AllPatients from './pages/Patients/All'
import AppProvider from './providers/appProvider'
import Dashboard from './pages'
import Owners from './pages/owner'
import AllOwners from './pages/owner/All'
import AllBoarders from './pages/Boarding/All'
import Boarding from './pages/Boarding'

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route index element={<Dash/>}/>
            <Route path='patients' element={<Patients/>}>
              <Route index element={<AllPatients/>}/>
            </Route>
            <Route path='owners' element={<Owners/>}>
              <Route index element={<AllOwners/>}/>
            </Route>
            <Route path='boarding' element={<Boarding/>} >
              <Route index element={<AllBoarders/>}/>
            </Route>
          </Route>
        </Routes>    
      </BrowserRouter>
    </AppProvider>
  )
}

export default App

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
import ViewBoarding from './pages/Boarding/View'
import Treatment from './pages/Treatment'
import AllTreatment from './pages/Treatment/All'
import ViewTreatment from './pages/Treatment/View'
import Clinic from './pages/Clinic'
import AllClinics from './pages/Clinic/All'

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='dashboard' element={<Dashboard/>}>
            <Route index element={<Dash/>} />
            <Route path='patients' element={<Patients/>}>
              <Route index element={<AllPatients/>} />
            </Route>
            <Route path='owners' element={<Owners/>}>
              <Route index element={<AllOwners/>} />
            </Route>
            <Route path='boarding' element={<Boarding/>} >
              <Route index element={<AllBoarders/>} />
              <Route path=':id/view' element={<ViewBoarding/>} />
            </Route>
            <Route path='treatment' element={<Treatment/>} >
              <Route index element={<AllTreatment/>} />
              <Route path=':id/view' element={<ViewTreatment/>} />
            </Route>
            <Route path='clinic' element={<Clinic/>} >
              <Route index element={<AllClinics/>} />
              {/* <Route path=':id/view' element={<ViewTreatment/>} /> */}
            </Route>
          </Route>
        </Routes>    
      </BrowserRouter>
    </AppProvider>
  )
}

export default App

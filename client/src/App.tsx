
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/auth/Login'
import PrivateRoute from "./routes/PrivateRoute"
import Dashboard from "./pages/dashboard/Dashboard"
import NotFound from './components/main/NotFound'
import DriversPage from "./pages/ressources/drivers/DriversPage"
import TrucksPage from "./pages/ressources/trucks/TrucksPage"
function App() {
  

  return (
    <main className='w-screen h-screen'>
        <Routes>
      <Route path="/login" element={<Login />} />
       
       <Route element={<PrivateRoute allowedRoles={["standard","supervisor", "admin"]} />}>
           <Route path="/" element={<Dashboard />} />
       </Route>
        <Route element={<PrivateRoute allowedRoles={[ "admin"]} />}>
           <Route path="/drivers" element={<DriversPage />} />
           <Route path="/trucks" element={<TrucksPage />} />
       </Route>
       <Route path="*" element={<NotFound />} />

    </Routes>
    </main>
  )
}

export default App

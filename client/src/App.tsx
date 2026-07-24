
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/auth/Login'
import PrivateRoute from "./routes/PrivateRoute"
import Dashboard from "./pages/dashboard/Dashboard"
import NotFound from './components/main/NotFound'
function App() {
  

  return (
    <main className='w-screen h-screen'>
        <Routes>
      <Route path="/login" element={<Login />} />
       
       <Route element={<PrivateRoute allowedRoles={["standard","supervisor", "admin"]} />}>
           <Route path="/" element={<Dashboard />} />
       </Route>
       <Route path="*" element={<NotFound />} />

    </Routes>
    </main>
  )
}

export default App

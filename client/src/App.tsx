
import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'

function App() {
  

  return (
    <main className='w-screen h-screen'>
        <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
    </main>
  )
}

export default App

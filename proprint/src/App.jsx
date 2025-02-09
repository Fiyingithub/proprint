import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLogin from './components/Admin/AdminLogin'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/adminlogin" element={<AdminLogin />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
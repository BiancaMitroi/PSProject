import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Employee from './pages/employee/Employee';
import Admin from './pages/admin/Admin';

ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="employee" element={ <Employee /> } />
        <Route path="admin" element={ <Admin /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

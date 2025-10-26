import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { setToken } from './api'
import App from './App'
import { UserProvider } from './context/UserContext'
import './index.css'

const token = localStorage.getItem('token')
if (token) setToken(token)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)

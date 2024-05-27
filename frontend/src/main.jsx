import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Route from './routes/Route.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <Route />
    </AuthContextProvider>
    
  </React.StrictMode>,
)

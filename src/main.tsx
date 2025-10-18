import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/style.css'
import { HelmetProvider } from 'react-helmet-async'
// import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
       {/* <AuthProvider> */}
      <App />
       {/* </AuthProvider> */}
      
    </HelmetProvider>
  </React.StrictMode>,
)

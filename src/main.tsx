// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css'
// import './styles/style.css'
// import { HelmetProvider } from 'react-helmet-async'

// import { AuthProvider } from './context/AuthContext';
// const token = localStorage.getItem("token");
// console.log('tt',token);
// if (!token) {
//   window.location.href = "/login";
// }

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <HelmetProvider>
//        {/* <AuthProvider> */}
//       <App />
       {/* </AuthProvider> */}
      
//     </HelmetProvider>
//   </React.StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/style.css'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1065048598618-0hklu2itrpge6o5bp4nfj855cc8qh3g3.apps.googleusercontent.com">
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
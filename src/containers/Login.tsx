// src/containers/Login.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import LoginSection from '../components/LoginSection';
import Footer from '../components/AppFooter/Footer';

const Login: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="main-wrapper wrapper-login">
        <NavTop />
        <main className="mainContent">
          <LoginSection />
        </main>
        <Footer />
    </div>
  );
};

export default Login;

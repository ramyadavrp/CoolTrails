// src/containers/Home.tsx
import React from 'react';
import NavTop from '../../components/AppHeader/NavTop';
import Footer from '../../components/AppFooter/Footer';
import ResetForm from './ResetForm';

const Reset: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    
    <div className="main-wrapper wrapper-login">
        <NavTop />
        <main className="mainContent">
            <ResetForm/>
        </main>
        <Footer />
    </div>
  );
};

export default Reset;

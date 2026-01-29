// src/containers/Home.tsx
import React from 'react';
import NavTop from '../../components/AppHeader/NavTop';
import Footer from '../../components/AppFooter/Footer';
import ResetForm from './ResetForm';
import SeoMeta from '../SeoMeta';

const Reset: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <SeoMeta page="reset-password" pagetitle="Cooltrails | Reset Password"/>
      <div className="main-wrapper wrapper-login">
          <NavTop />
          <main className="mainContent">
              <ResetForm/>
          </main>
          <Footer />
      </div>
    </>
    
  );
};

export default Reset;

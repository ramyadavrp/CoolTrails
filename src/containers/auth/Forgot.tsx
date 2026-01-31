// src/containers/Home.tsx
import React from 'react';
import NavTop from '../../components/AppHeader/NavTop';
import Banner from '../../components/AppHeader/Banner';
import LocalFavorites from '../../components/LocalFavorites';
import HomeTrails from '../../components/HomeTrails';
import AppPromotion from '../../components/AppPromotion';
import Footer from '../../components/AppFooter/Footer';
import ForgotForm from './ForgotForm';
import SeoMeta from '../SeoMeta';

const Forgot: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <>
      <SeoMeta page="forget-password" pagetitle="Cooltrails | Forget Password"/>
      <div className="main-wrapper wrapper-login">
        <NavTop />
        <main className="mainContent">
            <ForgotForm/>
        </main>
        <Footer />
      </div>
    </>
    
  );
};

export default Forgot;

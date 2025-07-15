// src/containers/Home.tsx
import React from 'react';
import NavTop from '../../components/AppHeader/NavTop';
import Banner from '../../components/AppHeader/Banner';
import LocalFavorites from '../../components/LocalFavorites';
import HomeTrails from '../../components/HomeTrails';
import AppPromotion from '../../components/AppPromotion';
import Footer from '../../components/AppFooter/Footer';

import LoginForm from './LoginForm';

const About: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    
    <div className="main-wrapper wrapper-login">
        <NavTop />
        <main className="mainContent">
          <LoginForm />
        </main>
        <Footer />
    </div>
  );
};

export default About;

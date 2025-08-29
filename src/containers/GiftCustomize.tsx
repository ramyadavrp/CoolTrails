
// src/containers/Home.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Banner from '../components/AppHeader/Banner';
import LocalFavorites from '../components/LocalFavorites';
import HomeTrails from '../components/HomeTrails';
import AppPromotion from '../components/AppPromotion';
import ReviewSection from '../components/ReviewSection';
import AdventureSection from '../components/AdventureSection';
import GiftSection from '../components/GiftSection';
import ShareAdventure from '../components/ShareAdventure';
import AdventureAnywhere from '../components/AdventureAnywhere';
import Footer from '../components/AppFooter/Footer';

const GiftCustomize: React.FC = () => {
    window.scrollTo(0,0);
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to GiftCustomize  Container</h1>
      <NavTop />
     <h1 style={{textAlign:'center'}}>Welcome to GiftCustomize  Container</h1>
      <Footer />
    </div>
  );
};

export default GiftCustomize;

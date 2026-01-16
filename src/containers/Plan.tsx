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
import PlanSection from '../components/PlanSection';

const Plan: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <NavTop />
     
     <PlanSection/>
      <Footer />
      {/* CTA */}
      

      {/* Gift Section */}
     

      {/* Share Adventure */}
      

      {/* Adventure Anywhere */}

      {/* Footer */}
    </div>
  );
};

export default Plan;

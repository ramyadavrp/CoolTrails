// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import NationalParkGuideSection from '../components/NationalParkGuideSection';

const NationalParkGuide: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <NationalParkGuideSection />
      <Footer />
      
    </div>
  );
};

export default NationalParkGuide;

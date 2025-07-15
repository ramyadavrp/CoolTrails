// src/containers/FrameTrail.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import GiftPageSection from '../components/GiftPageSection';

const GiftPage: React.FC = () => {
  
  return (
    <div>
      <NavTop />
      <GiftPageSection />
      <Footer />
      
    </div>
  );
};

export default GiftPage;

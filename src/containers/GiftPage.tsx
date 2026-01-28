// src/containers/FrameTrail.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import GiftPageSection from '../components/GiftPageSection';
import SeoMeta from './SeoMeta';

const GiftPage: React.FC = () => {
  
  return (
    <>
      <SeoMeta page="gift-page" pagetitle="Cooltrails | Gift"/>
      <div>
        <NavTop />
        <GiftPageSection />
        <Footer />
        
      </div>
    </>
    
  );
};

export default GiftPage;

// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import NationalParkGuideSection from '../components/NationalParkGuideSection';
import SeoMeta from './SeoMeta';

const NationalParkGuide: React.FC = () => {
  
  return (
    <>
    {/* <SeoMeta page="home" pagetitle="Cooltrails | Home"/> */}
      <SeoMeta page="national-park-guide" pagetitle="Cooltrails | National Park Guides"/>
      <div className="main-wrapper wrapper-national-park">
        <NavTop />
        <NationalParkGuideSection />
        <Footer />
        
      </div>
    </>
   
  );
};

export default NationalParkGuide;

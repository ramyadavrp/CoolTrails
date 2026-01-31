// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import AffiliateTrail from '../components/AffiliateTrail';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';

const Affiliate: React.FC = () => {
  
  return (
    <>
      <SeoMeta page="affiliates" pagetitle="Cooltrails | affiliates"/>
      <div className="main-wrapper wrapper-affiliates">
        <NavTop />
        <AffiliateTrail />
        <Footer />
        
      </div>  
    </>
    
  );
};

export default Affiliate;

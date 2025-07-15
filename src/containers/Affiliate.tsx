// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import AffiliateTrail from '../components/AffiliateTrail';
import Footer from '../components/AppFooter/Footer';

const Affiliate: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-affiliates">
      <NavTop />
      <AffiliateTrail />
      <Footer />
      
    </div>
  );
};

export default Affiliate;

// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import AffiliateDetailTrail from '../components/AffiliateDetailTrail';
import Footer from '../components/AppFooter/Footer';

const AffiliateDetails: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-trail-details">
      <NavTop />
      <AffiliateDetailTrail />
      <Footer />
      
    </div>
  );
};

export default AffiliateDetails;

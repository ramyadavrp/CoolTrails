// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import GiftMembershipSection from '../components/GiftMembershipSection';

const GiftMembership: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-gift">
      <NavTop />
      <GiftMembershipSection />
      <Footer />
      
    </div>
  );
};

export default GiftMembership;

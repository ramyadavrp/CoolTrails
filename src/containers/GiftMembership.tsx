// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import GiftMembershipSection from '../components/GiftMembershipSection';
import SeoMeta from './SeoMeta';

const GiftMembership: React.FC = () => {
  
  return (
    <>
      <SeoMeta page="gift-membership" pagetitle="Cooltrails | Gift Membership"/>
      <div className="main-wrapper wrapper-gift">
        <NavTop />
        <GiftMembershipSection />
        <Footer />
        
      </div>
    </>
    
  );
};

export default GiftMembership;

// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import BlockedUserSection from '../components/blockedUserSection';

const BlockedUser: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <BlockedUserSection />
      <Footer />
      
    </div>
  );
};

export default BlockedUser;

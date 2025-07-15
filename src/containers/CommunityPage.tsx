// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/AppFooter/Footer';

const CommunityPage: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-community">
      <NavTop />
      <CommunitySection />
      <Footer />
      
    </div>
  );
};

export default CommunityPage;

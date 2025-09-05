// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import CommunitySectionCmtDetails from '../components/CommunitySectionCmtDetails';

const CommunityPageCmtDetails: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-community">
      <NavTop />
      <CommunitySectionCmtDetails></CommunitySectionCmtDetails>
      <Footer />
      
    </div>
  );
};

export default CommunityPageCmtDetails;

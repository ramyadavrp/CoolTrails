// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import CompleteSection from '../components/CompleteSection';

const Complete: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <CompleteSection />
      <Footer />
      
    </div>
  );
};

export default Complete;

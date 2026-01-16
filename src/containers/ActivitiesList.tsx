// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import ActivitiesListSection from '../components/ActivitiesListSection';

const ActivitiesList: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <ActivitiesListSection />
      <Footer />
      
    </div>
  );
};

export default ActivitiesList;

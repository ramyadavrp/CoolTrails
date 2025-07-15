// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import ExploreTrailSection from '../components/ExploreTrailSection';
import Footer from '../components/AppFooter/Footer';

const ExploreTrail: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-explore-trail">
      <NavTop />
      <ExploreTrailSection />
      <Footer />
      
    </div>
  );
};

export default ExploreTrail;

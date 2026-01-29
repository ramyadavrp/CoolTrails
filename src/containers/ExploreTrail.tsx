// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import ExploreTrailSection from '../components/ExploreTrailSection';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';

const ExploreTrail: React.FC = () => {
  
  return (
    <>
      <SeoMeta page="explore" pagetitle="Cooltrails | Explore"/>
      <div className="main-wrapper wrapper-explore-trail">
        <NavTop />
        <ExploreTrailSection />
        <Footer />
        
      </div>
    </>
    
  );
};

export default ExploreTrail;

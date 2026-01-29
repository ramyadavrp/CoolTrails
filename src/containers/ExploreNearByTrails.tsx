// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import ExploreNearByTrailsSection from '../components/ExploreNearByTrailsSection';
import SeoMeta from './SeoMeta';

const ExploreNearByTrails: React.FC = () => {
  
  return (
    <>
      <SeoMeta page="explore" pagetitle="Cooltrails | Explore"/>
      <div className="main-wrapper wrapper-explore-trail">
        <NavTop />
        <ExploreNearByTrailsSection/>
        <Footer />
      </div>
    </>
    
  );
};

export default ExploreNearByTrails;

// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import CreateMapSection from '../components/maps/CreateMapSection';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';

const CreateMap: React.FC = () => {
  
  return (
    <>
      <SeoMeta page="create-map" pagetitle="Cooltrails | Explore"/>
      <div>
        <NavTop />
        <CreateMapSection />
        <Footer />
        
      </div>
    </>
    
  );
};

export default CreateMap;

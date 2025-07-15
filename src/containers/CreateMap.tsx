// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import CreateMapSection from '../components/maps/CreateMapSection';
import Footer from '../components/AppFooter/Footer';

const CreateMap: React.FC = () => {
  
  return (
    <div>
      <NavTop />
      <CreateMapSection />
      <Footer />
      
    </div>
  );
};

export default CreateMap;

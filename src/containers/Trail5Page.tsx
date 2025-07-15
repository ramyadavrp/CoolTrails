// src/containers/FrameTrail.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import Trail5PageSection from '../components/Trail5PageSection';

const Trail5Page: React.FC = () => {
  
  return (
    <div>
      <NavTop />
      <Trail5PageSection />
      <Footer />
      
    </div>
  );
};

export default Trail5Page;

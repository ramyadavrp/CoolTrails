// src/containers/FrameTrail.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import FrameTrailSection from '../components/FrameTrailSection';

const FrameTrail: React.FC = () => {
  
  return (
    <div>
      <NavTop />
      <FrameTrailSection />
      <Footer />
      
    </div>
  );
};

export default FrameTrail;

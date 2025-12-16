// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import ReviewListSection from '../components/ReviewListSection';

const Review: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <ReviewListSection/>
      <Footer />
      
    </div>
  );
};

export default Review;

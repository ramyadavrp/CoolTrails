// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import CommentOnFeedSection from '../components/CommentOnFeedSection';

const CommentOnFeed: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
       <CommentOnFeedSection/>
      <Footer />
     
    </div>
  );
};

export default CommentOnFeed;

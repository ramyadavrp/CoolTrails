// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import BlockedCommentSection from '../components/BlockedCommentSection';

const BlockedComment: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <BlockedCommentSection />
      <Footer />
      
    </div>
  );
};

export default BlockedComment;

// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import ReportAnIssueCommentSection from '../components/ReportAnIssueCommentSection';

const ReportAnIssueComment: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <ReportAnIssueCommentSection/>
      <Footer />
      
    </div>
  );
};

export default ReportAnIssueComment;

// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import ReportAnIssueSection from '../components/ReportAnIssueSection';

const ReportAnIssue: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <ReportAnIssueSection/>
      <Footer />
      
    </div>
  );
};

export default ReportAnIssue;

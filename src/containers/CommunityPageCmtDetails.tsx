// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import CommunitySectionCmtDetails from '../components/CommunitySectionCmtDetails';
import { useParams } from 'react-router-dom';
import SeoMeta from './SeoMeta';
interface SeoMetaProps {
  page: string;
  pagetitle: string;
}
const CommunityPageCmtDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
    // alert(slug);
  return (
    <>
      <SeoMeta  page={ slug ?? '' } pagetitle="Cooltrails | community Details"/>
      <div className="main-wrapper wrapper-community">
        <NavTop />
        <CommunitySectionCmtDetails></CommunitySectionCmtDetails>
        <Footer />
    </div>
    </>
    
  );
};

export default CommunityPageCmtDetails;

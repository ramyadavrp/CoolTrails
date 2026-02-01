// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import CommunitySection from '../components/CommunitySection';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';
import { useParams } from 'react-router-dom';
interface SeoMetaProps {
  page: string;
  pagetitle: string;
}
const CommunityPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const pageTitle = slug
  ? slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  : 'Trail';
  // alert(slug);
  return (
    <>
      <SeoMeta  page={ slug ?? '' } pagetitle={`Cooltrails | ${pageTitle}`}/>
      <div className="main-wrapper wrapper-community">
        <NavTop />
        <CommunitySection />
        <Footer />
      
      </div>
    </>
    
  );
};

export default CommunityPage;

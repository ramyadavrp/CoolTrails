// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import ExploreNearByTrailsSection from '../components/ExploreNearByTrailsSection';
import SeoMeta from './SeoMeta';
import { useParams } from 'react-router-dom';
interface SeoMetaProps {
  page: string;
  pagetitle: string;
}
const ExploreNearByTrails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // alert(slug);
  return (
    <>
      <SeoMeta page={ slug ?? '' } pagetitle="Cooltrails | Explore" />
      <div className="main-wrapper wrapper-explore-trail">
        <NavTop />
        <ExploreNearByTrailsSection/>
        <Footer />
      </div>
    </>
    
  );
};

export default ExploreNearByTrails;

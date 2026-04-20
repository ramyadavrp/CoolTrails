// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import ExploreTrailSection from '../components/ExploreTrailSection';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';
import { useParams } from 'react-router-dom';
interface SeoMetaProps {
  page: string;
  pagetitle: string;
}
const ExploreTrail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <>
     <SeoMeta page={ slug ?? '' } pagetitle="Cooltrails | Explore" />
      {/* <SeoMeta page="explore" pagetitle="Cooltrails | Explore"/> */}
      <div className="main-wrapper wrapper-explore-trail">
        <NavTop />
        <ExploreTrailSection />
        <Footer />
        
      </div>
    </>
    
  );
};

export default ExploreTrail;

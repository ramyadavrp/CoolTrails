// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import AffiliateDetailTrail from '../components/AffiliateDetailTrail';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';
import { Helmet } from "react-helmet-async"; 
import { useParams } from 'react-router-dom';

interface SeoMetaProps {
  page: string;
  pagetitle: string;
}
const AffiliateDetails: React.FC = () => {
    // const { slug } = useParams<{ slug: string }>();
    const { title } = useParams();
  return (
    <>
     <SeoMeta page={ title??'' } pagetitle={title} />
    {/* <SeoMeta page="trail" pagetitle="Cooltrails | Trail"/> */}
     {/* <Helmet>
        <title>Affiliate Details | Cooltrails</title>
      </Helmet> */}
    <div className="main-wrapper wrapper-trail-details">
      <NavTop />
      <AffiliateDetailTrail />  
      <Footer />
    </div>
    </>
    
  );
};

export default AffiliateDetails;

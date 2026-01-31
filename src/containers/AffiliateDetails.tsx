// src/containers/Affiliate.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import AffiliateDetailTrail from '../components/AffiliateDetailTrail';
import Footer from '../components/AppFooter/Footer';
import SeoMeta from './SeoMeta';
import { Helmet } from "react-helmet-async"; // ✅ correct

const AffiliateDetails: React.FC = () => {
  
  return (
    <>
    <SeoMeta page="trail" pagetitle="Cooltrails | Trail"/>
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

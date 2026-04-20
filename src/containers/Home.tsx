// src/containers/Home.tsx
import React, { useEffect, useState } from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Banner from '../components/AppHeader/Banner';
import LocalFavorites from '../components/LocalFavorites';
import HomeTrails from '../components/HomeTrails';
import AppPromotion from '../components/AppPromotion';
import ReviewSection from '../components/ReviewSection';
import AdventureSection from '../components/AdventureSection';
import GiftSection from '../components/GiftSection';
import ShareAdventure from '../components/ShareAdventure';
import AdventureAnywhere from '../components/AdventureAnywhere';
import SearchDiscover from '../components/SearchDiscover';
import TrailFeedbackSection from '../components/TrailFeedbackSection';
import Footer from '../components/AppFooter/Footer';
import { SquareLoader } from "react-spinners"; 
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { decodeId,encodeId, generateSlug ,slugToTitle,usePageTitle } from '../utils/helpers';
import SeoMeta from './SeoMeta';
import { getAuth } from '../utils/storage';
import CommonLoader from '../components/CommonLoader';
// import SeoMeta from '../containers/SeoMeta'
const BASE_URL = import.meta.env.VITE_API_URL;

const Home: React.FC = () => {
  const [loading,setLoading] = useState(true);
  const handleClick = () => {
    alert('Button clicked!');
  };
//  usePageTitle("Cooltrails | Home");
  // Loader
  // window.scrollTo(0,0);
  const { userId, token ,login} = getAuth();
// console.log('tokentoken',token);
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    useEffect(()=>{
        const timer = setTimeout(()=>
            setLoading(false),3000);
        return()=>clearTimeout(timer);
    },[]);

      
//function Home(){
  return (
    <>
    <SeoMeta page="home" pagetitle="Cooltrails | Home"/>
    <div className="main-wrapper wrapper-home">
      <NavTop />
      <main className="mainContent">
      
      {
        loading?(
         <CommonLoader/>
        ):(
          <>
            <Banner />
            <LocalFavorites />
            <HomeTrails />
            <AdventureSection />
            <SearchDiscover  />
            <ShareAdventure />
            <AppPromotion />
            <ReviewSection />
            <GiftSection />
          </>
        )
      }
     
      {/* <AdventureSection />
      <GiftSection />
      <ShareAdventure />
      <AdventureAnywhere />
      <TrailFeedbackSection /> */}
       </main>
      <Footer />
     
      {/* CTA */}
      

      {/* Gift Section */}
     

      {/* Share Adventure */}
      

      {/* Adventure Anywhere */}

      {/* Footer */}
    </div>
    </>
  );
};

export default Home;

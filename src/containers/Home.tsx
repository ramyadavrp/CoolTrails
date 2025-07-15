// src/containers/Home.tsx
import React from 'react';
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

const Home: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };
//function Home(){
  return (
    <div className="main-wrapper wrapper-home">
      <NavTop />
      <main className="mainContent">
      <Banner />
      <LocalFavorites />
      <HomeTrails />
      <AdventureSection />
      <SearchDiscover  />
      <ShareAdventure />
      <AppPromotion />
      <ReviewSection />
      <GiftSection />
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
  );
};

export default Home;

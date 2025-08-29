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
import Footer from '../components/AppFooter/Footer';
import { useParams } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle} from '../utils/helpers';




const ParkDetails: React.FC = () => {
    const { title } = useParams();
    window.scrollTo(0,0);
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to ParkDetails Container</h1>
      <NavTop />
     <h1 style={{textAlign:'center'}}>Welcome to {slugToTitle(title)} Container</h1>
      <Footer />
      {/* CTA */}
      

      {/* Gift Section */}
     

      {/* Share Adventure */}
      

      {/* Adventure Anywhere */}

      {/* Footer */}
    </div>
  );
};

export default ParkDetails;

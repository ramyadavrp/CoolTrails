import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import ProfilePhotoSection from '../components/ProfilePhotoSection';
import Footer from '../components/AppFooter/Footer';

const ProfilePhotos: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-profile-feed">
      <NavTop />
      
        <ProfilePhotoSection />
      
      <Footer />
      
    </div>
  );
};

export default ProfilePhotos;

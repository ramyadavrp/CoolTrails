import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavTop from '../components/AppHeader/NavTop';
import ProfileEditSection from '../components/ProfileEditSection';
import Footer from '../components/AppFooter/Footer';

const ProfileEdit: React.FC = () => {
  // const [profile, setProfile] = useState(null);

  //   useEffect(() => {
  //   // Simulate API call with dummy JSON
  //   const fetchProfile = async () => {
  //     try {
  //       // Simulated fetch — you can replace this URL with your backend endpoint
  //       const response = await axios.get('/dummy/profile.json'); 
  //       console.log(response.data.data);
  //       setProfile(response.data.data);  // adjust based on your JSON structure
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // if (!profile) return <div>Loading...</div>;
  
  return (
    <div className="main-wrapper wrapper-profile-edit">
      <NavTop />
       
        <ProfileEditSection />
      
      <Footer />
      
    </div>
  );
};

export default ProfileEdit;

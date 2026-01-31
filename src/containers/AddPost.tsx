import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavTop from '../components/AppHeader/NavTop';
// import ProfileEditSection from '../components/ProfileEditSection';
import Footer from '../components/AppFooter/Footer';
import AddPostSection from '../components/AddPostSection';
import SeoMeta from './SeoMeta';

const AddPost: React.FC = () => {
  
  
  return (
    <>
      <SeoMeta page="add-post" pagetitle="Cooltrails | Add Post"/>
      <div className="main-wrapper wrapper-profile-edit">
        <NavTop />
        <AddPostSection/>
        {/* <AddPost/> */}
          {/* <ProfileEditSection /> */}
        
        <Footer />
        
      </div>
    </>
    
  );
};

export default AddPost;

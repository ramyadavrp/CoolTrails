import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import DismissedUserSection from '../components/DismissedUserSection';

const DismissedUser: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <DismissedUserSection/>
      <Footer />
     
    </div>
  );
};

export default DismissedUser;
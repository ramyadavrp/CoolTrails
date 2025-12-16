import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import BookmarkTrailSection from '../components/BookmarkTrailSection';

const BookmarkTrail: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
    <BookmarkTrailSection />
      <Footer />
     
    </div>
  );
};

export default BookmarkTrail;
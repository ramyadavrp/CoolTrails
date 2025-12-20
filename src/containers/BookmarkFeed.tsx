
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import Footer from '../components/AppFooter/Footer';
import BookmarkFeedSection from '../components/BookmarkfeedSection';

const BookmarkFeed: React.FC = () => {
  
  return (
    <div className="main-wrapper wrapper-national-park">
      <NavTop />
      <BookmarkFeedSection />
      <Footer />
     
    </div>
  );
};

export default BookmarkFeed;
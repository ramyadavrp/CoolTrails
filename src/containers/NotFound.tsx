// src/containers/Home.tsx
import React from 'react';
import NavTop from '../components/AppHeader/NavTop';
import NotFound404 from '../components/NotFound404';
import Footer from '../components/AppFooter/Footer';

const NotFound: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <h1>Welcome to Home Container</h1> */}
      <NavTop />
      <NotFound404 />
      <Footer />
      {/* Footer */}
    </div>
  );
};

export default NotFound;

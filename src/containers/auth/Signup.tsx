// src/containers/Home.tsx
import React from 'react';
import NavTop from '../../components/AppHeader/NavTop';
import Footer from '../../components/AppFooter/Footer';

import SignupForm from './SignupForm';

const Signup: React.FC = () => {
//   const handleClick = () => {
//     alert('Button clicked!');
//   };

  return (
    
    <div className="main-wrapper wrapper-signup">
        <NavTop />
        <main className="mainContent">
          <SignupForm />
        </main>
        <Footer />
    </div>
  );
};

export default Signup;

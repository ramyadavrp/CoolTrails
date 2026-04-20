// src/components/GiftSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const GiftSection: React.FC = () => {
  return (
    <section className="section-gift-card position-relative overflow-hidden">
        <div className="container position-relative">
            <div className="row justify-content-center">
                <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12">
                    <div className="gift-card-content position-relative z-1">
                        <div className="cooltrails-title text-center mb-0">
                            <h2 className="title">Gift a Year <br /> of Exploration</h2>
                            <p className="mb-3">Help them explore more trails, see more sunsets, and get more out of
                                nature — one gift at a time.</p>
                                <Link to={'/gift-membership'} className="btn-style-1">
                                Gift a Membership
                                </Link>
                            {/* <a href="" className="btn-style-1">Gift a Membership</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="abs-card-left">
            <img src="assets/images/home/card.png" alt="" className="w-100" />
        </div>
        <div className="abs-card-right"><img src="assets/images/home/card-1.png" alt="" className="w-100" /></div>
    </section>
  );
};

export default GiftSection;

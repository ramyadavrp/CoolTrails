// src/components/AdventureSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdventureSection: React.FC = () => {
  return (
    <section className="section-upgrade default-padding">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="upgrade-box bg-skyblue">
                        <div className="row align-items-center justify-content-center">
                            <div
                                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-xl-first order-lg-first order-md-last order-sm-last order-last">
                                <div className="upgrade-content">
                                    <h2 className="uc-title">Upgrade Your Adventures</h2>
                                    <p className="mb-4">Whether you want to explore offline or create your own route,
                                        choose the membership that helps you make the most of every minute outdoors.
                                    </p>
                                    <Link to={'/plans'} className="btn-style-1">
                                        Compare Prices
                                    </Link>
                                    {/* <a href="#!" className="btn-style-1">Compare Prices</a> */}
                                </div>
                            </div>
                            <div
                                className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-xl-last order-lg-last order-md-first order-sm-first order-first">
                                <div className="upgrade-img">
                                    <img src="assets/images/home/girl1.jpg" alt="" className="w-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default AdventureSection;

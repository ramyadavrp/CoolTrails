// src/components/AffiliateTrail.tsx
import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const AffiliateTrail: React.FC = () => {
    const [activeTab, setActiveTab] = useState('');

  return (
        <main className="mainContent">
            <section className="home-hero-section affiliate-hero-section">
                <div className="container-fluid bg-image" style={{backgroundImage: "url('assets/images/bg/affiliate-bg.jpg')"}}>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="affiliate-content text-center">
                                <h1 className="afc-title">Join the CoolTrails Affiliate Program</h1>
                                <p>Inspire exploration. Earn with every adventure.</p>
                                <a href="" className="btn-style-1">Become an Affiliate</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-why-partner default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cooltrails-title text-center">
                                <h2 className="title">Why <span>Partner With Us?</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row why-partner-row justify-content-center">
                        <div className="col-xl-4 col-lg-7 col-md-10 col-sm-12 col-12">
                            <div className="why-partner-single bg-almost-white d-flex">
                                <div className="wps-icon">
                                    <img src="assets/images/icons/money.svg" alt="" className="img-fluid" />
                                </div>
                                <div className="wps-content">
                                    <h3 className="wps-title text-midnight-navy mb-0">Earn Commission</h3>
                                    <p className="mb-0 text-grey">Get paid for every new CoolTrails Pro user you refer.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-7 col-md-10 col-sm-12 col-12">
                            <div className="why-partner-single bg-almost-white d-flex">
                                <div className="wps-icon">
                                    <img src="assets/images/icons/outdoor.svg" alt="" className="img-fluid" />
                                </div>
                                <div className="wps-content">
                                    <h3 className="wps-title text-midnight-navy mb-0">Trusted by Outdoor Lovers</h3>
                                    <p className="mb-0 text-grey">Our platform is used by thousands of hikers, bikers, and adventurers every day.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-7 col-md-10 col-sm-12 col-12">
                            <div className="why-partner-single bg-almost-white d-flex">
                                <div className="wps-icon">
                                    <img src="assets/images/icons/Group.svg" alt="" className="img-fluid" />
                                </div>
                                <div className="wps-content">
                                    <h3 className="wps-title text-midnight-navy mb-0">Easy Integration</h3>
                                    <p className="mb-0 text-grey">Use custom links, banners, and creative assets to start promoting in minutes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <a href="" className="btn-style-1">Start Earning</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="who-can-join default-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 co-md-12 col-sm-12 col-12">
                            <div className="who-can-join-container bg-orange br-20">
                                <div className="row align-items-center">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-xl-first order-lg-first order-md-last order-sm-last order-last">
                                        <div className="wcj-content">
                                            <h3 className="text-white">Who Can Join Us?</h3>
                                            <ul className="list-unstyled list-with-icon text-almost-white position-relative">
                                                <li><img src="assets/images/icons/check.svg" alt="" /> Travel and outdoor bloggers</li>
                                                <li><img src="assets/images/icons/check.svg" alt="" /> Adventure YouTubers and influencers</li>
                                                <li><img src="assets/images/icons/check.svg" alt="" /> Gear reviewers and content creators</li>
                                                <li><img src="assets/images/icons/check.svg" alt="" /> Communities focused on fitness, hiking, and wellness</li>
                                            </ul>
                                            <a href="" className="btn-style-2 btn-style-2-orange">Join Now</a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-xl-last order-lg-last order-md-first order-sm-first order-first">
                                        <div className="wcj-img"><img src="assets/images/other/who-can.png" alt="" className="w-100 br-20" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

  );
};

export default AffiliateTrail;

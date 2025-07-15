// src/components/AppPromotion.tsx
import React from 'react';

const AppPromotion: React.FC = () => {
  return (
    <section className="section-download-app default-padding">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="download-app-container bg-skyblue">
                        <div className="row justify-content-center">
                            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                                <div className="download-app-content">
                                    <h2 className="text-white">Our App is Launching Soon!</h2>
                                    <p className="mb-4 text-white">Be the first to explore with it</p>
                                    <a href="" className="btn-style-2">Get Notified</a>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12">
                                <div className="download-app-img">
                                    <img src="assets/images/home/app-dummy.png" alt="" className="w-100" />
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

export default AppPromotion;

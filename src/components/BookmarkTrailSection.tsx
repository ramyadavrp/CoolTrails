import React, { useState,useEffect,useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import ProfileLeftSection from './ProfileLeftSection';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import { encodeId, generateSlug ,slugToTitle,usePageTitle} from '../utils/helpers';
import Select from "react-select";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Park{
    title:string,
    description:string

}

interface Profile {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}
const BookmarkTrailSection: React.FC = () => {
    

    return (
        <main className="mainContent">
            <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container">                    
                    <div className="row">
                        <ProfileLeftSection/>
                        <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative"><a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                <img src="https://purchaseitnow.shop/Upload/Trails/Triund-Trek-via-Gallu-Devi-Temple/1.webp" alt="Top Trail" className="img-fluid img-fixed-size" /></a></div><div className="lfc-content">
                                                <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                    <h3 className="lfc-title">Triund Trek via Gallu Devi Temple</h3><p className="lfc-location mb-1">
                                                        Dharamsala, HP, India
                                                    </p><p className="lfc-tags"><i className="bi bi-star-fill"></i> 0· Moderate · 7.9 · Est. 8h , 8m , </p>
                                                </a><a className="btn-style-1 w-100" href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative"><a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                <img src="https://purchaseitnow.shop/Upload/Trails/Triund-Trek-via-Gallu-Devi-Temple/1.webp" alt="Top Trail" className="img-fluid img-fixed-size" /></a></div><div className="lfc-content">
                                                <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                    <h3 className="lfc-title">Triund Trek via Gallu Devi Temple</h3><p className="lfc-location mb-1">
                                                        Dharamsala, HP, India
                                                    </p><p className="lfc-tags"><i className="bi bi-star-fill"></i> 0· Moderate · 7.9 · Est. 8h , 8m , </p>
                                                </a><a className="btn-style-1 w-100" href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative"><a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                <img src="https://purchaseitnow.shop/Upload/Trails/Triund-Trek-via-Gallu-Devi-Temple/1.webp" alt="Top Trail" className="img-fluid img-fixed-size" /></a></div><div className="lfc-content">
                                                <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                    <h3 className="lfc-title">Triund Trek via Gallu Devi Temple</h3><p className="lfc-location mb-1">
                                                        Dharamsala, HP, India
                                                    </p><p className="lfc-tags"><i className="bi bi-star-fill"></i> 0· Moderate · 7.9 · Est. 8h , 8m , </p>
                                                </a><a className="btn-style-1 w-100" href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative"><a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                <img src="https://purchaseitnow.shop/Upload/Trails/Triund-Trek-via-Gallu-Devi-Temple/1.webp" alt="Top Trail" className="img-fluid img-fixed-size" /></a></div><div className="lfc-content">
                                                <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                    <h3 className="lfc-title">Triund Trek via Gallu Devi Temple</h3><p className="lfc-location mb-1">
                                                        Dharamsala, HP, India
                                                    </p><p className="lfc-tags"><i className="bi bi-star-fill"></i> 0· Moderate · 7.9 · Est. 8h , 8m , </p>
                                                </a><a className="btn-style-1 w-100" href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative"><a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                <img src="https://purchaseitnow.shop/Upload/Trails/Triund-Trek-via-Gallu-Devi-Temple/1.webp" alt="Top Trail" className="img-fluid img-fixed-size" /></a></div><div className="lfc-content">
                                                <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                    <h3 className="lfc-title">Triund Trek via Gallu Devi Temple</h3><p className="lfc-location mb-1">
                                                        Dharamsala, HP, India
                                                    </p><p className="lfc-tags"><i className="bi bi-star-fill"></i> 0· Moderate · 7.9 · Est. 8h , 8m , </p>
                                                </a><a className="btn-style-1 w-100" href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">Check Details</a>
                                            </div>
                                        </div>
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

export default BookmarkTrailSection;

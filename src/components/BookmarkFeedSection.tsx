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
import {getAuth} from '../utils/storage';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Park{
    title:string,
    description:string

}

interface Bookmarked {
    imagePath: string,
    title: string,
    explore_address: string,
    rating: any,
    length: any,
    estimateTime: number,
    date: number,
    trailId: number
}
const BookmarkFeedSection: React.FC = () => {
    const [loadingBookmark, setloadingBookmark] = useState<boolean>(true);

    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [getBookmark, setBookmark] = useState<Bookmarked[]>([]);
    useEffect(() => {
        const { userId, token ,login} = getAuth();
            if (userId) setUserId(userId);
            if (login) setLoginId(login);
            if (token) setToken(token);
    }, []);
    
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadBookmark = async () => {
            // setloadingBlockedUser(true);
            try {
            const response = await axios.post(`${BASE_URL}/common/bookmark-trail`, {
                userid: userId,
                skip: 0,
                take: 20
            });

                // console.log("Blocked Data:", response.data);

            if (response.data.status === "success") {
                setBookmark(response.data.data);
            }
            } catch (error) {
                // setloadingBlockedUser(false);
                console.error("Error loading profile:", error);
            }
        };

        loadBookmark();
    }, [userId]);

    return (
        <main className="mainContent">
            <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container">                    
                    <div className="row">
                        <ProfileLeftSection/>
                        <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                                <div className="row">

                                    {/* dynamic data */}
                                    {/* <div className="col-md-4">
                                        {getBookmark.length > 0 &&(
                                            getBookmark.map((item:any,index:number)=>(
                                                <div key={index} className="local-favorite-single">
                                                    <div className="lfc-thumb position-relative">
                                                        <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                            <img
                                                                src={item.imagePath || '/assets/images/not-found.jpg'}
                                                                alt="local Trail"
                                                                className="img-fluid img-fixed-size"
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null;
                                                                    target.src = '/assets/images/not-found.jpg';
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="lfc-content">
                                                        <a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                            <h3 className="lfc-title">{item.title}</h3>
                                                            <p className="lfc-location mb-1">
                                                                {item.address}
                                                            </p>
                                                            <p className="lfc-tags">
                                                                <i className="bi bi-star-fill"></i> {item.rating.toFixed(1)} · Moderate · {item.length} km · Est. {item.estimateTime}
                                                            </p>
                                                        </a>
                                                        <Link to={`/${item.urlTitle|| generateSlug(item.title || '')}`} className="btn-style-1 w-100">Check Details</Link>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div> */}



                                    <div className="col-md-4">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative"><a href="/Triund-Trek-via-Gallu-Devi-Temple" data-discover="true">
                                                <img src="https://purchaseitnow.shop/Upload/Trails/Triund-Trek-via-Gallu-Devi-Temple/1.webp" alt="Top Trail" className="img-fluid img-fixed-size" /></a>
                                                
                                            </div>
                                            <div className="lfc-content">
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

export default BookmarkFeedSection;

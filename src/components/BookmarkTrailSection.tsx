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
import DataStateLoading from '../utils/DataStateLoading';
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
const BookmarkTrailSection: React.FC = () => {
    const [loadingBookmark, setloadingBookmark] = useState<boolean>(true);
    const [errorsBookmark, setErrorsBookmark] = useState<string | null>(null);
    const [getBookmark, setBookmark] = useState<Bookmarked[]>([]);
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    
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
            setloadingBookmark(true); // show loader every time fetch starts
            setErrorsBookmark("");
            const response = await axios.post(`${BASE_URL}/common/bookmark-trail`, {
                userid: userId,
                skip: 0,
                take: 20,
                // headers: {
                // "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`
                // } 
            });

                // console.log("bookmark-trail Data:", response.data);

            if (response.data.status === "success") {
                setBookmark(response.data.data);
            }
            } catch (error) {
                setErrorsBookmark('Unable to fetch bookmark feed');
                console.error("Error loading profile:", error);
            }finally{
                setloadingBookmark(false);
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
                                    <DataStateLoading
                                        loading={loadingBookmark}
                                        error={errorsBookmark || null}
                                        isEmpty={!loadingBookmark && getBookmark.length === 0}
                                        emptyText="NO Bookmarked Trail found."
                                    >
                                        {getBookmark.length > 0 &&
                                            getBookmark.map((item: any, index: number) => (
                                                <div className="col-md-4" key={index}>
                                                    <div className="local-favorite-single">
                                                        <div className="lfc-thumb position-relative">
                                                            <a href="#">
                                                                <img
                                                                    src={item.imagePath || "/assets/images/not-found.jpg"}
                                                                    alt="local Trail"
                                                                    className="img-fluid img-fixed-size"
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = "/assets/images/not-found.jpg";
                                                                    }}
                                                                />
                                                            </a>
                                                        </div>

                                                        <div className="lfc-content">
                                                            <h3 className="lfc-title">{item.trails?.name}</h3>
                                                            <p className="lfc-location mb-1">
                                                                {item.trails?.address}
                                                            </p>
                                                            <p className="lfc-tags">
                                                                <i className="bi bi-star-fill"></i>{" "}
                                                                {item.trails?.rating} · Moderate ·{" "}
                                                                {item.trails?.lengthKm} km · Est.{" "}
                                                                {item.trails?.estimateTime}
                                                            </p>

                                                            <a className="btn-style-1 w-100">Check Details</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </DataStateLoading>


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

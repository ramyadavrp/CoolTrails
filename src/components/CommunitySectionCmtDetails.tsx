// src/components/AffiliateTrail.tsx
import React, { useState,useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import data from '../data/community.json';
import { Link } from 'react-router-dom';
import StarRating from './AffiliateDetails/StarRating';
import { useParams } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle} from '../utils/helpers';
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { SquareLoader } from "react-spinners"; 



interface suggestedNearby{
    id:number,
    name:string,
    date:string,
    logo:string,
    image_near:string,
    title:string,
    rating:number,
    description:string
}
const CommunitySectionCmtDetails: React.FC = () => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('');
    const [CommunityLoading,setCommunityLoading] = useState(true);
    const [getprofileCommunity, setProfileCommunity ]= useState<any[]>([]);
    const [getfollowingBy, setFollowingBy ]= useState<any[]>([]);
    const [getComments, setComments ]= useState<any[]>([]);
    const [getpostData, setPostdata ]= useState<any[]>([]);
    const [commenttext, setInputTextValue] = useState('');
    // const pageTitle = slugToTitle(title);
     const [loginId, setLoginId] = useState("");
     const [userId, setUserId] = useState<string>("");
    useEffect(() => {
        const storeLocal = localStorage.getItem("email");
        // console.log(storeLocal)
        if (storeLocal) {
            setLoginId(storeLocal);
        }
    }, []);
    useEffect(() => {
            const storedId = localStorage.getItem("id");
            console.log("Stored IDss:", storedId); // should print the ID string
            if (storedId) {
                // setUserId(storedId); 
                setUserId(storedId.trim());
            }  
        }, []);
    // console.log('login',loginId)
    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!commenttext.trim()) {
                console.warn("Comment is empty!");
                return;
            }

            try {
                const response = await axios.post(
                        `${BASE_URL}/feed/comment/`,
                    {
                        PostId: 1,
                        UserId: userId,   
                        CommentText: commenttext,  
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    }
                );
                // console.log("Comment posted:", response.data);
                if (response.data.status === "success") {
                    console.log("Comment resposn posted:", response.data);

                    //setComments((prev) => [...prev, response.data.comment_text]);
                    // Clear input
                    setInputTextValue("");
                } else {
                    console.warn("Failed to post comment:", response.data);
                }
            } catch (error) {
                console.error("Error posting comment:", error);
            }
        };

       
        // const fetchData= async (title:String) => {
        useEffect(() => {
            if (!loginId || !slug) {
                //console.log("Skipping API call: loginId or slug not ready");
                return;
            }
            const fetchPostDetail = async (slug:any) => {
                try {
                const response = await axios.post(
                    `${BASE_URL}/user/community/1`,
                    {
                    LoginId: loginId,
                    // LoginId: "1113virendra@gmail.com",
                    slug: slug,
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    }
                );
                console.log(response.data);
                setProfileCommunity(response.data?.data?.profile_Community || []);
                const followingBy = response.data?.data?.following_by;
                setFollowingBy(followingBy || []);
                setComments(response.data.data.following_by.comments);
                

                // console.log("followingBy raw:", followingBy);
                // console.log("isArray:", Array.isArray(followingBy));

                let postDats = [];

                if (Array.isArray(followingBy)) {
                followingBy.forEach(item => {
                    if (!item) return;

                    if (Array.isArray(item.comments)) {
                    item.comments.forEach(c => c?.postDto && postDats.push(c.postDto));
                    } else if (item.comments?.postDto) {
                    postDats.push(item.comments.postDto);
                    } else if (item.postDto) {
                    postDats.push(item.postDto);
                    }
                });
                } else if (followingBy && typeof followingBy === "object") {
                if (Array.isArray(followingBy.comments)) {
                    postDats = followingBy.comments.map(c => c?.postDto).filter(Boolean);
                } else if (followingBy.comments?.postDto) {
                    postDats = [followingBy.comments.postDto];
                } else if (followingBy.postDto) {
                    postDats = [followingBy.postDto];
                }
                }

                // console.log("postDats", postDats);
                setPostdata(postDats);

                } catch (error) {
                console.error("Error fetching community data", error);
                } finally {
                setCommunityLoading(false);
                }
            };

            fetchPostDetail(slug);
        }, [loginId,slug]); 


        console.log( getpostData);
    if (CommunityLoading) {
        return (
            <div
                style={{  
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "#FFF5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                }}
            >
                <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} />
            </div>
        );
    }


    return (
        <main className="mainContent">
            <section className="section-trail-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="trail-dt-top">
                                <h1 className="trail-dt-title">{getfollowingBy.title ?? ''}</h1>
                                <p className="trail-dt-address text-grey mb-0">Shella Bholaganj, East Khasi Hills, MEGHALAYA, India <span className="tdt-add"> | <i className="bi bi-star-fill"></i> {getfollowingBy.rating??''} Moderate </span> <span className="tdt-separator">|</span> {getfollowingBy.date??''}<span className="t-dt-r-and-o"></span></p>
                                
                            </div>
                        </div>
                        
                    </div>
                    {/* <div className="row">
                        <div className="col-xl-9 col-lg-7 col-md-6 col-sm-12 col-12 order-xl-first order-lg-first order-md-first order-sm-last order-last">                      
                            <div className="single-feed position-relative">
                                <div className="feed-footer d-flex">
                                    <button 
                                        className="like-btn"
                                        style={{
                                            background: "transparent",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                        }}
                                        >
                                        <svg 
                                            width="20" 
                                            height="20" 
                                            viewBox="0 0 20 20" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.32083 3.55228C1.54093 4.54475 1.06838 5.90073 1.06838 7.31638C1.06838 10.4899 3.18627 13.1538 5.42249 15.071C6.52965 16.0202 7.63942 16.7633 8.47356 17.2694C8.89001 17.5221 9.23633 17.7148 9.47719 17.8437C9.52521 17.8694 9.56902 17.8926 9.60833 17.9131C9.64866 17.8909 9.6937 17.8658 9.74322 17.8379C9.98467 17.7017 10.3316 17.499 10.7488 17.2351C11.5842 16.7066 12.6957 15.9365 13.8047 14.9685C16.049 13.0096 18.1624 10.3462 18.1624 7.31638C18.1624 5.90094 17.6899 4.54496 16.91 3.55244C16.1327 2.56318 15.0713 1.95607 13.8722 1.95607C12.2147 1.95607 10.9292 3.03556 10.0949 4.73481L9.61539 5.71147L9.1359 4.73481C8.30155 3.03545 7.01597 1.95607 5.35855 1.95607C4.15962 1.95607 3.09813 2.56307 2.32083 3.55228ZM9.61539 18.5159C9.38365 18.9972 9.38328 18.997 9.38328 18.997L9.38088 18.9959L9.37479 18.9929L9.35294 18.9822C9.33413 18.9729 9.307 18.9594 9.27206 18.9417C9.20214 18.9063 9.10102 18.8541 8.97313 18.7857C8.71741 18.6489 8.35422 18.4467 7.91934 18.1828C7.05075 17.6558 5.89022 16.8793 4.72708 15.8821C2.4227 13.9064 0 10.9706 0 7.31638C0 5.67359 0.545529 4.08235 1.48078 2.89218C2.41859 1.69872 3.76928 0.887695 5.35855 0.887695C7.23013 0.887695 8.65337 1.9365 9.61539 3.41643C10.5774 1.93657 12.0006 0.887695 13.8722 0.887695C15.4616 0.887695 16.8123 1.69886 17.7501 2.89234C18.6853 4.08262 19.2308 5.67386 19.2308 7.31638C19.2308 10.8327 16.8036 13.7691 14.5073 15.7734C13.3459 16.787 12.1872 17.5893 11.3199 18.138C10.8857 18.4126 10.5231 18.6246 10.268 18.7685C10.1404 18.8404 10.0395 18.8954 9.96987 18.9328C9.9351 18.9515 9.90807 18.9657 9.88937 18.9755L9.86773 18.9868L9.8617 18.9899L9.85994 18.9908L9.85935 18.9911C9.85935 18.9911 9.85897 18.9913 9.61539 18.5159ZM9.61539 18.5159L9.85935 18.9911L9.62281 19.1123L9.38328 18.997L9.61539 18.5159Z"
                                            fill="#7D7D7D"
                                            />
                                        </svg>like
                                        
                                    </button>
                                    <button className="comment-btn">
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.69445 11.0675H15.3056V10.0135H3.69445V11.0675ZM3.69445 7.90537H15.3056V6.85132H3.69445V7.90537ZM3.69445 4.74322H15.3056V3.68917H3.69445V4.74322ZM19 18L15.7521 14.7567H1.70578C1.21952 14.7567 0.813484 14.5944 0.487669 14.2697C0.161854 13.9451 -0.000701429 13.54 2.27491e-06 13.0544V1.70229C2.27491e-06 1.21743 0.16291 0.812323 0.488724 0.486973C0.814539 0.161623 1.21987 -0.000700428 1.70472 2.27166e-06H17.2953C17.7808 2.27166e-06 18.1862 0.162326 18.5113 0.486973C18.8364 0.81162 18.9993 1.21673 19 1.70229V18ZM1.70578 13.7026H16.2028L17.9444 15.4355V1.70335C17.9444 1.54102 17.8769 1.39205 17.7418 1.25643C17.6067 1.12081 17.4578 1.05335 17.2953 1.05405H1.70472C1.54287 1.05405 1.39404 1.12151 1.25822 1.25643C1.12241 1.39135 1.05485 1.53997 1.05556 1.70229V13.0544C1.05556 13.216 1.12311 13.3646 1.25822 13.5003C1.39334 13.6359 1.54217 13.7033 1.70472 13.7026"
                                                fill="#7D7D7D"
                                            />
                                        </svg>
                                            Comment
                                    </button>
                                    <button className="share-btn">
                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.4601 7.96745L12.4501 1.32995C12.2278 1.14185 11.9555 1.02254 11.6665 0.986577C11.3775 0.950618 11.0842 0.999567 10.8226 1.12745C10.5648 1.2485 10.3468 1.44044 10.194 1.68083C10.0413 1.92123 9.96015 2.20014 9.96009 2.48495V3.98495C7.04123 5.00521 4.51317 6.91027 2.72794 9.43487C0.942708 11.9595 -0.0108345 14.9779 9.28794e-05 18.0699C-0.000854163 18.8512 0.0618532 19.6313 0.187593 20.4024C0.212056 20.5575 0.284563 20.701 0.394897 20.8127C0.505231 20.9244 0.647828 20.9986 0.802593 21.0249H0.930093C1.06577 21.0246 1.19881 20.9874 1.31504 20.9174C1.43126 20.8474 1.52632 20.7472 1.59009 20.6274C2.44778 19.0138 3.63682 17.5997 5.07928 16.4778C6.52173 15.3559 8.18501 14.5515 9.96009 14.1174V15.7374C9.96015 16.0223 10.0413 16.3012 10.194 16.5416C10.3468 16.782 10.5648 16.9739 10.8226 17.0949C11.029 17.1924 11.2543 17.2436 11.4826 17.2449C11.8375 17.2432 12.1803 17.1156 12.4501 16.8849L16.0951 13.8849L16.1626 13.8324L20.4601 10.2699C20.6273 10.1291 20.7618 9.95349 20.854 9.75527C20.9463 9.55706 20.994 9.34107 20.994 9.12245C20.994 8.90382 20.9463 8.68784 20.854 8.48963C20.7618 8.29141 20.6273 8.11575 20.4601 7.97495V7.96745ZM15.2626 12.6174L15.1951 12.6699L11.4451 15.7449V13.1799C11.4494 13.1602 11.4494 13.1397 11.4451 13.1199C11.4451 13.1199 11.4451 13.0749 11.4451 13.0524C11.4451 13.0299 11.4451 12.9999 11.4076 12.9699C11.3934 12.9237 11.3758 12.8786 11.3551 12.8349C11.3279 12.7887 11.2923 12.748 11.2501 12.7149C11.2263 12.6773 11.1958 12.6442 11.1601 12.6174C11.1208 12.5831 11.0781 12.5529 11.0326 12.5274L10.9201 12.4749H10.7551H10.6801H10.6201H10.5526C6.94145 13.0978 3.70388 15.0747 1.50009 18.0024C1.50308 15.1499 2.41916 12.3733 4.11423 10.079C5.80929 7.7847 8.19431 6.09331 10.9201 5.25245H10.9576C11.0071 5.23451 11.0548 5.21191 11.1001 5.18495C11.1527 5.15668 11.2029 5.12407 11.2501 5.08745L11.3401 4.98245C11.3719 4.94716 11.3973 4.90654 11.4151 4.86245C11.4346 4.82167 11.4497 4.77892 11.4601 4.73495C11.4643 4.68254 11.4643 4.62986 11.4601 4.57745V2.52245L19.5001 9.11495L15.2626 12.6174Z"
                                                fill="#7D7D7D"
                                            />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                           
                        <div  className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 order-xl-first order-lg-first order-md-first order-sm-last order-last">
                            
                            <ul className="d-flex trail-dt-nav list-unstyled pt-3" role="tablist">
                                    <li className="active" data-bs-toggle="list"><a href="#overviewData" role="button"
                                            className="active">Overview</a></li>
                                    <li data-bs-toggle="list"><a href="#trailGuide" role="button">Following </a></li>
                                    
                                </ul>
                            <div className="trail-cover position-relative" id="overviewData">
                                <img
                                    src={getfollowingBy.image_near || '/assets/images/not-found.jpg'}
                                    alt="Com" className="w-100 br-20 coverImage" 
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.currentTarget;
                                        target.onerror = null; // prevent infinite loop
                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                    }}
                                />
                                {/* <img src="/assets/images/trails/trail-1.jpg" alt="" className="w-100 br-20 coverImage"/> */}
                                <div
                                    className="cover-overlay h-100 w-100 d-flex justify-content-between align-items-end br-20">
                                    <a href="/assets/images/trails/trail-1.jpg" className="btn-style-4"
                                        data-fancybox="MoreImages">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" className="me-2">
                                            <rect x="1.5" y="1.5" width="15" height="15" rx="3.75" stroke="#05073D"
                                                strokeWidth="1.125" />
                                            <path
                                                d="M1.875 13.125L3.5694 11.9147C4.10641 11.5311 4.84202 11.592 5.30866 12.0587L6.1136 12.8636C6.46508 13.2151 7.03492 13.2151 7.3864 12.8636L11.1283 9.12175C11.622 8.62803 12.4107 8.59225 12.9471 9.03924L16.5 12"
                                                stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" />
                                            <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(-1 0 0 1 7.5 4.5)"
                                                stroke="#05073D" strokeWidth="1.125" />
                                        </svg>
                                        150+ Photos</a>
                                    <a href="/assets/images/trails/trail-1-gallery-1.jpg" data-fancybox="MoreImages"></a>
                                    <a href="/assets/images/trails/trail-1-gallery-2.jpg" data-fancybox="MoreImages"></a>
                                    <a href="/assets/images/trails/trail-1-gallery-3.jpg" data-fancybox="MoreImages"></a>
                                    <a href=""
                                        className="arrow-btn d-flex align-items-center justify-content-center rounded-circle"><svg
                                            width="18" height="16" viewBox="0 0 18 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8"
                                                stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg></a>
                                </div>
                            </div>
                            <div   className="trail-user-favorite-card br-20 bg-almost-white d-flex justify-content-between flex-wrap">

                                <div className="tuf-left-content d-flex align-items-center">
                                    <div className="tusc-cn-1">
                                        <p className="mb-0">Users Favorite </p>
                                    </div>
                                    <div className="tusc-cn-2">
                                        <p className="mb-0 text-midnight-navy">One of the most loved homes on Airbnb,
                                            according to guests</p>
                                    </div>
                                </div>

                                <div className="tuf-right-content d-flex align-items-center">
                                   
                                    <div className="tusc-cn-1 text-center">
                                        <p className="mb-0">{getfollowingBy.rating}</p>
                                        <StarRating rating={Number(getfollowingBy.rating)}/>
                                        {/* <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div> */}
                                    </div>
                                    <div className="tusc-cn-2 text-center">
                                        
                                        <p className="mb-0 text-midnight-navy"><span className="d-block review-no">31</span>
                                            <span>Reviews</span>
                                        </p>
                                    </div>
                                    <div className="tusc-cn-3">
                                        <a href="" className="btn-style-1">Show all Reviews</a>
                                    </div>
                                </div>
                            </div>
                            <div className="trail-stats d-flex flex-wrap">
                                <div className="trail-stat-single text-midnight-navy px-2">
                                    <h3> {getpostData.length ?? '0'}<span>km</span></h3>
                                    <p className="mb-0">Length</p>
                                </div>
                                <div className="trail-stat-single text-midnight-navy px-2">
                                    <h3>{getpostData.elevationGain ?? '0'}<span>m</span></h3>
                                    <p className="mb-0">Elevation gain</p>
                                </div>
                                <div className="trail-stat-single text-midnight-navy px-2">
                                    <img src="/assets/images/icons/loop.svg" alt="" className="tss-icon"/>
                                    <p className="mb-0">{getpostData.trailType ?? ''}</p>
                                </div>
                            </div>
                            <div className="trail-desc trail-detail-widget">
                                <p>{getfollowingBy.description??''}</p>
                            </div>
                            <div className="single-feed position-relative">
                                <div className="feed-footer d-flex">
                                    <button 
                                        className="like-btn"
                                        style={{
                                            background: "transparent",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                        }}
                                        >
                                        <svg 
                                            width="20" 
                                            height="20" 
                                            viewBox="0 0 20 20" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.32083 3.55228C1.54093 4.54475 1.06838 5.90073 1.06838 7.31638C1.06838 10.4899 3.18627 13.1538 5.42249 15.071C6.52965 16.0202 7.63942 16.7633 8.47356 17.2694C8.89001 17.5221 9.23633 17.7148 9.47719 17.8437C9.52521 17.8694 9.56902 17.8926 9.60833 17.9131C9.64866 17.8909 9.6937 17.8658 9.74322 17.8379C9.98467 17.7017 10.3316 17.499 10.7488 17.2351C11.5842 16.7066 12.6957 15.9365 13.8047 14.9685C16.049 13.0096 18.1624 10.3462 18.1624 7.31638C18.1624 5.90094 17.6899 4.54496 16.91 3.55244C16.1327 2.56318 15.0713 1.95607 13.8722 1.95607C12.2147 1.95607 10.9292 3.03556 10.0949 4.73481L9.61539 5.71147L9.1359 4.73481C8.30155 3.03545 7.01597 1.95607 5.35855 1.95607C4.15962 1.95607 3.09813 2.56307 2.32083 3.55228ZM9.61539 18.5159C9.38365 18.9972 9.38328 18.997 9.38328 18.997L9.38088 18.9959L9.37479 18.9929L9.35294 18.9822C9.33413 18.9729 9.307 18.9594 9.27206 18.9417C9.20214 18.9063 9.10102 18.8541 8.97313 18.7857C8.71741 18.6489 8.35422 18.4467 7.91934 18.1828C7.05075 17.6558 5.89022 16.8793 4.72708 15.8821C2.4227 13.9064 0 10.9706 0 7.31638C0 5.67359 0.545529 4.08235 1.48078 2.89218C2.41859 1.69872 3.76928 0.887695 5.35855 0.887695C7.23013 0.887695 8.65337 1.9365 9.61539 3.41643C10.5774 1.93657 12.0006 0.887695 13.8722 0.887695C15.4616 0.887695 16.8123 1.69886 17.7501 2.89234C18.6853 4.08262 19.2308 5.67386 19.2308 7.31638C19.2308 10.8327 16.8036 13.7691 14.5073 15.7734C13.3459 16.787 12.1872 17.5893 11.3199 18.138C10.8857 18.4126 10.5231 18.6246 10.268 18.7685C10.1404 18.8404 10.0395 18.8954 9.96987 18.9328C9.9351 18.9515 9.90807 18.9657 9.88937 18.9755L9.86773 18.9868L9.8617 18.9899L9.85994 18.9908L9.85935 18.9911C9.85935 18.9911 9.85897 18.9913 9.61539 18.5159ZM9.61539 18.5159L9.85935 18.9911L9.62281 19.1123L9.38328 18.997L9.61539 18.5159Z"
                                            fill="#7D7D7D"
                                            />
                                        </svg>{getfollowingBy.like_count?? 0} like
                                        
                                    </button>
                                    <button className="comment-btn">
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.69445 11.0675H15.3056V10.0135H3.69445V11.0675ZM3.69445 7.90537H15.3056V6.85132H3.69445V7.90537ZM3.69445 4.74322H15.3056V3.68917H3.69445V4.74322ZM19 18L15.7521 14.7567H1.70578C1.21952 14.7567 0.813484 14.5944 0.487669 14.2697C0.161854 13.9451 -0.000701429 13.54 2.27491e-06 13.0544V1.70229C2.27491e-06 1.21743 0.16291 0.812323 0.488724 0.486973C0.814539 0.161623 1.21987 -0.000700428 1.70472 2.27166e-06H17.2953C17.7808 2.27166e-06 18.1862 0.162326 18.5113 0.486973C18.8364 0.81162 18.9993 1.21673 19 1.70229V18ZM1.70578 13.7026H16.2028L17.9444 15.4355V1.70335C17.9444 1.54102 17.8769 1.39205 17.7418 1.25643C17.6067 1.12081 17.4578 1.05335 17.2953 1.05405H1.70472C1.54287 1.05405 1.39404 1.12151 1.25822 1.25643C1.12241 1.39135 1.05485 1.53997 1.05556 1.70229V13.0544C1.05556 13.216 1.12311 13.3646 1.25822 13.5003C1.39334 13.6359 1.54217 13.7033 1.70472 13.7026"
                                                fill="#7D7D7D"
                                            />
                                        </svg>
                                            {getfollowingBy.comment_count?? 0} Comment
                                    </button>
                                    <button className="share-btn">
                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.4601 7.96745L12.4501 1.32995C12.2278 1.14185 11.9555 1.02254 11.6665 0.986577C11.3775 0.950618 11.0842 0.999567 10.8226 1.12745C10.5648 1.2485 10.3468 1.44044 10.194 1.68083C10.0413 1.92123 9.96015 2.20014 9.96009 2.48495V3.98495C7.04123 5.00521 4.51317 6.91027 2.72794 9.43487C0.942708 11.9595 -0.0108345 14.9779 9.28794e-05 18.0699C-0.000854163 18.8512 0.0618532 19.6313 0.187593 20.4024C0.212056 20.5575 0.284563 20.701 0.394897 20.8127C0.505231 20.9244 0.647828 20.9986 0.802593 21.0249H0.930093C1.06577 21.0246 1.19881 20.9874 1.31504 20.9174C1.43126 20.8474 1.52632 20.7472 1.59009 20.6274C2.44778 19.0138 3.63682 17.5997 5.07928 16.4778C6.52173 15.3559 8.18501 14.5515 9.96009 14.1174V15.7374C9.96015 16.0223 10.0413 16.3012 10.194 16.5416C10.3468 16.782 10.5648 16.9739 10.8226 17.0949C11.029 17.1924 11.2543 17.2436 11.4826 17.2449C11.8375 17.2432 12.1803 17.1156 12.4501 16.8849L16.0951 13.8849L16.1626 13.8324L20.4601 10.2699C20.6273 10.1291 20.7618 9.95349 20.854 9.75527C20.9463 9.55706 20.994 9.34107 20.994 9.12245C20.994 8.90382 20.9463 8.68784 20.854 8.48963C20.7618 8.29141 20.6273 8.11575 20.4601 7.97495V7.96745ZM15.2626 12.6174L15.1951 12.6699L11.4451 15.7449V13.1799C11.4494 13.1602 11.4494 13.1397 11.4451 13.1199C11.4451 13.1199 11.4451 13.0749 11.4451 13.0524C11.4451 13.0299 11.4451 12.9999 11.4076 12.9699C11.3934 12.9237 11.3758 12.8786 11.3551 12.8349C11.3279 12.7887 11.2923 12.748 11.2501 12.7149C11.2263 12.6773 11.1958 12.6442 11.1601 12.6174C11.1208 12.5831 11.0781 12.5529 11.0326 12.5274L10.9201 12.4749H10.7551H10.6801H10.6201H10.5526C6.94145 13.0978 3.70388 15.0747 1.50009 18.0024C1.50308 15.1499 2.41916 12.3733 4.11423 10.079C5.80929 7.7847 8.19431 6.09331 10.9201 5.25245H10.9576C11.0071 5.23451 11.0548 5.21191 11.1001 5.18495C11.1527 5.15668 11.2029 5.12407 11.2501 5.08745L11.3401 4.98245C11.3719 4.94716 11.3973 4.90654 11.4151 4.86245C11.4346 4.82167 11.4497 4.77892 11.4601 4.73495C11.4643 4.68254 11.4643 4.62986 11.4601 4.57745V2.52245L19.5001 9.11495L15.2626 12.6174Z"
                                                fill="#7D7D7D"
                                            />
                                        </svg>
                                        {getfollowingBy.share_count?? 0}  Share
                                    </button>

                                </div>
                                
                            </div>
                            
                            <div className="row">
                            {
                                getComments.map((cmt:any,index:number)=>(

                                    <div key={index}  className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div  className="testimonial-single position-relative">
                                            <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                <div className="test-image">
                                                    <img
                                                        style={{'height':'60px' ,'width':'60px'}}
                                                        src='/assets/images/profile/profile-md.png'
                                                        alt="Top Trail" className="user-profile-img" 
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                            const target = e.currentTarget;
                                                            target.onerror = null; // prevent infinite loop
                                                            target.src = '/assets/images/not-found.jpg'; // fallback image
                                                        }}
                                                    />
                                                </div>
                                                <div className="test-head">
                                                    <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">{cmt.name ?? 'N/A'}</h3>
                                                    {/* <StarRating rating={Number(review.rating)}/> */}
                                                    <p className="mb-0">{cmt.commentText ?? 'N/A'}<span className="d-inline-block mx-1">•</span> hh</p>
                                                </div>
                                                <div className="right-abs">
                                                    <i className="bi bi-three-dots"></i>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    //  <p>{cmt.createdOn??''}</p>
                                ))
                            }
                            
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <form onSubmit={handleCommentSubmit} className="flex flex-col items-center">
                                        <div className="input-group mb-3">
                                        <input
                                            value={commenttext}
                                            onChange={(e) => setInputTextValue(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Add a comment"
                                            id="comment"
                                            style={{ borderRadius: "50px 0 0 50px" }}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary"
                                            style={{ borderRadius: "0 50px 50px 0" }}
                                            aria-label="Submit comment"
                                        >
                                            <i className="bi bi-send-fill"></i>
                                        </button>
                                        </div>
                                    </form>
                                    </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
                            <div className="trail-detail-map position-relative">
                                <div className="trail-detail-map-btn-group d-flex justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center">
                                    <button className="btn-rounded-white rounded-circle" type="button" title="Share">
                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12.125" cy="3.375" r="1.875" stroke="#05073D" strokeWidth="1.125"/>
                                    <circle cx="3.125" cy="8.625" r="1.875" stroke="#05073D" strokeWidth="1.125"/>
                                    <path d="M10.25 4.5L5 7.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4.625 10.125L10.25 13.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12.125" cy="14.625" r="1.875" stroke="#05073D" strokeWidth="1.125"/>
                                    </svg>
                                    </button>
                                    <button className="btn-rounded-white rounded-circle" type="button" title="Bookmark">                                        
                                        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0601 0.25H1.93993C1.63227 0.25 1.33722 0.372216 1.11967 0.589763C0.902124 0.807309 0.779907 1.10237 0.779907 1.41002V14.1703C0.779959 14.2738 0.80771 14.3754 0.860281 14.4646C0.912852 14.5537 0.988327 14.6272 1.07887 14.6774C1.16942 14.7275 1.27174 14.7525 1.37522 14.7498C1.47869 14.7471 1.57955 14.7167 1.66732 14.6618L6.00001 11.9539L10.3334 14.6618C10.4212 14.7165 10.522 14.7467 10.6253 14.7494C10.7287 14.752 10.8309 14.7269 10.9213 14.6768C11.0118 14.6267 11.0871 14.5533 11.1397 14.4642C11.1922 14.3752 11.22 14.2737 11.2201 14.1703V1.41002C11.2201 1.10237 11.0979 0.807309 10.8804 0.589763C10.6628 0.372216 10.3678 0.25 10.0601 0.25ZM10.0601 13.1241L6.30669 10.7787C6.21451 10.721 6.10799 10.6905 5.99929 10.6905C5.89058 10.6905 5.78406 10.721 5.69188 10.7787L1.93993 13.1241V1.41002H10.0601V13.1241Z" fill="#05073D"/>
                                        </svg>
                                    </button>
                                    <button className="btn-rounded-white rounded-circle" type="button" title="Location">
                                        <svg width="15.16" height="18" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.68182 5.21429C8.68182 4.19131 8.29391 3.21023 7.60344 2.48687C6.91296 1.76352 5.97648 1.35714 5 1.35714C4.02352 1.35714 3.08704 1.76352 2.39656 2.48687C1.70609 3.21023 1.31818 4.19131 1.31818 5.21429C1.31818 6.79657 2.52664 8.85886 5 11.3291C7.47336 8.85886 8.68182 6.79657 8.68182 5.21429ZM5 12.5C1.99973 9.64314 0.5 7.214 0.5 5.21429C0.5 3.96398 0.974106 2.76488 1.81802 1.88078C2.66193 0.996682 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.996682 8.18198 1.88078C9.02589 2.76488 9.5 3.96398 9.5 5.21429C9.5 7.214 8.00027 9.64314 5 12.5Z" fill="#05073D"/>
                                        <path d="M5.00004 6.5C5.32554 6.5 5.6377 6.36454 5.86786 6.12342C6.09802 5.8823 6.22732 5.55528 6.22732 5.21428C6.22732 4.87329 6.09802 4.54626 5.86786 4.30515C5.6377 4.06403 5.32554 3.92857 5.00004 3.92857C4.67455 3.92857 4.36239 4.06403 4.13223 4.30515C3.90207 4.54626 3.77277 4.87329 3.77277 5.21428C3.77277 5.55528 3.90207 5.8823 4.13223 6.12342C4.36239 6.36454 4.67455 6.5 5.00004 6.5ZM5.00004 7.35714C4.45756 7.35714 3.93729 7.13138 3.55369 6.72951C3.17009 6.32765 2.95459 5.7826 2.95459 5.21428C2.95459 4.64596 3.17009 4.10092 3.55369 3.69905C3.93729 3.29719 4.45756 3.07143 5.00004 3.07143C5.54253 3.07143 6.0628 3.29719 6.4464 3.69905C6.83 4.10092 7.0455 4.64596 7.0455 5.21428C7.0455 5.7826 6.83 6.32765 6.4464 6.72951C6.0628 7.13138 5.54253 7.35714 5.00004 7.35714Z" fill="#05073D"/>
                                        </svg>
                                    </button>
                                </div>
                                {/* <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194474.440444268!2d55.959295174859626!3d25.08154936413991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5a8616e5ca149%3A0x75d4f4005126006a!2sShawkah%20Dam!5e0!3m2!1sen!2sin!4v1749891263519!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> --> */}
                                <img src="/assets/images/trails/map.png" alt="" className="map-img"/>
                                <a href="/assets/images/trails/map.png" data-fancybox="mapImg"
                                    className="arrow-btn d-flex align-items-center justify-content-center rounded-circle">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.15005 13.5003H3.68251C3.30557 13.5003 3 13.1947 3 12.8178L3 10.3503M3.52497 12.9754L7.20003 9.30033M13.5 6.15005V3.68251C13.5 3.30557 13.1944 3 12.8175 3L10.35 3M12.975 3.52503L9.29993 7.20009"
                                            stroke="#717171" strokeLinecap="round" />
                                    </svg>
                                </a>
                            </div>
                                <div className="trail-sidebar-widget bg-almost-white br-20">
                                <h3 className="text-midnight-navy">What this place offers</h3>
                                <ul className="trail-side-nav list-unstyled mt-0">
                                    <li><a href=""><img src="/assets/images/icons/scamble.svg" alt=""/> Scramble </a></li>
                                    <li><a href=""><img src="/assets/images/icons/off-trail.svg" alt=""/> Off-trail
                                            (bushwhack) </a></li>
                                    <li><a href=""><img src="/assets/images/icons/lakes.svg" alt=""/> Lakes </a></li>
                                    <li><a href=""><img src="/assets/images/icons/views.svg" alt=""/> Views </a></li>
                                    <li><a href=""><img src="/assets/images/icons/hiking.svg" alt=""/> Hiking </a></li>
                                    <li><a href=""><img src="/assets/images/icons/walking.svg" alt=""/> Walking </a></li>
                                </ul>
                                <div className="d-flex flex-wrap align-items-center">
                                    <a href="" className="btn-style-3">Get Directions</a>
                                    <a href="" className="btn-style-1">Hit the Trail</a>
                                </div>
                            </div>
                        </div> 
                        
                    </div>
                    {/* <!-- reviews --> */}
                    {/* <div className="trails-reviews-widget" id="reviews">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title">
                                    <h2 className="title">Reviews</h2>
                                </div>
                            </div>

                        </div>

                        <div className="row review-row g-3">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="testimonial-single position-relative">
                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                        <div className="test-image">
                                            <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/>
                                        </div>
                                        <div className="test-head">
                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. –
                                                Denver, CO</h3>
                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span>
                                                Hiking</p>
                                        </div>
                                        <div className="right-abs">
                                            <i className="bi bi-three-dots"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-body">
                                        <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in
                                            my backyard. The trail difficulty ratings were spot on, and the user tips
                                            saved me big time!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="testimonial-single position-relative">
                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                        <div className="test-image">
                                            <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/>
                                        </div>
                                        <div className="test-head">
                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. –
                                                Denver, CO</h3>
                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span>
                                                Hiking</p>
                                        </div>
                                        <div className="right-abs">
                                            <i className="bi bi-three-dots"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-body">
                                        <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in
                                            my backyard. The trail difficulty ratings were spot on, and the user tips
                                            saved me big time!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="testimonial-single position-relative">
                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                        <div className="test-image">
                                            <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/>
                                        </div>
                                        <div className="test-head">
                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. –
                                                Denver, CO</h3>
                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span>
                                                Hiking</p>
                                        </div>
                                        <div className="right-abs">
                                            <i className="bi bi-three-dots"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-body">
                                        <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in
                                            my backyard. The trail difficulty ratings were spot on, and the user tips
                                            saved me big time!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="testimonial-single position-relative">
                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                        <div className="test-image">
                                            <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/>
                                        </div>
                                        <div className="test-head">
                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. –
                                                Denver, CO</h3>
                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span>
                                                Hiking</p>
                                        </div>
                                        <div className="right-abs">
                                            <i className="bi bi-three-dots"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-body">
                                        <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in
                                            my backyard. The trail difficulty ratings were spot on, and the user tips
                                            saved me big time!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="testimonial-single position-relative">
                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                        <div className="test-image">
                                            <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/>
                                        </div>
                                        <div className="test-head">
                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. –
                                                Denver, CO</h3>
                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span>
                                                Hiking</p>
                                        </div>
                                        <div className="right-abs">
                                            <i className="bi bi-three-dots"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-body">
                                        <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in
                                            my backyard. The trail difficulty ratings were spot on, and the user tips
                                            saved me big time!</p>
                                        <div className="review-gallery">
                                            <div className="d-flex">
                                                <a href="/assets/images/review-images/r-1.png"
                                                    data-fancybox="reviewImages"><img
                                                        src="/assets/images/review-images/r-1.png" alt=""/></a>
                                                <a href="/assets/images/review-images/r-2.png"
                                                    data-fancybox="reviewImages"><img
                                                        src="/assets/images/review-images/r-2.png" alt=""/></a>
                                                <a href="/assets/images/review-images/r-3.png"
                                                    data-fancybox="reviewImages"><img
                                                        src="/assets/images/review-images/r-3.png" alt=""/></a>
                                                <a href="/assets/images/review-images/r-4.png"
                                                    data-fancybox="reviewImagess"><img
                                                        src="/assets/images/review-images/r-4.png" alt=""/></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="testimonial-single position-relative">
                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                        <div className="test-image">
                                            <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/>
                                        </div>
                                        <div className="test-head">
                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. –
                                                Denver, CO</h3>
                                            <div className="rating">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span>
                                                Hiking</p>
                                        </div>
                                        <div className="right-abs">
                                            <i className="bi bi-three-dots"></i>
                                        </div>
                                    </div>
                                    <div className="testimonial-body">
                                        <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in
                                            my backyard. The trail difficulty ratings were spot on, and the user tips
                                            saved me big time!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-4 text-center">
                                <a href="" className="btn-style-1">Check All Reviews</a>
                            </div>
                        </div>
                    </div> */}
                    {/* <!-- review-end --> */}
                </div>
            </section>
            
        </main>         

    );
};

export default CommunitySectionCmtDetails;

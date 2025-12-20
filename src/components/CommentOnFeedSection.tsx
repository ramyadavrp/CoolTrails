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

interface CommentFeed {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}
const BlockedUserSection: React.FC = () => {
    const [loadingCommentFeed, setloadingCommentFeed] = useState<boolean>(true);
    
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [getCommentFeed, setCommentFeed] = useState<CommentFeed[]>([]);
    const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({});
    const toggleExpand = (index: number) => {
        setExpandedPosts(prev => ({
        ...prev,
        [index]: !prev[index],
        }));
    };

    const limit = 150;
    useEffect(() => {
        const { userId, token ,login} = getAuth();
            if (userId) setUserId(userId);
            if (login) setLoginId(login);
            if (token) setToken(token);
    }, []);
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadCommentFeed = async () => {
            // setloadingBlockedUser(true);
            try {
            const response = await axios.post(`${BASE_URL}/common/commentlistbyuser`, {
                userid: userId,
                skip: 0,
                take: 20
            });

                console.log("commentlistbyuser Data:", response.data);

            if (response.data.status === "success") {
                setCommentFeed(response.data.data);
            }
            } catch (error) {
                // setloadingBlockedUser(false);
                console.error("Error loading profile:", error);
            }
        };

        loadCommentFeed();
    }, [userId]);
    return (
            <main className="mainContent">
                <section className="section-profile-feed inner-dashboard position-relative py-3">
                    <div className="container">
                        <div className="row">
                            <ProfileLeftSection/>
                            <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                                <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                                    {
                                        getCommentFeed.length > 0 && (
                                            getCommentFeed.map((item,index)=>{
                                                const rawDescription = item.post.content ?? '';
                                                const cleanDescription = rawDescription
                                                    .replace(/<[^>]+>/g, '')  // Remove HTML tags
                                                    .replace(/&nbsp;| /g, '') // Remove HTML entities
                                                    .trim();

                                                const shouldTruncate = cleanDescription.length > limit;
                                                const shortText = cleanDescription.slice(0, limit);
                                                const isExpanded = expandedPosts[index];
                                                return(
                                                <div key={index} className="single-feed position-relative">
                                                    <div className="feed-head d-flex justify-content-between">
                                                        <div className="feed-user-info d-flex align-items-center">
                                                            <a href="">
                                                                <img
                                                                src={item.post.userImage|| '/assets/images/profile/profile-sm.png'}
                                                                alt="locat not" 
                                                                className="w-100 br-20" 
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/profile/profile-sm.png'; // fallback image
                                                                }}
                                                            />
                                                                {/* <img src="assets/images/profile/profile-sm.png" alt="" className="profile-sm rounded-circle" /> */}
                                                            </a>
                                                            <a href="" className="fui">
                                                                <span className="fui-name text-midnight-navy mb-0">{item.post.userName ?? 'Amit Singh ' }</span>
                                                                <span className="mb-0 fui-date d-block">
                                                                    {new Date(item.post.createdOn ?? ' ' ).toLocaleDateString("en-GB", {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                    })}
                                                                </span>
                                                            </a>
                                                        </div>
                                                        {/* <div className="user-feed-options dropdown dropdown-no-arrow">
                                                            <a className="dropdown-toggle text-midnight-navy" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi bi-three-dots"></i>
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-sm dropdown-rounded custom-dropdown">
                                                                <li><a className="dropdown-item" href="#">Option 1</a></li>
                                                                <li><a className="dropdown-item" href="#">Action 1</a></li>
                                                                <li><a className="dropdown-item" href="#">Action 2</a></li>
                                                            </ul>
                                                        </div> */}
                                                    </div>
                                                    <div className="feed-image">
                                                        <a href="" className="d-block">
                                                            <img
                                                                src={item.post.media['0'].mediaUrl|| '/assets/images/profile/feed/feed-img-1.png'}
                                                                alt="locat not" 
                                                                className="w-100 br-20" 
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/profile/feed/feed-img-1.png'; // fallback image
                                                                }}
                                                            />
                                                            {/* <img src="assets/images/profile/feed/feed-img-1.png" alt="" className="w-100 br-20" /> */}
                                                        </a>
                                                    </div>
                                                    <div className="feed-info">
                                                    <h6 className="feed-title text-midnight-navy">
                                                        {isExpanded || !shouldTruncate ? cleanDescription : `${shortText}...`}
                                                        {shouldTruncate && (
                                                            <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toggleExpand(index);
                                                            }}
                                                            className="text-orange fw-bold ms-1"
                                                            >
                                                            {isExpanded ? 'Read less' : 'Read more'}
                                                            </a>
                                                        )}
                                                    </h6>
                                                        {/* <h6 className="feed-title text-midnight-navy">{item.post.content ?? ' '}</h6> */}
                                                        <div className="rating">
                                                            <img src="assets/images/icons/Star.svg" alt="" />
                                                            <img src="assets/images/icons/Star.svg" alt="" />
                                                            <img src="assets/images/icons/Star.svg" alt="" />
                                                            <img src="assets/images/icons/Star.svg" alt="" />
                                                            <img src="assets/images/icons/Star.svg" alt="" />
                                                        </div>
                                                        <p className="text-midnight-navy">{item.post.descriptions ?? ' '}</p>
                                                    </div>
                                                    <h4>Comments</h4>
                                                    <div className="feed-footer d-flex">


                                                        <div className="row">
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="testimonial-single position-relative">
                                                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                                        <div className="test-image">
                                                                            <img
                                                                                src={item?.userImage || '/assets/images/not-found.jpg'}
                                                                                alt={item?.user}   
                                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                                    const target = e.currentTarget;
                                                                                    target.onerror = null; // prevent infinite loop
                                                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                                }}
                                                                            />
                                                                            
                                                                        </div>
                                                                        <div className="test-head">
                                                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">{item.user ?? 'Alex'}<span className="d-inline-block mx-1" style={{color: 'gray',fontSize: '14px'}}>•  
                                                                                {new Date(item.commentDate ?? ' ' ).toLocaleDateString("en-GB", {
                                                                                    day: "2-digit",
                                                                                    month: "short",
                                                                                })}</span> </h3>
                                                                            <p className="mb-0">{item.comment ?? ' '}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )})
                                        )
                                    }
                                    
                                    {/* <div className="single-feed position-relative">
                                        <div className="feed-head d-flex justify-content-between">
                                            <div className="feed-user-info d-flex align-items-center">
                                                <a href="">
                                                    <img src="assets/images/profile/profile-sm.png" alt="" className="profile-sm rounded-circle" />
                                                </a>
                                                <a href="" className="fui">
                                                    <span className="fui-name text-midnight-navy mb-0">Amit Singh</span>
                                                    <span className="mb-0 fui-date d-block">22 Mar.</span>
                                                </a>
                                            </div>
                                            <div className="user-feed-options dropdown dropdown-no-arrow">
                                                <a className="dropdown-toggle text-midnight-navy" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-three-dots"></i>
                                                </a>
                                                <ul className="dropdown-menu dropdown-sm dropdown-rounded custom-dropdown">
                                                    <li><a className="dropdown-item" href="#">Option 1</a></li>
                                                    <li><a className="dropdown-item" href="#">Action 1</a></li>
                                                    <li><a className="dropdown-item" href="#">Action 2</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="feed-image">
                                            <a href="" className="d-block">
                                                <img src="assets/images/profile/feed/feed-img-2.png" alt="" className="w-100 br-20" />
                                            </a>
                                        </div>
                                        <div className="feed-info">
                                            <h6 className="feed-title text-midnight-navy">Forest of Meudon - Virofly</h6>
                                            <div className="rating">
                                                <img src="assets/images/icons/Star.svg" alt="" />
                                                <img src="assets/images/icons/Star.svg" alt="" />
                                                <img src="assets/images/icons/Star.svg" alt="" />
                                                <img src="assets/images/icons/Star.svg" alt="" />
                                                <img src="assets/images/icons/Star.svg" alt="" />
                                            </div>
                                            <p className="text-midnight-navy">Hike through the forest of Meudon and Viroflay, where wooded paths offer a soothing setting, punctuated by unobstructed views, and invite you to discover the local flora and fauna.</p>
                                        </div>
                                        <h4>Comments</h4>
                                        <div className="feed-footer d-flex">


                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="testimonial-single position-relative">
                                                        <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                            <div className="test-image">
                                                                <img src="https://purchaseitnow.shop/Upload/Profile/6f646c33-1761-4fff-8498-5d7100cd5e96.png" alt="Top Trail" className="user-profile-img" style={{height: '60px', width: '60px'}} />
                                                            </div>
                                                            <div className="test-head">
                                                                <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Virendra Kumar4<span className="d-inline-block mx-1" style={{color: 'gray',fontSize: '14px'}}>•  2 d</span> </h3>
                                                                <p className="mb-0">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="testimonial-single position-relative">
                                                        <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                            <div className="test-image">
                                                                <img src="https://purchaseitnow.shop/Upload/Profile/6f646c33-1761-4fff-8498-5d7100cd5e96.png" alt="Top Trail" className="user-profile-img" style={{height: '60px', width: '60px'}} />
                                                            </div>
                                                            <div className="test-head">
                                                                <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Virendra Kumar4<span className="d-inline-block mx-1" style={{color: 'gray',fontSize: '14px'}}>•  2 d</span> </h3>
                                                                <p className="mb-0">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
       
    );
};

export default BlockedUserSection;

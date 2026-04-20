import React, { useEffect, useState,useCallback } from 'react';
import ProfileLeftSection from './ProfileLeftSection';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { SquareLoader } from "react-spinners"; 
import { Link } from 'react-router-dom';
import { getAuth } from '../utils/storage';
import CommonLoader from './CommonLoader';

const BASE_URL = import.meta.env.VITE_API_URL;
const PROFILE_KEY = "user_profile";

interface FeedProfile {
    id:number,
    mediaType:string,
    mediaUrl:string
}
interface Profile {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}
const ProfilePhotoSection: React.FC = () => {
    const location = useLocation();
    const stateUserId = location.state?.userId;
    // const [userId, setUserId] = useState(stateUserId || localStorage.getItem("userId"));
    const [userId, setUserId] = useState<string>("");
    const [loginId, setLoginId] = useState("");
    const [token, setToken] = useState<string>("");
    const [feedPhotoLoading,setFeedLoading] = useState(true);
    const [getfeedProfie, setFeedProfile ]= useState<FeedProfile[]>([]);
    const [profile,setProfile] = useState<Profile | null>(null);
    const [postVisibleCount, setPostVisibleCount] = useState(6);
    
    
    //console.log(userId);
    // Function to determine if a link is active
    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };
    useEffect(() => {
        const { userId, token ,login} = getAuth();
            if (userId) setUserId(userId);
            if (token) setToken(token);
            if (login) setLoginId(login);
    }, []);
    // useEffect(() => {
    //         // const storedId = sessionStorage.getItem("id");
    //         // const storedId = localStorage.getItem("id");
    //         // console.log("Stored ID:", storedId); // should print the ID string
    //         if (userId) {
    //             // setUserId(storedId); 
    //             setUserId(userId.trim());
    //         }  
    // }, []);
    // useEffect(() => {
    //         // const storeLocal = sessionStorage.getItem("login");
    //         // const storeLocal = localStorage.getItem("login");
    //         //  console.log(storeLocal)
    //         if (loginId) {
    //             setLoginId(loginId);
    //             // setUserID(userId);
    //         }
    // }, []);
    // Show the profile
    useEffect(() => {
        const storedProfile = localStorage.getItem(PROFILE_KEY);
            if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
            }
    }, []);

     // Show Post more 
    const handleShowPostMore = () => {
        setPostVisibleCount((prev) => prev + 4); // Show 2 more each time
    };

    useEffect(() => {
    if (!loginId || !userId) return; // wait until both are set

    const fetchFeedImagesData = async () => {
        try {
            //console.log("Calling POST API with:", { userId, loginId });

            const response = await axios.post(
                `${BASE_URL}/feed/user/Images/${userId}`, 
                { LoginId: loginId }, // body payload
                 {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    } 
                } 
            );

            // console.log('Images response:', response.data);
            setFeedProfile(response.data.data);
        } catch (error: any) {
            console.error(
                "Error fetching community data",
                error.response?.status,      // HTTP status code
                error.response?.data || error.message
            );
        }finally {
        setFeedLoading(false);
        }
    };

    fetchFeedImagesData();
}, [loginId, userId]);


    // useEffect(() => {
    //     if (!loginId) return;  

    //     const fetchFeedImagesData = async () => {
    //         try {
    //         const response = await axios.post(
    //             `${BASE_URL}/Images/${userId}`,
    //             { LoginId: loginId }
    //         );

    //         console.log("image", response.data.data);
    //         } catch (error) {
    //         console.error("Error fetching community data", error.response?.data || error.message);
    //         }
    //     };

    //     fetchFeedImagesData();
    //     }, [loginId]);
    if (feedPhotoLoading) {
            return <CommonLoader />;
        }

    return (
        <main className="mainContent">
            <section className="section-profile-photo inner-dashboard position-relative py-3">
                <div className="container">
                    <div className="row">
                         <ProfileLeftSection/>
                        {/* <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 col-12">
                            <aside className="profile-sidebar sticky-top">
                                <div className="profile-sidebar-top bg-almost-white">
                                    <div className="sidebar-profile">
                                        <div className="profile-img">
                                            <img
                                                src={profile?.picturePath || '/assets/images/not-found.jpg'}
                                                alt="locat not"  
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null; // prevent infinite loop
                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                }}
                                            />
                                          
                                        </div>
                                        <h4 className="profile-username text-midnight-navy">{profile?.fullName ?? ''}</h4>
                                        <h5 className="profile-address text-midnight-navy">{profile?.address ?? ''}</h5>
                                        <p className="membership-info text-grey">Member since {profile?.registeredOn ?? ''}</p>
                                  
                                    </div>
                                    <div className="followings d-flex justify-content-between position-relative">
                                        <div className="follower">
                                            <h6 className="fl-count text-midnight-navy mb-0">{profile?.totalFollowers ?? ''}</h6>
                                            <p className="text-grey mb-0">Followers</p>
                                        </div>
                                        <div className="following">
                                            <h6 className="fl-count text-midnight-navy mb-0">{profile?.totalFollowing ?? ''}</h6>
                                            <p className="text-grey mb-0">Following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-sidebar-menu bg-almost-white">
                                    <ul className="list-unstyled profile-menu">
                                        <li className={isActive('/profile-feed')}><Link to={'/profile-feed'} >Feed</Link></li>
                                        <li className={isActive('/profile-photo')}><Link to={'/profile-photo'}>Photos</Link></li>
                                        <li className={isActive('/report-an-issue')}><Link to={'/report-an-issue'}>Reported an issue</Link></li>
                                        
                                    </ul>
                                </div>
                            </aside>
                        </div> */}
                        <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="profile-inner-card bg-almost-white profile-inner-card-photos br-20">
                                <div className="row profile-photo-row">
                                    {
                                        getfeedProfie.length >0 ?(
                                            <>
                                                {
                                                    getfeedProfie.slice(0, postVisibleCount).map((feedprofile:any,index:number) => (
                                                // getfeedProfie.map((feedprofile:any, index:number)=>(
                                                    <div  key={index} className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="profile-photo-single">
                                                            
                                                            {/* <a href="assets/images/profile/photos/photo-0.jpg" data-fancybox="gallery"> */}
                                                            <a href={feedprofile.mediaUrl} data-fancybox="gallery">
                                                            <img
                                                                src={feedprofile.mediaUrl || '/assets/images/not-found.jpg'}
                                                                alt="Com" className="w-100" 
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                }}
                                                            />
                                                            {/* <img src="assets/images/profile/photos/photo-0.jpg" alt="" className="w-100" /> */}
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
                                                {postVisibleCount < getfeedProfie.length && (
                                                    <div className="row">
                                                        <div className="col-12 text-end">
                                                            <button
                                                            style={{textDecoration:'none', marginBottom:'10px',float:'right'}}
                                                            className="btn btn-link text-orange fw-bold ms-1"
                                                            onClick={handleShowPostMore}
                                                            >
                                                            Show more... 
                                                            </button>
                                                        </div>
                                                    </div>   
                                                )}
                                            </>
                                        ):(
                                            <p>Not available! </p>
                                        )
                                    }
                                    

                                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="profile-photo-single">
                                            <a href="assets/images/profile/photos/photo-01.jpg" data-fancybox="gallery"><img src="assets/images/profile/photos/photo-01.jpg" alt="" className="w-100" /></a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="profile-photo-single">
                                            <a href="assets/images/profile/photos/photo-1.jpg" data-fancybox="gallery"><img src="assets/images/profile/photos/photo-1.jpg" alt="" className="w-100" /></a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="profile-photo-single">
                                            <a href="assets/images/profile/photos/photo-2.jpg" data-fancybox="gallery"><img src="assets/images/profile/photos/photo-2.jpg" alt="" className="w-100" /></a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="profile-photo-single">
                                            <a href="assets/images/profile/photos/photo-3.jpg" data-fancybox="gallery"><img src="assets/images/profile/photos/photo-3.jpg" alt="" className="w-100" /></a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="profile-photo-single">
                                            <a href="assets/images/profile/photos/photo-4.jpg" data-fancybox="gallery"><img src="assets/images/profile/photos/photo-4.jpg" alt="" className="w-100" /></a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

  );
};

export default ProfilePhotoSection;
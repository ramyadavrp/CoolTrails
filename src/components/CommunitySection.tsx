// src/components/CommunitySection.tsx
import React, { useEffect, useState,useCallback } from 'react';
import 'owl.carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';  
import ProfileLeftSection from './ProfileLeftSection';
import { SquareLoader } from "react-spinners"; 
import StarRating from './AffiliateDetails/StarRating';

// import data from '../data/community.json';
import { decodeId,encodeId, generateSlug ,slugToTitle} from '../utils/helpers';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Community{
    member_name:string,
    member_country:string,
    member_image:string
}


interface ProfileCommunity{
    p_image:string,
    p_name:string,
    id:string,
    address:string,
    member:string,
    followers:number,
    following:number
}
interface suggestedNearby{
    id:number,
    name:string,
    slug:string,
    date:string,
    logo:string,
    image_near:string,
    title:string,
    rating:number,
    comment_count:number,
    share_count:number,
    description:string
}
const CommunitySection: React.FC = () => {
    const [CommunityLoading,setCommunityLoading] = useState(true);
    const [getCommunity, setCommunity ]= useState<Community[]>([]);
    const [getSuggestedNearby, setSuggestedNearby ]= useState<suggestedNearby[]>([]);
    const [getProfileCommunity, setProfileCommunity ]= useState<ProfileCommunity[]>([]);
    // LIKE
    const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
    const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
    const [getFollow, setFollow] = useState<{ [key: number]: boolean }>({});
    // const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    // state for loading per post
    const [loading, setLoading] = useState<Record<number, boolean>>({});



    // const [loginId, setLoginId] = useState<string | null>(null)
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    
    // window.scrollTo(0,0);
    useEffect(()=>{
        const timer = setTimeout(()=>
            setCommunityLoading(false),3000);
        return()=>clearTimeout(timer);
    },[])
    useEffect(() => {
        const storedId = localStorage.getItem("id");
        // console.log("Stored ID:", storedId); // should print the ID string
        if (storedId) {
            // setUserId(storedId); 
            setUserId(storedId.trim());
        }  
    }, []);
    useEffect(() => {
        const storeLocal = localStorage.getItem("login");
         console.log(storeLocal)
        if (storeLocal) {
            setLoginId(storeLocal);
            // setUserID(userId);
        }
    }, []);
    // console.log('uu',setLoginId);
    useEffect(() => {
        if (!loginId) return;  // wait until loginId is set

        const fetchCommunityData = async () => {
            try {
            const response = await axios.post(`${BASE_URL}/user/community`, {
                LoginId: loginId,
            });

            console.log('community',response.data.data);
            const apidata = response.data.data;
            // console.log(apidata);
            const members = response.data.data.suggested_members || []
            setCommunity(response.data.data.suggested_members || []);
            // Initialize follow state
            const initialFollow: { [key: string]: boolean } = {};
            
            members.forEach((it: { id: string; do_follow?: boolean }) => {
                initialFollow[it.id] = it.do_follow || false;
            });
            setFollow(initialFollow);
            setSuggestedNearby(apidata.suggested_nearby || []);
            
            setProfileCommunity(response.data.data.profile_Community || []);
            // console.log('ddd',apidata.suggested_nearby);
            
             // initialize like counts & liked status for suggested_nearby
            if (Array.isArray(apidata.suggested_nearby)) {
                const initialCounts: { [key: number]: number } = {};
                const initialLiked: { [key: number]: boolean } = {};

                apidata.suggested_nearby.forEach((item: any) => {
                initialCounts[item.id] = item.like_count || 0;
                initialLiked[item.id] = item.do_like || false; // if backend sends this
               
                });

                setLikeCounts(initialCounts);
                setLikedPosts(initialLiked);
            }

            } catch (error) {
            console.error("Error fetching community data", error.response?.data || error);
            } finally {
            setCommunityLoading(false);
            }
        };

        fetchCommunityData();
    }, [loginId]);
    // console.log('ddd',getSuggestedNearby);
    //  console.log("Dynamic userId value:", userId, typeof userId);
    // const userID = "e08ee354-20e2-4af6-a37f-c30127cf322d" ;
     
    const LikeHandle = useCallback(async (id: number) => {
         setLoading(prev => ({ ...prev, [id]: true }));
        if (id !== 0) {
            // prevent double-like on frontend (optional safeguard)
            if (likedPosts[id]) {
                // alert("You already liked this post!");
                return;
            }

            try {
                const response = await axios.post(
                    `${BASE_URL}/feed/like`,
                    {
                        PostId: id,
                        UserId: userId, 
                        // UserId: "e08ee354-20e2-4af6-a37f-c30127cf322d", 
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );

                // console.log("API Response:", response.data);

                if (response.data.status === "success") {
                    // ✅ user just liked
                    setLikedPosts((prev) => ({
                        ...prev,
                        [id]: true,
                    }));

                    setLikeCounts((prev) => ({
                        ...prev,
                        [id]: (prev[id] || 0) + 1,
                    }));
                } else if (response.data.status === "already") {
                    // alert("You already liked this post!");
                } else {
                    console.warn("Unhandled response:", response.data);
                }
            } catch (error) {
                console.error("Error liking post", error);
            } finally {
                setCommunityLoading(false);
                 setLoading(prev => ({ ...prev, [id]: true }));
            }
        }
    }, [BASE_URL, likedPosts]); 


    const handleFollow = useCallback(async (id: number) => {
        if(id !==0){
            // alert(id);
            try{
                const response = await axios.post(
                    `${BASE_URL}/user/follow`,
                    {
                        FollowerId: id,
                        UserId: userId, 
                        
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                 console.log("API follow Response:", response.data);
                if (response.data.status === "success") {
                    setFollow((prev) => ({
                        ...prev,
                        [id]: response.data.do_follow, // true = Following, false = Follow
                    }));
                } else {
                    console.warn("Unhandled response:", response.data);
                }
            }catch (error) {
                //console.error("Error liking post", error);
            }finally{

            }
        }
    }, [userId]);
    
    
    const handleShare = async (id:any) => {
        try {
        const response = await axios.post(`${BASE_URL}/feed/share`, {
            PostId: id,
            UserId: userId
        }, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Share response:", response.data);
        //alert("Post shared successfully!");
        } catch (error) {
        console.error("Error sharing post:", error);
        alert("Failed to share post.");
        }
    };


    // useEffect(()=>{
    //         const fetchCommunityData= async () => {
    //             try {
    //                 const response = await fetch('/data/community.json'); 
    //                 const json: Community[] = await response.json();
    //                 setCommunity(json.suggested_members);
    //                 setSuggestedNearby(json.suggested_nearby);
    //                 setProfileCommunity(json.profile_Community);
                    
    //             }catch (error) {
    //             console.error('Error fetching JSON:', error);
    //         }
    //         };
    //         fetchCommunityData();
    // },[]);
    //  console.log('ddd',getSuggestedNearby);


    useEffect(() => {
        // Initialize Owl Carousel only after data is loaded and component has rendered
        const $owlElement = $('#suggestedMembers');
        if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
        $owlElement.owlCarousel({
            dots: false,
            nav: false,
            //  autoplayHoverPause: true,
            autoplayTimeout: 4000,
            autoplay: false,
            items: 3,
            loop: false, lazyLoad: true,
            margin: 10,
            responsiveClass: true,
            stagePadding: 60, 
            responsive: {
            0: {
                items: 1,
                stagePadding: 15,
                margin: 10,
            },
            576: {
                items: 2,
                stagePadding: 35,
            },
            768: {
                items: 3,
                stagePadding: 35,
            },
            992: {
                items: 3
            },
            1200: {
                items: 3
            },
            1300: {
                items: 3
            },
            1400: {
                items: 3
            }
            }
            
        });

        // Cleanup function: destroy Owl Carousel instance when component unmounts
        return () => {
            if ($owlElement.data('owl.carousel')) {
            $owlElement.owlCarousel('destroy');
            }
        };
        }

    });
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
            <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 px-0 order-xl-first order-lg-first order-md-first order-sm-last order-last">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="suggested-member-title">
                                            <h1 className="smc-title text-midnight-navy">Suggested members</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="suggested-members-container">
                                {/* <!-- <div className="sm-box"> --> */}
                                <div className="owl-carousel owl-theme" id="suggestedMembers">
                                    {
                                        getCommunity.length> 0 ?(
                                            getCommunity.map((getCom:any,index:number)=>(
                                                <div key={index} className="suggested-member-single bg-almost-white d-flex align-items-center">
                                                    <div className="sms-img">
                                                        
                                                        <img
                                                            src={getCom.member_image || '/assets/images/not-found.jpg'}
                                                            alt="Com" className="img-fluid img-fixed-size" 
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                const target = e.currentTarget;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                            }}
                                                        />
                                                        {/* <img src="assets/images/profile/suggested-members/1.png" alt="" /> */}
                                                    </div>
                                                    <div className="sms-dt">
                                                        <p className="mb-0 text-midnight-navy sms-dt-title">{getCom.member_name ?? 'N/A'}</p>
                                                        <p className="mb-0 text-grey sms-dt-location">{getCom.member_country ?? 'N/A'}</p>
                                                    </div>
                                                    <div className="sms-btn d-flex align-items-center">
                                                        <button 
                                                        onClick={()=>handleFollow(getCom.id)}
                                                        className="btn-style-1">{getFollow[getCom.id] ? "Following" : "Follow"}</button>
                                                        <a href="" title="cancle">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M18 6L6 18" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M6 6L18 18" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        ):(
                                            <p>Not Available !</p>
                                        )
                                    }
                                    
                                    {/* <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/2.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Rekish</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/3.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Laila</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/4.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Rahul Singh</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/1.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Anna B</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/2.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Rekish</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/3.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Laila</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="suggested-member-single bg-almost-white d-flex align-items-center">
                                        <div className="sms-img">
                                            <img src="assets/images/profile/suggested-members/4.png" alt="" />
                                        </div>
                                        <div className="sms-dt">
                                            <p className="mb-0 text-midnight-navy sms-dt-title">Rahul Singh</p>
                                            <p className="mb-0 text-grey sms-dt-location">Dubai</p>
                                        </div>
                                        <div className="sms-btn d-flex align-items-center">
                                            <button className="btn-style-1">Follow</button>
                                            <a href="" title="cancle">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M6 6L18 18" stroke="#717171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 order-xl-last order-lg-last order-md-last order-sm-first order-first">
                            <div className="container container-full-width">
                                <div className="row">
                                    <div className="col-xl-9 col-lg-7 col-md-6 col-sm-12 col-12 order-xl-first order-lg-first order-md-first order-sm-last order-last">
                                        <div className="profile-inner-card bg-almost-white br-20 profile-community-card mb-4">
                                            <ul className="nav nav-pills community-tab" id="pills-tab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="active" id="nearby-tab" data-bs-toggle="pill" data-bs-target="#nearby" type="button" role="tab" aria-controls="nearby" aria-selected="true">Nearby</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="" id="followings-tab" data-bs-toggle="pill" data-bs-target="#followings" type="button" role="tab" aria-controls="followings" aria-selected="false">Following</button>
                                                </li>
                                            </ul>

                                            <div className="tab-content mb-4" id="pills-tabContent">
                                                <div className="tab-pane fade show active" id="nearby" role="tabpanel" aria-labelledby="nearby-tab" tabIndex={0}>
                                                    {
                                                      getSuggestedNearby.length> 0 ?(
                                                        getSuggestedNearby.map((getSug,index)=>(
                                                            <div key={index} className="single-feed position-relative">
                                                                <div className="feed-head d-flex justify-content-between">
                                                                    <div className="feed-user-info d-flex align-items-center">
                                                                        <a href="">
                                                                            <img
                                                                                src={getSug.logo || '/assets/images/not-found.jpg'}
                                                                                alt="locat not" className="profile-sm rounded-circle" 
                                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                                    const target = e.currentTarget;
                                                                                    target.onerror = null; // prevent infinite loop
                                                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                                }}
                                                                            />
                                                                            {/* <img src="assets/images/profile/thomas.png" alt="" className="profile-sm rounded-circle" /> */}
                                                                        </a>
                                                                        <a href="" className="fui">
                                                                            <span className="fui-name text-midnight-navy mb-0">{getSug.name ?? 'N/A'}</span>
                                                                            <span className="mb-0 fui-date d-block">{getSug.date ?? 'N/A'}</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="user-feed-options dropdown dropdown-no-arrow">
                                                                        <a className="dropdown-toggle text-midnight-navy" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i className="bi bi-three-dots"></i>
                                                                        </a>
                                                                        <ul className="dropdown-menu dropdown-sm dropdown-rounded custom-dropdown">
                                                                            <li><a className="dropdown-item" href="#">Report an issue</a></li>
                                                                            <li><a className="dropdown-item" href="#">Block</a></li>
                                                                            {/* <li><a className="dropdown-item" href="#">Action 2</a></li> */}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="feed-image">
                                                     
                                                                    <Link to={`/explore/recording/${generateSlug(getSug.title)}`} className="d-block">
                                                                        <img
                                                                            src={getSug.image_near || '/assets/images/not-found.jpg'}
                                                                            alt="not" className="w-100 br-20" 
                                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                                const target = e.currentTarget;
                                                                                target.onerror = null; // prevent infinite loop
                                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                            }}
                                                                        />
                                                                        {/* <img src="assets/images/profile/feed/feed-img-1.png" alt="" className="w-100 br-20" /> */}
                                                                    </Link>
                                                                </div>
                                                                <div className="feed-info">
                                                                    <Link to={`/explore/recording/${generateSlug(getSug.title)}`} >
                                                                        <h6 className="feed-title text-midnight-navy">{getSug.title ?? 'N/A'}</h6>
                                                                    </Link>
                                                                    <div className="rating">
                                                                        {
                                                                            getSug.rating > 0 ?(
                                                                                <StarRating rating={Number(getSug.rating)}/>
                                                                            ):(
                                                                                <p></p>
                                                                            )
                                                                        }
                                                                        
                                                                        {/* <img src="/assets/images/icons/Star.svg" alt="" />
                                                                        <img src="/assets/images/icons/Star.svg" alt="" />
                                                                        <img src="/assets/images/icons/Star.svg" alt="" />
                                                                        <img src="/assets/images/icons/Star.svg" alt="" />
                                                                        <img src="/assets/images/icons/Star.svg" alt="" /> */}
                                                                    </div>
                                                                    <p className="text-midnight-navy">
                                                                        {getSug.description ?? 'N/A'}
                                                                    </p>
                                                                </div>
                                                                <div className="feed-footer d-flex">
                                                                   <button
                                                                            key={getSug.id}
                                                                            disabled={Boolean(loading[getSug.id] || likedPosts[getSug.id])}
                                                                            onClick={() => LikeHandle(getSug.id)}
                                                                            className="like-btn"
                                                                            style={{
                                                                            background: "transparent",
                                                                            padding: "6px 12px",
                                                                            cursor: loading[getSug.id] || likedPosts[getSug.id] ? "":"pointer",
                                                                            opacity: loading[getSug.id] || likedPosts[getSug.id] ? 0.6 : 1,
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
                                                                            fill={likedPosts[getSug.id] ? "#FC673C" : "#7D7D7D"}
                                                                            />
                                                                        </svg>{likeCounts[getSug.id] || 0} {likedPosts[getSug.id] ? "Liked" : "Like"}
                                                                        {/* {getSug.like_count || 0} {likedPosts[getSug.id] ? "Liked" : "Like"}  */}
                                                                        {/* {likeCounts[getSug.id] || 0} {likedPosts[getSug.id] ? "Liked" : "Like"} */}
                                                                    </button>

                                                                    
                                                                    <button className="comment-btn">
                                                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M3.69445 11.0675H15.3056V10.0135H3.69445V11.0675ZM3.69445 7.90537H15.3056V6.85132H3.69445V7.90537ZM3.69445 4.74322H15.3056V3.68917H3.69445V4.74322ZM19 18L15.7521 14.7567H1.70578C1.21952 14.7567 0.813484 14.5944 0.487669 14.2697C0.161854 13.9451 -0.000701429 13.54 2.27491e-06 13.0544V1.70229C2.27491e-06 1.21743 0.16291 0.812323 0.488724 0.486973C0.814539 0.161623 1.21987 -0.000700428 1.70472 2.27166e-06H17.2953C17.7808 2.27166e-06 18.1862 0.162326 18.5113 0.486973C18.8364 0.81162 18.9993 1.21673 19 1.70229V18ZM1.70578 13.7026H16.2028L17.9444 15.4355V1.70335C17.9444 1.54102 17.8769 1.39205 17.7418 1.25643C17.6067 1.12081 17.4578 1.05335 17.2953 1.05405H1.70472C1.54287 1.05405 1.39404 1.12151 1.25822 1.25643C1.12241 1.39135 1.05485 1.53997 1.05556 1.70229V13.0544C1.05556 13.216 1.12311 13.3646 1.25822 13.5003C1.39334 13.6359 1.54217 13.7033 1.70472 13.7026"
                                                                                fill="#7D7D7D"
                                                                            />
                                                                        </svg>
                                                                        <Link to={`/explore/recording/${getSug.slug}`} 
                                                                        state={{ postId: getSug.id }}   
                                                                        className="dropdown-item">
                                                                            {(getSug.comment_count) || 0} Comment 
                                                                        </Link>
                                                                                                    
                                                                        
                                                                    </button>
                                                                    <button 
                                                                    onClick={()=> handleShare(getSug.id)}
                                                                    className="share-btn">
                                                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M20.4601 7.96745L12.4501 1.32995C12.2278 1.14185 11.9555 1.02254 11.6665 0.986577C11.3775 0.950618 11.0842 0.999567 10.8226 1.12745C10.5648 1.2485 10.3468 1.44044 10.194 1.68083C10.0413 1.92123 9.96015 2.20014 9.96009 2.48495V3.98495C7.04123 5.00521 4.51317 6.91027 2.72794 9.43487C0.942708 11.9595 -0.0108345 14.9779 9.28794e-05 18.0699C-0.000854163 18.8512 0.0618532 19.6313 0.187593 20.4024C0.212056 20.5575 0.284563 20.701 0.394897 20.8127C0.505231 20.9244 0.647828 20.9986 0.802593 21.0249H0.930093C1.06577 21.0246 1.19881 20.9874 1.31504 20.9174C1.43126 20.8474 1.52632 20.7472 1.59009 20.6274C2.44778 19.0138 3.63682 17.5997 5.07928 16.4778C6.52173 15.3559 8.18501 14.5515 9.96009 14.1174V15.7374C9.96015 16.0223 10.0413 16.3012 10.194 16.5416C10.3468 16.782 10.5648 16.9739 10.8226 17.0949C11.029 17.1924 11.2543 17.2436 11.4826 17.2449C11.8375 17.2432 12.1803 17.1156 12.4501 16.8849L16.0951 13.8849L16.1626 13.8324L20.4601 10.2699C20.6273 10.1291 20.7618 9.95349 20.854 9.75527C20.9463 9.55706 20.994 9.34107 20.994 9.12245C20.994 8.90382 20.9463 8.68784 20.854 8.48963C20.7618 8.29141 20.6273 8.11575 20.4601 7.97495V7.96745ZM15.2626 12.6174L15.1951 12.6699L11.4451 15.7449V13.1799C11.4494 13.1602 11.4494 13.1397 11.4451 13.1199C11.4451 13.1199 11.4451 13.0749 11.4451 13.0524C11.4451 13.0299 11.4451 12.9999 11.4076 12.9699C11.3934 12.9237 11.3758 12.8786 11.3551 12.8349C11.3279 12.7887 11.2923 12.748 11.2501 12.7149C11.2263 12.6773 11.1958 12.6442 11.1601 12.6174C11.1208 12.5831 11.0781 12.5529 11.0326 12.5274L10.9201 12.4749H10.7551H10.6801H10.6201H10.5526C6.94145 13.0978 3.70388 15.0747 1.50009 18.0024C1.50308 15.1499 2.41916 12.3733 4.11423 10.079C5.80929 7.7847 8.19431 6.09331 10.9201 5.25245H10.9576C11.0071 5.23451 11.0548 5.21191 11.1001 5.18495C11.1527 5.15668 11.2029 5.12407 11.2501 5.08745L11.3401 4.98245C11.3719 4.94716 11.3973 4.90654 11.4151 4.86245C11.4346 4.82167 11.4497 4.77892 11.4601 4.73495C11.4643 4.68254 11.4643 4.62986 11.4601 4.57745V2.52245L19.5001 9.11495L15.2626 12.6174Z"
                                                                                fill="#7D7D7D"
                                                                            />
                                                                        </svg>
                                                                        {(getSug.share_count) || 0}  Share
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                        
                                                      ):(
                                                         <p>not found</p>
                                                      )  
                                                    }
                                                    
                                                    {/* <div className="single-feed position-relative">
                                                        <div className="feed-head d-flex justify-content-between">
                                                            <div className="feed-user-info d-flex align-items-center">
                                                                <a href="">
                                                                    <img src="assets/images/profile/james.png" alt="" className="profile-sm rounded-circle" />
                                                                </a>
                                                                <a href="" className="fui">
                                                                    <span className="fui-name text-midnight-navy mb-0">James</span>
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
                                                            <p className="text-midnight-navy">
                                                                Hike through the forest of Meudon and Viroflay, where wooded paths offer a soothing setting, punctuated by unobstructed views, and invite you to discover the local flora and fauna.
                                                            </p>
                                                        </div>
                                                        <div className="feed-footer d-flex">
                                                            <button className="like-btn">
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M2.32083 3.55228C1.54093 4.54475 1.06838 5.90073 1.06838 7.31638C1.06838 10.4899 3.18627 13.1538 5.42249 15.071C6.52965 16.0202 7.63942 16.7633 8.47356 17.2694C8.89001 17.5221 9.23633 17.7148 9.47719 17.8437C9.52521 17.8694 9.56902 17.8926 9.60833 17.9131C9.64866 17.8909 9.6937 17.8658 9.74322 17.8379C9.98467 17.7017 10.3316 17.499 10.7488 17.2351C11.5842 16.7066 12.6957 15.9365 13.8047 14.9685C16.049 13.0096 18.1624 10.3462 18.1624 7.31638C18.1624 5.90094 17.6899 4.54496 16.91 3.55244C16.1327 2.56318 15.0713 1.95607 13.8722 1.95607C12.2147 1.95607 10.9292 3.03556 10.0949 4.73481L9.61539 5.71147L9.1359 4.73481C8.30155 3.03545 7.01597 1.95607 5.35855 1.95607C4.15962 1.95607 3.09813 2.56307 2.32083 3.55228ZM9.61539 18.5159C9.38365 18.9972 9.38328 18.997 9.38328 18.997L9.38088 18.9959L9.37479 18.9929L9.35294 18.9822C9.33413 18.9729 9.307 18.9594 9.27206 18.9417C9.20214 18.9063 9.10102 18.8541 8.97313 18.7857C8.71741 18.6489 8.35422 18.4467 7.91934 18.1828C7.05075 17.6558 5.89022 16.8793 4.72708 15.8821C2.4227 13.9064 0 10.9706 0 7.31638C0 5.67359 0.545529 4.08235 1.48078 2.89218C2.41859 1.69872 3.76928 0.887695 5.35855 0.887695C7.23013 0.887695 8.65337 1.9365 9.61539 3.41643C10.5774 1.93657 12.0006 0.887695 13.8722 0.887695C15.4616 0.887695 16.8123 1.69886 17.7501 2.89234C18.6853 4.08262 19.2308 5.67386 19.2308 7.31638C19.2308 10.8327 16.8036 13.7691 14.5073 15.7734C13.3459 16.787 12.1872 17.5893 11.3199 18.138C10.8857 18.4126 10.5231 18.6246 10.268 18.7685C10.1404 18.8404 10.0395 18.8954 9.96987 18.9328C9.9351 18.9515 9.90807 18.9657 9.88937 18.9755L9.86773 18.9868L9.8617 18.9899L9.85994 18.9908L9.85935 18.9911C9.85935 18.9911 9.85897 18.9913 9.61539 18.5159ZM9.61539 18.5159L9.85935 18.9911L9.62281 19.1123L9.38328 18.997L9.61539 18.5159Z"
                                                                        fill="#7D7D7D"
                                                                    />
                                                                </svg>
                                                                Like
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
                                                    </div> */}
                                                </div>
                                                <div className="tab-pane fade" id="followings" role="tabpanel" aria-labelledby="followings-tab" tabIndex={0}>...</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <ProfileLeftSection/> */}
                                    <div className="col-xl-3 col-lg-5 col-md-6 col-sm-12 col-12 order-xl-last order-lg-last order-md-last order-sm-first order-first">
                                        <aside className="profile-sidebar sticky-top" id="profile-sidebar-community">
                                            {
                                                getProfileCommunity.map((pr,index)=>(
                                                    <div key={index} className="profile-sidebar-top  bg-almost-white">
                                                        <div className="sidebar-profile">
                                                            <div className="profile-img">
                                                                {/* <img src="assets/images/profile/profile-md.png" alt="" /> */}
                                                                <img
                                                                    src={pr.p_image || '/assets/images/not-found.jpg'}
                                                                    alt="locat not"  
                                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                        const target = e.currentTarget;
                                                                        target.onerror = null; // prevent infinite loop
                                                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className="profile-dt">
                                                                <h4 className="profile-username text-midnight-navy">{pr.p_name ?? ''} </h4>
                                                                <h5 className="profile-address text-midnight-navy">{pr.address ?? ''}</h5>
                                                                <p className="membership-info text-grey">{pr.member ?? '' }</p>
                                                            </div>
                                                        </div>
                                                        <div className="followings d-flex justify-content-between position-relative">
                                                            <div className="follower">
                                                                <h6 className="fl-count text-midnight-navy mb-0">{pr.followers ?? '' }</h6>
                                                                <p className="text-grey mb-0">Followers</p>
                                                            </div>
                                                            <div className="following">
                                                                <h6 className="fl-count text-midnight-navy mb-0">{pr.following ?? '' }</h6>
                                                                <p className="text-grey mb-0">Following</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            
                                            <div className="profile-sidebar-menu  bg-almost-white">
                                                <ul className="list-unstyled profile-menu">
                                                    <li className="active">
                                                        <Link to={'/profile-feed'}>
                                                            Feed
                                                        </Link>
                                                        {/* <a href="profile-feed.html">Feed</a> */}
                                                    </li>
                                                    <li>
                                                        <Link    state={{ userId: getProfileCommunity?.[0]?.id }}  to={'/profile-photo'}>
                                                            Photos
                                                        </Link>
                                                        {/* <a href="profile-photos.html">Photos</a> */}
                                                    </li>
                                                    <li><a href="">Reviews</a></li>
                                                    <li><a href="">Activities</a></li>
                                                    <li><a href="">Completed</a></li>
                                                </ul>
                                                <button className="btn-style-1">Share a Post</button>
                                            </div>
                                        </aside>
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

export default CommunitySection;

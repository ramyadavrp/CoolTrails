// src/components/ReviewSection.tsx
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import 'owl.carousel'; // Import OwlCarousel's JS (ensure this path is correct)
import { Link ,useNavigate} from 'react-router-dom';
// IMPORTANT: Make sure these CSS imports are present either here or in your main.tsx
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { SyncLoader } from "react-spinners";
const BASE_URL = import.meta.env.VITE_API_URL;

// Declare jQuery globally for TypeScript
declare global {
  interface Window {
    $: JQuery;
    jQuery: JQuery;
  }
}


const ReviewSection: React.FC = () => {
    const [btnText, setBtnText] = useState("Follow");
    const [explorers, setExplorers] = useState([]);
    const [loadingExplorers, setLoadingExplorers] = useState(true);
    const [errorExplorers, setErrorExplorers] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
   
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!isLoggedIn) {
            // not logged in → go to login page
            navigate("/login");
            return;
        }

        // logged in → navigate home
        if (location.pathname !== "/") {
            navigate("/", { replace: true });
            // small delay so homepage mounts before scroll
            setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
        } else {
            // already on home → just scroll
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // optionally update button text or call API
        // setBtnText("Following");
        // axios.post("/api/follow", { profileId });
    };
    // Effect to fetch data
    useEffect(() => {
        const fetchtopExplorers = async ()=>{
            try{
                const response = await axios.get(`${BASE_URL}/trail/FellowExplorers/2`);
                //console.log(response.data.data);
                setExplorers(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorExplorers('Unable to fetch adventure');
            } finally{
                setLoadingExplorers(false);
            }
        };
        fetchtopExplorers();  
    }, []);
     //console.log(explorers);

    // Create refs for your slider elements
    const followSl1Ref = useRef<HTMLDivElement>(null);
    const followSl2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const initSlickSlider = (ref: React.RefObject<HTMLDivElement>, options: object) => {
                if (ref.current && window.$ && typeof window.$.fn.slick === 'function') {
                    if (!window.$(ref.current).hasClass('slick-initialized')) {
                        window.$(ref.current).slick(options);
                    }
                } else {
                    console.warn("jQuery or Slick Carousel is not defined or ref is null.");
                }
            };
            // Initialize the first slider
            initSlickSlider(followSl1Ref, {
                centerMode: true,
                centerPadding: '80px',
                slidesToShow: 3,
                dots: false,
                arrows: false,
                cssEase: 'linear',
                infinite: true,
                autoplay: true,
                autoplaySpeed: 0, 
                speed: 15000,
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 3, centerPadding: '10px' } },
                    { breakpoint: 1023, settings: { slidesToShow: 2, centerPadding: '30px' } },
                    { breakpoint: 991, settings: { slidesToShow: 2, centerPadding: '30px' } },
                    { breakpoint: 767, settings: { slidesToShow: 1, centerPadding: '50px' } },
                    { breakpoint: 576, settings: { slidesToShow: 1, centerPadding: '10px' } },
                    { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '10px' } }
                ]
            });
            // Initialize the 2nd slider
            initSlickSlider(followSl2Ref, { 
                centerMode: true,
                centerPadding: '80px',
                slidesToShow: 3,
                dots: false,
                arrows: false,
                cssEase: 'linear',
                infinite: true,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 15000,
                pauseOnHover: true,
                pauseOnFocus: true,
                rtl: true,
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 3, centerPadding: '10px' } },
                    { breakpoint: 1023, settings: { slidesToShow: 2, centerPadding: '30px' } },
                    { breakpoint: 991, settings: { slidesToShow: 2, centerPadding: '30px' } },
                    { breakpoint: 767, settings: { slidesToShow: 1, centerPadding: '50px' } },
                    { breakpoint: 576, settings: { slidesToShow: 1, centerPadding: '10px' } },
                    { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '10px' } }
                ]
            });
        }, 100);

        return () => {
            clearTimeout(timeout);
                const destroySlickSlider = (ref: React.RefObject<HTMLDivElement>) => {
                    if (ref.current && window.$ && typeof window.$.fn?.slick === 'function') {
                        // Check if slick is initialized before unslicking
                        if (window.$(ref.current).hasClass('slick-initialized')) {
                            try {
                                window.$(ref.current).slick('unslick');
                            } catch (e) {
                                console.error("Error unslicking slider:", e);
                            }
                        }
                    }
                };
                destroySlickSlider(followSl1Ref);
                destroySlickSlider(followSl2Ref);
        };
    }, [explorers]);// Empty dependency array ensures this effect runs only once after initial render
   
    if (errorExplorers) return <p>{errorExplorers}</p>;
    if (loadingExplorers) {
        return (
            <div className="section-fellow-explorers d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
            <SyncLoader color="#FC673C" size={20} />
            </div>
        );
    }
    if (explorers.length === 0) return <p>No data found.</p>;
    return (
        <section className="section-fellow-explorers">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title text-center">
                            <h2 className="title">Follow Fellow <span>Explorers</span></h2>
                            <p className="mb-4">Stay inspired by following hikers, bikers, and nature lovers who share your
                                passion for adventure.</p>
                                <Link to={'/community'} className="btn-style-3">
                                        Explore the Community
                                </Link>
                            {/* <a href="" className="btn-style-3">Explore the Community</a> */}
                        </div>
                    </div>
                </div>  
                <div className="row">
                    <div className="col-12 px-0">
                        <div className="position-relative">
                            {/* Attach the ref to the slider container */}
                            <div className="follow-fellow-slider" id="followSl-1" ref={followSl1Ref}>
                                {explorers.map((explorer:any,index:number) => (
                                    <div key={`${explorer.userId}-${index}`}> {/* Add unique key here */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative">
                                            <div className="ff-thumb">
                                                <img
                                                    src={explorer.picturePath  || '/assets/images/not-found.jpg'}
                                                    alt="explorer" className="" 
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                        const target = e.currentTarget;
                                                        target.onerror = null; // prevent infinite loop
                                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                                    }}
                                                />
                                                
                                            </div>  
                                            
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.fullName}</h3>
                                                <p>{explorer.address} Member since&nbsp;{explorer.registeredOn} </p>
                                                
                                                <a href="#"
                                                 onClick={handleFollow}
                                                  className="btn-style-1 stretched-link">{btnText}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Duplicate explorers for the second carousel to ensure enough items for continuous scroll */}
                                {explorers.map((explorer:any,index:number) => (
                                    <div key={`dup1-${explorer.userId}-${index}`}> {/* Unique key for duplicated items */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative">
                                            <div className="ff-thumb">
                                            <img
                                                src={explorer.picturePath  || '/assets/images/not-found.jpg'}
                                                alt="explorer" className="" 
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null; // prevent infinite loop
                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                }}
                                            />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.fullName}</h3>
                                                <p>{explorer.address} Member since&nbsp;{explorer.registeredOn} </p>
                                                <a href="#" onClick={handleFollow} className="btn-style-1 stretched-link">{btnText}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* second */}
                    <div className="col-12 px-0">
                        <div className="position-relative" dir="rtl">
                            {/* Attach the ref to the second slider container */}
                            <div className="follow-fellow-slider" id="followSl-2" ref={followSl2Ref}>
                                {explorers.map((explorer:any,index:number) => (
                                    <div key={`2-${explorer.userId}-${index}`}> {/* Unique key for second carousel */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative"
                                            dir="rtl">
                                            <div className="ff-thumb">
                                            <img
                                                src={explorer.picturePath  || '/assets/images/not-found.jpg'}
                                                alt="explorer" className="" 
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null; // prevent infinite loop
                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                }}
                                            />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.fullName}</h3>
                                                <p>{explorer.address} Member since&nbsp;{explorer.registeredOn} </p>
                                                 <a href="#" onClick={handleFollow} className="btn-style-1 stretched-link">{btnText}</a>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Duplicate explorers for the second carousel to ensure enough items for continuous scroll */}
                                {explorers.map((explorer:any,index:number) => (
                                    <div key={`dup2-${explorer.userId}-${index}`}> {/* Unique key for duplicated items in second carousel */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative"
                                            dir="rtl">
                                            <div className="ff-thumb">
                                            <img
                                                src={explorer.picturePath  || '/assets/images/not-found.jpg'}
                                                alt="explorer" className="" 
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null; // prevent infinite loop
                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                }}
                                            />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.fullName}</h3>
                                                <p>{explorer.address} Member since&nbsp;{explorer.registeredOn} </p>
                                                <a href="#" onClick={handleFollow} className="btn-style-1 stretched-link">{btnText}</a>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
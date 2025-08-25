// src/components/ShareAdventure.tsx
import React, { useEffect, useState } from 'react';
import 'owl.carousel'; // Import OwlCarousel's JS (ensure this path is correct)
import axios from 'axios';
// IMPORTANT: Make sure these CSS imports are present either here or in your main.tsx
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { SyncLoader } from "react-spinners";

const BASE_URL = import.meta.env.VITE_API_URL;
//const BASE_URL = 'https://api.cooltrails.purchaseitnow.shop/api/home/topadventurecategory';
const ShareAdventure: React.FC = () => {
    const [shareAdventure, setAdventure] = useState([]);
    const [loadingAdventure, setLoadingAdventure] = useState(true);
    const [errorAdventure, setErrorAdventure] = useState('');
    
    // Effect to fetch data
    useEffect(() => {
        const fetchtopAdventure = async ()=>{
            try{
                const response = await axios.get(`${BASE_URL}/home/adventurelist/15`);
                setAdventure(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorAdventure('Unable to fetch adventure');
            } finally{
                setLoadingAdventure(false);
            }
        };
        fetchtopAdventure();
    }, []);
    

    useEffect(() => {
        // Initialize Owl Carousel only after data is loaded and component has rendered
        //if (!loadingAdventure && shareAdventure.length > 0) {
            // Ensure the DOM element exists before initializing
            const $owlElement = $('#adventureSider');
            if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
            $owlElement.owlCarousel({
                dots: false,
                nav: false,
                //  autoplayHoverPause: true,
                autoplayTimeout: 4000,
                autoplay: true,
                items: 4,
                loop: false, lazyLoad: true,
                margin: 15,
                responsiveClass: true,
                stagePadding: 100,
                responsive: {
                0: {
                    items: 2,
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
                    items: 4
                },
                1300: {
                    items: 4
                },
                1400: {
                    items: 4
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
        //}
        });
    if (errorAdventure) return <p>{errorAdventure}</p>;
    if (loadingAdventure) {
      return (
        <div className="section-share-adventure d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
          <SyncLoader color="#FC673C" size={20} />
        </div>
      );
    }
    if (shareAdventure.length === 0) return <p>No  Views Near By found.</p>;
        
  return (
    <section className="section-share-adventure default-padding">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="cooltrails-title text-center">
                        <h2 className="title">Share Your <span>Next Adventure</span></h2>
                        <p>Show us how you #GetOutThere by tagging us @Cooltrails for a chance to be featured!</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 px-0">
                    <div className="position-relative">
                        <div className="adventure-slider-container owl-carousel owl-theme" id="adventureSider">
                            {
                               shareAdventure.map((adventure: any, index: number) => (
                                
                                <div key={index} className="advnSliderItem">
                                    <div className="share-adventure-single position-relative overflow-hidden image-div-style">
                                        <img
                                            src={adventure.imagePath || '/assets/images/not-found.jpg'}
                                            alt="Adventure" className="" 
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const target = e.currentTarget;
                                                target.onerror = null; // prevent infinite loop
                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                            }}
                                        />
                                        <a href="" className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white">
                                        <span className="d-block w-100">{adventure.title}</span></a>
                                    </div>
                                </div>

                               ))
                            }
                            
                            {/*<div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-2-a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div>
                            <div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-3-a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div>
                            <div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-4-a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div>
                          
                            <div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-1a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div>
                            <div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-2-a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div>
                            <div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-3-a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div>
                            <div className="advnSliderItem">
                                <div className="share-adventure-single position-relative overflow-hidden">
                                    <img src="assets/images/adventure/adv-4-a.jpg" alt="" />
                                    <a href=""
                                        className="share-adv-overlay d-flex w-100 h-100 align-items-end justify-content-center text-center text-white"><span
                                            className="d-block w-100">@travelcharlie</span></a>
                                </div>
                            </div> */}
                          
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="d-flex justify-content-center gap-3 list-unstyled flex-wrap social-media-logo">
                        <li><a href="" title="Facebook"
                                className="social-media-btn d-flex align-items-center justify-content-center"><img
                                    src="/assets/images/icons/facebook.svg" alt="" /></a></li>
                        <li><a href="" title="Instagram"
                                className="social-media-btn d-flex align-items-center justify-content-center"><img
                                    src="/assets/images/icons/instagram.svg" alt="" /></a></li>
                        <li><a href="" title="Twitter-X"
                                className="social-media-btn d-flex align-items-center justify-content-center"><img
                                    src="/assets/images/icons/twitter-x.svg" alt="" /></a></li>
                        <li><a href="" title="Linked IN"
                                className="social-media-btn d-flex align-items-center justify-content-center"><img
                                    src="/assets/images/icons/linkedin02.svg" alt="" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ShareAdventure;

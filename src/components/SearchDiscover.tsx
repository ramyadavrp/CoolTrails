// src/components/SearchDiscover.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'owl.carousel'; // Import OwlCarousel's JS (ensure this path is correct)

// IMPORTANT: Make sure these CSS imports are present either here or in your main.tsx
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import axios from 'axios';
import { SyncLoader } from "react-spinners";
import { encodeId, generateSlug } from '../utils/helpers';

const BASE_URL = import.meta.env.VITE_API_URL;
const SearchDiscover: React.FC = () => {
    //const [nearbytrails,setNearbytrails] =useState([]);
    const [loadingNearbytrails, setloadingNearbytrails] = useState(true);
    const [errorNearbytrails, setErrorNearbytrails] = useState('');
    // Near by location useState
    const [take, setTake] = useState(10); 
    const [skip, setSkip] = useState(0);  
    const [maxDistance, setMaxDistance] = useState(15); 
    //const [nearbytrails,setNearbytrails] =useState([]);
    const [nearbytrails, setNearbytrails] = useState<any[]>([]);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    
    // const fetchNearbyname = async() =>{
    //     try{
    //         const response = await axios.get(`${BASE_URL}/trail/NearTrails/1/1/0`);
    //         //console.log(response.data);
    //         setNearbytrails(response.data.data);
    //     }catch(err){
    //         console.error('API Error:', err);
    //             setErrorNearbytrails('Unable to fetch adventure');
    //     } finally{
    //         setloadingNearbytrails(false);
    //     }
    // }
    // useEffect(()=>{
    //     fetchNearbyname();
    // },[]);


    // "take": 5,
    // "skip": 0,
    // "lat": 27.1719517170742,
    // "lon": 78.0420843000696,
    // "maxDistance"

    // post location
    //https://api.cooltrails.purchaseitnow.shop/API/trail/NearTrailsByLatAndLan
    const postLocation = async() =>{
        try{
            const response = await axios.post(`${BASE_URL}/trail/NearTrailsByLatAndLan`, {
                take: take,
                skip: skip,
                lat: latitude,
                lon: longitude,
                // lat: 27.1719517170742,
                // lon: 78.0420843000696,
                maxDistance: maxDistance
            });
            setNearbytrails(response.data.data);
            //console.log('Server response:', response.data.data);
        }catch(err){
            console.error('Failed your location:',err);
        }finally{
                setloadingNearbytrails(false);
        }
    };
    useEffect(()=>{
         // Users Current location
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    //const { latitude,longitude } = position.coords;
                     //console.log('user location:', latitude, longitude );
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    //console.log('user location:', latitude, longitude );
                    //postLocation(latitude, longitude);
                },
                (error)=>{
                    console.error('Geolocation error:', error.message);
                } 
            );
        }else{
            console.error('not Support');
        }
    },[]);
    //console.log('user location:1', latitude, longitude ,take,skip,maxDistance);

     // Fetch data when location or pagination changes
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
        postLocation();
        }
    }, [latitude, longitude, take, skip,maxDistance]);
    //console.log(nearbytrails );
    useEffect(() => {
        // Initialize Owl Carousel only after data is loaded and component has rendered
        //if (!loadingLocatTrails && topLocatTrails.length > 0) {
          // Ensure the DOM element exists before initializing
          const $owlElement = $('#bestViewSl');
          if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
            $owlElement.owlCarousel({
              loop: true,
              margin: 15,
              responsiveClass: true,
              autoplay: true,
              items: 4,
              autoplayTimeout: 5000,
              dots: false, nav: false,
              autoplayHoverPause: true,
              responsive: {
                0: {
                  items: 1,
                  stagePadding: 15,
                  margin: 10,
                  loop: false,
                  autoplay: false
                },
                576: {
                  items: 2,
                  stagePadding: 25,
                  margin: 15,
                  loop: false
                },
                768: {
                  items: 2,
                  stagePadding: 35,
                  margin: 15,
                  loop: false
                },
                992: {
                  items: 3
                },
                1200: {
                  items: 3
                },
                1400: {
                  items: 4
                }
              },
              
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
    
    if (errorNearbytrails) return <p>{errorNearbytrails}</p>;
    if (loadingNearbytrails) {
        return (
          <div className="section-local-favorite d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
            <SyncLoader color="#FC673C" size={20} />
          </div>
        );
      }
    if (nearbytrails.length === 0) return <p>No  Views Near By found.</p>;
  
  return (
    <section className="section-local-favorite default-padding position-relative">
      <div className="container">
          <div className="row">
              <div className="col-12">
                  <div className="cooltrails-title text-center">
                      <h2 className="title">Best Views <span>Nearby</span></h2>
                  </div>
              </div>
          </div>
          {/* {
            loadingNearbytrails ? (
                <div className="custom-slider position-relative d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                <SyncLoader color="#FC673C" size={20} />
                </div>
            ) : (
                <div className="custom-slider">Your Slider Content</div>
            )
        } */}
          <div className="row">
              <div className="col-12">
                  <div className="custom-slider position-relative">
                      <div className="slider-container">
                          <div className="best-view-slider owl-carousel owl-theme br-20 overflow-hidden" 
                          id="bestViewSl">
                
                                {
                                    nearbytrails.map((nTrails:any,index:number)=>(
                                        <div key={index} className="slider-item-single">
                                            <div className="local-favorite-single">
                                                <div className="lfc-thumb position-relative">
                                                    <img
                                                        src={nTrails.imagePath}
                                                        alt="explorer" className="img-fluid img-fixed-size" 
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                            const target = e.currentTarget;
                                                            target.onerror = null; // prevent infinite loop
                                                            target.src = '/assets/images/not-found.jpg'; // fallback image
                                                        }}
                                                    />
                                                    <a href="#!" className="bookmark-btn" title="Save"><i
                                                            className="bi bi-bookmark"></i></a>
                                                </div>
                                                <div className="lfc-content">
                                                    <h3 className="lfc-title">{nTrails.title ?? 'N/A'}</h3>
                                                    <p className="lfc-location mb-1">{nTrails.address ?? 'N/A'}
                                                    </p>
                                                    <p className="lfc-tags"><i className="bi bi-star-fill"></i> {nTrails.rating} · Moderate ·
                                                        {nTrails.length} · Est. {nTrails.estimateTime}
                                                    </p>
                                                    
                                                    <Link to={`/${generateSlug(nTrails.title)}`} state={{ trail: nTrails }} className="btn-style-1 w-100">
                                                        Check Details
                                                    </Link>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))   
                                }
                              {/* <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-2.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Samar Trail: Jabal Jais</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-3.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Shawka Dam Mountain Trail</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-4.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Sheri Village Trail</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-1.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Wadi Sahem - Al Hayl Fort - Water Springs</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-2.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Samar Trail: Jabal Jais</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-3.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Shawka Dam Mountain Trail</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="slider-item-single">
                                  <div className="local-favorite-single">
                                      <div className="lfc-thumb position-relative">
                                          <img src="assets/images/local-favorites/img-4.jpg" alt="" className="img-fluid" />
                                          <a href="#!" className="bookmark-btn" title="Save"><i
                                                  className="bi bi-bookmark"></i></a>
                                      </div>
                                      <div className="lfc-content">
                                          <h3 className="lfc-title">Sheri Village Trail</h3>
                                          <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates
                                          </p>
                                          <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate ·
                                              9.3km · Est. 2h 45m
                                          </p>
                                          <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                      </div>
                                  </div>
                              </div> */}
                          </div>
                      </div>
                      <div className="local-favorite-slider-controls">
                        <button className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-previous"
                            id="bestViewPrev"
                            onClick={() => $('#bestViewSl').owlCarousel('prev')} // Add onClick handler
                            >
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.38118 15L1.52122 9.23744C0.826258 8.55402 0.826258 7.44598 1.52122 6.76256L7.38118 0.999999M2.04246 8L17 8"
                                    stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />

                            </svg>
                        </button>
                        <button className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-next"
                            id="bestViewNext"
                            onClick={() => $('#bestViewSl').owlCarousel('next')} // Add onClick handler
                        >
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8"
                                      stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                        </button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default SearchDiscover;

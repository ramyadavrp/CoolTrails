import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { Link } from 'react-router-dom';
import { SyncLoader } from "react-spinners";
import  {generateSlug} from '../utils/helpers';
import {getAuth} from '../utils/storage';
//import $ from 'jquery'; // Import jQuery
import 'owl.carousel'; // Import OwlCarousel's JS (ensure this path is correct)

// IMPORTANT: Make sure these CSS imports are present either here or in your main.tsx
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import SeoMeta from '../containers/SeoMeta';

const BASE_URL = import.meta.env.VITE_API_URL;
interface TrailDetail {
  urltitle: string;
  title: string;
}
const LocalFavorites: React.FC = () => {
  const navigate = useNavigate();
  const [topLocatTrails, setTopLocatTrails] = useState([]);
  const [getBookmark, setBookmark] = useState([]);
  const [loadingLocatTrails, setLoadingLocatTrails] = useState(true);
  const [errorLocatTrails, setErrorLocatTrails] = useState('');
  // const [userId, setUserId] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const [bookmarkedTrails, setBookmarkedTrails] = useState<number[]>([]);
  
  // Get id by helper
  useEffect(() => {
    const { userId, token } = getAuth();
    if (userId) setUserId(userId);
    if (token) setToken(token);
  }, []);

useEffect(() => {
  // if (!userId) return; 
  fetchTopLocalTrail();
}, [userId]);
const fetchTopLocalTrail = async () => {
  try {
    setLoadingLocatTrails(true);

    const apiUrl = userId
      ? `${BASE_URL}/home/toplocaltrail/5/${userId}`  
      : `${BASE_URL}/home/toplocaltrail/5`;          
    console.log('apiUrl',apiUrl);
    const response = await axios.get(apiUrl);
    const data = response.data.data || [];
    console.log('data',data);
    setTopLocatTrails(data);

    if (userId) {
      const bookmarked = data
        .filter((item: any) =>
          item.do_bookmark === true ||
          item.do_bookmark === "true" ||
          item.do_bookmark === 1
        )
        .map((item: any) => Number(item.trailid));

      setBookmarkedTrails(bookmarked);
    } else {
      setBookmarkedTrails([]); 
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoadingLocatTrails(false);
  }
};

const handleBookmark = async (trailid: number) => {
  if (!token || !userId) {
    navigate("/login", { replace: true });
    return;
  }

  const trailId = Number(trailid);
  const isAlreadyBookmarked = bookmarkedTrails.includes(trailId);

  try {
    const response = await axios.post(
      `${BASE_URL}/trail/bookmark`,
      {
        TrailId: trailId,
        UserId: userId,
        do_bookmark: !isAlreadyBookmarked,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.status === "success") {
      setBookmarkedTrails((prev) =>
        isAlreadyBookmarked
          ? prev.filter((id) => id !== trailId)
          : [...prev, trailId]
      );
    }

  } catch (error) {
    console.error(error);
  }
};
  // useEffect(() => {
  //   alert(userId);
  //     const fetchTopLocalTrail = async () => {
  //       try {
  //         const response = await axios.get(`${BASE_URL}/home/toplocaltrail/5/${userId}`);
  //         const data = response.data.data;
  //         console.log('datadata',data);
  //         // console.log('userIduserId',userId);
         
  //         setTopLocatTrails(data);
  //         //  const trails: TrailDetail[] = data.map((item: any) => ({
  //         //   title: item.title,
  //         //   slug: item.slug ?? item.urltitle ?? generateSlug(item.name || item.title),
  //         // }));
  //         // console.log('trailsv',trails);
  //         // Extract bookmarked trailIds from response
  //         const bookmarked = data
  //           .filter((item: any) => item.do_bookmark === true)
  //           .map((item: any) => item.trailid);

  //         setBookmarkedTrails(bookmarked);
          
  //       } catch (error) {
  //         console.error("API Error:", error);
  //         setErrorLocatTrails("Unable to fetch top local trails");
  //       } finally {
  //         setLoadingLocatTrails(false);
  //       }
  //     };

  //     fetchTopLocalTrail();
  // }, [userId]);
  // Bookmark
  // const handleBookmark = async (trailid: any) => {
  //       if (!token || !userId) {
  //         navigate("/login", { replace: true });
  //         return;
  //       }
  //        // Check current bookmark status
  //       const isAlreadyBookmarked = bookmarkedTrails.includes(trailid);
       
  //       try {
         
  //           const response = await axios.post(`${BASE_URL}/trail/bookmark`, {
  //               TrailId: trailid,
  //               UserId: userId,
  //               do_bookmark: !isAlreadyBookmarked,
  //             },
  //             { headers: {"Authorization": `Bearer ${token}`}}  
            
  //           );
  //            console.log('bookmark',response.data);
  //           if (response.data.status === "success") {
  //           // Toggle bookmark state locally
  //           setBookmarkedTrails((prev) =>
  //               isAlreadyBookmarked
  //               ? prev.filter((id) => id !== trailid)
  //               : [...prev, trailid]
  //           );
  //           } else {
  //           // console.log("Error bookmarking trail.");
  //           }
  //       } catch (error) {
  //           console.error("Error submitting report:", error);
  //           // console.log("Failed to submit report");
  //       }
  //   };
 
    


//    useEffect(() => {
//   if (!userId) return;

//   const fetchTopLocalTrail = async () => {
//     try {
//       const response = await axios.get(
//         // `https://api.cooltrails.purchaseitnow.shop/api/home/toplocaltrail/10/${userId}`
//         `https://api.cooltrails.purchaseitnow.shop/api/home/toplocaltrail/10/20c8a597-25b7-414d-8b9c-c9575f40b9fc`
//       );

//       console.log("toplocal Listing", response.data.data);
//       setTopLocatTrails(response.data.data);
//     } catch (err) {
//       console.error("API Error:", err);
//       setErrorLocatTrails("Unable to fetch top local trails");
//     } finally {
//       setLoadingLocatTrails(false);
//     }
//   };

//   fetchTopLocalTrail();
// }, [userId]);



  // console.log('sss',topLocatTrails);
  // Effect to initialize Owl Carousel
  useEffect(() => {
    // Initialize Owl Carousel only after data is loaded and component has rendered
    if (!loadingLocatTrails && topLocatTrails.length > 0) {
      // Ensure the DOM element exists before initializing
      const $owlElement = $('#localFavorite');
      if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
        $owlElement.owlCarousel({
          // loop: true,
          // margin: 20, // Adjust as needed
          // nav: true,
          // dots: false,
          
          margin: 15,
          responsiveClass: true,
          // autoplay: true,
          // loop: true,
           loop: topLocatTrails.length > 3,
          autoplay: topLocatTrails.length > 3,
          items: 4,
          autoplayTimeout: 5000,
          dots: false, nav: false,
          autoplayHoverPause: true,
          responsive: {
            // 0: { items: 1 },
            // 768: { items: 2 },
            // 992: { items: 3 }

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
    }
  }, [loadingLocatTrails, topLocatTrails]); // Re-run effect when loading status or data changes

  
if (errorLocatTrails) return <p>{errorLocatTrails}</p>;
if (loadingLocatTrails) {
  return (
    <div className="section-local-favorite d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
      <SyncLoader color="#FC673C" size={20} />
    </div>
  );
}
if (topLocatTrails.length === 0) return <p>No local favorites found.</p>;

  return (
    <>
    
      <section className="section-local-favorite default-padding position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cooltrails-title text-center">
                <h2 className="title">Local Favorites near <span>India</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="custom-slider position-relative">
                <div className="slider-container">
                  <div className="local-favorite-slider owl-carousel owl-theme br-20 overflow-hidden" id="localFavorite">
                    {topLocatTrails.map((locatTrail: any, index: number) => {
                        // const city    = locatTrail.city    ||  "Lucknow";
                        const state   = locatTrail.state   ||  "UTTAR PRADESH";
                        const country = locatTrail.country || "India";
                        const type = "trail";
                        const slugTitle = locatTrail.urltitle ?? generateSlug(locatTrail.title);
                        const trailurl = `/${generateSlug(type)}s/${generateSlug(country)}/${generateSlug(state)}/${slugTitle}`;
                        // const trailurl = `/${generateSlug(type)}s/${generateSlug(country)}/${generateSlug(state)}/${generateSlug(city)}/${slugTitle}`;
                        // const parkUrl = `/${generateSlug(locatTrail.type)}s/${generateSlug(country)}/${generateSlug(state)}/${generateSlug(city)}/${slugTitle}`;

                      return(
                      <div key={locatTrail.trailid} className="slider-item-single">
                        <div className="local-favorite-single">
                          <div className="lfc-thumb position-relative">
                            <Link to={trailurl}  >
                            <img
                                src={locatTrail.image || '/assets/images/not-found.jpg'}
                                alt="locat Trail" className="img-fluid img-fixed-size" 
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.currentTarget;
                                    target.onerror = null; // prevent infinite loop
                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                }}
                            />
                            </Link>

                          <a
                            href="#!"
                            className="bookmark-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              handleBookmark(Number(locatTrail.trailid));
                            }}
                            // onClick={(e) => {
                            //   e.preventDefault();
                            //   handleBookmark(locatTrail.trailid);
                            // }}
                          >
                            
                           <i
                            className={`bi ${
                              userId && bookmarkedTrails.includes(Number(locatTrail.trailid))
                                ? "bi-bookmark-fill bookmarked-icon"
                                : "bi-bookmark"
                            }`}
                          />
                          </a>

                          </div>
                          
                          <div className="lfc-content">
                            <Link to={trailurl}  >
                              <h3 className="lfc-title">{locatTrail.title}</h3>
                              <p className="lfc-location mb-1">{locatTrail.address} </p>
                              <p className="lfc-tags">
                                <i className="bi bi-star-fill"></i> 4.6 · Moderate · {locatTrail.distance} · Est. {locatTrail.time_duration || 'N/A'} {locatTrail.trailid}
                              </p>
                            </Link>
                            <Link to={trailurl} 
                              className="btn-style-1 w-100"
                            >
                              Check Details
                            </Link>
                          </div>
                        </div>
                      </div>
                      )})}
                  </div>
                </div>

                <div className="local-favorite-slider-controls">
                  <button
                    className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-previous"
                    id="localFavPrev"
                    onClick={() => $('#localFavorite').owlCarousel('prev')} // Add onClick handler
                  >
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Fix SVG attributes from hyphen-case to camelCase */}
                      <path
                        d="M7.38118 15L1.52122 9.23744C0.826258 8.55402 0.826258 7.44598 1.52122 6.76256L7.38118 0.999999M2.04246 8L17 8"
                        stroke="#C6C6D1"
                        strokeWidth="1.5" // Corrected: stroke-width -> strokeWidth
                        strokeLinecap="round" // Corrected: stroke-linecap -> strokeLinecap
                      />
                    </svg>
                  </button>
                  <button
                    className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-next"
                    id="localFavNext"
                    onClick={() => $('#localFavorite').owlCarousel('next')} // Add onClick handler
                  >
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Fix SVG attributes from hyphen-case to camelCase */}
                      <path
                        d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8"
                        stroke="#C6C6D1"
                        strokeWidth="1.5" // Corrected: stroke-width -> strokeWidth
                        strokeLinecap="round" // Corrected: stroke-linecap -> strokeLinecap
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocalFavorites;
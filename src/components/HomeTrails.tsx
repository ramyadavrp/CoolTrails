// src/components/HomeTrails.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'owl.carousel';

import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { SyncLoader } from "react-spinners";
import { encodeId, generateSlug ,slugToTitle} from '../utils/helpers';

const BASE_URL = import.meta.env.VITE_API_URL;

const HomeTrails: React.FC = () => {
  const [topCategory, setCategory] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [errorCategory, setErrorCategory] = useState('');

  // Effect to fetch data
  useEffect(() => {
    axios.get(`${BASE_URL}/home/topcategory/10`)
      .then((res) => {
        setCategory(res.data.data);
        //console.log(res.data.data);
        setLoadingCategory(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setErrorCategory('Unable to fetch category');
        setLoadingCategory(false);
      });
  }, []);

  useEffect(() => {
    // Initialize Owl Carousel only after data is loaded and component has rendered
    if (!loadingCategory && topCategory.length > 0) {
      // Ensure the DOM element exists before initializing
      const $owlElement = $('#activitySl');
      if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
        $owlElement.owlCarousel({
          center: true,
          items: 6,
          loop: true,
          autoplay: true,
          autoplayTimeout: 5000,
          margin: 15,
          dots: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            0: {
              items: 2,
              center: true,
              margin: 5,
            },
            576: {
              items: 2,
              center: true,
              margin: 10,
            },
            768: {
              items: 3,
            },
            992: {
              items: 4,
            },
            1200: {
              items: 4,
            },
            1300: {
              items: 6,
            },
            1400: {
              items: 6,
            },
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
  }, [loadingCategory, topCategory]); // Re-run effect when loading status or data changes

  // if (loadingCategory) return <p>Loading trails...</p>;
  // if (errorCategory) return <p>{errorCategory}</p>; // Display error if API call failed
  // if (topCategory.length === 0) return <p>No category found.</p>; // Handle empty data
  if (errorCategory) return <p>{errorCategory}</p>;
  if (loadingCategory) {
    return (
      <div className="section-local-favorite d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
        <SyncLoader color="#FC673C" size={20} />
      </div>
    );
  }
  if (topCategory.length === 0) return <p>No local favorites found.</p>;
  return (
    <section className="section-activity default-padding">
      <div className="container-fluid">
          <div className="row">
              <div className="col-12">
                  <div className="cooltrails-title text-center">
                      <h2 className="title">Browse by <span>Activity</span></h2>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-12 px-0">
                  <div className="position-relative d-block w-100">
                      <div className="activity-slider-container owl-carousel owl-theme" id="activitySl">
                        {
                          topCategory.map((category: any, index: number)=>(
                            <div key={index} className="activity-single">
                              <div className="activity-img position-relative">
                                <img
                                    src={category.image || '/assets/images/not-found.jpg'}
                                    alt="category" 
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.currentTarget;
                                        target.onerror = null; // prevent infinite loop
                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                    }}
                                />
                                <Link to={`/explore-trail/${generateSlug(category.title || '' )}`} className="activity-overlay d-flex align-items-end h-100 w-100">
                                    <span className="overlay-title d-block w-100 text-center">
                                      {category.title}
                                    </span>
                                </Link>
                                  {/* <img src="assets/images/activity/mountain-climibing-1.jpg" alt="" /> */}
                                  {/* <a href="" className="activity-overlay d-flex align-items-end h-100 w-100">
                                  <span className="overlay-title d-block w-100 text-center">Mountain Climbing</span>
                                  </a> */}
                              </div>
                            </div>
                          ))
                        }
                          
                      </div>

                      {/* <!-- <div className="d-flex align-items-center gap-3 justify-content-center activity-Slider-controls"> --> */}
                      <div className="best-view-slider-control activity-slider-controls">
                          <button className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-previous" 
                          onClick={() => $('#activitySl').owlCarousel('prev')}
                          id="activitySLPrev">
                              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.38118 15L1.52122 9.23744C0.826258 8.55402 0.826258 7.44598 1.52122 6.76256L7.38118 0.999999M2.04246 8L17 8" stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                          </button>
                          <button className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-next" 
                          onClick={() => $('#activitySl').owlCarousel('next')} 
                          id="activitySLNext">
                              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8" stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
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

export default HomeTrails;
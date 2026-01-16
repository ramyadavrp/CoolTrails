import { Link } from 'react-router-dom';
import React, { useEffect, useState,useRef } from 'react';

import { decodeId,encodeId, generateSlug ,slugToTitle} from '../../utils/helpers'
interface TopTrails {
  imagePath: string;
  title: string;
  address: string;
  rating: number;
  length: number;
  estimateTime: string;
}

interface PlaceOffersProps {
    loadingDetailTrails: boolean;
    TopTrailsNear: TopTrails[];
}

const TopTrailsNearBy: React.FC<PlaceOffersProps> = ({ TopTrailsNear ,loadingDetailTrails}) => {

    useEffect(() => {
            // Initialize Owl Carousel only after data is loaded and component has rendered
            if (!loadingDetailTrails && TopTrailsNear.length > 0) {
              // Ensure the DOM element exists before initializing
              const $owlElement = $('#bestViewSl');
              if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
                $owlElement.owlCarousel({
                  // loop: true,
                  // margin: 20, // Adjust as needed
                  // nav: true,
                  // dots: false,
                  loop: true,
                  margin: 15,
                  responsiveClass: true,
                  autoplay: true,
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
        }, [loadingDetailTrails, TopTrailsNear]);
    return (
        <div className="row">
            <div className="col-12 top-trail-column">
                <div className="custom-slider position-relative">
                    <div className="slider-container">
                        <div className="best-view-slider owl-carousel owl-theme br-20 overflow-hidden" id="bestViewSl">
                            
                            {
                                TopTrailsNear.map((trail:any,index:number)=>(
                                        <div key={trail.id || index} className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                
                                                <img
                                                    src={trail.imagePath || '/assets/images/not-found.jpg'}
                                                    alt="Top Trail" className="img-fluid img-fixed-size" 
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                        const target = e.currentTarget;
                                                        target.onerror = null; // prevent infinite loop
                                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                                    }}
                                                />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">{trail.title}</h3>
                                                <p className="lfc-location mb-1">{trail.address}</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> {trail.rating}· Moderate · {trail.length} · Est. {trail.estimateTime}</p>
                                                {/* <a href="#!" className="btn-style-1 w-100">Check Details</a> */}
                                                <Link to={`/affiliate-details/${trail.urlTitle|| generateSlug(trail.title || '')}`} className="btn-style-1 w-100">
                                                    Check Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="local-favorite-slider-controls">
                        <button
                        className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-previous"
                        id="localFavPrev"
                        onClick={() => $('#bestViewSl').owlCarousel('prev')} // Add onClick handler
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
                        onClick={() => $('#bestViewSl').owlCarousel('next')} // Add onClick handler
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
    );    
};

export default TopTrailsNearBy; 

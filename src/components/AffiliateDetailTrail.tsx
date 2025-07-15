import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const AffiliateDetailTrail: React.FC = () => {
  return (
     <main className="mainContent">
        <section className="section-trail-detail">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="trail-dt-top">
                            <h1 className="trail-dt-title">Shawka Dam Mountain Trail</h1>
                            <p className="trail-dt-address text-grey mb-0">
                                <span className="tdt-add">Al Fujayrah, Fujairah, United Arab Emirates</span> <span className="tdt-separator">|</span> <span className="t-dt-r-and-o"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12">
                        <ul className="d-flex trail-dt-nav list-unstyled pt-3" role="tablist">
                            <li className="active" data-bs-toggle="list"><a href="#overviewData" role="button" className="active">Overview</a></li>
                            <li data-bs-toggle="list"><a href="#trailGuide" role="button">Trail Guide</a></li>
                            <li data-bs-toggle="list"><a href="#trailItinary" role="button">Iternary</a></li>
                            <li data-bs-toggle="list"><a href="#weather" role="button">Conditions</a></li>
                            <li data-bs-toggle="list"><a href="#reviews" role="button">Reviews</a></li>
                            <li data-bs-toggle="list"><a href="#nearby" role="button">Nearby</a></li>
                        </ul>
                        <div className="trail-cover position-relative" id="overviewData">
                            <img src="assets/images/trails/trail-1.jpg" alt="" className="w-100 br-20 coverImage" />
                            <div className="cover-overlay h-100 w-100 d-flex justify-content-between align-items-end br-20">
                                <a href="assets/images/trails/trail-1.jpg" className="btn-style-4" data-fancybox="MoreImages">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                        <rect x="1.5" y="1.5" width="15" height="15" rx="3.75" stroke="#05073D" stroke-width="1.125" />
                                        <path
                                            d="M1.875 13.125L3.5694 11.9147C4.10641 11.5311 4.84202 11.592 5.30866 12.0587L6.1136 12.8636C6.46508 13.2151 7.03492 13.2151 7.3864 12.8636L11.1283 9.12175C11.622 8.62803 12.4107 8.59225 12.9471 9.03924L16.5 12"
                                            stroke="#05073D"
                                            stroke-width="1.125"
                                            stroke-linecap="round"
                                        />
                                        <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(-1 0 0 1 7.5 4.5)" stroke="#05073D" stroke-width="1.125" />
                                    </svg>
                                    150+ Photos
                                </a>
                                <a href="assets/images/trails/trail-1-gallery-1.jpg" data-fancybox="MoreImages"></a>
                                <a href="assets/images/trails/trail-1-gallery-2.jpg" data-fancybox="MoreImages"></a>
                                <a href="assets/images/trails/trail-1-gallery-3.jpg" data-fancybox="MoreImages"></a>
                                <a href="" className="arrow-btn d-flex align-items-center justify-content-center rounded-circle">
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8" stroke="#C6C6D1" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="trail-user-favorite-card br-20 bg-almost-white d-flex justify-content-between flex-wrap">
                            <div className="tuf-left-content d-flex align-items-center">
                                <div className="tusc-cn-1">
                                    <p className="mb-0">Users Favorite</p>
                                </div>
                                <div className="tusc-cn-2">
                                    <p className="mb-0 text-midnight-navy">One of the most loved homes on Airbnb, according to guests</p>
                                </div>
                            </div>

                            <div className="tuf-right-content d-flex align-items-center">
                                <div className="tusc-cn-1 text-center">
                                    <p className="mb-0">4.84</p>
                                    <div className="rating">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                </div>
                                <div className="tusc-cn-2 text-center">
                                    <p className="mb-0 text-midnight-navy">
                                        <span className="d-block review-no">31</span>
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
                                <h3>10<span>km</span></h3>
                                <p className="mb-0">Length</p>
                            </div>
                            <div className="trail-stat-single text-midnight-navy px-2">
                                <h3>378<span>m</span></h3>
                                <p className="mb-0">Elevation gain</p>
                            </div>
                            <div className="trail-stat-single text-midnight-navy px-2">
                                <img src="assets/images/icons/loop.svg" alt="" className="tss-icon" />
                                <p className="mb-0">Loop</p>
                            </div>
                        </div>
                        <div className="trail-desc trail-detail-widget">
                            <p>
                                Try this 10.0-km loop trail near Al Khari, Ras al-Khaimah. Generally considered a moderately challenging route. This is a very popular area for hiking and walking, so you'll likely encounter other people while
                                exploring. The best times to visit this trail are September through June.
                            </p>
                        </div>
                        <div className="trail-detail-widget trail-guide-widget" id="trailGuide">
                            <div className="section-title section-title-md">
                                <h2 className="title title-md">Trail Guide</h2>
                            </div>
                            <p>
                                Try this 10.0-km loop trail near Al Khari, Ras al-Khaimah. Generally considered a moderately challenging route. This is a very popular area for hiking and walking, so you'll likely encounter other people while
                                exploring. The best times to visit this trail are September through June. <a href="" className="text-orange fw-bold">read more</a>
                            </p>
                        </div>
                        <div className="trail-detail-widget trail-itinary-widget" id="trailItinary">
                            <div className="section-title section-title-md">
                                <h2 className="title title-md">Itinerary</h2>
                            </div>
                            <div className="accordion accordion-flush faq-accordion trail-itinary-accorion" id="faqToggle">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="false" aria-controls="faq1">
                                            <span className="fw-bold me-2">Day 1 : </span> Arrival at Lorem Ipsum
                                        </button>
                                    </h2>
                                    <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                                        <div className="accordion-body">
                                            If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient
                                            needs to redeem it.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                                            <span className="fw-bold me-2">Day 2 : </span> Arrival at Lorem Ipsum
                                        </button>
                                    </h2>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                                        <div className="accordion-body">
                                            If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient
                                            needs to redeem it. <code>.accordion-flush</code> className. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                                            <span className="fw-bold me-2">Day 3 : </span> Arrival at Lorem Ipsum
                                        </button>
                                    </h2>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                                        <div className="accordion-body">
                                            If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient
                                            needs to redeem it.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq33" aria-expanded="false" aria-controls="faq33">
                                            <span className="fw-bold me-2">Day 4 : </span> Arrival at Lorem Ipsum
                                        </button>
                                    </h2>
                                    <div id="faq33" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                                        <div className="accordion-body">
                                            If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient
                                            needs to redeem it.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
                        <div className="trail-detail-map position-relative">
                            <div className="trail-detail-map-btn-group d-flex justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center">
                                <button className="btn-rounded-white rounded-circle" type="button" title="Share">
                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12.125" cy="3.375" r="1.875" stroke="#05073D" stroke-width="1.125" />
                                        <circle cx="3.125" cy="8.625" r="1.875" stroke="#05073D" stroke-width="1.125" />
                                        <path d="M10.25 4.5L5 7.5" stroke="#05073D" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4.625 10.125L10.25 13.5" stroke="#05073D" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" />
                                        <circle cx="12.125" cy="14.625" r="1.875" stroke="#05073D" stroke-width="1.125" />
                                    </svg>
                                </button>
                                <button className="btn-rounded-white rounded-circle" type="button" title="Bookmark">
                                    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.0601 0.25H1.93993C1.63227 0.25 1.33722 0.372216 1.11967 0.589763C0.902124 0.807309 0.779907 1.10237 0.779907 1.41002V14.1703C0.779959 14.2738 0.80771 14.3754 0.860281 14.4646C0.912852 14.5537 0.988327 14.6272 1.07887 14.6774C1.16942 14.7275 1.27174 14.7525 1.37522 14.7498C1.47869 14.7471 1.57955 14.7167 1.66732 14.6618L6.00001 11.9539L10.3334 14.6618C10.4212 14.7165 10.522 14.7467 10.6253 14.7494C10.7287 14.752 10.8309 14.7269 10.9213 14.6768C11.0118 14.6267 11.0871 14.5533 11.1397 14.4642C11.1922 14.3752 11.22 14.2737 11.2201 14.1703V1.41002C11.2201 1.10237 11.0979 0.807309 10.8804 0.589763C10.6628 0.372216 10.3678 0.25 10.0601 0.25ZM10.0601 13.1241L6.30669 10.7787C6.21451 10.721 6.10799 10.6905 5.99929 10.6905C5.89058 10.6905 5.78406 10.721 5.69188 10.7787L1.93993 13.1241V1.41002H10.0601V13.1241Z"
                                            fill="#05073D"
                                        />
                                    </svg>
                                </button>
                                <button className="btn-rounded-white rounded-circle" type="button" title="Location">
                                    <svg width="15.16" height="18" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.68182 5.21429C8.68182 4.19131 8.29391 3.21023 7.60344 2.48687C6.91296 1.76352 5.97648 1.35714 5 1.35714C4.02352 1.35714 3.08704 1.76352 2.39656 2.48687C1.70609 3.21023 1.31818 4.19131 1.31818 5.21429C1.31818 6.79657 2.52664 8.85886 5 11.3291C7.47336 8.85886 8.68182 6.79657 8.68182 5.21429ZM5 12.5C1.99973 9.64314 0.5 7.214 0.5 5.21429C0.5 3.96398 0.974106 2.76488 1.81802 1.88078C2.66193 0.996682 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.996682 8.18198 1.88078C9.02589 2.76488 9.5 3.96398 9.5 5.21429C9.5 7.214 8.00027 9.64314 5 12.5Z"
                                            fill="#05073D"
                                        />
                                        <path
                                            d="M5.00004 6.5C5.32554 6.5 5.6377 6.36454 5.86786 6.12342C6.09802 5.8823 6.22732 5.55528 6.22732 5.21428C6.22732 4.87329 6.09802 4.54626 5.86786 4.30515C5.6377 4.06403 5.32554 3.92857 5.00004 3.92857C4.67455 3.92857 4.36239 4.06403 4.13223 4.30515C3.90207 4.54626 3.77277 4.87329 3.77277 5.21428C3.77277 5.55528 3.90207 5.8823 4.13223 6.12342C4.36239 6.36454 4.67455 6.5 5.00004 6.5ZM5.00004 7.35714C4.45756 7.35714 3.93729 7.13138 3.55369 6.72951C3.17009 6.32765 2.95459 5.7826 2.95459 5.21428C2.95459 4.64596 3.17009 4.10092 3.55369 3.69905C3.93729 3.29719 4.45756 3.07143 5.00004 3.07143C5.54253 3.07143 6.0628 3.29719 6.4464 3.69905C6.83 4.10092 7.0455 4.64596 7.0455 5.21428C7.0455 5.7826 6.83 6.32765 6.4464 6.72951C6.0628 7.13138 5.54253 7.35714 5.00004 7.35714Z"
                                            fill="#05073D"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194474.440444268!2d55.959295174859626!3d25.08154936413991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5a8616e5ca149%3A0x75d4f4005126006a!2sShawkah%20Dam!5e0!3m2!1sen!2sin!4v1749891263519!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> --> */}
                            <img src="assets/images/trails/map.png" alt="" className="map-img" />
                            <a href="assets/images/trails/map.png" data-fancybox="mapImg" className="arrow-btn d-flex align-items-center justify-content-center rounded-circle">
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.15005 13.5003H3.68251C3.30557 13.5003 3 13.1947 3 12.8178L3 10.3503M3.52497 12.9754L7.20003 9.30033M13.5 6.15005V3.68251C13.5 3.30557 13.1944 3 12.8175 3L10.35 3M12.975 3.52503L9.29993 7.20009"
                                        stroke="#717171"
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="trail-sidebar-widget bg-almost-white br-20">
                            <h3 className="text-midnight-navy">What this place offers</h3>
                            <ul className="trail-side-nav list-unstyled mt-0">
                                <li>
                                    <a href=""><img src="assets/images/icons/scamble.svg" alt="" /> Scramble </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/icons/off-trail.svg" alt="" /> Off-trail (bushwhack) </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/icons/lakes.svg" alt="" /> Lakes </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/icons/views.svg" alt="" /> Views </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/icons/hiking.svg" alt="" /> Hiking </a>
                                </li>
                                <li>
                                    <a href=""><img src="assets/images/icons/walking.svg" alt="" /> Walking </a>
                                </li>
                            </ul>
                            <div className="d-flex flex-wrap align-items-center">
                                <a href="" className="btn-style-3">Get Directions</a>
                                <a href="" className="btn-style-1">Hit the Trail</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12">
                        <div className="weather-section mb-5 pb-2 trail-detail-widget" id="weather">
                            <div className="section-title section-title-md">
                                <h2 className="title title-md">Weather</h2>
                            </div>
                            <div className="position-relative weather-widget">
                                <ul className="nav nav-pills weather-nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn active" id="day-1-tab" data-bs-toggle="pill" data-bs-target="#day-1" type="button" role="tab" aria-controls="day-1" aria-selected="true">
                                            <span className="day">Mon</span><span className="date">19</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn" id="day-2-tab" data-bs-toggle="pill" data-bs-target="#day-2" type="button" role="tab" aria-controls="day-2" aria-selected="false">
                                            <span className="day">Tue</span><span className="date">20</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn" id="day-3-tab" data-bs-toggle="pill" data-bs-target="#day-3" type="button" role="tab" aria-controls="day-3" aria-selected="false">
                                            <span className="day">Wed</span><span className="date">21</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn" id="day-4-tab" data-bs-toggle="pill" data-bs-target="#day-4" type="button" role="tab" aria-controls="day-4" aria-selected="false">
                                            <span className="day">Wed</span><span className="date">21</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn" id="day-5-tab" data-bs-toggle="pill" data-bs-target="#day-5" type="button" role="tab" aria-controls="day-5" aria-selected="false">
                                            <span className="day">Wed</span><span className="date">21</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn" id="day-6-tab" data-bs-toggle="pill" data-bs-target="#day-6" type="button" role="tab" aria-controls="day-6" aria-selected="false">
                                            <span className="day">Wed</span><span className="date">21</span>
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="weather-nav-btn" id="day-7-tab" data-bs-toggle="pill" data-bs-target="#day-7" type="button" role="tab" aria-controls="day-7" aria-selected="false">
                                            <span className="day">Wed</span><span className="date">21</span>
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content weather-widget-tab" id="pills-tabContent">
                                    {/* <!-- day-1 --> */}
                                    <div className="tab-pane fade show active" id="day-1" role="tabpanel" aria-labelledby="day-1-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">29°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- day-2 --> */}
                                    <div className="tab-pane fade" id="day-2" role="tabpanel" aria-labelledby="day-2-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">31°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- day-3 --> */}
                                    <div className="tab-pane fade" id="day-3" role="tabpanel" aria-labelledby="day-3-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">34°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- day-4 --> */}
                                    <div className="tab-pane fade" id="day-4" role="tabpanel" aria-labelledby="day-4-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">34°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- day-5 --> */}
                                    <div className="tab-pane fade" id="day-5" role="tabpanel" aria-labelledby="day-5-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">34°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- day-6 --> */}
                                    <div className="tab-pane fade" id="day-6" role="tabpanel" aria-labelledby="day-6-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">34°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- day-7 --> */}
                                    <div className="tab-pane fade" id="day-7" role="tabpanel" aria-labelledby="day-7-tab" tabIndex={0}>
                                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                                            <div className="weather-widget-left">
                                                <div className="temparature d-flex">
                                                    <h3 className="mb-0 me-3">34°</h3>
                                                    <img src="assets/images/icons/sun.svg" alt="" />
                                                </div>
                                                <p className="mb-0 text-almost-white">
                                                    Clear <br />
                                                    H: 45° L: 27°
                                                </p>
                                            </div>
                                            <div className="weather-widget-right text-end">
                                                <p className="mb-0 text-almost-white">
                                                    Precipitation: 0% <br />
                                                    Humidity: 57% <br />
                                                    Wind: 6 km/h
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- reviews --> */}
                <div className="trails-reviews-widget" id="reviews">
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
                                        <img src="assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="test-head">
                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. – Denver, CO</h3>
                                        <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span> Hiking</p>
                                    </div>
                                    <div className="right-abs">
                                        <i className="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="test-head">
                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. – Denver, CO</h3>
                                        <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span> Hiking</p>
                                    </div>
                                    <div className="right-abs">
                                        <i className="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="test-head">
                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. – Denver, CO</h3>
                                        <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span> Hiking</p>
                                    </div>
                                    <div className="right-abs">
                                        <i className="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="test-head">
                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. – Denver, CO</h3>
                                        <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span> Hiking</p>
                                    </div>
                                    <div className="right-abs">
                                        <i className="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="test-head">
                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. – Denver, CO</h3>
                                        <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span> Hiking</p>
                                    </div>
                                    <div className="right-abs">
                                        <i className="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                    <div className="review-gallery">
                                        <div className="d-flex">
                                            <a href="assets/images/review-images/r-1.png" data-fancybox="reviewImages"><img src="assets/images/review-images/r-1.png" alt="" /></a>

                                            <a href="assets/images/review-images/r-2.png" data-fancybox="reviewImages"><img src="assets/images/review-images/r-2.png" alt="" /></a>

                                            <a href="assets/images/review-images/r-3.png" data-fancybox="reviewImages"><img src="assets/images/review-images/r-3.png" alt="" /></a>

                                            <a href="assets/images/review-images/r-4.png" data-fancybox="reviewImagess"><img src="assets/images/review-images/r-4.png" alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
                                    </div>
                                    <div className="test-head">
                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">Emily R. – Denver, CO</h3>
                                        <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-0">Apr 1, 2025 <span className="d-inline-block mx-1">•</span> Hiking</p>
                                    </div>
                                    <div className="right-abs">
                                        <i className="bi bi-three-dots"></i>
                                    </div>
                                </div>
                                <div className="testimonial-body">
                                    <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-4 text-center">
                            <a href="" className="btn-style-1">Check All Reviews</a>
                        </div>
                    </div>
                </div>
                {/* <!-- review-end --> */}
            </div>
        </section>
        <section className="section-local-favorite py-5 position-relative" id="nearby">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title text-center">
                            <h2 className="title">Top Trails <span>Nearby</span></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 top-trail-column">
                        <div className="custom-slider position-relative">
                            <div className="slider-container">
                                <div className="best-view-slider owl-carousel owl-theme br-20 overflow-hidden" id="bestViewSl">
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-1.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Wadi Sahem - Al Hayl Fort - Water Springs</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-2.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Samar Trail: Jabal Jais</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-3.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Shawka Dam Mountain Trail</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-4.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Sheri Village Trail</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-1.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Wadi Sahem - Al Hayl Fort - Water Springs</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-2.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Samar Trail: Jabal Jais</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-3.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Shawka Dam Mountain Trail</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-item-single">
                                        <div className="local-favorite-single">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-4.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Sheri Village Trail</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="best-view-slider-control">
                                <button className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-previous" id="bestViewPrev">
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.38118 15L1.52122 9.23744C0.826258 8.55402 0.826258 7.44598 1.52122 6.76256L7.38118 0.999999M2.04246 8L17 8" stroke="#C6C6D1" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <button className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-next" id="bestViewNext">
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8" stroke="#C6C6D1" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
};

export default AffiliateDetailTrail;

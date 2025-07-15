// src/components/ProfileEditSection.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


declare const Masonry: any;
const ProfileEditSection: React.FC = () => {
  useEffect(() => {
    // Initialize Masonry after the component mounts
    const grid = document.querySelector('.edit-profile-row');
    if (grid && typeof Masonry !== 'undefined') {
      new Masonry(grid, {
        itemSelector: '.grid-item', // Adjust if your grid items have different classes
        percentPosition: true
      });
    }
  }, []);

  return (
    <main className="mainContent">
        <section className="section-profile-feed position-relative default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title">
                            <h2 className="title title-sm">Edit Profile</h2>
                        </div>
                    </div>
                </div> 
                <div className="row g-4 edit-profile-row" data-masonry='{"percentPosition": true }'>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <div className="profile-info-edit d-flex align-items-center">
                                <div className="profile-img">
                                    <img src="assets/images/profile/profile-md.png" alt="Amit Singh" /></div>
                                <div className="profile-info-edit-cn d-flex">
                                    <div className="pfe-title">
                                        <h3 className="pfe-name text-midnight-navy mb-0">Amit Singh</h3>
                                        <p className="pfe-location text-midnight-navy mb-0">Dubai, United Arab Emirates</p>
                                    </div>
                                    <div className="pfe-uplo d-flex align-items-center">
                                        <div className="upload-btn-wrapper">
                                        <button className="btn"><svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8.5L19 8.5C21.2091 8.5 23 10.2909 23 12.5L23 17.5C23 19.7091 21.2091 21.5 19 21.5L7 21.5C4.79086 21.5 3 19.7091 3 17.5L3 12.5C3 10.2909 4.79086 8.5 7 8.5L9 8.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 5.5L13.7071 3.20711C13.3166 2.81658 12.6834 2.81658 12.2929 3.20711L10 5.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 3.5L13 15.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/></svg>  Upload photo</button>
                                        <input type="file" name="profile_photo" /**name="myfile"**/ />
                                        </div>
                                        <button className="delete-btn">
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.55063 9.23418C4.70573 8.10763 5.50954 6.5 6.91772 6.5H18.0823C19.4905 6.5 20.2943 8.10763 19.4494 9.23418V9.23418C18.8331 10.0558 18.5 11.0552 18.5 12.0823V18.5C18.5 20.7091 16.7091 22.5 14.5 22.5H10.5C8.29086 22.5 6.5 20.7091 6.5 18.5V12.0823C6.5 11.0552 6.16688 10.0558 5.55063 9.23418V9.23418Z" stroke="#717171" strokeWidth="1.5"/>
                                            <path d="M14.5 17.5L14.5 11.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M10.5 17.5L10.5 11.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16.5 6.5L15.9558 4.86754C15.6836 4.05086 14.9193 3.5 14.0585 3.5H10.9415C10.0807 3.5 9.31638 4.05086 9.04415 4.86754L8.5 6.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Bio</h2>
                            <div className="bg-lavender-gray bio">
                                <p className="mb-0 text-grey">Nature lover. Trail chaser. Sunrise enthusiast. <br /> I explore
                                    one path at a time — from hidden forest gems to epic mountain climbs. Always up
                                    for new trails and sharing honest tips to help others hike smarter.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Personal information</h2>
                            <div className="profile-inner-form">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" name="email" id="emailIn" placeholder=""
                                         />
                                    <label htmlFor="emailIn">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="fullName" placeholder=""
                                         />
                                    <label htmlFor="fullName">Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="phone_no" id="phone" placeholder=""
                                         />
                                    <label htmlFor="phone">Phone Number</label>
                                </div> 
                                <div className="mb-3">
                                    <div className="input-group flex-nowrap custom-form-group">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <svg width="13" height="16" viewBox="0 0 10 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.68182 5.21429C8.68182 4.19131 8.29391 3.21023 7.60344 2.48687C6.91296 1.76352 5.97648 1.35714 5 1.35714C4.02352 1.35714 3.08704 1.76352 2.39656 2.48687C1.70609 3.21023 1.31818 4.19131 1.31818 5.21429C1.31818 6.79657 2.52664 8.85886 5 11.3291C7.47336 8.85886 8.68182 6.79657 8.68182 5.21429ZM5 12.5C1.99973 9.64314 0.5 7.214 0.5 5.21429C0.5 3.96398 0.974106 2.76488 1.81802 1.88078C2.66193 0.996682 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.996682 8.18198 1.88078C9.02589 2.76488 9.5 3.96398 9.5 5.21429C9.5 7.214 8.00027 9.64314 5 12.5Z"
                                                    fill="#05073D" />
                                                <path
                                                    d="M5.00004 6.5C5.32554 6.5 5.6377 6.36454 5.86786 6.12342C6.09802 5.8823 6.22732 5.55528 6.22732 5.21428C6.22732 4.87329 6.09802 4.54626 5.86786 4.30515C5.6377 4.06403 5.32554 3.92857 5.00004 3.92857C4.67455 3.92857 4.36239 4.06403 4.13223 4.30515C3.90207 4.54626 3.77277 4.87329 3.77277 5.21428C3.77277 5.55528 3.90207 5.8823 4.13223 6.12342C4.36239 6.36454 4.67455 6.5 5.00004 6.5ZM5.00004 7.35714C4.45756 7.35714 3.93729 7.13138 3.55369 6.72951C3.17009 6.32765 2.95459 5.7826 2.95459 5.21428C2.95459 4.64596 3.17009 4.10092 3.55369 3.69905C3.93729 3.29719 4.45756 3.07143 5.00004 3.07143C5.54253 3.07143 6.0628 3.29719 6.4464 3.69905C6.83 4.10092 7.0455 4.64596 7.0455 5.21428C7.0455 5.7826 6.83 6.32765 6.4464 6.72951C6.0628 7.13138 5.54253 7.35714 5.00004 7.35714Z"
                                                    fill="#05073D" />
                                            </svg>
                                        </span>
                                        <input type="text" className="form-control" name="member_location" placeholder="Username"
                                            aria-label="Username" aria-describedby="addon-wrapping" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item"> 
                        <div className="bg-almost-white br-20 profile-card-2 fav-acivities-card">
                            <h2 className="profile-card-title text-midnight-navy">Favorite activities</h2>
                            <div className="bg-almost-white d-flex flex-wrap fav-activity-list position-relative">
                                <div className="fav-activity-single active">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> 
                                    Hiking</div>
                                <div className="fav-activity-single active">
                                    <img src="assets/images/icons/check-white.svg" alt="" />
                                    Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single"><img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single"><img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div> 
                                <div className="fav-activity-input"><input type="text" placeholder="Type here" /></div>
                                <div className="fav-activity-add-btn"> <button><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2.08331V7.91665" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.08301 5H7.91634" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>  Add More</button></div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="row g-4">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="bg-almost-white br-20 profile-card-2 radio-card">
                                    <h2 className="profile-card-title text-midnight-navy">Units</h2>
                                    <div className="pc-radio">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="units" id="imp"
                                                 />
                                            <label className="form-check-label" htmlFor="imp">Imperial</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="units" id="metr"
                                                 />
                                            <label className="form-check-label" htmlFor="metr">Metric</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="bg-almost-white br-20 profile-card-2 radio-card">
                                    <h2 className="profile-card-title text-midnight-navy">Activity time preference</h2>
                                    <div className="pc-radio">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="activity_time_preference" id="spd"
                                                 />
                                            <label className="form-check-label" htmlFor="spd">Speed</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="activity_time_preference" id="pace"
                                                 />
                                            <label className="form-check-label" htmlFor="pace">Pace</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Calorie counter info</h2>
                            <div className="profile-inner-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="height" id="height" >
                                                <option>Unspecified</option>
                                                <option value="">One</option>
                                            </select>
                                            <label htmlFor="height">Height</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="weight" id="weight">
                                                <option >Unspecified</option>
                                                <option value="">One</option>
                                            </select>
                                            <label htmlFor="weight">Weight</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="birthday_month" id="birthday">
                                                <option >Month</option>
                                                <option value="">January</option>
                                            </select>
                                            <label htmlFor="birthday">Birthday</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3"> 
                                                <input type="text" className="form-control" placeholder="" name="birthday_date" id="birthdate"  /> 
                                            <label htmlFor="birthdate">Date</label>
                                        </div>
                                            
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                            <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="" name="birthday_year" id="birthYear"  /> 
                                            <label htmlFor="birthYear">Year</label>
                                        </div>                                             
                                    </div>
                                    
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="language" id="mktLang">
                                                <option >English[US]</option>
                                                <option value="">Hindi</option>
                                            </select>
                                            <label htmlFor="mktLang">Marketing Language</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" placeholder="" name="new_password" id="password" />
                                            <label htmlFor="password">Set a new password</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                            <div className="my-4">
                            <button className="btn-style-1">Save Chanegs</button>
                            <button className="btn-style-0">Cancel</button>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Social Media</h2>
                            <div className="platform-logins">
                                <a href="" className="login-btn mb-2"> <img src="assets/images/icons/facebook-color.svg"
                                        alt="" /> Connect with Facebook</a>
                                <a href="" className="login-btn mb-2"> <img src="assets/images/icons/instagram-2.png"
                                        alt="" /> Connect with Instagram</a>
                            </div>

                        </div>
                    </div>
                </div> 
            </div>
        </section>
    </main>
  );
};

export default ProfileEditSection;
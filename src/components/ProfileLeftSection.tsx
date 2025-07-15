import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileLeftSection: React.FC = () => {
    const location = useLocation();

    // Function to determine if a link is active
    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    return(
        <div className="col-xl-3 col-lg-5 col-md-6 col-sm-12 col-12">
            <aside className="profile-sidebar sticky-top"> 
                <div className="profile-sidebar-top  bg-almost-white">
                    <div className="sidebar-profile">
                        <div className="profile-img"><img src="assets/images/profile/profile-md.png" alt="" /></div>
                        <h4 className="profile-username text-midnight-navy">Amit Singh</h4>
                        <h5 className="profile-address text-midnight-navy">Dubai, United Arab Emirates</h5>
                        <p className="membership-info text-grey">Member since May 2025</p>
                        <button className="btn-style-1">Follow</button>
                    </div> 
                        <div className="followings d-flex justify-content-between position-relative">
                        <div className="follower">
                            <h6 className="fl-count text-midnight-navy mb-0">10</h6>
                            <p className="text-grey mb-0">Followers</p>
                        </div>
                        <div className="following">
                                <h6 className="fl-count text-midnight-navy mb-0">10</h6>
                            <p className="text-grey mb-0">Following</p>
                        </div>
                    </div>
                        <div className="bookmark-buttons d-flex position-relative">
                            <a href="" className="bookmark-btn">  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0601 0.25H1.93993C1.63227 0.25 1.33722 0.372216 1.11967 0.589763C0.902124 0.807309 0.779907 1.10237 0.779907 1.41002V14.1703C0.779959 14.2738 0.80771 14.3754 0.860281 14.4646C0.912852 14.5537 0.988327 14.6272 1.07887 14.6774C1.16942 14.7275 1.27174 14.7525 1.37522 14.7498C1.47869 14.7471 1.57955 14.7167 1.66732 14.6618L6.00001 11.9539L10.3334 14.6618C10.4212 14.7165 10.522 14.7467 10.6253 14.7494C10.7287 14.752 10.8309 14.7269 10.9213 14.6768C11.0118 14.6267 11.0871 14.5533 11.1397 14.4642C11.1922 14.3752 11.22 14.2737 11.2201 14.1703V1.41002C11.2201 1.10237 11.0979 0.807309 10.8804 0.589763C10.6628 0.372216 10.3678 0.25 10.0601 0.25ZM10.0601 13.1241L6.30669 10.7787C6.21451 10.721 6.10799 10.6905 5.99929 10.6905C5.89058 10.6905 5.78406 10.721 5.69188 10.7787L1.93993 13.1241V1.41002H10.0601V13.1241Z" fill="#05073D"/></svg>
                                Stats </a>
                            <a href="" className="bookmark-btn">  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0601 0.25H1.93993C1.63227 0.25 1.33722 0.372216 1.11967 0.589763C0.902124 0.807309 0.779907 1.10237 0.779907 1.41002V14.1703C0.779959 14.2738 0.80771 14.3754 0.860281 14.4646C0.912852 14.5537 0.988327 14.6272 1.07887 14.6774C1.16942 14.7275 1.27174 14.7525 1.37522 14.7498C1.47869 14.7471 1.57955 14.7167 1.66732 14.6618L6.00001 11.9539L10.3334 14.6618C10.4212 14.7165 10.522 14.7467 10.6253 14.7494C10.7287 14.752 10.8309 14.7269 10.9213 14.6768C11.0118 14.6267 11.0871 14.5533 11.1397 14.4642C11.1922 14.3752 11.22 14.2737 11.2201 14.1703V1.41002C11.2201 1.10237 11.0979 0.807309 10.8804 0.589763C10.6628 0.372216 10.3678 0.25 10.0601 0.25ZM10.0601 13.1241L6.30669 10.7787C6.21451 10.721 6.10799 10.6905 5.99929 10.6905C5.89058 10.6905 5.78406 10.721 5.69188 10.7787L1.93993 13.1241V1.41002H10.0601V13.1241Z" fill="#05073D"/></svg> 
                            Saved </a>
                    </div>


                </div>  
                    <div className="profile-sidebar-menu  bg-almost-white">
                        <ul className="list-unstyled profile-menu">
                            <li className={isActive('/profile')}><Link to={'/profile'} >Feed</Link></li>
                            <li className={isActive('/profile-photo')}><Link to={'/profile-photo'}>Photos</Link></li>
                            <li><a href="">Reviews</a></li>
                            <li><a href="">Activities</a></li>
                            <li><a href="">Completed</a></li>
                        </ul>
                    </div>      
                        <Link to={'/edit-profile'} className="abs-edit-profile" title="Edit Profile">
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5137 0.80598C11.5867 -0.268666 13.3274 -0.269589 14.4014 0.804027L16.8936 3.29621C17.958 4.36095 17.9687 6.08414 16.918 7.16243L7.68555 16.6361C6.98003 17.3599 6.01137 17.7679 5.00098 17.7679H2.25C1.05069 17.7678 0.0774547 16.8306 0.00488281 15.6595L0.00292969 15.4232L0.120117 12.6146C0.159615 11.6756 0.550055 10.7843 1.21387 10.1195L10.5137 0.80598ZM17.5146 16.1947C17.9286 16.1947 18.2646 16.5304 18.2646 16.9447C18.2646 17.359 17.9287 17.6947 17.5146 17.6947H11.3936L11.3164 17.6907C10.9386 17.6521 10.6436 17.333 10.6436 16.9447C10.6436 16.5564 10.9386 16.2372 11.3164 16.1986L11.3936 16.1947H17.5146ZM2.27441 11.181C1.87636 11.5798 1.64186 12.1138 1.61816 12.6771L1.50098 15.4857V15.5657C1.52555 15.9556 1.84974 16.2676 2.24902 16.2679H5.00195C5.60809 16.2678 6.18906 16.0225 6.6123 15.5882L13.1436 8.88508L8.85059 4.59309L2.27441 11.181ZM13.3418 1.86555C12.8536 1.37755 12.062 1.37805 11.5742 1.86653L9.91113 3.53157L14.1914 7.81184L15.8447 6.11555C16.3222 5.62547 16.3176 4.84171 15.834 4.35774L13.3418 1.86555Z" fill="#7D7D7D"/>
                    </svg>
                    </Link>                            
            </aside>
        </div>
    );

};

export default ProfileLeftSection
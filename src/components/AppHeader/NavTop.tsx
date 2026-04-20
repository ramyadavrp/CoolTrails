import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth,handleLogout } from '../../utils/storage';
const BASE_URL = import.meta.env.VITE_API_URL;
 
interface Profile {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}

const PROFILE_KEY = "user_profile";

const NavTop: React.FC = () => {

  // initialize directly from localStorage (important)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string>(
    localStorage.getItem("id") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [profile, setProfile] = useState<Profile | null>(null);
  const profileFetched = useRef(false);
  const navigate = useNavigate();

  // sync auth (optional but safe)
  useEffect(() => {
    const auth = getAuth();

    if (auth.userId) setUserId(auth.userId);
    if (auth.token) {
      setToken(auth.token);
      setIsLoggedIn(true);
    }
  }, []);

  // load profile
  useEffect(() => {
    if (!userId || !token) return;

    const storedProfile = localStorage.getItem(PROFILE_KEY);
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      return;
    }

    if (profileFetched.current) return;
    profileFetched.current = true;

    const loadProfile = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/profile`,
          { UserId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setProfile(response.data.data);
          localStorage.setItem(PROFILE_KEY, JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error("Profile API error", error);
      }
    };

    loadProfile();
  }, [userId, token]);

  // logout
  const handleLogout = () => {
    localStorage.clear();

    setUserId("");
    setToken(null);
    setIsLoggedIn(false);
    setProfile(null);

    navigate('/');
  };

    return (
        <>
        {/* <SeoMeta/> */}
        <header className="header">
            <nav className="navbar navbar-expand-lg main-navbar">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand">
                        <img src="/assets/images/logo.svg" alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Explore <img src="/assets/images/icons/Down-menu.svg" alt="" />
                                </a>
                                 <div className="dropdown-menu">
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to={'/national-park-guide'} className="dropdown-item">
                                            <img src="/assets/images/icons/Document.svg" alt="" />
                                            National Park Guide
                                        </Link>
                                        
                                    </li>
                                    
                                    <li>
                                        <Link to={'/explore'} className="dropdown-item">
                                            <img src="/assets/images/icons/location.svg" alt="" />
                                             Near by Trails
                                        </Link>
                                    </li>
                                    <li>
                                        {/* <Link to={'/community'} className="dropdown-item">
                                            <img src="/assets/images/icons/Users.svg" alt="" />
                                            Community
                                        </Link> */}
                                        <button
                                            type="button"
                                            className="dropdown-item"
                                            onClick={() => {
                                                if (!isLoggedIn) {
                                                navigate(`/login?redirect=${encodeURIComponent("/community")}`);
                                                } else {
                                                navigate("/community");
                                                }
                                            }}
                                            >
                                            <img src="/assets/images/icons/Users.svg" alt="" />
                                            Community
                                        </button>

                                    </li>
                                    {/* <li>
                                        <a href="/explore-trail" className="dropdown-item"><img src="assets/images/icons/Users.svg" alt="" />Explore Trail</a>
                                    </li>
                                    <li>
                                        <a href="/affiliate-details" className="dropdown-item"><img src="assets/images/icons/Users.svg" alt="" />Trail Details</a>
                                    </li> */}
                                </ul>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Saved <img src="/assets/images/icons/Down-menu.svg" alt="" />
                                </a>
                                <div className="dropdown-menu">
                                <ul className="list-unstyled">
                                    {/* <li><a className="dropdown-item" href="#"><img src="/assets/images/icons/bookmark.svg"
                                                alt="" /> Saved</a></li> */}
                                    <li>
                                        <Link to={'/create-map'} className="dropdown-item">
                                        <img src="/assets/images/icons/map.svg" alt="" />
                                            Custome routes & Maps
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/plans'} className="dropdown-item">
                                            <img src="/assets/images/icons/lists.svg" alt="" />
                                            Show all lists
                                        </Link>
                                    </li>
                                </ul>
                                </div>
                                
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Shop <img src="/assets/images/icons/Down-menu.svg" alt="" />
                                </a>
                                <div className="dropdown-menu">
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link to={'/plans'} className="dropdown-item">
                                                <img src="/assets/images/icons/Users.svg" alt="" />
                                                Compare Plans
                                            </Link>
                                            {/* <a className="dropdown-item" href="#">Compare Plans</a> */}
                                        </li>
                                        <li>
                                            <Link to={'/gift-membership'} className="dropdown-item">
                                                <img src="/assets/images/icons/Users.svg" alt="" />
                                                gift Membership 
                                            </Link>
                                            {/* <a className="dropdown-item" href="#">gift Membership</a> */}
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div className="nav-right">
                            {isLoggedIn ? (
                                // <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                //     <li className="nav-item dropdown">
                                //         <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                //             aria-expanded="false">
                                //             Sandeep Verma <img src="assets/images/icons/Down-menu.svg" alt="" />
                                //         </a>
                                //         <div className="dropdown-menu">
                                //             <ul className="list-unstyled">
                                //                 <li>
                                //                     <Link to={'/profile'} className="dropdown-item">
                                //                         <img src="assets/images/icons/Document.svg" alt="" /> 
                                //                         My Profile
                                //                     </Link>
                                                    
                                //                 </li>
                                //                 <li>
                                //                     <button className="dropdown-item" onClick={handleLogout}>
                                //                         <img src="assets/images/icons/Users.svg" alt="" />
                                //                         Logout
                                //                     </button>
                                //                 </li>
                                //             </ul>
                                //         </div>
                                //     </li>
                                // </ul>

                                <div className="nav-item dropdown user-profile-dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                            <img 
                                                src={profile?.picturePath || '/assets/images/profile/profile-md.png'}
                                                alt="logo not"
                                                className="user-profile-img" 
                                                style={{borderRadius:'50%'}}
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null; // prevent infinite loop
                                                    target.src = '/assets/images/profile/profile-md.png'; // fallback image
                                                }}
                                            />
                                        {/* <img src="/assets/images/profile/profile-md.png" alt="" className="user-profile-img" /> */}
                                    </a>
                                    <div className="dropdown-menu">
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link to={'/profile'} className="dropdown-item">
                                                    <img src="/assets/images/icons/user.png" alt="" /> Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/reset-password'} className="dropdown-item">
                                                    <img src="/assets/images/icons/user.png" alt="" /> Change Password
                                                </Link>
                                            </li>
                                            {/* <li>
                                                <a className="dropdown-item" href="#"><img src="/assets/images/icons/info.png"
                                                        alt="" /> Help Center</a>
                                            </li> */}
                                            <li>
                                                    <button  type="button" className="dropdown-item" onClick={handleLogout}>
                                                        <img src="/assets/images/icons/sign-out-alt.png" alt="" /> Logout
                                                    </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div> 

                            ) : (
                                <Link to="/login" className="btn-style-1">Log In</Link>
                            )}
                            {/* <a href="login.html" className="btn-style-1">Log In</a> */}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        </>
        
    );
};

export default NavTop;
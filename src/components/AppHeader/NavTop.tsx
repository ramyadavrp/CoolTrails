import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavTop: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };


    return (
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
                                        <Link to={'/explore-trail'} className="dropdown-item">
                                            <img src="/assets/images/icons/location.svg" alt="" />
                                             Near by Trails
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/community'} className="dropdown-item">
                                            <img src="/assets/images/icons/Users.svg" alt="" />
                                            Community
                                        </Link>
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
                                    <li><a className="dropdown-item" href="#"><img src="/assets/images/icons/bookmark.svg"
                                                alt="" /> Saved</a></li>
                                    <li><a className="dropdown-item" href="#"><img src="/assets/images/icons/map.svg" alt="" />
                                            My
                                            Maps</a></li>
                                    <li><a className="dropdown-item" href="#"><img src="/assets/images/icons/lists.svg"
                                                alt="" />
                                            Show all lists</a></li>
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
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
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
                                        <img src="/assets/images/profile/profile-md.png" alt="" className="user-profile-img" />
                                    </a>
                                    <div className="dropdown-menu">
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link to={'/profile'} className="dropdown-item">
                                                    <img src="/assets/images/icons/user.png" alt="" /> Profile
                                                </Link>
                                            </li>
                                            <li><a className="dropdown-item" href="#"><img src="/assets/images/icons/info.png"
                                                        alt="" /> Help Center</a></li>
                                            <li>
                                                    <button className="dropdown-item" onClick={handleLogout}>
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
    );
};

export default NavTop;
// src/containers/Home.tsx
import React, { useEffect, useState } from 'react';
import CompanySection from './CompanySection';
import SupportSection from './SupportSection';
import SubscribeSection from './SubscribeSection';
// import data from '../data/socialMedia.json';
import data from '../../../public/data/socialMedia.json'
import axios from 'axios';
import { getAuth } from '../../utils/storage';
// import Banner from '../components/AppHeader/Banner';
import { Link } from 'react-router-dom';
import { fetchStaticPage,StaticPage  } from '../../utils/footerstaticPages';
interface Media{
    name:string,
    url:string,
    icon:string
}
const BASE_URL = import.meta.env.VITE_API_URL;

const Footer: React.FC = () => {
    const [getMedia, setMedia ]= useState<Media[]>([]);
    const [pages, setPages] = useState<Record<string, StaticPage>>({});
    const [loginId, setLoginId] = useState("");
    
    const handleClick = () => {
        alert('Button clicked!');
    };

     useEffect(() => {
        const {login} = getAuth();
            if (login) setLoginId(login);
    }, []);
    useEffect(() => {
            // if (!userId) return; // wait until userId is available
    
            const fetchMedia = async () => {
                try {
                    const response = await axios.post(`${BASE_URL}/common/social-media`, {
                        LoginId: loginId,
                    });
        
                    if (response.data.status === "success") {
                        const data = response.data.data;
                        setMedia(data);

                    }
                } catch (error) {
                console.error("Error loading profile:", error);
                alert("Failed to load profile");
                }
            };
    
            fetchMedia();
    }, []);

    // useEffect(()=>{
    //     const fetchMedia= async () => {
    //             try {
                    
    //                 const response = await fetch('/data/socialMedia.json'); 
    //                 const json = await response.json();
    //                 setMedia(json.social_media);
                    
    //             }catch (error) {
    //             console.error('Error fetching JSON:', error);
    //         }
    //     };
    //     fetchMedia();
    // },[]);
   
   
    return (
    // <footer className="bg-[#3d3d3d] text-white py-12 pt-0">
    //     <div className="container mx-auto px-6">
    //     <CompanySection />
    //     <SubscribeSection />
    //     <SupportSection />
        
    //     </div>
    //   </footer>
    <footer className="footer position-relative">
        <div className="footer-main bg-skyblue">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-logo-container d-flex justify-content-center">
                            <a href="" className="footer-logo d-block">
                                <img src="/assets/images/logo-white.svg" alt="" /></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="footer-widget">
                            <div className="footer-title d-flex" data-bs-toggle="collapse" role="button"
                                data-bs-target="#footer-nav-1" aria-expanded="true" aria-controls="footer-nav-1">
                                <div className="ft-title ft-title d-flex justify-content-between w-100">
                                    <h2 className="title">Explore</h2>
                                    <span className="ft-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                        </svg></span>
                                </div>
                            </div>
                            <div className="collapse show" id="footer-nav-1">
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={'/national-park-guide'} className="dropdown-item">Parks</Link></li>
                                </ul>
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={`/page/cookie-policy`}>Cookie Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="footer-widget">
                            <div className="footer-title d-flex" data-bs-toggle="collapse" role="button"
                                data-bs-target="#footer-nav-2" aria-expanded="true" aria-controls="footer-nav-2">
                                <div className="ft-title ft-title d-flex justify-content-between w-100">
                                    <h2 className="title">Maps</h2> <span className="ft-icon"><svg width="16" height="16"
                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                        </svg></span>
                                </div>
                            </div>
                            <div className="collapse show" id="footer-nav-2">
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={'/add-post'} className="dropdown-item"> Create Map</Link></li>
                                </ul>
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={`/page/manage-cookies`}> Manage Cookies</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="footer-widget">
                            <div className="footer-title d-flex" data-bs-toggle="collapse" role="button"
                                data-bs-target="#footer-nav-3" aria-expanded="true" aria-controls="footer-nav-3">
                                <div className="ft-title ft-title d-flex justify-content-between w-100">
                                    <h2 className="title">Company</h2> <span className="ft-icon"><svg width="16" height="16"
                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                        </svg></span>
                                </div>
                            </div>
                            <div className="collapse show" id="footer-nav-3">
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={'/affiliates'}>Affiliates</Link></li>
                                </ul> 
                                 <ul className="list-unstyled footer-nav">
                                    <li><Link to={`/page/privacy-policy`}>Privacy Policy</Link></li>
                                </ul> 
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="footer-widget">
                            <div className="footer-title d-flex" data-bs-toggle="collapse" role="button"
                                data-bs-target="#footer-nav-4" aria-expanded="true" aria-controls="footer-nav-4">
                                <div className="ft-title d-flex justify-content-between  w-100">
                                    <h2 className="title">Community</h2> <span className="ft-icon"><svg width="16" height="16"
                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                        </svg></span>
                                </div>
                            </div>
                            <div className="collapse show" id="footer-nav-4">
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={'/gift-membership'} >Gift membership</Link></li>
                                </ul>
                                <ul className="list-unstyled footer-nav">
                                    <li><Link to={`/page/terms`}>Terms</Link></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-bottom bg-almost-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="copyright">
                            <p className="mb-0 copyright-text">© 2010-2025 CoolTrails, LLC</p>
                            <ul className="list-unstyled d-flex flex-wrap footer-copyright-nav mb-0 mt-0">
                                <li><Link to={`/page/privacy-policy`}>Privacy Policy</Link></li>
                                <li><Link to={`/page/terms`}>Terms</Link></li>
                                <li><Link to={`/page/cookie-policy`}>Cookie Policy</Link></li>
                                <li><Link to={`/page/manage-cookies`}>Manage Cookies</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="footer-social-media">
                            <ul
                                className="d-flex justify-content-end gap-3 list-unstyled flex-wrap social-media-logo social-media-logo-footer mb-0 mt-0 align-items-center">
                                {getMedia?.map((media: any) => (
                                    <li key={media.id}>
                                        <a href={media.url || '#'} title={media.name || ''}
                                            className="social-media-btn d-flex align-items-center justify-content-center"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={media.iconPath || '/assets/images/not-found.jpg'}
                                                alt={media.name || 'social icon'}
                                            />
                                        </a>
                                    </li>
                                ))}

                                {/* <li><a href="" title="Instagram"
                                        className="social-media-btn d-flex align-items-center justify-content-center"><img
                                            src="/assets/images/icons/instagram.svg" alt="" /></a></li>
                                <li><a href="" title="Twitter-X"
                                        className="social-media-btn d-flex align-items-center justify-content-center"><img
                                            src="/assets/images/icons/twitter-x.svg" alt="" /></a></li>
                                <li><a href="" title="Linked IN"
                                        className="social-media-btn d-flex align-items-center justify-content-center"><img
                                            src="/assets/images/icons/linkedin02.svg" alt="" /></a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;

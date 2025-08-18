import React, { useState,useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { SquareLoader } from "react-spinners";

const BASE_URL = import.meta.env.VITE_API_URL;
const NationalParkGuideSection: React.FC = () => {
    const [nationalParks,setNationalParks] = useState([]);
    const [loadingNParks,setLoadingNParks] = useState(true);
    const [errorsNParks,setErrorsNParks] = useState('');

    window.scrollTo(0,0);
    useEffect(()=>{
        const timer = setTimeout(()=>
            setLoadingNParks(false),5000);
        return()=>clearTimeout(timer);
    },[]);
    // Effect to fetch data
    useEffect(() => {
        const fetchNParks= async ()=>{
            try{
                setLoadingNParks(true); // show loader every time fetch starts
                setErrorsNParks("");
                const response = await axios.get(`${BASE_URL}/home/topparks/10`);
                setNationalParks(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorsNParks('Unable to fetch National Parks');
            } finally{
                setLoadingNParks(false);
            }
        };
        fetchNParks();
    }, []);
    
    //console.log(nationalParks);
    // if(loadingNParks) return <p>Loading Parks....</p>;
    // if(errorsNParks) return <p>{errorsNParks}</p>;
    // if(nationalParks.length === 0) return <p>NO National Parks found</p>;
    if (loadingNParks) {
        return (
            <div
                style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "#FFF5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                }}
            >
                <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} />
            </div>
        );
    }
    if (errorsNParks) return <p>{errorsNParks}</p>;
    
    if (nationalParks.length === 0) return <p>NO National Parks found.</p>;
    return (
        <main className="mainContent">
            <section className="section-explore-park">
                <div className="container">
                    <div className="row justify-content-center align-items-center g-4 sep-row">
                        <div
                            className="col-xl-5 col-lg-6 col-md-10 col-sm-12 col-12 order-xl-first order-lg-first order-md-last order-sm-last order-last">
                            <div className="sep-content">
                                <div className="cooltrails-title">
                                    <h1 className="title">Explore <br/><span>200+ National <br/> Park Guides</span></h1>
                                    <p>Get insider tips, curated trail collections, and more from AllTrails experts.</p>
                                </div>

                            </div>
                        </div>
                        <div
                            className="col-xl-5 col-lg-6 col-md-10 col-sm-12 col-12  order-xl-last order-lg-last order-md-first order-sm-first order-first sep-image-col">
                            <div className="sep-images">
                                <div className="row g-2">
                                    <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4 col-4">
                                        <div className="sep-img sep-img-1"><img src="assets/images/other/sep-1.png" alt=""
                                                className="w-100"/></div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4 col-4">
                                        <div className="sep-img sep-img-2"><img src="assets/images/other/sep-2.png" alt=""
                                                className="w-100"/></div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4 col-4">
                                        <div className="sep-img sep-img-3"><img src="assets/images/other/sep-3.png" alt=""
                                                className="w-100"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="sep-separator"></div>
                        </div>
                    </div>
                    <div className="row sep-foot-row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="sep-foot">
                                <p className="sep-title text-midnight-navy mb-0">Trails we love</p>
                                <p className="mb-0 text-grey">From top picks to hidden gems, find your favorite trails with
                                    our curated collections.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="sep-foot">
                                <p className="sep-title text-midnight-navy mb-0">All the details you need</p>
                                <p className="mb-0 text-grey">Get guidance from AllTrails experts, informed by our community
                                    of 80 million trail-goers.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="sep-foot">
                                <p className="sep-title text-midnight-navy mb-0">Insider tips and tricks</p>
                                <p className="mb-0 text-grey">Come prepared with helpful info like fees, reservations, and
                                    the best times to visit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-to-dest default-padding">
                <div className="container"> 
                    <div className="row">
                        <div className="col-12">
                            
                            <div className="cooltrails-title text-center">
                                <h2 className="title title-sm title-dropdown d-flex align-items-center justify-content-center">
                                    <span className="me-2 text-midnight-navy">Guides to</span>  
                                    <select name="" id="" className="advance-select" defaultValue="">
                                        {/* <option value="" selected>Austraila</option> */}
                                        <option value="">Austraila</option>
                                        <option value="america">America</option>
                                        <option value="india">India</option>
                                    </select> 
                                </h2>
                                <p className="text-center text-grey">29 Parks • 29 Guides</p>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                            {
                                nationalParks.map((nparks:any,index:number)=>(
                                <div key = {index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                                    <div className="guide-to-single d-flex align-items-center position-relative">
                                        <div className="gds-thumb">
                                            <img
                                                src={nparks.image || '/assets/images/not-found.jpg'}
                                                alt="Weather" 
                                                className="w-100"
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null; // prevent infinite loop
                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                }}
                                            />
                                        </div>
                                        <div className="gds-cn">
                                            <h4 className="mb-0 text-midnight-navy">{nparks.name}</h4>
                                            <p className="mb-0 text-grey">Tasmania • National Park</p>
                                            <p className="mb-0 text-grey">7 Trails</p>
                                        </div>
                                        <div className="gds-btn">
                                            <a href="" className="stretched-link">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                        stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                               ))
                            }
                            
                        {/* <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/2.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Springbook</h4>
                                    <p className="mb-0 text-grey">Queensland • National Park</p>
                                    <p className="mb-0 text-grey">7 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/3.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Cradle Mountain-Lake St Clair </h4>
                                    <p className="mb-0 text-grey">Tasmania • National Park</p>
                                    <p className="mb-0 text-grey">7 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/2.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Springbook </h4>
                                    <p className="mb-0 text-grey">Tasmania • National Park</p>
                                    <p className="mb-0 text-grey">7 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/5.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Glass House Mountains </h4>
                                    <p className="mb-0 text-grey">New South Wales • National Park</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/6.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Lane Cove </h4>
                                    <p className="mb-0 text-grey">Queensland • National Par</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/9.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Glass House Mountains </h4>
                                    <p className="mb-0 text-grey">Queensland • National Par</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/8.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Dandenong Ranges </h4>
                                    <p className="mb-0 text-grey">New South Wales • National Park</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/8.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Kosciuszko </h4>
                                    <p className="mb-0 text-grey">New South Wales • National Park</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/7.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Dandenong Ranges </h4>
                                    <p className="mb-0 text-grey">New South Wales • National Par</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/9.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Dandenong Ranges </h4>
                                    <p className="mb-0 text-grey">New South Wales • National Par</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="guide-to-single d-flex align-items-center position-relative">
                                <div className="gds-thumb"><img src="assets/images/guide-to/6.png" alt="" className="w-100"/>
                                </div>
                                <div className="gds-cn">
                                    <h4 className="mb-0 text-midnight-navy">Lamington </h4>
                                    <p className="mb-0 text-grey">New South Wales • National Par</p>
                                    <p className="mb-0 text-grey">8 Trails</p>
                                </div>
                                <div className="gds-btn">
                                    <a href="" className="stretched-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                stroke="#717171" stroke-width="1.1" stroke-linecap="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </main>
  );
};

export default NationalParkGuideSection;

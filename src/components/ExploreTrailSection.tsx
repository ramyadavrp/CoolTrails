import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SyncLoader } from "react-spinners";
import path from 'path';
import { Link } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle} from '../utils/helpers';
import data from '../data/explorealltrails.json';
import { SquareLoader } from "react-spinners";


const BASE_URL = import.meta.env.VITE_API_URL;
interface TrailDetail {
    id: number;
    title: string;
    slug: string;
    image: string;
}
interface Trails{
    explore_image:string,
    explore_title:string,
    explore_address:string,
    explore_rating:number,
    explore_distance:number,
    explore_time_duration:number,
}
 
function ExploreTrailSection(){
    const { title } = useParams();
    const [getTrails, setTrails ]= useState<Trails[]>([]);
     const [loadingExplore,setloadingExplore] = useState(true);

    const [filters, setFilters] = useState({
        distance: [],    // e.g., ["near", "away"]
        activity: [],    // e.g., ["running", "walking"]
        difficulty: [],  // e.g., ["easy", "hard"]
        length: [],      // e.g., ["short", "long"]
    });
    window.scrollTo(0,0);
    useEffect(()=>{
        const timer = setTimeout(()=>
            setloadingExplore(false),3000);
        return()=>clearTimeout(timer);
    },[]);
    useEffect(()=>{
            const fetchExploreData= async () => {
                try {
                    const response = await fetch('/data/explorealltrails.json'); 
                    const json: Trails[] = await response.json();
                    setTrails(json.explore_trails);
                    
                }catch (error) {
                console.error('Error fetching JSON:', error);
            }
            };
            fetchExploreData();
    },[]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //    console.log('hello');
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: [value], // use array if your state expects an array
        }));
        
    };
//    console.log(filters);
// console.log('ex',getTrails);
    
    useEffect(() => {
            // console.log(title);
        if (title) {
            try {
            fetchExploreTrail(title);
            } catch (err) {
            console.error('Failed to decode ID:', err);
            }
        }
        }, [title]);

        const fetchExploreTrail = async  (title:String) =>{
            console.log('fetchExploreTrail');
        }
        if (loadingExplore) {
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
    return(
        <main className="mainContent">
            <section className="section-explore-trails position-relative default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="explore-trail-container position-relative z-1">
                                <div className="section-title mb-3">
                                    <h2 className="title title-md">Explore trails</h2>
                                </div>
                                <div className="inner-filter sticky-top">
                                    <div className="search-filter">
                                        <form action="" className="bg-almost-white searchForm position-relative">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <button type="submit" title="Search" className="search-btn"><i className="bi bi-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <div className="inner-filter">
                                    <div className="collapse" id="allFilter">
                                        <div className="select-filter d-flex flex-wrap mb-3 w-100 overflow-hidden">
                                            <div className="single-select-filter">
                                                <select name="distance" 
                                                    id="distanceFilter"
                                                    className="form-select advance-select"
                                                    value={filters.distance}
                                                    onChange={handleSelectChange}
                                                    >
                                                    <option value="near">Distance Near</option>
                                                    <option value="away">Distance Away</option>
                                                </select>
                                            </div>
                                            <div className="single-select-filter">
                                                <select name="activity" 
                                                    id="runningFilter"
                                                    className="form-select advance-select"
                                                    value={filters.activity}
                                                    onChange={handleSelectChange}
                                                    >
                                                    <option value="running">Running</option>
                                                    <option value="option">Option</option>
                                                </select>
                                            </div>
                                            <div className="single-select-filter">
                                                <select name="difficulty" 
                                                    id="difficultyFIlter" 
                                                    className="form-select advance-select"
                                                    value={filters.difficulty}
                                                    onChange={handleSelectChange}
                                                    >
                                                    <option value="difficulty">Difficulty</option>
                                                    <option value="easy">Easy</option>
                                                    <option value="moderate">Moderate</option>
                                                    <option value="hard">Hard</option>
                                                </select>
                                            </div>
                                            <div className="single-select-filter">
                                                <select name="length" 
                                                    id="lengthFilter" 
                                                    className="form-select advance-select"
                                                    value={filters.length}
                                                    onChange={handleSelectChange}
                                                    >
                                                    <option value="length">Length</option>
                                                    <option value="easy">Easy</option>
                                                    <option value="moderate">Moderate</option>
                                                    <option value="hard">Hard</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <button className="btn-style-5" data-bs-toggle="collapse" data-bs-target="#allFilter" aria-expanded="false" aria-controls="allFilter">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <path d="M21 7L11 7" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="2" cy="2" r="2" transform="matrix(-1 0 0 1 7 5)" stroke="#05073D" strokeWidth="1.5" />
                                                <path d="M3 17L13 17" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="19" cy="17" r="2" stroke="#05073D" strokeWidth="1.5" />
                                            </svg>
                                            All Filters
                                        </button>
                                    </div>
                                </div>
                                <div className="resultContainer d-flex justify-content-between px-2 mb-2">
                                    <div className="res">
                                        <p className="mb-2">49 trails</p>
                                    </div>
                                    <div className="resFilter d-flex justify-content-end">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                                            <path
                                                d="M3 4.82463L4.61795 3.20668C4.89352 2.93111 5.34031 2.93111 5.61587 3.20668L7.23383 4.82463M5.11691 3.41335L5.11691 11.881M9.35074 11.1754L10.9687 12.7933C11.2443 13.0689 11.691 13.0689 11.9666 12.7933L13.5846 11.1754M11.4677 12.5866V4.11899"
                                                stroke="#05073D"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <select name="" id="sortby" className="advance-select" >
                                            <option value="">Best Matches</option>
                                            <option value="">Most Popular</option>
                                            <option value="">Closest</option>
                                            <option value="">Newly Added</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    {
                                        getTrails.length > 0 ? (
                                            getTrails.map((trail:any, index:number)=>(
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div className="local-favorite-single mb-4">
                                                        <div className="lfc-thumb position-relative">
                                                            <img
                                                                src={trail.explore_image || '/assets/images/not-found.jpg'}
                                                                alt="locat Trail" className="img-fluid img-fixed-size" 
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                }}
                                                            />
                                                            {/* <img src="assets/images/local-favorites/img-1.jpg" alt="" className="img-fluid" /> */}
                                                            <a href="#!" className="bookmark-btn" role="button" title="Save"><i className="bi bi-bookmark"></i></a>
                                                        </div>
                                                        <div className="lfc-content">
                                                            <h3 className="lfc-title">{trail.explore_title}Wadi Sahem - Al Hayl Fort - Water Springs</h3>
                                                            <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                            <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                            <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ):(
                                            <p>not </p>
                                        )
                                    }
                                    
                                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="local-favorite-single mb-4">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-2.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" role="button" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Samar Trail: Jabal Jais</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="local-favorite-single mb-4">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-3.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" role="button" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Shawka Dam Mountain Trail</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="local-favorite-single mb-4">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-4.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" role="button" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Sheri Village Trail</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="local-favorite-single mb-4">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-1.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" role="button" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Wadi Sahem - Al Hayl Fort - Water Springs</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="local-favorite-single mb-4">
                                            <div className="lfc-thumb position-relative">
                                                <img src="assets/images/local-favorites/img-2.jpg" alt="" className="img-fluid" />
                                                <a href="#!" className="bookmark-btn" role="button" title="Save"><i className="bi bi-bookmark"></i></a>
                                            </div>
                                            <div className="lfc-content">
                                                <h3 className="lfc-title">Samar Trail: Jabal Jais</h3>
                                                <p className="lfc-location mb-1">Al Fujayrah, Fujairah, United Arab Emirates</p>
                                                <p className="lfc-tags"><i className="bi bi-star-fill"></i> 4.6 · Moderate · 9.3km · Est. 2h 45m</p>
                                                <a href="#!" className="btn-style-1 w-100">Check Details</a>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="explore-trail-abs-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623465.506385643!2d3.1753929462417525!3d50.71315181250765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3a4ed73c76867%3A0xc18b3a66787302a7!2sBrussels%2C%20Belgium!5e0!3m2!1sen!2sin!4v1749977024534!5m2!1sen!2sin"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </main>

    );

};

export default ExploreTrailSection;
import React, { useEffect, useState, useMemo ,useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SyncLoader } from "react-spinners";
import path from 'path';
import { Link } from 'react-router-dom';
import { decodeId, encodeId, generateSlug, slugToTitle,usePageTitle } from '../utils/helpers';
import data from '../data/explorealltrails.json';
import { SquareLoader } from "react-spinners";
import Select from "react-select";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken ="pk.eyJ1IjoiMTExMnZpcmVuZHJhIiwiYSI6ImNtYmE0emNyNjBwbHMyanNibHBpZHgxMjUifQ.5FSp2VZ1T1kXcGV38bC5jA";



const BASE_URL = import.meta.env.VITE_API_URL;
interface TrailDetail {
    id: number;
    title: string;
    slug: string;
    image: string;
}
interface Trails {
    imagePath: string,
    title: string,
    activity: string,
    explore_address: string,
    rating: any,
    length: any,
    estimateTime: number,
    date: number,
    trailId: number
}
interface Activity {
    explore_image: string,
    explore_title: string,
    explore_address: string,
    explore_rating: any,
    explore_distance: any,
    explore_time_duration: number,
    date: number
}

// const options = [
//     { value: "Best", label: "Best Matches" },
//     { value: "popular", label: "Most Popular" },
//     { value: "closest", label: "Closest" },
//     { value: "new", label: "Newly Added" },
// ];

function ExploreNearByTrailsSection() {
    const { title } = useParams();
    const [getTrails, setTrails] = useState<Trails[]>([]);
    const [getActivity, setActivity] = useState<Activity[]>([]);
    const [loadingExplore, setloadingExplore] = useState(true);
    const [loading, setloading] = useState(false);
    const [sortType, setSortType] = useState("Best");
    const [nearFilter, setNearFilter] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const [lengthDifficulty, setDifficulty] = useState("all");
    const [searchTerm, setSearchText] = useState("");
    // const [selected, setSelected] = useState(options[0]);

    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);
    const [maxDistance, setMaxDistance] = useState(15);
    //const [nearbytrails,setNearbytrails] =useState([]);
    const [nearbytrails, setNearbytrails] = useState<any[]>([]);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    // usePageTitle("Cooltrails | Explore");
    useEffect(() => {
        if (loadingExplore) return;
        if (!mapContainer.current) return;
        if (mapRef.current) return;
        if (latitude === null || longitude === null) return; 

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [longitude, latitude], 
            zoom: 13,
            attributionControl: false
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());

        // Optional: current location marker
        new mapboxgl.Marker({ color: "#007AFF" })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [loadingExplore, latitude, longitude]);

   
    const [filters, setFilters] = useState({
        distance: [],    // e.g., ["near", "away"]
        activity: [],    // e.g., ["running", "walking"]
        difficulty: [],  // e.g., ["easy", "hard"]
        length: [],      // e.g., ["short", "long"]
    });
    const totalTrails = getTrails.length
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() =>
            setloadingExplore(false), 3000);
        return () => clearTimeout(timer);
    }, []);
    

    const postLocation = async () => {
        
        try {
            setloadingExplore(true);
            const response = await axios.post(`${BASE_URL}/trail/NearTrailsByLatAndLan`, {
                take: take,
                skip: skip,
                lat: latitude,
                lon: longitude,
                // lat: 27.1719517170742,
                // lon: 78.0420843000696,
                maxDistance: maxDistance,
                // headers: {
                // "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`
                // } 
            });
            
            setTrails(response.data.data);
             console.log('Server response setTrails:', response.data.data);
        } catch (err) {
            console.error('Failed your location:', err);
        } finally {
            setloadingExplore(false);
        }
    };
    // console.log('hhf',getTrails);
    useEffect(() => {
        // Users Current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    //const { latitude,longitude } = position.coords;
                    //console.log('user location:', latitude, longitude );
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    //console.log('user location:', latitude, longitude );
                    //postLocation(latitude, longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error.message);
                }
            );
        } else {
            console.error('not Support');
        }
    }, []);
    //console.log('user location:1', latitude, longitude ,take,skip,maxDistance);

    // Fetch data when location or pagination changes
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            postLocation();
        }
    }, [latitude, longitude, take, skip, maxDistance]);


    useEffect(() => {
        const fetchActivity = async () => {
             
            try {
                 setloadingExplore(true);
                const response = await axios.get(`${BASE_URL}/home/topcategory/20`);
                setActivity(response.data.data);
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setloadingExplore(false);
            }
        }
        fetchActivity();
    }, []);
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedCategory(value);
        console.log('selectedCategory:', value);
    };

    const handleNearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setloading(true);
        setNearFilter(newValue);
        setSortType(null);
        setDifficulty('all')
        setTimeout(() => setloading(false), 30000);
    };


    const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setloading(true);
        setDifficulty(newValue);
        setSortType(null);
        setTimeout(() => setloading(false), 3000);
    };
    const handleMatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setloading(true);
        setSortType(newValue);
        setNearFilter('all');
        setDifficulty('all');
        // Optional small delay to simulate real API/fetch
        setTimeout(() => setloading(false), 3000);
    };


    useEffect(() => {
        setloading(true);
        const timer = setTimeout(() => setloading(false), 3000);
        return () => clearTimeout(timer);
    }, [searchTerm, sortType, nearFilter, lengthDifficulty, selectedCategory,getTrails]);

    const { sortedData, count } = useMemo<{ sortedData: Trails[]; count: number }>(() => {
        setloading(true);
        const timer = setTimeout(() => setloading(false), 3000);

        let result = [...getTrails];

        // --- searching ---
        if (searchTerm){
            result = result.filter(trail => trail.title.toLowerCase().includes(searchTerm.toLowerCase()));
        } 
        if (selectedCategory !=='all') {
            result = result.filter(trail =>
                trail.activity?.toLowerCase() === selectedCategory
            );
        }

        // --- Filters ---
        if (nearFilter === "near") {
            result = result.filter(trail => trail.length <= 8);
        }
        else if (nearFilter === "away") {
            result = result.filter(trail => trail.length > 6);
        }

        if (lengthDifficulty === "easy") {
            result = result.filter(trail => trail.length < 4);
        }
        else if (lengthDifficulty === "moderate") {
            result = result.filter(trail => trail.length < 7);
        }else if (lengthDifficulty === "moderate") {
            result = result.filter(trail => trail.length > 9);
        }
        else if (lengthDifficulty === "hard") {
            result = result.filter(trail => trail.length > 10);
        }
        
        // --- Sorting ---
        if (sortType === "popular") {
            result.sort((a, b) => b.rating - a.rating);
        }
        else if (sortType === "closest") {
            result.sort((a, b) => a.length - b.length);
        }
        else if (sortType === "new") {
            result.sort((a, b) => b.trailId - a.trailId);
        }
        else if (sortType === "Best") {
            result.sort((a, b) => {
                const scoreA = Number(a.rating) * 2 - Number(a.length) + (new Date(a.date).getTime() || 0) / 1e10;
                const scoreB = Number(b.rating) * 2 - Number(b.length) + (new Date(b.date).getTime() || 0) / 1e10;
                return scoreB - scoreA;
            });
        }

        const count = result.length;
        return { sortedData: result, count };
    }, [getTrails, searchTerm, sortType, nearFilter, selectedCategory,lengthDifficulty]);

    useEffect(() => {
        if (title) {
            try {
                fetchExploreTrail(title);
            } catch (err) {
                console.error('Failed to decode ID:', err);
            }
        }
    }, [title]);

    const fetchExploreTrail = async (title: String) => {
        // console.log('fetchExploreTrail');
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
    return (
        <main className="mainContent">
            <section className="section-explore-trails position-relative default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="explore-trail-container position-relative z-1">
                                <div className="section-title mb-3">
                                    {/* <h2 className="title title-md"> {title ? slugToTitle(title) : ""}</h2> */}
                                    <h2 className="title title-md">Explore Trails</h2>
                                </div>
                                {/* <div className="trail-cover position-relative" id="overviewData">
                                
                                    <img src="/assets/images/trails/trail-1.jpg" alt="" className="w-100 br-20 coverImage"/>
                                    <div
                                        className="cover-overlay h-100 w-100 d-flex justify-content-between align-items-end br-20">
                                        <a href="/assets/images/trails/trail-1.jpg" className="btn-style-4"
                                            data-fancybox="MoreImages">
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" className="me-2">
                                                <rect x="1.5" y="1.5" width="15" height="15" rx="3.75" stroke="#05073D"
                                                    strokeWidth="1.125" />
                                                <path
                                                    d="M1.875 13.125L3.5694 11.9147C4.10641 11.5311 4.84202 11.592 5.30866 12.0587L6.1136 12.8636C6.46508 13.2151 7.03492 13.2151 7.3864 12.8636L11.1283 9.12175C11.622 8.62803 12.4107 8.59225 12.9471 9.03924L16.5 12"
                                                    stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" />
                                                <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(-1 0 0 1 7.5 4.5)"
                                                    stroke="#05073D" strokeWidth="1.125" />
                                            </svg>
                                            150+ Photos</a>
                                        <a href="/assets/images/trails/trail-1-gallery-1.jpg" data-fancybox="MoreImages"></a>
                                        <a href="/assets/images/trails/trail-1-gallery-2.jpg" data-fancybox="MoreImages"></a>
                                        <a href="/assets/images/trails/trail-1-gallery-3.jpg" data-fancybox="MoreImages"></a>
                                        <a href=""
                                            className="arrow-btn d-flex align-items-center justify-content-center rounded-circle"><svg
                                                width="18" height="16" viewBox="0 0 18 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8"
                                                    stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg></a>
                                    </div>
                                </div> */}
                                <div className="inner-filter sticky-top">
                                    <div className="search-filter">
                                        <form action="" className="bg-almost-white searchForm position-relative">
                                            <input type="text"
                                                className="form-control"
                                                value={searchTerm}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                placeholder="Search" />
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
                                                    value={nearFilter}
                                                    onChange={handleNearChange}
                                                >
                                                    <option value="near">Distance Near</option>
                                                    <option value="away">Distance Away</option>
                                                </select>
                                            </div>
                                            <div className="single-select-filter">
                                                <select name="activity"
                                                    id="runningFilter"
                                                    className="form-select advance-select"
                                                    // value={category}// auto-selects based on URL
                                                    value={selectedCategory}
                                                    // onChange={(e) => console.log("Selected:", e.target.value)}
                                                    // onChange={(e) => (e.target.value)}
                                                    onChange={handleCategoryChange}
                                                >
                                                     <option value="all">All Categories</option>
                                                    {getActivity.map((act: any, index: number) => (
                                                        <option key={index} value={act.title.toLowerCase()}>
                                                            {act.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="single-select-filter">
                                                <select name="difficulty"
                                                    id="difficultyFIlter"
                                                    className="form-select advance-select"
                                                    value={lengthDifficulty}
                                                    onChange={handleDifficultyChange}
                                                >
                                                    <option value="difficulty">Difficulty</option>
                                                    <option value="easy">Easy</option>
                                                    <option value="moderate">Moderate</option>
                                                    <option value="hard">Hard</option>
                                                </select>
                                            </div>
                                            {/* <div className="single-select-filter">
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
                                            </div> */}
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
                                        <p className="mb-2">{count} trails</p>
                                    </div>
                                    <div className="resFilter d-flex justify-content-end">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                                            <path
                                                d="M3 4.82463L4.61795 3.20668C4.89352 2.93111 5.34031 2.93111 5.61587 3.20668L7.23383 4.82463M5.11691 3.41335L5.11691 11.881M9.35074 11.1754L10.9687 12.7933C11.2443 13.0689 11.691 13.0689 11.9666 12.7933L13.5846 11.1754M11.4677 12.5866V4.11899"
                                                stroke="#05073D"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div>
                                            {/* <select name="" 
                                                value={sortType}
                                                onChange={handleMatchChange} 
                                                id="" className="form-select advance-select" defaultValue=""></select> */}
                                            <select name="" 
                                                value={sortType}
                                                onChange={handleMatchChange} 
                                                id="" className="form-select advance-select" >
                                                {/* <option value="" disabled hidden>Select</option> */}
                                                <option value="Best">Best Matches</option>
                                                <option value="popular">Most Popular</option>
                                                <option value="closest">Closest</option>
                                                <option value="closest">Newly Added</option>
                                            </select> 
                                        </div>
                                        {/* <Select
                                            value={selected}
                                            onChange={(opt) => setSelected(opt!)}
                                            options={options}
                                        /> */}
                                    </div>
                                </div>

                                <div className="row">
                                    {loading ? (
                                            <div
                                                className="section-local-favorite d-flex justify-content-center align-items-center"
                                                style={{ minHeight: '100px' }}
                                            >
                                                <SyncLoader color="#FC673C" size={20} />
                                            </div>
                                        ) : sortedData.length > 0 ? (
                                            sortedData.map((trail: any, index: number) => {
                                                const type    = generateSlug(trail.type);
                                                const country = generateSlug(trail.country || "India");
                                                const state   = trail.state ? generateSlug(trail.state) : null;
                                                const city    = trail.city ? generateSlug(trail.city) : null;
                                                const title   = trail.urlTitle ?? generateSlug(trail.title);
    
                                                let trailurl = `/${type}s/${country}`;
    
                                                if (state) trailurl += `/${state}`;
                                                if (city)  trailurl += `/${city}`;
    
                                                trailurl += `/${title}`;
                                                return(
                                                <div
                                                    key={index} // always add a key in map
                                                    className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                                                >
                                                    <div className="local-favorite-single mb-4">
                                                        <div className="lfc-thumb position-relative">
                                                            <Link to={trail.type === 'Trail' ? trailurl : "#"} > 
                                                            <img
                                                                src={trail.imagePath || '/assets/images/not-found.jpg'}
                                                                alt="local Trail"
                                                                className="img-fluid img-fixed-size"
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null;
                                                                    target.src = '/assets/images/not-found.jpg';
                                                                }}
                                                            />
                                                            </Link>
                                                            {/* <a href="#!" className="bookmark-btn" role="button" title="Save">
                                                                <i className="bi bi-bookmark"></i>
                                                            </a> */}
                                                        </div>
                                                        <div className="lfc-content">
                                                            <Link to={trail.type === 'Trail' ? trailurl : "#"} > 
                                                            <h3 className="lfc-title">{trail.title}</h3>
                                                            <p className="lfc-location mb-1">{trail.address}</p>
                                                            <p className="lfc-tags">
                                                                <i className="bi bi-star-fill"></i> {trail.rating.toFixed(1)} · Moderate · {trail.length} km · Est. {trail.estimateTime}
                                                            </p>
                                                            </Link>
                                                        <Link to={trail.type === 'Trail' ? trailurl : "#"} className="btn-style-1 w-100">
                                                           Check Details
                                                        </Link>
                                                            {/* <a href="#!" className="btn-style-1 w-100">Check Details</a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })
                                        ) : (
                                            <p>Trails are not available!</p>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="sticky-map">
                                <div ref={mapContainer} id="map" style={{position: "relative", width: "100%",height: "85vh",zIndex: 1,borderRadius:'10px'}}/>
                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623465.506385643!2d3.1753929462417525!3d50.71315181250765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3a4ed73c76867%3A0xc18b3a66787302a7!2sBrussels%2C%20Belgium!5e0!3m2!1sen!2sin!4v1749977024534!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="explore-trail-abs-map">
                   
                    {/* <div ref={mapContainer} id="map" style={{position: "relative", width: "100%",height: "100vh",zIndex: 1,borderRadius:'10px'}}/> */}
                    {/* <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623465.506385643!2d3.1753929462417525!3d50.71315181250765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3a4ed73c76867%3A0xc18b3a66787302a7!2sBrussels%2C%20Belgium!5e0!3m2!1sen!2sin!4v1749977024534!5m2!1sen!2sin"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                </div>
            </section>
        </main>

    );

};

export default ExploreNearByTrailsSection;
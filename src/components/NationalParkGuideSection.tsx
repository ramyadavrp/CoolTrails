import React, { useState,useEffect,useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import data from '../data/park.json';
import { encodeId, generateSlug ,slugToTitle} from '../utils/helpers';


const BASE_URL = import.meta.env.VITE_API_URL;

interface Park{
    title:string,
    description:string

}

interface Parklist{
    park_image:string,
    park_title:string,
    park_address:string,
    park_trail:string,
    country:string
}
const NationalParkGuideSection: React.FC = () => {
    const [nationalParks,setNationalParks] = useState([]);
    const[getPark,setPrak] = useState<Park[]>([]);
    const[getParkList,setPrakList] = useState<Parklist[]>([]);
    const [loadingNParks,setLoadingNParks] = useState(true);
    const [errorsNParks,setErrorsNParks] = useState('');
    const [country, setCountry] = useState("austraila");
    const [Loading, setLoading] = useState(false);

    // window.scrollTo(0,0);
    useEffect(()=>{
        const timer = setTimeout(()=>
            setLoadingNParks(false),5000);
        return()=>clearTimeout(timer);
    },[]);

        useEffect(()=>{
            const fetchParkData= async () => {
                try {
                    const response = await fetch('/data/park.json'); 
                    const json: Park[] = await response.json();
                    setPrak(json.parks);
                    setPrakList(json.Parklist);
                    console.log(getPark);
                    
                }catch (error) {
                console.error('Error fetching JSON:', error);
            }
            };
            fetchParkData();
        },[]);

        // Unique country list
        const countryOptions = useMemo(() => {
            return [...new Set(getParkList.map((p) => p.country))];
        }, []);
        const handleMatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newValue = e.target.value;
            setLoading(true);
            setCountry(newValue);
            setTimeout(() => setLoading(false), 300);
        };
        // Filter countries only when region changes
        // const filteredCountries = useMemo(() => {
        //     return country === "All"
        //     ? getParkList
        //     : getParkList.filter((c) => c.country === country);
        // }, [country, getParkList]);
        

        const filteredCountries = useMemo(() => {
            if (!country) return getParkList; // no country selected → show all
            return getParkList.filter((p) => p.country.toLowerCase() === country);
            }, [getParkList, country]);
        
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
                        
                            {
                                getPark.length > 0 ?(
                                    getPark.map((pk:any, index:number)=>(
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div key={index} className="sep-foot">
                                                <p className="sep-title text-midnight-navy mb-0">{pk.title ?? ''}</p>
                                                <p className="mb-0 text-grey">{pk.description ?? ''}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Not found</p>
                                )
                            }
                        
                        {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
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
                        </div> */}
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
                                    
                                    <select name="" 
                                        value={country}
                                        onChange={handleMatchChange} 
                                        id="" className="advance-select" defaultValue="">
                                        {/* <option value="" disabled hidden>Select</option> */}
                                        <option value="austraila">Austraila</option>
                                        <option value="america">America</option>
                                        <option value="india">India</option>
                                    </select> 
                                </h2>

                                <p className="text-center text-grey">
                                   {filteredCountries.length }  Parks • {filteredCountries.length }  Guides</p>
                            </div>

                        </div>
                    </div>
                    
                    <div className="row">
                            {
                                Loading ? (
                                    <div className="section-local-favorite d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                                        <SyncLoader color="#FC673C" size={20} />
                                    </div>
                                ):(
                                    filteredCountries.map((nparks:any,index:number)=>(
                                        <div key = {index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="guide-to-single d-flex align-items-center position-relative">
                                                <div className="gds-thumb">
                                                    <img
                                                        src={nparks.park_image || '/assets/images/not-found.jpg'}
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
                                                    <h4 className="mb-0 text-midnight-navy">{nparks.park_title ??''}</h4>
                                                    <p className="mb-0 text-grey">{nparks.park_address ??''}</p>
                                                    <p className="mb-0 text-grey">{nparks.park_trail ??''}</p>
                                                </div>
                                                <div className="gds-btn">
                                                    
                                                    <Link className="stretched-link" to={`/guides/${nparks.country}/${generateSlug(nparks.park_title || '' )}`}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                                stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                                        </svg>                          
                                                     </Link>
                                                    {/* <a href="" >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.7 2.99988L10.3306 7.2356C10.7158 7.68498 10.7158 8.34811 10.3306 8.79749L6.7 13.0332"
                                                                stroke="#717171" strokeWidth="1.1" strokeLinecap="round" />
                                                        </svg>
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )
                                
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

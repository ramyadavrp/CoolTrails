import React, { useEffect, useState,useRef ,useCallback} from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
// import SearchDiscover from './SearchDiscover';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SquareLoader } from "react-spinners"; 
import { SyncLoader } from "react-spinners";

// import { setTimeout, clearTimeout } from 'timers';

import path from 'path';
import { Link } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle} from '../utils/helpers';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import StarRating from './AffiliateDetails/StarRating';
import PlaceOffers from './AffiliateDetails/PlaceOffers';
// import TopTrailsNearBy from './AffiliateDetails/TopTrailsNearBy';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { QRCodeCanvas } from "qrcode.react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLayoutEffect } from "react";
import Weathers from './AffiliateDetails/Weathers';

// import data from '../data/alltrailDetails.json';

const BASE_URL = import.meta.env.VITE_API_URL;
let rating: number;
interface TrailGuide {
  trail_guide_title: string;
  trail_guide_description: string;
};
interface Itinerary {
    dayTitle: string;
    day_title: string;
    description: string;
}

interface TrailDetail {
    id: number;
    name: string;
    title: string;
    address?: string;
    description?: string;
    overview?: string;
    rating: number;
    lengthKm: number;
    estimatedTime: number;
    imageUrls: string;
    trailType: string;
    userFavorite: string;
    trail_guide_title: string;
    elevationGain: number;
}
interface MapPoint  {
  latitude: number;
  longitude: number;
};
interface ReviewsImages {
    review_img_path: string; 
}
interface Review {
    userImage: string;
    userWithAddress: string;
    rating: number;
    ratingOn: string;
    category: string;
    decription: string;
}
interface UserFavorite {
    users_description: string;
    users_elevation_gain: number;
}


type ShareOption = {
  label: string;
  icon: JSX.Element | (() => JSX.Element);
  action: () => void;
};

mapboxgl.accessToken = 'pk.eyJ1IjoiMTExMnZpcmVuZHJhIiwiYSI6ImNtYmE0emNyNjBwbHMyanNibHBpZHgxMjUifQ.5FSp2VZ1T1kXcGV38bC5jA';
       
const AffiliateDetailTrail: React.FC = () => {
    const { country, state, city, title } = useParams();
    // const { id: encodedId, slug } = useParams(); // url link
    const [trailDetail, setTrailDetail] = useState<TrailDetail | null>(null);
    const [loadingDetailTrails, setLoadingDetailTrails] = useState(true);
    const [errorDetailTrails, setErrorDetailTrails] = useState('');
    const [nearTrails, setNearTrails] = useState<TrailDetail[]>([]);
    const [getweatherDays, setWeatherDays] = useState([]);
    const [getImages, setImages] = useState([]);    
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const walkerMarker = useRef(null);
    const [points, setPoints] = useState<any>([]);
    const [loopClosed, setLoopClosed] = useState(false);
    const [getmapPoints, setMapPoints] = useState<MapPoint[]>([]);

    const [getTrailGuide, setTrailGuide] = useState<TrailGuide[]>([]);
    const [getItinerary, setItinerary] = useState<Itinerary[]>([]);
    const [getPlaceOffer, setPlaceOffer] = useState([]);
    const [getReviews, setReviews ]= useState<Review[]>([]);
    const [getUserFavorite, setUserFavorite ]= useState<UserFavorite[]>([]);
    const [getReviewImages, setReviewImages ]= useState<ReviewsImages[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0); // image arrow
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showTextModal, setShowTextModal] = useState(false); // For Text this park modal
    const [phone, setPhone] = useState("");/* Text share*/ 
    const [showQR, setShowQR] = useState(false);
    const qrRef = useRef<HTMLCanvasElement>(null);
    // const [loading,setloading] = useState(false);

    const shareUrl = window.location.href;
    const qrImage = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com";
    // useEffect(()=>{
    //     const loadpage = setTimeout(()=>setLoadingDetailTrails(false), 1000);
    //     return clearTimeout(loadpage);
    // },[]);

    //  loader time set 
    // window.scrollTo(0,0);
   useLayoutEffect(() => {
    window.scrollTo(0,0);
    }, []);
//  Loader
    useEffect(()=>{
        const timer = setTimeout(()=>
            setLoadingDetailTrails(false),3000);
        
        return()=>clearTimeout(timer);
    },[])
    // image arraw move
    const handleNextImage = useCallback(() => {
        setCurrentIndex(i => (i + 1) % getImages.length);
    }, [getImages.length]);

    useEffect(() => {
        // console.log(title);
    if (title) {
        try {
        // const trailId = Number(decodeId(encodedId)); // safely decode
        fetchTrailDetail(title);
        } catch (err) {
        console.error('Failed to decode ID:', err);
        }
    }
    }, [title]);
        // console.log(getUserFavorite);
    const fetchTrailDetail = async (title:String) =>{
        try{
             setLoadingDetailTrails(true);
            const response = await axios.post(`${BASE_URL}/Trail/traildetail`, {
                urlTitle: title,
                
            });
            
            setTrailDetail(response.data.data);
            setNearTrails(response.data.data.nearTrails);
            setWeatherDays(response.data.data.weatherDays);
            setImages(response.data.data.imageUrls);
            setPlaceOffer(response.data.data.placeOffer);
            setItinerary(response.data.data.itinerary);
            setReviews(response.data.data.review);
            setReviewImages(response.data.data.reviews_images);
            const points = response.data.data.mapPoints;
            setMapPoints(points);
            
            
        }catch(err){
            console.error('API Error:', err);
            setErrorDetailTrails('Unable to fetch detail trail');
            
        }finally{
            setLoadingDetailTrails(false);
        }
         
    }

    useEffect(() => {
        if (!getmapPoints.length || map.current) return;

        const firstPoint = getmapPoints[0];

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [firstPoint.longitude, firstPoint.latitude],
            zoom: 13,       
        });

        map.current.addControl(new mapboxgl.NavigationControl());

        map.current.on('load', async () => {
            //  setloading(true);
            const formattedPoints = getmapPoints.map(p => [p.longitude, p.latitude]);
            setPoints(formattedPoints);

            const bounds = new mapboxgl.LngLatBounds();

            formattedPoints.forEach((coords:any, index) => {
                new mapboxgl.Marker()
                .setLngLat(coords)
                .setPopup(new mapboxgl.Popup().setText(`Point ${index + 1}`))
                .addTo(map.current);

                bounds.extend(coords);
            });

            map.current.fitBounds(bounds, { padding: 50, maxZoom: 17 });

            // Route source
            map.current.addSource('route', {
                type: 'geojson',
                data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] } },
            });

            // Arrow icon
            map.current.loadImage("https://cdn-icons-png.flaticon.com/512/271/271228.png", (error, image) => {
                if (error || !image) return;
                if (!map.current.hasImage('arrow')) map.current.addImage('arrow', image);

                map.current.addLayer({
                id: 'arrow-layer',
                type: 'symbol',
                source: 'route',
                layout: {
                    'symbol-placement': 'line',
                    'symbol-spacing': 60,
                    'icon-image': 'arrow',
                    'icon-size': 0.05,
                    'icon-allow-overlap': true,
                    'icon-rotation-alignment': 'map',
                },
                });
            });

            map.current.addLayer({
                id: 'route-layer',
                type: 'line',
                source: 'route',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#3b9ddd', 'line-width': 5 },
            });

            const el = document.createElement('div');
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.backgroundImage = "url('https://img.icons8.com/color/48/person-male--v1.png')";
            el.style.backgroundSize = 'cover';
            el.style.borderRadius = '50%';
            el.style.border = '2px solid white';
            walkerMarker.current = new mapboxgl.Marker(el).setLngLat([0, 0]).addTo(map.current);

            await updateRoute(formattedPoints);
        });
    }, [getmapPoints]);

    const getRoute = async (start, end) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const res = await fetch(url);
        const json = await res.json();
        return json.routes?.[0]?.geometry?.coordinates || null;
    };

    const updateRoute = async (points) => {
        if (points.length < 2) return;

        let fullRoute = [];

        for (let i = 0; i < points.length - 1; i++) {
            const route = await getRoute(points[i], points[i + 1]);
            if (!route) return;
            if (i > 0) route.shift();
            fullRoute = [...fullRoute, ...route];
        }

        if (points.length > 2) {
        const [first, last] = [points[0], points[points.length - 1]];
        const dist = Math.sqrt((first[0] - last[0]) ** 2 + (first[1] - last[1]) ** 2);
            if (dist < 0.0001) {
                setLoopClosed(true);
                const closeRoute = await getRoute(last, first);
                if (closeRoute) {
                closeRoute.shift();
                fullRoute = [...fullRoute, ...closeRoute];
                }
            }
        }

        map.current.getSource('route').setData({
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: fullRoute },
        });

        walkerMarker.current.setLngLat(fullRoute[0]);
        animateAlongPath(fullRoute);
    };

    const animateAlongPath = (coords) => {
        let i = 0;
        let animationFrame;

    const step = () => {
      if (i >= coords.length - 1) return;
      const start = coords[i];
      const end = coords[i + 1];
      let progress = 0;
      const duration = 200;
      const startTime = performance.now();

        const animate = (t) => {
            progress = Math.min((t - startTime) / duration, 1);
            const lng = start[0] + (end[0] - start[0]) * progress;
            const lat = start[1] + (end[1] - start[1]) * progress;
            walkerMarker.current.setLngLat([lng, lat]);

            if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
            } else {
            i++;
            animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(step);
    };

    useEffect(() => {
        // Initialize Owl Carousel only after data is loaded and component has rendered
        if (!loadingDetailTrails && nearTrails.length > 0) {
          // Ensure the DOM element exists before initializing
          const $owlElement = $('#bestViewSl');
          if ($owlElement.length && typeof $owlElement.owlCarousel === 'function') {
            $owlElement.owlCarousel({
              // loop: true,
              // margin: 20, // Adjust as needed
              // nav: true,
              // dots: false,
              loop: true,
              margin: 15,
              responsiveClass: true,
              autoplay: true,
              items: 4,
              autoplayTimeout: 5000,
              dots: false, nav: false,
              autoplayHoverPause: true,
              responsive: {
                // 0: { items: 1 },
                // 768: { items: 2 },
                // 992: { items: 3 }
    
                0: {
                  items: 1,
                  stagePadding: 15,
                  margin: 10,
                  loop: false,
                  autoplay: false
                },
                576: {
                  items: 2,
                  stagePadding: 25,
                  margin: 15,
                  loop: false
                },
                768: {
                  items: 2,
                  stagePadding: 35,
                  margin: 15,
                  loop: false
                },
                992: {
                  items: 3
                },
                1200: {
                  items: 3
                },
                1400: {
                  items: 4
                }
              },
              
            });
    
            // Cleanup function: destroy Owl Carousel instance when component unmounts
            return () => {
              if ($owlElement.data('owl.carousel')) {
                $owlElement.owlCarousel('destroy');
              }
            };
          }
        }
    }, [loadingDetailTrails, nearTrails]);

    /* share code start*/ 
    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        // setTimeout(() => setCopied(false), 2000);
    };
    const sendText = () => {
        if (phone.trim()) {
        window.open(`sms:${phone}?body=${encodeURIComponent(shareUrl)}`);
        setIsOpen(false);
        }
    };
    // const handleDownload = () => {
    //     const canvas = qrRef.current.querySelector("canvas");
    //     if (!canvas) return;

    //     const link = document.createElement("a");
    //     link.href = canvas.toDataURL("image/png");
    //     link.download = "qr-code.png"; // File name
    //     link.click();
    // };
    
    const downloadQR = () => {
       
        const canvas = qrRef.current;
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = `my-custom-qr-${Date.now()}.png`; // custom filename
        link.href = canvas.toDataURL("image/png");
        link.click();
        // const link = document.createElement("a");
        // link.href = qrImage;
        // link.download = "qr-code.png";
        // link.click();
    };

    // 1) SVG icon components
    const IconCopy = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 8h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" stroke="#05073D" strokeWidth="1.8" />
        <path d="M6 6h9a1 1 0 0 1 1 1v1" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
    );

    const IconCheck = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#0A7F2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    );

    // Your chat/comment bubble (cleaned)
    const IconChat = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd"
        d="M12.6 2.288a9.74 9.74 0 0 0-9.151 14.404l-.794 2.804v.003A1.49 1.49 0 0 0 4.5 21.346l.004-.001 2.804-.794A9.74 9.74 0 1 0 12.6 2.288M6.936 5.501a8.24 8.24 0 1 1 .853 13.598.75.75 0 0 0-.587-.077l-3.103.879.879-3.103a.75.75 0 0 0-.077-.587 8.24 8.24 0 0 1 2.035-10.71"
        fill="currentColor" />
    </svg>
    );

    const IconEmail = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#05073D" strokeWidth="1.8" />
        <path d="M4 7l8 6 8-6" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    );

    const IconEmbed = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 9L4 12l4 3" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 9l4 3-4 3" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 18l4-12" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
    );

    const IconQR = () => (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
        {/* finder patterns */}
        <rect x="3" y="3" width="6" height="6" stroke="#05073D" strokeWidth="1.8" />
        <rect x="15" y="3" width="6" height="6" stroke="#05073D" strokeWidth="1.8" />
        <rect x="3" y="15" width="6" height="6" stroke="#05073D" strokeWidth="1.8" />
        {/* small modules */}
        <rect x="12" y="12" width="2" height="2" fill="#05073D" />
        <rect x="16" y="12" width="2" height="2" fill="#05073D" />
        <rect x="12" y="16" width="2" height="2" fill="#05073D" />
        <rect x="18" y="18" width="2" height="2" fill="#05073D" />
    </svg>
    );

    const options: ShareOption[] = [
        {
            label: copied ? "Link copied" : "Copy link",
            icon: copied ? <IconCheck /> : <IconCopy />,
            action: handleCopy,
        },
        {
            label: "Text",
            icon: <IconChat />,
            action: () => {
            setIsOpen(false);
            setShowTextModal(true);
            },
        },
        {
            label: "Email",
            icon: <IconEmail />,
            action: () => {
            window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`);
            },
        },
        {
            label: "Embed",
            icon: <IconEmbed />,
            action: () => {
            alert(`<iframe src="${shareUrl}" width="600" height="400"></iframe>`);
            },
        },
        { label: "QR Code", icon: IconQR, action: () => setShowQR(true) },
    ];
    
    // const CopyIcon = (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //     <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    //     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    //     </svg>
    // );

    // const CheckIcon = (
    //     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //     <polyline points="20 6 9 17 4 12" />
    //     </svg>
    // );
    // start Trail Guide read more limit
    const limit = 250;
    // Safety check
    const rawDescription = trailDetail?.description ?? '';
    const cleanDescription = rawDescription
    .replace(/<[^>]+>/g, '')      // Remove HTML tags
    .replace(/&nbsp;| /g, '')     // Remove HTML entities
    .trim();

    const shortText = cleanDescription.slice(0, limit);
    const shouldTruncate = cleanDescription.length > limit;
    // end
    if (loadingDetailTrails) {
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
    if (errorDetailTrails) return <p>{errorDetailTrails}</p>;
   
    if (!trailDetail) return <p>No local favorites found.</p>;
    const trailPoints: [number, number][] = getmapPoints.map((p) => [p.latitude, p.longitude]);

    const total_reviews = getReviews.length;

    // Sum all ratings (assuming each review has a `review_rate` property)
    const total_rating = getReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    const average_rating = total_reviews > 0 ? (total_rating / total_reviews).toFixed(1) : "0.0";
    
    return (
     <main className="mainContent">
        <section className="section-trail-detail">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="trail-dt-top">
                            <h1 className="trail-dt-title"> {trailDetail.name || (title ?  slugToTitle(title) : '')}</h1>
                            <p className="trail-dt-address text-grey mb-0">
                                <span className="tdt-add">{trailDetail.address ?? 'N/A'}</span> <span className="tdt-separator">|</span> 
                                <span className="t-dt-r-and-o"><i className="bi bi-star-fill"></i> {trailDetail.rating != null ? Number(trailDetail.rating.toFixed(1)) : 'N/A'}
 · Moderate · {trailDetail.lengthKm ?? 'N/A'} · Est. {trailDetail.estimatedTime ?? 'N/A'}</span>
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
                           
                            {/* <img 
                               src={
                                    trailDetail.imageUrls?.[0]
                                    ? `${BASE_URL}/uploads/${trailDetail.imageUrls[0]}`
                                    : '/assets/images/not-found.jpg'
                                }
                                alt="Near Trail" className="w-100 br-20 coverImage" 
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.currentTarget;
                                    target.onerror = null; // prevent infinite loop
                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                }}
                            /> */}
                            {
                                getImages.length > 0 ? (
                                    getImages.map((image: any, index: number) => {
                                    return (
                                        <a
                                        key={index}
                                        href={image}
                                        data-fancybox="MoreImages"
                                        style={{ display: index === currentIndex ? 'block' : 'none' }}
                                        >
                                             
                                        <img
                                            src={image || '/assets/images/not-found.jpg'}
                                            alt={`Trail ${index + 1}`}
                                            className="w-100 br-20 coverImage"
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const target = e.currentTarget;
                                            target.onerror = null;
                                            target.src = '/assets/images/not-found.jpg';
                                            }}
                                        />
                                        </a>
                                    );
                                }) 
                                ):(
                                    <img
                                        src='/assets/images/not-found.jpg'
                                        alt=""
                                        className="w-100 br-20 coverImage"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.currentTarget;
                                        target.onerror = null;
                                        target.src = '/assets/images/not-found.jpg';
                                        }}
                                    />
                                )
                                    
                            }
                            <div className="cover-overlay h-100 w-100 d-flex justify-content-between align-items-end br-20">
                                    <a
                                        href={
                                            getImages.length > 0
                                            ? getImages[0] 
                                            : "/assets/images/not-found.jpg"
                                        }
                                        className="btn-style-4"
                                        // data-fancybox="MoreImages"
                                        data-fancybox-trigger="MoreImages"
                                    >
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                                        <rect x="1.5" y="1.5" width="15" height="15" rx="3.75" stroke="#05073D" strokeWidth="1.125" />
                                        <path
                                            d="M1.875 13.125L3.5694 11.9147C4.10641 11.5311 4.84202 11.592 5.30866 12.0587L6.1136 12.8636C6.46508 13.2151 7.03492 13.2151 7.3864 12.8636L11.1283 9.12175C11.622 8.62803 12.4107 8.59225 12.9471 9.03924L16.5 12"
                                            stroke="#05073D"
                                            strokeWidth="1.125"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(-1 0 0 1 7.5 4.5)" stroke="#05073D" strokeWidth="1.125" />
                                    </svg>
                                    {getImages.length} + Photos
                                </a>
                                
                                {/* <a href="/assets/images/trails/trail-1-gallery-1.jpg" data-fancybox="MoreImages"></a>
                                <a href="/assets/images/trails/trail-1-gallery-2.jpg" data-fancybox="MoreImages"></a>
                                <a href="/assets/images/trails/trail-1-gallery-3.jpg" data-fancybox="MoreImages"></a>
                                 */}
                                 
                                <a href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNextImage();
                                    }}
                                    className="arrow-btn d-flex align-items-center justify-content-center rounded-circle"
                                    
                                    >
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8" stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </a>

                                {/* <a href="" className="arrow-btn d-flex align-items-center justify-content-center rounded-circle">
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8" stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </a> */}
                            </div>
                        </div>
                        <div className="trail-user-favorite-card br-20 bg-almost-white d-flex justify-content-between flex-wrap">
                            <div className="tuf-left-content d-flex align-items-center">
                                <div className="tusc-cn-1">
                                    <p className="mb-0">Users Favorite</p>
                                </div>
                                <div className="tusc-cn-2">
                                    <p className="mb-0 text-midnight-navy">{trailDetail.userFavorite ? trailDetail.userFavorite : 'N/A'} </p>
                                </div>
                            </div>

                            <div className="tuf-right-content d-flex align-items-center">
                                <div className="tusc-cn-1 text-center">
                                    <p className="mb-0">{average_rating}</p>
                                     <StarRating rating={Number(average_rating)}/>
                                </div>
                                <div className="tusc-cn-2 text-center">
                                    <p className="mb-0 text-midnight-navy">
                                        <span className="d-block review-no">{total_reviews}</span>
                                        <span>Reviews</span>
                                    </p>
                                </div>
                                <div className="tusc-cn-3">
                                    <a  href="#reviews" className="btn-style-1">Show all Reviews</a>
                                </div>
                            </div>
                        </div>
                        <div className="trail-stats d-flex flex-wrap">
                            <div className="trail-stat-single text-midnight-navy px-2">
                                <h3>{trailDetail.lengthKm ?? 'N/A'}<span>km</span></h3>
                                <p className="mb-0">Length</p>
                            </div>
                            <div className="trail-stat-single text-midnight-navy px-2">
                                <h3>{trailDetail.elevationGain ?? 'N/A'}<span>m</span></h3>
                                <p className="mb-0">Elevation gain</p>
                            </div>
                            <div className="trail-stat-single text-midnight-navy px-2">
                                <img src="/assets/images/icons/loop.svg" alt="" className="tss-icon" />
                                <p className="mb-0">{trailDetail.trailType ?? 'N/A'}</p>
                            </div>
                        </div>
                        <div className="trail-desc trail-detail-widget">
                            <p>
                                {(trailDetail.overview ?? '').replace(/<[^>]+>/g, '').replace(/&nbsp;| /g, '')  || 'N/A'}
                            </p>
                        </div>
                        <div className="trail-detail-widget trail-guide-widget" id="trailGuide">
                           
                                <div>
                                    <div className="section-title section-title-md">
                                        <h2 className="title title-md">{trailDetail.trail_guide_title ?? 'Trail Guide'}</h2>
                                    </div>
                                    
                                        <p>
                                            {isExpanded || !shouldTruncate ? cleanDescription : `${shortText}...`}
                                            {shouldTruncate && (
                                                <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsExpanded(!isExpanded);
                                                }}
                                                className="text-orange fw-bold ms-1"
                                                >
                                                {isExpanded ? 'Read less' : 'Read more'}
                                                </a>
                                            )}
                                        </p>
                                </div>
                                

                        </div>
                        <div className="trail-detail-widget trail-itinary-widget" id="trailItinary">
                            <div className="section-title section-title-md">
                                <h2 className="title title-md">Itinerary</h2>
                            </div>
                            <div className="accordion accordion-flush faq-accordion trail-itinary-accorion" id="faqToggle">
                                {getItinerary.length > 0 ? (
                                    getItinerary.map((It, index) => {
                                        const collapseId = `faq${index}`; 

                                        return (
                                        <div key={index} className="accordion-item">
                                            <h2 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${collapseId}`} 
                                                aria-expanded="false"
                                                aria-controls={collapseId}
                                            >
                                                <span className="fw-bold me-2">{It.dayTitle} </span> {It.itinerary_title ?? 'N/A'}
                                            </button>
                                            </h2>
                                            <div
                                            id={collapseId} 
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#faqToggle"
                                            >
                                            <div className="accordion-body">
                                                {It.description}
                                            </div>
                                            </div>
                                        </div>
                                        );
                                    })
                                    ) : (
                                    <p>Review is not Available..</p>
                                    )}

                                
                                {/* <div className="accordion-item">
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
                                </div> */}
                                {/* <div className="accordion-item">
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
                                </div> */}
                                {/* <div className="accordion-item">
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
                        <div className="trail-detail-map position-relative">
                            <div className="trail-detail-map-btn-group d-flex justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center">
                                    {/* share */}
                                <button onClick={() => setIsOpen(true)} className="btn-rounded-white rounded-circle" type="button"  title="Share">
                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12.125" cy="3.375" r="1.875" stroke="#05073D" strokeWidth="1.125" />
                                        <circle cx="3.125" cy="8.625" r="1.875" stroke="#05073D" strokeWidth="1.125" />
                                        <path d="M10.25 4.5L5 7.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.625 10.125L10.25 13.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12.125" cy="14.625" r="1.875" stroke="#05073D" strokeWidth="1.125" />
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

                          
                        <div className="rounded-3 shadow-sm" ref={mapContainer} style={{ height: '400px' }} />
                                
                        
                        <div>
                            {/* <button onClick={() => setIsOpen(true)}>Share</button> */}

                            {isOpen && (
                                <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "rgba(0,0,0,0.5)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 1000,
                                }}
                                onClick={() => setIsOpen(false)}
                                >
                                <div
                                    style={{
                                    background: "white",
                                    padding: "25px",
                                    borderRadius: "10px",
                                    width: "450px",
                                    maxHeight: "80vh",
                                    overflowY: "auto",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h3 style={{ marginTop:'34px'}}>Share</h3>
                                        <button className="btn-cross" onClick={() => setIsOpen(false)}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {options.map((opt, idx) => (
                                            <li
                                            key={idx}
                                            style={{
                                                padding: "15px",
                                                borderBottom: "1px solid #eee",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "14px",
                                            }}
                                            onClick={opt.action}
                                            >
                                            <span className="li-style" style={{ display: "inline-flex"}}>
                                                {typeof opt.icon === "function" ? opt.icon() : opt.icon}
                                            </span>
                                            <span>{opt.label}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    </div>
                                </div>
                            )}

                            {showTextModal && (
                            <div
                                style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(0,0,0,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1000,
                                }}
                                onClick={() => setShowTextModal(false)}
                            >
                                <div
                                    style={{
                                        background: "white",
                                        padding: "25px",
                                        borderRadius: "10px",
                                        width: "450px",
                                        maxHeight: "80vh",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    >
                                    <div style={{ display: "flex", justifyContent: "space-between",margin:'15px 0px 15px 0px' }}>
                                        
                                        <button className="btn-cross"
                                        onClick={() => {
                                            setShowTextModal(false);
                                            setIsOpen(true); // reopen Share modal
                                        }}
                                        > 
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4L6 10L12 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        </button>
                                        <button className="btn-cross" onClick={() => setShowTextModal(false)}> 
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>

                                        </button>
                                    </div>
                                    <div>
                                        <h3>Text this trails</h3>
                                        <p>
                                            Text this trail to your friends, family or yourself so you can 
                                            get driving directions and see detailed trail maps on the go.
                                        </p>
                                        {/* <input
                                            type="tel"
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                                        /> */}
                                        
                                        <PhoneInput
                                        country={"us"} // default country
                                        value={phone}
                                        onChange={setPhone}
                                        containerStyle={{ width: "100%", marginBottom: "15px" }} // wrapper div
                                        inputStyle={{ width: "100%", padding: "10px", paddingLeft:'45px'}} // actual input
                                        buttonStyle={{ borderRadius: "8px 0 0 8px" }} // country flag dropdown button
                                        // enableSearch={true} // search countries
                                        />
                                        
                                        <button className="btn-send" onClick={sendText}>Send</button>
                                    </div>
                                </div>
                            </div>
                            )}

                            {showQR && (
    
                                <div
                                    style={{
                                    position: "fixed",
                                    top: 40,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 1000,
                                    }}
                                    onClick={() => setShowQR(false)}
                                >
                                    <div
                                        style={{
                                            background: "white",
                                            padding: "25px",
                                            borderRadius: "10px",
                                            width: "450px",
                                            maxHeight: "80vh",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between",margin:'15px 0px 15px 0px' }}>
                                            
                                            <button className="btn-cross"
                                            onClick={() => {
                                                setShowQR(false);
                                                setIsOpen(true); // reopen Share modal
                                            }}
                                            > 
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4L6 10L12 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            </button>
                                            <button className="btn-cross" onClick={() => setShowQR(false)}> 
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>

                                            </button>
                                        </div>
                                        <div style={{ background: "white", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
                                            <h3>Download QR Code</h3>
                                            <p>Link others to this route with the following QR code</p>
                                            {/* <img src={qrImage} alt="QR Code" style={{ marginBottom: "15px",width:'132px',height:'132px' }} /> */}
                                            <QRCodeCanvas value="https://example.com" bgColor='#fff' includeMargin={true} fgColor='#000' size={132} ref={qrRef} />
                                            <div style={{ marginTop: "15px" }}>
                                                <button className="btn-download"onClick={downloadQR}>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                        </div>
                        {/* <div  ref={mapContainer} style={{height: '400px'}} className="rounded-3 shadow-sm"></div> */}

                            
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194474.440444268!2d55.959295174859626!3d25.08154936413991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5a8616e5ca149%3A0x75d4f4005126006a!2sShawkah%20Dam!5e0!3m2!1sen!2sin!4v1749891263519!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  */}
                            {/* <img src="/assets/images/trails/map.png" alt="" className="map-img" />
                            <a href="/assets/images/trails/map.png" data-fancybox="mapImg" className="arrow-btn d-flex align-items-center justify-content-center rounded-circle">
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.15005 13.5003H3.68251C3.30557 13.5003 3 13.1947 3 12.8178L3 10.3503M3.52497 12.9754L7.20003 9.30033M13.5 6.15005V3.68251C13.5 3.30557 13.1944 3 12.8175 3L10.35 3M12.975 3.52503L9.29993 7.20009"
                                        stroke="#717171"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </a>  */}
                            {/* <div className="map-img position-relative"> */}
                                {/* <MapContainer
                                    center={trailPoints[0]}
                                    zoom={16}
                                    scrollWheelZoom={false}
                                    style={{ height: '386px', width: '100%' , borderRadius:'20px'}}
                                >
                                <TileLayer
                                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                                />
                                <Polyline positions={trailPoints} pathOptions={{ color: 'green' }} />
                                {trailPoints.map((pos, idx) => (
                                    <Marker key={idx} position={pos}>
                                        <Popup>Point {idx + 1}</Popup>
                                    </Marker>
                                ))}
                            </MapContainer> */}

                            {/* Same button - still can link to image, or zoom feature */}
                            {/* <a
                                href="/assets/images/trails/map.png"
                                data-fancybox="mapImg"
                                className="arrow-btn d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '20px',
                                background: '#fff',
                                width: '40px',
                                height: '40px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                }}
                            >
                                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                    <path
                                        d="M6.15005 13.5003H3.68251C3.30557 13.5003 3 13.1947 3 12.8178L3 10.3503M3.52497 12.9754L7.20003 9.30033M13.5 6.15005V3.68251C13.5 3.30557 13.1944 3 12.8175 3L10.35 3M12.975 3.52503L9.29993 7.20009"
                                        stroke="#717171"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </a> */}
                        {/* </div> */}
                        
                        <div className="trail-sidebar-widget bg-almost-white br-20">
                            <h3 className="text-midnight-navy">What this place offers</h3>
                             <PlaceOffers getPlaceOffer={getPlaceOffer} />
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
                            <Weathers getweatherDays={getweatherDays} />
                        </div>
                    </div>
                </div>
                {/* <!-- reviews --> */}
                <div className="trails-reviews-widget" id="reviews">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title review">
                                <h2 className="title">Reviews</h2>
                                <a href="" className="btn-style-review">Review trail</a>
                            </div>
                        </div>
                    </div>

                    <div className="row review-row g-3">
                        
                        	{getReviews.length > 0 ? (
                                getReviews.map((review:any,index:number) =>{
                                        return (
                                        <div key={index}  className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div  className="testimonial-single position-relative">
                                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                    <div className="test-image">
                                                        <img
                                                            src={review.userImage || '/assets/images/not-found.jpg'}
                                                            alt="Top Trail" className="img-fluid img-fixed-size" 
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                const target = e.currentTarget;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="test-head">
                                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">{review.userWithAddress ?? 'N/A'}</h3>
                                                        <StarRating rating={Number(review.rating)}/>
                                                        <p className="mb-0">{review.ratingOn ?? 'N/A'} <span className="d-inline-block mx-1">•</span> {review.category ?? 'N/A'}</p>
                                                    </div>
                                                    <div className="right-abs">
                                                        <i className="bi bi-three-dots"></i>
                                                    </div>
                                                </div>
                                                <div className="testimonial-body">
                                                    <p className="text-midnight-navy">{review.decription ?? 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                    
                                )
                            ):(
                                <p> Review  is not available...</p>
                            )}
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
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
                        </div> */}
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
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
                        </div> */}
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
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
                        </div> */}
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative ">
                                {/* <div className="testimonial-body review_style" style={{paddingTop:'0px'}}> */}
                                    {/* <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p> */}
                                    <div className="review-gallery">
                                        <div className="d-flex">
                                            {
                                                getReviewImages.length > 0 ? (
                                                    getReviewImages.map((rvImages,index)=>(
                                                    <a key= {index} href="/assets/images/review-images/r-1.png" data-fancybox="reviewImages">
                                                        <img
                                                            src={rvImages.review_img_path || '/assets/images/not-found.jpg'}
                                                            alt="Top Trail" className="" 
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                const target = e.currentTarget;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                            }}
                                                        />
                                                    </a>
                                                ))
                                                ):(
                                                    <p>Review Images not available...</p>
                                                )

                                            }
                                           

                                            {/* <a href="/assets/images/review-images/r-2.png" data-fancybox="reviewImages"><img src="/assets/images/review-images/r-2.png" alt="" /></a>

                                            <a href="/assets/images/review-images/r-3.png" data-fancybox="reviewImages"><img src="/assets/images/review-images/r-3.png" alt="" /></a>

                                            <a href="/assets/images/review-images/r-4.png" data-fancybox="reviewImagess"><img src="/assets/images/review-images/r-4.png" alt="" /></a> */}
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative">
                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                    <div className="test-image">
                                        <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid" />
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
                        </div> */}
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
        {/* <SearchDiscover/> */}
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
                                   
                                    {
                                        nearTrails.map((trail:any,index:number)=>(
                                             <div key={trail.id || index} className="slider-item-single">
                                                <div className="local-favorite-single">
                                                    <div className="lfc-thumb position-relative">
                                                        
                                                        <img
                                                            src={trail.imagePath || '/assets/images/not-found.jpg'}
                                                            alt="Top Trail" className="img-fluid img-fixed-size" 
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                const target = e.currentTarget;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                            }}
                                                        />
                                                        <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a>
                                                    </div>
                                                    <div className="lfc-content">
                                                        <h3 className="lfc-title">{trail.title}</h3>
                                                        <p className="lfc-location mb-1">{trail.address}</p>
                                                        <p className="lfc-tags"><i className="bi bi-star-fill"></i> {trail.rating}· Moderate · {trail.length} · Est. {trail.estimateTime}</p>
                                                        {/* <a href="#!" className="btn-style-1 w-100">Check Details</a> */}
                                                        <Link to={`/${trail.urlTitle|| generateSlug(trail.title || '')}`} className="btn-style-1 w-100">
                                                           Check Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="local-favorite-slider-controls">
                                <button
                                className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-previous"
                                id="localFavPrev"
                                onClick={() => $('#bestViewSl').owlCarousel('prev')} // Add onClick handler
                                >
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Fix SVG attributes from hyphen-case to camelCase */}
                                    <path
                                    d="M7.38118 15L1.52122 9.23744C0.826258 8.55402 0.826258 7.44598 1.52122 6.76256L7.38118 0.999999M2.04246 8L17 8"
                                    stroke="#C6C6D1"
                                    strokeWidth="1.5" // Corrected: stroke-width -> strokeWidth
                                    strokeLinecap="round" // Corrected: stroke-linecap -> strokeLinecap
                                    />
                                </svg>
                                </button>
                                <button
                                className="arrow-btn btn-abs-middle d-flex align-items-center justify-content-center rounded-circle btn-next"
                                id="localFavNext"
                                onClick={() => $('#bestViewSl').owlCarousel('next')} // Add onClick handler
                                >
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Fix SVG attributes from hyphen-case to camelCase */}
                                    <path
                                    d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8"
                                    stroke="#C6C6D1"
                                    strokeWidth="1.5" // Corrected: stroke-width -> strokeWidth
                                    strokeLinecap="round" // Corrected: stroke-linecap -> strokeLinecap
                                    />
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

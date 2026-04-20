import React, { useEffect, useState,useRef ,useCallback} from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
// import SearchDiscover from './SearchDiscover';
import {useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { SquareLoader } from "react-spinners"; 
import { SyncLoader } from "react-spinners";
import {getAuth} from '../utils/storage';
import {useAlertMessage} from '../utils/useAlertMessage';
// import { setTimeout, clearTimeout } from 'timers';

import path from 'path';
import { Link ,} from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle,usePageTitle} from '../utils/helpers';
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
import  {useAutoClearMessage} from '../utils/useAutoClearMessage';
import {downloadFile} from '../utils/downloadFile';

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
    itinerary_title: string;
    description: string;
}

interface TrailDetail {
    id: number;
    trailId: string;
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
    lat?: number;
    lng?: number;
    lon?: number;
    elevation?: number;
    latitude: number;
    longitude: number;
    time: number;
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
interface Review {
  userName: string;
  userId: string;
  title: string;
  descriptions: string;
}

type ShareOption = {
  label: string;
  icon: JSX.Element | (() => JSX.Element);
  action: () => void;
};
type ShareOption1 = {
  label: string;
  icon: JSX.Element | (() => JSX.Element);
  action: () => void;
};

type ExportItem = {
  title: string;
  value?: string;
};
interface DownloadItem {
  id: number;
  name: string;
  email: string;
}
       
const AffiliateDetailTrail: React.FC = () => {
    const { country, state, city, title ,slug} = useParams();
    const location = useLocation();
    const stateTrailId = location.state?.trailId;
    // console.log('get trail id',location.state?.trailId);
    // console.log('get trail trailId',stateTrailId);
    const [trailId, setTrailId] = useState<string | null>(() => {
    return localStorage.getItem("trailId");
    });
    
    // const { id: encodedId, slug } = useParams(); // url link
     const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [trailDetail, setTrailDetail] = useState<TrailDetail | null>(null);
    const [loadingDetailTrails, setLoadingDetailTrails] = useState(true);
    const [errorDetailTrails, setErrorDetailTrails] = useState('');
    const [nearTrails, setNearTrails] = useState<TrailDetail[]>([]);
    const [getweatherDays, setWeatherDays] = useState([]);
    const [getImages, setImages] = useState([]);    
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    // const walkerMarker = useRef(null);
    const walkerMarker = useRef<mapboxgl.Marker | null>(null);
        const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [points, setPoints] = useState<any>([]);
    const [loopClosed, setLoopClosed] = useState(false);
    const [getmapPoints, setMapPoints] = useState<MapPoint[]>([]);

    const [getTrailGuide, setTrailGuide] = useState<TrailGuide[]>([]);
    const [getItinerary, setItinerary] = useState<Itinerary[]>([]);
    const [getPlaceOffer, setPlaceOffer] = useState([]);
    const [getReviews, setReviews ]= useState<Review[]>([]);
    const [getUserFavorite, setUserFavorite ]= useState<UserFavorite[]>([]);
    const [getReviewImages, setReviewImages ]= useState<ReviewsImages[]>([]);
    const [getReviewImagesApi, setReviewImagesApi ]= useState<ReviewsImages[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0); // image arrow
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showTextModal, setShowTextModal] = useState(false); // For Text this park modal
    const [phone, setPhone] = useState("");/* Text share*/ 
    const [showQR, setShowQR] = useState(false);
    const [mapLoading, setMapLoading] = useState(true);
    const qrRef = useRef<HTMLCanvasElement>(null);
    const [loginIdBased, setLoginIdBased] = useState("");
    const [userId, setUserId] = useState<string>("");
    // Add review
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [reviewVisibleCount, setReviewVisibleCount] = useState(4);
    
    const [userReview, setUserReview] = useState<any | null>(null); 
    const [token, setToken] = useState<string>("");
    const [loginId, setLoginId] = useState("");
    // const [loading,setloading] = useState(false);
     // Review Show
    const [showReviews, setShowReviews] = useState(true);
    const [showbuttonReviews, setShowbuttonReviews] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [reviewDetails, setReviewdetails] = useState<Review[]>([]);
    const shareUrl = window.location.href;
    const [showPopup, setShowPopup] = useState(false);

    const [qrData, setQrData] = useState<string | null>(null);
    const [loadingQr, setQrLoading] = useState(false);
    const [showQRHitTrail, setShowQRHitTrail] = useState(false);
    const [showDownloadApp, setShowDownloadApp] = useState(false);
    const [downloadData, setDownloadData] = useState<DownloadItem[]>([]);
    const [showExportFile, setshowExportFile] = useState(false);
    const [exportData, setExportData] = useState<ExportItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>("");
    useAutoClearMessage(message, setMessage, 3000);
    
    
    const qrImage = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com";
    // useEffect(()=>{
    //     const loadpage = setTimeout(()=>setLoadingDetailTrails(false), 1000);
    //     return clearTimeout(loadpage);
    // },[]);
    // usePageTitle("Cooltrails | Trail");
     // Get id by helper
     console.log('loginId',loginId);
     
    useEffect(() => {
        const { userId, token ,login,email} = getAuth();
            if (userId) setUserId(userId);
            if (token) setToken(token);
            if (login) setLoginIdBased(login);
            if (email) setLoginId(email);
    }, []);
    
    useEffect(() => {
        if (showQRHitTrail) {
            fetchQRCode();
        }
    }, [showQRHitTrail]);
     useEffect(() => {
        if (showQR) {
            fetchQRCode();
        }
    }, [showQR]);
    
    // useEffect(() => {
    //     if (exportData) {
    //         fetchExportFile();
    //     }
    // }, []);

    // useEffect(() => {
    //     if (downloadData) {
    //         fetchDownloadFile();
    //     }
    // }, []);

    const fetchQRCode = async () => {
        if (!userId) return;  
        try {
         setQrLoading(true);
        const response = await axios.post(`${BASE_URL}/common/MapQRCode`, {
            UserId: userId,
            TrailTitle: title},
             {headers: { "Authorization": `Bearer ${token}`}}
        );

        // console.log("QR:", response.data);
        setQrData(`data:image/png;base64,${response.data}`); 
        if (response.data.status === "success") {
           
        }
        } catch (error) {
            setQrLoading(false);
        console.error("Error loading profile:", error);
        }
    };

    useEffect(() => {
        const fetchFileList = async () => {
        if (!userId) return;
        try {
            // setQrLoading(true);
            const response = await axios.post(`${BASE_URL}/common/getfilenamefordownloadmap`, {
                UserId: userId,
                TrailTitle: title},
                {headers: { "Authorization": `Bearer ${token}`}}
            );
            if (response.data.status === "success") {
            setExportData(response.data.data); // expects array of {id, fileName}
            if (response.data.data.length > 0) {
                setSelectedFile(response.data.data[0].fileName); // default select first file
            }
            }
        } catch (error) {
            console.error("Error loading files:", error);
        } finally {
            setQrLoading(false);
        }
    };

    fetchFileList();
  }, [userId, title]);
    // const fetchExportFile = async () => {
    //     console.log(getmapPoints);
    // };
    
    // const fetchExportFile = () => {
    //     if (!getmapPoints || getmapPoints.length === 0) {
    //         alert("No map points found");
    //         return;
    //     }

    //     let csvContent = "Latitude,Longitude\n";

    //     getmapPoints.forEach((point, index) => {
            
    //         const lat = point.lat || point.latitude;
    //         const lng = point.lng || point.lon || point.longitude;

    //         csvContent += `${lat},${lng}\n`;
    //     });

    //     const blob = new Blob([csvContent], {
    //         type: "text/csv;charset=utf-8;",
    //     });

    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "all-map-points.csv";

    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     URL.revokeObjectURL(url);
    //     };

    const fetchExportFile = () => {
        if (!getmapPoints || getmapPoints.length === 0) {
            useAlertMessage({
                title: "Failed",
                html: `<strong style="color:red;">No map points found.</strong>`,
                icon: "error",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc3545",
                padding: "1rem",
            });
            return;
        }
        switch (selectedFile) {
            case "CSV":
            exportCSV();
            break;

            case "Fugawi":
            case "GPX Track":
            exportGPXTrack();
            break;
            case "GPX Route":
            exportGPXRoute();
            break;
            case "Google Earth KML":
            exportKML();
            break;
            
            case "Google Earth Timeline":
            exportGoogleEarthTimeline(); // custom function for timeline
            break;

            // case "Garmin FIT":
            // exportGarminFIT(); // implement .fit export
            // break;

            case "Garmin Course TCX":
            exportTCX(); // implement .tcx export
            break;

            case "Google Earth Tour":
            exportGoogleEarthTour(); // implement .kml/.kmz with tour data
            break;

            case "OVL (ASCII)":
            exportOVLASCII(); // custom ASCII format
            break;

            case "PCX5 Track":
            exportPCX5Track(); // custom PCX 5 track format
            break;
            default:
                useAlertMessage({
                title: "Info",
                html: `<strong style="color:orange;">Format not supported yet.</strong>`,
                icon: "warning",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#ffc107",
                padding: "1rem",
            });
            // alert("Format not supported yet");
        }
    };
    const exportCSV = () => {
        let csv = "Latitude,Longitude,Elevation\n";

        getmapPoints.forEach((point) => {
            const lat = point.lat ?? point.latitude;
            const lon = point.lng ?? point.lon ?? point.longitude;
            const ele = point.elevation ?? "";

            csv += `${lat},${lon},${ele}\n`;
        });

        downloadFile(csv, "all-map-points.csv", "text/csv");
    };

    const exportGPXTrack = () => {
        const trkpts = getmapPoints
            .map((point) => {
            const lat = point.lat ?? point.latitude;
            const lon = point.lng ?? point.lon ?? point.longitude;
            const ele = point.elevation;

            return `
            <trkpt lat="${lat}" lon="${lon}">
                ${ele ? `<ele>${ele}</ele>` : ""}
            </trkpt>`;
            })
            .join("");

        const gpx = `<?xml version="1.0" encoding="UTF-8"?>
        <gpx version="1.1" creator="YourApp"
        xmlns="http://www.topografix.com/GPX/1/1">
        <trk>
            <name>Trail Export</name>
            <trkseg>
            ${trkpts}
            </trkseg>
        </trk>
        </gpx>`;

        downloadFile(gpx, "trail-fugawi.gpx", "application/gpx+xml");
    };
    const exportGPXRoute = () => {
        const rtepts = getmapPoints
            .map((point) => {
            const lat = point.lat ?? point.latitude;
            const lon = point.lng ?? point.lon ?? point.longitude;

            return `<rtept lat="${lat}" lon="${lon}" />`;
            })
            .join("");

        const gpx = `<?xml version="1.0" encoding="UTF-8"?>
        <gpx version="1.1" creator="YourApp"
        xmlns="http://www.topografix.com/GPX/1/1">
        <rte>
            <name>Trail Route</name>
            ${rtepts}
        </rte>
        </gpx>`;

        downloadFile(gpx, "trail-route.gpx", "application/gpx+xml");
    };
    const exportKML = () => {
        const coords = getmapPoints
            .map((p) => {
            const lat = p.lat ?? p.latitude;
            const lon = p.lng ?? p.lon ?? p.longitude;
            const ele = p.elevation ?? 0;
            return `${lon},${lat},${ele}`;
            })
            .join(" ");

        const kml = `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
        <Placemark>
            <LineString>
            <coordinates>${coords}</coordinates>
            </LineString>
        </Placemark>
        </kml>`;

        downloadFile(kml, "trail.kml", "application/vnd.google-earth.kml+xml");
    };
    // TCX Export
    const exportTCX = () => {
        let tcx = `<?xml version="1.0" encoding="UTF-8"?>
    <TrainingCenterDatabase xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">
    <Activities>
        <Activity Sport="Other">
        <Id>${new Date().toISOString()}</Id>
        <Lap StartTime="${getmapPoints[0]?.time ?? new Date().toISOString()}">
            <Track>
    `;

        getmapPoints.forEach((pt) => {
            const lat = pt.lat ?? pt.latitude;
            const lon = pt.lng ?? pt.lon ?? pt.longitude;
            const ele = pt.elevation ? `<AltitudeMeters>${pt.elevation}</AltitudeMeters>` : "";
            const time = pt.time ?? new Date().toISOString();

            tcx += `          <Trackpoint>
                <Time>${time}</Time>
                <Position>
                <LatitudeDegrees>${lat}</LatitudeDegrees>
                <LongitudeDegrees>${lon}</LongitudeDegrees>
                </Position>
                ${ele}
            </Trackpoint>\n`;
        });

        tcx += `        </Track>
        </Lap>
        </Activity>
    </Activities>
    </TrainingCenterDatabase>`;

        downloadFile(tcx, "all-map-points.tcx", "application/xml");
    };

    // OVL ASCII Export (simple CSV-style ASCII format)
    const exportOVLASCII = () => {
        let ascii = "LAT LON ELE TIME\n";
        getmapPoints.forEach((pt) => {
            const lat = pt.lat ?? pt.latitude;
            const lon = pt.lng ?? pt.lon ?? pt.longitude;
            const ele = pt.elevation ?? 0;
            const time = pt.time ?? "";
            ascii += `${lat} ${lon} ${ele} ${time}\n`;
        });
        downloadFile(ascii, "all-map-points.ovl", "text/plain");
    };

    // PCX 5 Track Export (example text-based format)
    const exportPCX5Track = () => {
        let pcx = "PCX5 TRACK\nPOINTS\n";
        getmapPoints.forEach((pt, i) => {
            const lat = pt.lat ?? pt.latitude;
            const lon = pt.lng ?? pt.lon ?? pt.longitude;
            const ele = pt.elevation ?? 0;
            pcx += `PT${i + 1}: ${lat}, ${lon}, ${ele}\n`;
        });
        downloadFile(pcx, "all-map-points.pcx5", "text/plain");
    };

    // Google Earth Tour Export (simple tour in KML)
    const exportGoogleEarthTour = () => {
        let tour = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document><name>Map Tour</name>
        <Placemark><name>Tour Path</name>
        <gx:Tour xmlns:gx="http://www.google.com/kml/ext/2.2">
            <name>My Tour</name>
            <gx:Playlist>
    `;
        getmapPoints.forEach((pt) => {
            const lat = pt.lat ?? pt.latitude;
            const lon = pt.lng ?? pt.lon ?? pt.longitude;
            tour += `          <gx:FlyTo>
                <gx:duration>2.0</gx:duration>
                <gx:flyToMode>smooth</gx:flyToMode>
                <LookAt>
                <latitude>${lat}</latitude>
                <longitude>${lon}</longitude>
                <altitude>0</altitude>
                <range>500</range>
                <tilt>45</tilt>
                <heading>0</heading>
                </LookAt>
            </gx:FlyTo>\n`;
        });
        tour += `        </gx:Playlist>
        </gx:Tour>
        </Placemark>
    </Document>
    </kml>`;
        downloadFile(tour, "all-map-points-tour.kml", "application/vnd.google-earth.kml+xml");
    };

    const exportGoogleEarthTimeline = () => {
        let kml = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>
        <name>Timeline</name>
    `;

        getmapPoints.forEach((pt) => {
            const lat = pt.lat ?? pt.latitude;
            const lon = pt.lng ?? pt.lon ?? pt.longitude;
            const ele = pt.elevation ?? 0;
            const time = pt.time ?? new Date().toISOString(); // fallback if time not available

            kml += `    <Placemark>
        <Point><coordinates>${lon},${lat},${ele}</coordinates></Point>
        <TimeStamp><when>${time}</when></TimeStamp>
        </Placemark>\n`;
        });

        kml += `  </Document>
    </kml>`;

        downloadFile(kml, "map-timeline.kml", "application/vnd.google-earth.kml+xml");
    };


    const fetchDownloadFile = async () => {
        if (!userId) return;

        try {
            setQrLoading(true);

            const response = await axios.post(`${BASE_URL}/common/downloadfile`, {
                id: 1,
                UserId: userId,
                TrailTitle: title}, 
                {headers: { "Authorization": `Bearer ${token}`}}
            );

            if (response.data.status === "success") {
            const { base64File, fileName } = response.data.data;

            // Decode Base64 → Binary
            const byteCharacters = atob(base64File);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            // Create GPX Blob
            const blob = new Blob([byteArray], {
                type: "application/gpx+xml",
            });

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "trail.gpx";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            }
        } catch (error: any) {
            console.error("Error downloading file:", error);

            // Avoid [object Object] error
            const message =
            error?.response?.data?.message ||
            error?.message ||
            "Check your internet connection";

            alert(message);
        } finally {
            setQrLoading(false);
        }
    };


    // useEffect(() => {
    //     if (stateTrailId) {
    //     localStorage.setItem("trailId", stateTrailId); trailDetail.trailId
    //     setTrailId(stateTrailId);
    //     }
    // }, [stateTrailId]);
   
    //  loader time set 
    // window.scrollTo(0,0);
    useLayoutEffect(() => {
        window.scrollTo(0,0);
    }, []);
    // console.log('loginIdBased',userId)
//  Loader
    useEffect(()=>{
        const timer = setTimeout(()=>
            setLoadingDetailTrails(false),3000);
        
        return()=>clearTimeout(timer);
    },[])
    
    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        // const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    // image arraw move
    const handleNextImage = useCallback(() => {
        if (!getImages.length) return;
        setCurrentIndex(i => (i + 1) % getImages.length);
    }, [getImages]);

     // Show review 
        const handleShowReviewMore = () => {
            setReviewVisibleCount((prev) => prev + 2); // Show 2 more each time
        };
    // Add review
    //  List review
    const loadReviewPost = async () => {
        if (!userId) return; // wait until userId is available
        try {
        const response = await axios.post(`${BASE_URL}/trail/user/Review/${userId}`, {
            LoginId: loginIdBased},
             {headers: { "Authorization": `Bearer ${token}`}}
        );

        console.log("REvi trail Data:", response.data);
        if (response.data.status === "success") {
            const data = response.data.data;
            setReviewdetails(data); //reviewDetails
        }
        } catch (error) {
        console.error("Error loading profile:", error);
        // alert("Failed to load profile");
        }
    };
    useEffect(() => {
        loadReviewPost();
    }, [userId]);

     // review details
    //  useEffect(() => {
    //     if (Array.isArray(reviewListing) && reviewListing.length > 0 && userId) {
    //         const myReview = reviewListing.find(
    //         r => r.user?.id === userId
    //         );
    
    //         setUserReview(myReview || null);
    //     }
    //     }, [reviewListing, userId]);

    // useEffect(() => {
    //     if (getReviews.length > 0 && userId) {
    //         const myReview = getReviews.find(r => r.userId === userId);
    //         setUserReview(myReview || null);
    //     }
    // }, [getReviews, userId]);
    useEffect(() => {
    if (getReviews.length > 0 && userId) {
        const myReview = getReviews.find(r => r.userId === userId);
        setUserReview(myReview || null);
    } else {
        setUserReview(null); // no reviews yet
    }
    }, [getReviews, userId]);
    
    // const finalReviews = userId
    //     ? reviewDetails.filter((rev) => rev.userId === userId)
    //     : reviewDetails;
    // Add rating // 27-11-25
    

    const fetchTrailDetail = async (title: any) =>{
        // if (!loginId || !title) return;
        if (!title) return;
        try{
            const response = await axios.post(`${BASE_URL}/Trail/traildetail`, {
                urlTitle: title},
                {headers: { "Authorization": `Bearer ${token}`}}
            );
            
            setTrailDetail(response.data.data);
            console.log('traildetail',response.data)
            setNearTrails(response.data.data.nearTrails);
            setWeatherDays(response.data.data.weatherDays);
            setImages(response.data.data.imageUrls);
            setPlaceOffer(response.data.data.placeOffer);
            setItinerary(response.data.data.itinerary);
            setReviews(response.data.data.review);
            // console.log('itinerary',response.data.data.itinerary);
            setReviewImages(response.data.data.reviews_images);
            console.log('setReviewImages',response.data.data.reviews_images);
            const points = response.data.data.mapPoints;
            setMapPoints(points);
            //  console.log('points',points);
            
        }catch(err){
            // console.error('API Error:', err);
            setErrorDetailTrails('Unable to fetch detail trail');
            
        }finally{
            setLoadingDetailTrails(false);
        }
         
    }

    // const fetchTrailReviewImage = async (title: any) =>{
    //     // if (!loginId || !title) return;
    //     if (!title) return;
    //     try{
    //         const response = await axios.post(`${BASE_URL}/trail/trail-photo-list`, {
    //             slug: title,
    //             UserId: userId,
                
    //         });
            
    //         setReviewImagesApi(response.data.data);
    //         console.log('traildetaidddddl',response.data.data)
            
    //     }catch(err){
    //         console.error('API Error:', err);
    //         // setErrorDetailTrails('Unable to fetch detail trail');
            
    //     }finally{
    //         // setLoadingDetailTrails(false);
    //     }
         
    // }
    
    // useEffect(() => {
    //     if (title) {
    //         fetchTrailReviewImage(title);
    //     }
    // }, [title]);
    useEffect(() => {
        if (title) {
            setLoadingDetailTrails(true);
            fetchTrailDetail(title);
        }
    }, [title]);
    
    // console.log('tarilidratingratingdd',rating);
    // console.log('UserId',userId);
    // console.log('UserreviewId',review);
    // console.log('tarilidratingrattrailIdtrailIdtrailIdingdd',trailId);
    
    const addReviewAPI = async () => {
        const formData = new FormData();
        formData.append("TrailId", trailId);
        formData.append("UserId", userId);
        formData.append("Rating", rating);
        formData.append("Review", review);

    return axios.post(`${BASE_URL}/trail/addrating`, 
        formData,
        {headers: { "Authorization": `Bearer ${token}`}}
    );
    }    
    const updateReviewAPI = async () => {
        // console.log('trailIdtrailId',trailId);
        // console.log('userId',userId);
        // console.log('rating',rating);
        // console.log('review',review);
        return axios.post(`${BASE_URL}/trail/updaterating`, {
            TrailId: trailId,
            UserId: userId,
            Rating: rating,
            Review: review,
            // headers: {
            //     "Content-Type": "multipart/form-data",
            //     "Authorization": `Bearer ${token}`
            // }
        });
    };
    
    const handleSubmitReview = async () => {
        // console.log('userIdssss',userId);
        // console.log('trailIdssss',trailId);
        // console.log('trailIdssss',trailId);
        if (!userId || !trailId ) {
            window.location.href = "/login";
            return;
        }

        try {
            let response;

            if (userReview) {
                // UPDATE review
                response = await updateReviewAPI();
                // console.log('update response',response.data.data);
                if (response.data.status === "success") {
                    useAlertMessage({
                        icon: "success",
                        title: "Done!",
                        html: "<strong>Review updated successfully!</strong>",
                        confirmButtonText: "Ok!",
                        width: "350px",
                        confirmButtonColor: "#fc673c",
                        padding: "1rem",
                    });
                } else {
                    useAlertMessage({
                        title: "Failed",
                        html: `<strong style="color:red;">${response.data.message || "Something went wrong."}</strong>`,
                        icon: "error",
                        width: "350px",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#dc3545",
                        padding: "1rem",
                    });
                }
                await fetchTrailDetail(title);
            } else {
                // ADD review
                response = await addReviewAPI();
                console.log('add response',response);
                if (response.data.status === "success") {
                    useAlertMessage({
                        icon: "success",
                        title: "Done!",
                        html: "<strong>Review Added successfully!</strong>",
                        confirmButtonText: "Ok!",
                        width: "350px",
                        confirmButtonColor: "#fc673c",
                        padding: "1rem",
                    });
                } else{
                    useAlertMessage({
                        title: "Failed",
                        html: `<strong style="color:red;">${response.data.message || "Something went wrong."}</strong>`,
                        icon: "error",
                        width: "350px",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#dc3545",
                        padding: "1rem",
                    });
                    
                }
                
                await fetchTrailDetail(title);
            }

            if (response?.data?.status === "success") {
                setUserReview({
                    UserId: userId,
                    Rating: rating,
                    Review: review,
                });
            }

            setIsReviewOpen(false);
        } catch (error) {
            console.error(error);
            // alert("Failed to submit review");
        }
    };
    useEffect(() => {
        // 1navigation state has highest priority
        if (stateTrailId) {
            localStorage.setItem("trailId", String(stateTrailId));
            setTrailId(String(stateTrailId));
            return;
        }

        // 2 API response
        if (trailDetail?.trailId) {
            localStorage.setItem("trailId", String(trailDetail.trailId));
            setTrailId(String(trailDetail.trailId));
            return;
        }

        // 3 fallback already handled by useState
        }, [stateTrailId, trailDetail]);


     // INIT MAP
    useEffect(() => {
        if (!getmapPoints.length || map.current || !mapContainer.current){
            setMapLoading(false);
            return;
        }
        setMapLoading(true);
        const firstPoint = getmapPoints[0];
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [firstPoint.longitude, firstPoint.latitude],
        zoom: 5,
        antialias: true,
        });

        // map.current.addControl(new mapboxgl.NavigationControl());

        map.current.on("load", () => {
            
        bindMap();
        setMapLoading(false);
        });
    }, [getmapPoints]);
        const bindMap = async () => {
            if (!map.current) return;
    
            // normalize to [lng, lat]
            const points: [number, number][] = getmapPoints.map(p => [
            p.longitude ?? p.lng ?? p.lon!,
            p.latitude ?? p.lat!,
            ]);
    
            // clear old markers
            markersRef.current.forEach(m => m.remove());
            markersRef.current = [];
    
            const bounds = new mapboxgl.LngLatBounds();
            points.forEach(coords => {
            bounds.extend(coords);
            });
            // points.forEach((coords, index) => {
            // const marker = new mapboxgl.Marker()
            //     .setLngLat(coords)
            //     .setPopup(new mapboxgl.Popup().setText(`Point ${index + 1}`))
            //     .addTo(map.current!);
    
            // markersRef.current.push(marker);
            // bounds.extend(coords);
            // });
    
            map.current.fitBounds(bounds, { padding: 50, maxZoom: 16 });
            
            // ROUTE SOURCE
            map.current.addSource("route", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {}, // REQUIRED
                    geometry: {
                    type: "LineString",
                    coordinates: points, // FIX never[]
                    // coordinates: [] as [number, number][], // FIX never[]
                    },
                },
            });
            
             // Arrow icon
            const mapInstance = map.current;
                if (!mapInstance) return;
    
                mapInstance.loadImage(
                "https://cdn-icons-png.flaticon.com/512/271/271228.png",
                (error, image) => {
                    if (error || !image) return;
    
                    if (!mapInstance.hasImage("arrow")) {
                    mapInstance.addImage("arrow", image);
                    }
    
                    mapInstance.addLayer({
                    id: "arrow-layer",
                    type: "symbol",
                    source: "route",
                    layout: {
                        "symbol-placement": "line",
                        "symbol-spacing": 60,
                        "icon-image": "arrow",
                        "icon-size": 0.04,
                        "icon-allow-overlap": true,
                        "icon-rotation-alignment": "map",
                    },
                    });
                }
                );
    
            // map.current.loadImage("https://cdn-icons-png.flaticon.com/512/271/271228.png", (error, image) => {
            //     if (error || !image) return;
            //     if (!map.current.hasImage('arrow')) map.current.addImage('arrow', image);
    
            //     map.current.addLayer({
            //     id: 'arrow-layer',
            //     type: 'symbol',
            //     source: 'route',
            //     layout: {
            //         'symbol-placement': 'line',
            //         'symbol-spacing': 60,
            //         'icon-image': 'arrow',
            //         'icon-size': 0.05,
            //         'icon-allow-overlap': true,
            //         'icon-rotation-alignment': 'map',
            //     },
            //     });
            // });
    
            map.current.addLayer({
            id: "route-layer",
            type: "line",
            source: "route",
            paint: {
                "line-color": "#d32f2f",
                "line-width": 3,
            },
            });
            
            // WALKER MARKER
            const el = document.createElement("div");
            el.style.width = "30px";
            el.style.height = "30px";
            el.style.backgroundImage =
            "url('https://img.icons8.com/color/48/person-male--v1.png')";
            el.style.backgroundSize = "cover";
            el.style.borderRadius = "50%";
            // el.style.border = "2px solid white";
    
            walkerMarker.current = new mapboxgl.Marker(el)
            .setLngLat(points[0])
            .addTo(map.current);
    
            // await updateRoute(points);
        };
    
        // GET ROUTE
        // const getRoute = async (start: [number, number], end: [number, number]) => {
        //     const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        //     const res = await fetch(url);
        //     const json = await res.json();
        //     return json.routes?.[0]?.geometry?.coordinates || [];
        // };
    
        // BUILD FULL ROUTE
        // const updateRoute = async (points: [number, number][]) => {
        //     if (!map.current || points.length < 2) return;
    
        //     let fullRoute: [number, number][] = [];
    
        //     for (let i = 0; i < points.length - 1; i++) {
        //     const segment = await getRoute(points[i], points[i + 1]);
        //     if (i > 0) segment.shift();
        //     fullRoute.push(...segment);
        //     }
    
        //     const source = map.current.getSource("route") as mapboxgl.GeoJSONSource;
        //     source.setData({
        //     type: "Feature",
        //     properties: {},
        //     geometry: { type: "LineString", coordinates: fullRoute },
        //     });
    
        //     // animateAlongPath(fullRoute);
        // };
    
       
    
    
        // CLEANUP
        useEffect(() => {
            return () => {
            map.current?.remove();
            map.current = null;
            };
        }, []);

    const handleGetDirections = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (!isLoggedIn) {
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        return;
        }

        if (!getmapPoints.length) return;

        const destination = getmapPoints[getmapPoints.length - 1];

        if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
        }

        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;

            const useAutoOrigin = accuracy > 1000;

            const googleUrl = useAutoOrigin
            ? `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&travelmode=walking`
            : `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=walking`;

            window.open(googleUrl, "_blank");
        },
        () => {
            const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&travelmode=walking`;
            window.open(googleUrl, "_blank");
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
        );
    };

    

const handleTrailClick = async (trail: any, trailurl: string) => {
  setLoadingDetailTrails(true);
  try {
    await fetchTrailDetail(trail.urlTitle); // updates getmapPoints
    const trailTitle = trail.title || "";
    localStorage.setItem("trailPoints", JSON.stringify(getmapPoints));
    localStorage.setItem("trailTitle", trailTitle);

    navigate(trailurl); // SPA navigation
  } catch (err) {
    console.error("Failed to load trail:", err);
  } finally {
    setLoadingDetailTrails(false);
  }
};

 const stored = localStorage.getItem("trailPoints");
// console.log('storedstored',stored);

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
    const downloadQRHitTrail = () => {
        if (!qrData) return;

        const link = document.createElement("a");
        link.href = qrData;
        link.download = "qr-code.png"; // file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const downloadQR = () => {
        if (!qrData) return;

        const link = document.createElement("a");
        link.href = qrData;
        link.download = `my-custom-qr-${Date.now()}.png`; // custom filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // const downloadQR = () => {
       
    //     const canvas = qrRef.current;
    //     if (!canvas) return;
    //     const link = document.createElement("a");
    //     link.download = `my-custom-qr-${Date.now()}.png`; // custom filename
    //     link.href = canvas.toDataURL("image/png");
    //     link.click();
    //     // const link = document.createElement("a");
    //     // link.href = qrImage;
    //     // link.download = "qr-code.png";
    //     // link.click();
    // };

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
    const IconMobile = () => (
        <svg width="30" height="40" viewBox="0 0 24 24" fill="none" style={{marginLeft: '9px'}}>
            <rect x="7"y="2" width="10" height="20" rx="2"stroke="currentColor" strokeWidth="1.8"/>
            <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
    ); 
    const IconExport = () => (
        <svg width="30" height="40" viewBox="0 0 24 24" fill="none" style={{marginLeft: '9px'}}>
            <path d="M12 21V11m0 0l-4 4m4-4l4 4M4 3h16" stroke="currentColor"  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    const IconGarmin = () => (
        <svg width="30" height="40" viewBox="0 0 24 24" fill="none" style={{marginLeft: '9px'}}>
            <path d="M9 2h6v3H9V2Zm-2 3h10v14a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V5Zm2 4h6" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    const IconDownload = () => (
        <svg width="30" height="40" viewBox="0 0 24 24" fill="none" style={{marginLeft: '9px'}}>
            <path
            d="M12 3v10m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
    );

    const IconEmail = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#05073D" strokeWidth="1.8" />
        <path d="M4 7l8 6 8-6" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    );

    // const IconEmbed = () => (
    // <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    //     <path d="M8 9L4 12l4 3" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    //     <path d="M16 9l4 3-4 3" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    //     <path d="M10 18l4-12" stroke="#05073D" strokeWidth="1.8" strokeLinecap="round" />
    // </svg>
    // );

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

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,trailId?: number
        ) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
            // alert(userId)
        const formData = new FormData();

        // REQUIRED FIELDS
        formData.append("TrailId", trailId);   // number or string
        formData.append("UserId", userId);     // number or string

        // MULTIPLE IMAGES
        Array.from(files).forEach((file) => {
            formData.append("MediaFiles", file);
        });
        // console.log("Upload success:", files);
        try {
            const response = await axios.post(`${BASE_URL}/trail/add-trail-photo`, 
                formData,
                {headers: { "Authorization": `Bearer ${token}`}}
                
            );
            console.log("review Upload success:", response.data);
             if (response.data.status === "success") {
            //    const data =  response.data;
            //    const userid="6b09e026-28d3-40be-85dc-875b1f096dd4"
            //     setReviewImages((prev = []) =>
            //         prev.filter((c) => c.userId !== userid)
            //     );
                useAlertMessage({
                    icon: "success",
                    title: "Done!",
                    html: "<strong>Images uploaded successfully!</strong>",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    confirmButtonColor: "#fc673c",
                    padding: "1rem",
                });
                if (response.data?.images) {
                    setReviewImages(prev => [...prev, ...response.data.images]);
                }
            } else {
                useAlertMessage({
                    title: "Failed",
                    html: "<strong>Upload failed — server rejected</strong>",
                    icon: "error",
                    width: "350px",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                    padding: "1rem",
                });
            }
            
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         const files = e.target.files;
    //         if (!files) return;
    
    //         const fileArray = Array.from(files);
    //             console.log(fileArray);
    //         fileArray.forEach((file) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //             // setImages((prev) => [...prev, { file, preview: reader.result as string }]);
    //             };
    //             reader.readAsDataURL(file);
    //         });
    
    //         // setImgMessage("Image(s) uploaded successfully!");
    //         e.target.value = ""; // reset input to allow same file re-upload
    //     };
    const options: ShareOption[] = [
        {
            label: copied ? "Link copied" : "Copy link",
            icon: copied ? <IconCheck /> : <IconCopy />,
            action: handleCopy,
        },
        // {
        //     label: "Text",
        //     icon: <IconChat />,
        //     action: () => {
        //     setIsOpen(false);
        //     setShowTextModal(true);
        //     },
        // },
        {
            label: "Email",
            icon: <IconEmail />,
            action: () => {
            window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`);
            },
        },
        // {
        //     label: "Embed",
        //     icon: <IconEmbed />,
        //     action: () => {
        //     alert(`<iframe src="${shareUrl}" width="600" height="400"></iframe>`);
        //     },
        // },
        { label: "QR Code", icon: IconQR, action: () => setShowQR(true) },
    ];
    
    const options1: ShareOption1[] = [
        {
            label: "Download in app",
            icon: <IconDownload />,
            action: () => {
            setShowPopup(false);
            setShowDownloadApp(true);
            },
        },
        // {
        //     label: "Send to Garmin",
        //     icon: <IconGarmin />,
        //     action: () => {
        //     setShowQRHitTrail(false);
        //     setShowDownloadApp(true);
        //     },
        // },
        { label: "Open in app", icon: <IconMobile />, action: () => setShowQRHitTrail(true) },
        {
            label: "Export map file",
            icon: <IconExport />,
            action: () => {
            setshowExportFile(true);
            setShowPopup(false);
            },
        },
        
        
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
    // .replace(/<[^>]+>/g, '')      // Remove HTML tags
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
                <img  src="/assets/images/logo.svg" alt="Loading..."
                    style={{ width: "150px", height: "150px", animation: "zoomSpin 1.5s ease-in-out infinite",}}
                />
                {/* <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} /> */}
            </div>
        );
    }
    if (errorDetailTrails) return <p>{errorDetailTrails}</p>;
   
    if (!trailDetail) return <p>No Trail found.</p>;
    const trailPoints: [number, number][] = getmapPoints.map((p) => [p.latitude, p.longitude]);

    const total_reviews = getReviews.length;

    // Sum all ratings (assuming each review has a `review_rate` property) trailDetail.rating
    const total_rating = getReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    const average_rating = total_reviews > 0 ? (total_rating / total_reviews).toFixed(1) : "0.0";
    // remove html tag Itinerary title
    const removeHtmlTags = (str:string) => {
        return str.replace(/<[^>]*>/g, '');
    };
    
     // formateing all text
    function formatAITextItinerary(htmlString:string): string {
        if (!htmlString) return "";
        // Replace <li> with bullet + line break
        let text = htmlString.replace(/<li>(.*?)<\/li>/gi, "• $1\n");

        // Replace <p> with double line breaks
        text = text.replace(/<p>(.*?)<\/p>/gi, "$1\n\n");

        // Replace <strong> with uppercase (optional) or just remove tags
        text = text.replace(/<strong>(.*?)<\/strong>/gi, (_, content) => content);

        // Remove any other HTML tags
        text = text.replace(/<[^>]+>/g, "");

        return text.trim();
    }

    // description
    function formatAITextToJSX(input: string): React.ReactNode {
        if (!input) return null;

        const doc = new DOMParser().parseFromString(input, "text/html");

        const parseNode = (node: ChildNode): React.ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const children = Array.from(el.childNodes).map(parseNode);

            switch (el.tagName.toLowerCase()) {
                case "strong":
                return <strong>{children}</strong>;
                case "p":
                return <p style={{ whiteSpace: "pre-line" }}>{children}</p>;
                case "br":
                return <br />;
                case "ul":
                return <ul>{children}</ul>;
                case "ol":
                return <ol>{children}</ol>;
                case "li":
                return <li>{children}</li>;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                return <strong style={{ display: "block", marginTop: 16 }}>{children}</strong>;
                default:
                return <>{children}</>;
            }
            }

            return null;
        };

        return Array.from(doc.body.childNodes).map(parseNode);
    }



    return (
     <main className="mainContent">
        <section className="section-trail-detail">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="trail-dt-top">
                            <h1 className="trail-dt-title"> {trailDetail.name || (title ?  slugToTitle(title) : '')} </h1>
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
                                getImages?.length > 0 ? (
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
                                            getImages?.length > 0
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
                                    {getImages?.length} + Photos
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
                                    <p className="mb-0">{trailDetail.rating}</p>
                                     <StarRating rating={Number(trailDetail.rating)}/>
                                </div>
                                <div className="tusc-cn-2 text-center">
                                    <p className="mb-0 text-midnight-navy">
                                        <span className="d-block review-no">{total_reviews}</span>
                                        <span>Reviews</span>
                                    </p>
                                </div>
                                {
                                    showbuttonReviews.lenght > 0 &&(
                                        <div className="tusc-cn-3">
                                            <a  href="#reviews" className="btn-style-1">Show all Reviews</a>
                                        </div>
                                    )
                                }
                                
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
                            <p style={{ whiteSpace: "pre-line" }}>
                                {/* {(trailDetail.overview ?? '').replace(/<[^>]+>/g, '').replace(/&nbsp;| /g, '')  || 'N/A'} */}
                                {trailDetail.overview? formatAITextToJSX(trailDetail.overview) :'N/A'}
                            </p>
                        </div>
                        <div className="trail-detail-widget trail-guide-widget" id="trailGuide">
                           
                                <div>
                                    <div className="section-title section-title-md">
                                        <h2 className="title title-md">{trailDetail.trail_guide_title ?? 'Trail Guide'}</h2>
                                    </div>
                                     
                                        <div  style={{ whiteSpace: "pre-line" }}>
                                            {formatAITextToJSX(isExpanded || !shouldTruncate ? cleanDescription : `${shortText}...`)}
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
                                        </div>
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
                                                <span className="fw-bold me-2"><p>{formatAITextItinerary(It.dayTitle)}</p></span> {It.itinerary_title}
                                            </button>
                                            </h2>
                                            <div
                                            id={collapseId} 
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#faqToggle"
                                            >
                                            <div className="accordion-body" style={{ whiteSpace: "pre-line" }}>
                                                {formatAITextItinerary(It.description)}
                                            </div>
                                            </div>
                                        </div>
                                        );
                                    
                                    })
                                    ) : (
                                    <p>Itinerary is not Available..</p>
                                    )
                                }

                                
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
                                <button 
                                onClick={() => {
                                    if(isLoggedIn){
                                        setIsOpen(true); // show your popup
                                    } else {
                                        const currentPath = window.location.pathname + window.location.search;
                                        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
                                        // window.location.href = "/login";  // redirect to login
                                    }
                                }} 
                                className="btn-rounded-white rounded-circle" type="button"  title="Share">
                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12.125" cy="3.375" r="1.875" stroke="#05073D" strokeWidth="1.125" />
                                        <circle cx="3.125" cy="8.625" r="1.875" stroke="#05073D" strokeWidth="1.125" />
                                        <path d="M10.25 4.5L5 7.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.625 10.125L10.25 13.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12.125" cy="14.625" r="1.875" stroke="#05073D" strokeWidth="1.125" />
                                    </svg>
                                </button>
                                {/* <button className="btn-rounded-white rounded-circle" type="button" title="Bookmark">
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
                                </button> */}
                            </div>

                        {mapLoading && (
                            <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 10,
                                background: "rgba(255,255,255,0.7)",
                            }}
                            >
                            <SyncLoader color="#FC673C" />
                            </div>
                        )}
                        {getmapPoints.length > 0 ? (
                        <div className="rounded-3 shadow-sm" ref={mapContainer} style={{ height: '400px' }}  
                        onClick={() => {
                            const trailTitle = trailDetail.name || (title ? slugToTitle(title) : "");
                            localStorage.setItem(
                                "trailPoints",
                                JSON.stringify(getmapPoints)
                            );
                            localStorage.setItem("trailTitle", trailTitle);
                            window.open("/trail-map", "_self")
                        }}
                        />
                        ) : (
                            !mapLoading && <p style={{ textAlign: "center" }}>Map not available</p>
                        )}   
                        
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
                                            <img src={qrData} alt="QR Code" width={200} />

                                            {/* <img src={qrImage} alt="QR Code" style={{ marginBottom: "15px",width:'132px',height:'132px' }} /> */}
                                            {/* <QRCodeCanvas value="https://example.com" bgColor='#fff' includeMargin={true} fgColor='#000' size={132} ref={qrRef} /> */}
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
                                {/* <a href="" className="btn-style-3">Get Directions</a> */}
                                {/* <a href="" className="btn-style-3" style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        if (!getmapPoints.length) return;

                                        const start = getmapPoints[0];
                                        const end = getmapPoints[getmapPoints.length - 1];

                                        const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&travelmode=walking`;

                                        window.open(googleUrl, "_blank");
                                    }}
                                    >Get Directions
                                </a> */}
                                
                                <a
                                    href="#"
                                    className="btn-style-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleGetDirections}
                                    // onClick={(e) => {
                                        
                                    //     e.preventDefault();
                                    // if (isLoggedIn) {
                                    //     if (!getmapPoints.length) return;

                                    //     // Destination (last point)
                                    //     const destination = getmapPoints[getmapPoints.length - 1];

                                    //     // Get current location
                                    //     if (!navigator.geolocation) {
                                    //         alert("Geolocation is not supported by your browser");
                                    //         return;
                                    //     }

                                    //     navigator.geolocation.getCurrentPosition(
                                    //         (position) => {
                                    //             const { latitude, longitude } = position.coords;

                                    //             const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=walking`;

                                    //             window.open(googleUrl, "_blank");
                                    //         },
                                    //         (error) => {
                                    //             alert("Unable to fetch your current location");
                                    //             console.error(error);
                                    //         },
                                    //         {
                                    //             enableHighAccuracy: true,
                                    //             timeout: 10000,
                                    //             maximumAge: 0,
                                    //         }
                                    //     );
                                    // }else{
                                    //     const currentPath = window.location.pathname + window.location.search;
                                    //     window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
                                    //         // window.location.href = "/login"; // redirect to login
                                    //     }
                                    // }}
                                    
                                >
                                    Get Directions
                                </a>
                                
                                
                                <a
                                    className="btn-style-1"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        if (isLoggedIn) {
                                        setShowPopup(true); // show your popup
                                        } else {
                                        const currentPath = window.location.pathname + window.location.search;
                                        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
                                        // window.location.href = "/login"; // redirect to login
                                        }
                                    }}
                                    >
                                    Hit the Trail
                                </a>
                               
                                {/* <a href="" className="btn-style-1">Hit the Trail</a> */}
                            </div>
                        </div>
                    </div>
                    {/* Show all trails  click Hit the Trail */}
                    {showPopup && (
                        <div
                            style={{
                                position: "fixed",
                                top: 20,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(0,0,0,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1000,
                            }}
                            onClick={() => setShowPopup(false)}
                        >
                            {/* OUTER POPUP */}
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: "10px",
                                    width: "450px",
                                    maxHeight: "80vh",
                                    marginTop: "50px",
                                    overflow: "hidden", // IMPORTANT
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* HEADER */}
                                <div
                                    style={{
                                        padding: "25px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderBottom: "1px solid #eee",
                                    }}
                                >
                                    <h3 style={{ margin: 0 }}>Hit the trail</h3>
                                    
                                    <button className="btn-cross" onClick={() => setShowPopup(false)}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" style={{margin:'0px'}}>
                                            <path
                                                d="M4 4L16 16M16 4L4 16"
                                                stroke="#05073D"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* SCROLLABLE CONTENT */}
                                <div
                                    style={{
                                        padding: "15px 25px",
                                        maxHeight: "calc(80vh - 80px)", // header height
                                        overflowY: "auto",
                                    }}
                                >
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {options1.map((opt, idx) => (
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
                        </div>
                    )}

                    {showQRHitTrail && (
    
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
                            onClick={() => setShowQRHitTrail(false)}
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
                                        setShowQRHitTrail(false);
                                        setShowPopup(true); // reopen Share modal
                                    }}
                                    > 
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L6 10L12 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </button>
                                    <button className="btn-cross" 
                                    onClick={() => {
                                        setShowQRHitTrail(false);
                                        setShowPopup(false); // reopen Share modal
                                    }}
                                    > 
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    </button>
                                </div>
                                <div style={{ background: "white", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
                                    <h3>Open in the app</h3>
                                    <p>Scan the QR code to open this trail in the app</p>
                                    {qrData && (
                                    <img src={qrData} alt="QR Code" width={200} />
                                    )}
                                    {/* <img src={qrImage} alt="QR Code" style={{ marginBottom: "15px",width:'132px',height:'132px' }} /> */}
                                    {/* <QRCodeCanvas value="https://example.com" bgColor='#fff' includeMargin={true} fgColor='#000' size={132} ref={qrRef} /> */}
                                    <div style={{ marginTop: "15px" }}>
                                        <button className="btn-download"onClick={downloadQRHitTrail}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showDownloadApp && (
    
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
                            onClick={() => setShowDownloadApp(false)}
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
                                        setShowPopup(true);
                                        setShowDownloadApp(false); // reopen Share modal
                                    }}
                                    > 
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L6 10L12 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </button>
                                    <button className="btn-cross" 
                                    onClick={() => {
                                        setShowPopup(false);
                                        setShowDownloadApp(false); // reopen Share modal
                                    }}
                                    > 
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    </button>
                                </div>
                                <div style={{ background: "white", padding: "10px", borderRadius: "10px", textAlign: "center" }}>
                                    <h3>Download in app</h3>
                                    
                                    {/* <img src={qrImage} alt="QR Code" style={{ marginBottom: "15px",width:'132px',height:'132px' }} /> */}
                                    {/* <QRCodeCanvas value="https://example.com" bgColor='#fff' includeMargin={true} fgColor='#000' size={132} ref={qrRef} /> */}
                                    <div style={{ marginTop: "15px" }}>
                                        <button className="btn-download" onClick={fetchDownloadFile}>Download</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showExportFile && (
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
                            onClick={() => setshowExportFile(false)}
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
                                        setShowPopup(true);
                                        setshowExportFile(false); // reopen Share modal
                                    }}
                                    > 
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L6 10L12 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    </button>
                                    <button className="btn-cross" 
                                        onClick={() => {
                                        setShowPopup(false);
                                        setshowExportFile(false); // reopen Share modal
                                    }}
                                    > 
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    </button>
                                </div>
                                <div>
                                    <h3>Export map file</h3>
                                    <p>
                                        Select file format
                                    </p>
                                    
                                    <select className="form-select"  name="download_file" id="download_file"
                                        value={selectedFile}
                                        onChange={(e) => setSelectedFile(e.target.value)}
                                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                                    >   
                                    <option value="">Please select File</option>
                                    {
                                        exportData.map((item,index)=>(
                                            <option key={index} value={item.title}>
                                                {item.title}
                                            </option>
                                        ))
                                    }
                                        
                                        {/* <option value="02">CSV</option> */}
                                    </select>
                                    <button className="btn-send" onClick={fetchExportFile}>Export</button>
                                </div>
                            </div>
                        </div>
                        )}
                    
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

                    {isReviewOpen && (
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
                        >
                        <div
                            style={{
                            background: "#fff",
                            borderRadius: "12px",
                            padding: "24px",
                            width: "400px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3 style={{ marginTop:'34px'}}>{userReview ? "Edit Your Review" : "Add Your Review"}</h3>
                                <button className="btn-cross" onClick={() => setIsReviewOpen(false)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            {/* <h3 className="mb-3">Add Your Review</h3> */}

                            {/* ⭐ Rating Stars */}
                            <div style={{ marginBottom: "15px" }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                key={star}
                                style={{
                                    cursor: "pointer",
                                    color: star <= (hover || rating) ? "#FC673C" : "#ccc",
                                    fontSize: "24px",
                                    marginRight: "4px",
                                }}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                >
                                ★
                                </span>
                            ))}
                            </div>

                            {/* Review Textarea */}
                            <textarea
                            className="form-control mb-3"
                            rows={4}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review..."
                            ></textarea>

                            <div className="text-end">
                            <button className="btn" style={{background:'#FC673C',color:'#fff'}} 
                                onClick={ () =>{
                                    handleSubmitReview(),
                                    setIsReviewOpen(false)
                                }}
                                disabled={!review}>
                               {userReview ? "Update" : "Add"}  
                            </button>
                            </div>
                        </div>
                        </div>
                    )}    
                <div className="trails-reviews-widget" id="reviews">
                     {/* {message && <div style={{color:'#FC673C' , textAlign:'left',margin:'0px'}}>{message}</div>} */}
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title review d-flex align-items-center">
                                <h2 className="title">Reviews</h2>
                                {/* {isLoggedIn && !userReview &&( */}
                                {userId  && !userReview &&(
                                    <a href="#"
                                        style={{
                                            background: "#FC673C",
                                            border: "none",
                                            borderRadius: "50px",
                                            padding: "10px",
                                            // opacity: userReview ? 0.5 : 1,
                                            // pointerEvents: userReview ? "none" : "auto",
                                            // cursor: userReview ? "not-allowed" : "pointer",
                                        }}
                                        className="btn btn-sm btn-primary ms-2"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            if (userReview) {
                                            setRating(userReview.rating);
                                            setReview(userReview.decription);
                                            } else {
                                            setRating(0);
                                            setReview("");
                                            }
                                            setIsReviewOpen(true);
                                        }}
                                    >
                                        
                                     Add Review
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row review-row g-3">
                        
                        {/* Review show 30-12-25*/}
                        <>
                            {showReviews && (
                                <>
                                {getReviews
                                    .slice(0, reviewVisibleCount)
                                    .map((rev: any, index: number) => (
                                    <div
                                        key={index}
                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                                    >
                                        <div className="testimonial-single position-relative">
                                        <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                            <div className="test-image">
                                            <img
                                                src={rev.userImage || "/assets/images/other/testimonial-1.png"}
                                                alt="Top Trail"
                                                className="img-fluid"
                                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                e.currentTarget.src =
                                                    "/assets/images/other/testimonial-1.png";
                                                }}
                                            />
                                            </div>

                                            <div className="test-head">
                                            <h3 className="reviewer-name fw-normal mb-0">
                                                {rev.userWithAddress ?? ""} 
                                            </h3>

                                            <div className="rating">
                                                <StarRating rating={Number(rev?.rating)} />
                                            </div>

                                            <p className="mb-0">
                                                {rev.ratingOn ?? ""} • {rev.category ?? "Hiking"} 
                                            </p>
                                            </div>

                                            {/* EDIT – ONLY LOGGED IN USER */}
                                            {
                                                
                                            }
                                            <div className="right-abs">
                                                {
                                                    loginId &&(
                                                        <div className="upload-btn-wrapper" style={{display: "flex",alignItems: "center", gap: "10px"}}>
                                                        {rev.userId === userId &&(
                                                            <label htmlFor="imageInput"
                                                            style={{background: "#FC673C", border: "none",borderRadius: "50px"}}
                                                                className="btn btn-sm btn-primary ms-2"
                                                            >Add Images</label>
                                                        )}
                                                        
                                                        <input id="imageInput" type="file" accept="image/*" multiple
                                                        onChange={(e) => handleFileChange(e, trailDetail?.trailId)}

                                                        style={{ display: "none" }}
                                                        />
                                                        {/* <label htmlFor="thumbnail" style={{ minWidth: "150px" }}>Thumbnail Image</label> */}
                                                        {/* <input type="file"  multiple ref={fileInputRef} onChange={handleFileChange} />  21-1-26 */}
                                                    </div>
                                                    )
                                                }
                                                
                                            {/* {
                                                rev?.userId === userId &&(
                                                    <a className=" ms-2" title="Edit Review"
                                                    onClick={(e) => {
                                                    e.preventDefault();
                                                    // pre-fill if editing
                                                    if (userReview) {
                                                        // setRating(userReview.rating);
                                                        setRating(userReview.rating);
                                                        setReview(userReview.decription);}
                                                    // } else {
                                                    //     setRating(0);
                                                    //     setReview("");
                                                    // }
                                                    setIsReviewOpen(true);
                                                    }}
                                                    >
                                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.5137 0.80598C11.5867 -0.268666 13.3274 -0.269589 14.4014 0.804027L16.8936 3.29621C17.958 4.36095 17.9687 6.08414 16.918 7.16243L7.68555 16.6361C6.98003 17.3599 6.01137 17.7679 5.00098 17.7679H2.25C1.05069 17.7678 0.0774547 16.8306 0.00488281 15.6595L0.00292969 15.4232L0.120117 12.6146C0.159615 11.6756 0.550055 10.7843 1.21387 10.1195L10.5137 0.80598ZM17.5146 16.1947C17.9286 16.1947 18.2646 16.5304 18.2646 16.9447C18.2646 17.359 17.9287 17.6947 17.5146 17.6947H11.3936L11.3164 17.6907C10.9386 17.6521 10.6436 17.333 10.6436 16.9447C10.6436 16.5564 10.9386 16.2372 11.3164 16.1986L11.3936 16.1947H17.5146ZM2.27441 11.181C1.87636 11.5798 1.64186 12.1138 1.61816 12.6771L1.50098 15.4857V15.5657C1.52555 15.9556 1.84974 16.2676 2.24902 16.2679H5.00195C5.60809 16.2678 6.18906 16.0225 6.6123 15.5882L13.1436 8.88508L8.85059 4.59309L2.27441 11.181ZM13.3418 1.86555C12.8536 1.37755 12.062 1.37805 11.5742 1.86653L9.91113 3.53157L14.1914 7.81184L15.8447 6.11555C16.3222 5.62547 16.3176 4.84171 15.834 4.35774L13.3418 1.86555Z"
                                                                fill="#7D7D7D"/>
                                                        </svg>
                                                    </a>
                                                )
                                            } */}
                                            {/* <a
                                                className="ms-2"
                                                title="Edit Review"
                                                onClick={(e) => {
                                                e.preventDefault();
                                                if (userReview) {
                                                    setRating(userReview.rating);
                                                    setReview(userReview.decription);
                                                }
                                                setIsReviewOpen(true);
                                                }}
                                            >
                                                 <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.5137 0.80598C11.5867 -0.268666 13.3274 -0.269589 14.4014 0.804027L16.8936 3.29621C17.958 4.36095 17.9687 6.08414 16.918 7.16243L7.68555 16.6361C6.98003 17.3599 6.01137 17.7679 5.00098 17.7679H2.25C1.05069 17.7678 0.0774547 16.8306 0.00488281 15.6595L0.00292969 15.4232L0.120117 12.6146C0.159615 11.6756 0.550055 10.7843 1.21387 10.1195L10.5137 0.80598ZM17.5146 16.1947C17.9286 16.1947 18.2646 16.5304 18.2646 16.9447C18.2646 17.359 17.9287 17.6947 17.5146 17.6947H11.3936L11.3164 17.6907C10.9386 17.6521 10.6436 17.333 10.6436 16.9447C10.6436 16.5564 10.9386 16.2372 11.3164 16.1986L11.3936 16.1947H17.5146ZM2.27441 11.181C1.87636 11.5798 1.64186 12.1138 1.61816 12.6771L1.50098 15.4857V15.5657C1.52555 15.9556 1.84974 16.2676 2.24902 16.2679H5.00195C5.60809 16.2678 6.18906 16.0225 6.6123 15.5882L13.1436 8.88508L8.85059 4.59309L2.27441 11.181ZM13.3418 1.86555C12.8536 1.37755 12.062 1.37805 11.5742 1.86653L9.91113 3.53157L14.1914 7.81184L15.8447 6.11555C16.3222 5.62547 16.3176 4.84171 15.834 4.35774L13.3418 1.86555Z"
                                                        fill="#7D7D7D"/>
                                                </svg>
                                            </a> */}
                                            </div>
                                        </div>

                                        <div className="testimonial-body">
                                            <p className="text-midnight-navy">
                                            {rev.decription ?? "N/A"}
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    ))}

                                {reviewVisibleCount < getReviews.length && (
                                    <div className="row">
                                    <div className="col-12">
                                        <button
                                        className="btn btn-link text-orange fw-bold ms-1"
                                        onClick={handleShowReviewMore}
                                        >
                                        Show more...
                                        </button>
                                    </div>
                                    </div>
                                )}
                                </>
                            )}
                        </>
                        {/* Review show end 30-12-25*/}

                        {/* Review show before 30-12-25*/}
                        {/* <>
                        {isLoggedIn ? (
                            showReviews && (
                                <>
                                    {message && (
                                        <div style={{ color: '#FC673C', textAlign: 'left', margin: '0px' }}>
                                            {message}
                                        </div>
                                    )}

                                    {reviewDetails.length > 0 ? (
                                        <>
                                            {reviewDetails
                                                .slice(0, reviewVisibleCount)
                                                .map((rev: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                                                    >
                                                        <div className="testimonial-single position-relative">
                                                            <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                                <div className="test-image">
                                                                    <img
                                                                        src={rev.userImage || '/assets/images/other/testimonial-1.png'}
                                                                        alt="Top Trail"
                                                                        className="img-fluid"
                                                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                                            e.currentTarget.src =
                                                                                '/assets/images/other/testimonial-1.png';
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="test-head">
                                                                    <h3 className="reviewer-name fw-normal mb-0">
                                                                        {rev.userWithAddress ?? ''}
                                                                    </h3>
                                                                    <div className="rating">
                                                                        <StarRating rating={Number(rev?.rating)} />
                                                                    </div>
                                                                    <p className="mb-0">
                                                                        {rev.ratingOn ?? ''} • Hiking
                                                                    </p>
                                                                </div>

                                                                
                                                                <div className="right-abs">
                                                                    <a className=" ms-2" title="Edit Review"
                                                                        onClick={(e) => {
                                                                        e.preventDefault();
                                                                        if (userReview) {
                                                                            setRating(userReview.rating);
                                                                            setReview(userReview.decription);}
                                                                        
                                                                        setIsReviewOpen(true);
                                                                        }}
                                                                        >
                                                                            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M10.5137 0.80598C11.5867 -0.268666 13.3274 -0.269589 14.4014 0.804027L16.8936 3.29621C17.958 4.36095 17.9687 6.08414 16.918 7.16243L7.68555 16.6361C6.98003 17.3599 6.01137 17.7679 5.00098 17.7679H2.25C1.05069 17.7678 0.0774547 16.8306 0.00488281 15.6595L0.00292969 15.4232L0.120117 12.6146C0.159615 11.6756 0.550055 10.7843 1.21387 10.1195L10.5137 0.80598ZM17.5146 16.1947C17.9286 16.1947 18.2646 16.5304 18.2646 16.9447C18.2646 17.359 17.9287 17.6947 17.5146 17.6947H11.3936L11.3164 17.6907C10.9386 17.6521 10.6436 17.333 10.6436 16.9447C10.6436 16.5564 10.9386 16.2372 11.3164 16.1986L11.3936 16.1947H17.5146ZM2.27441 11.181C1.87636 11.5798 1.64186 12.1138 1.61816 12.6771L1.50098 15.4857V15.5657C1.52555 15.9556 1.84974 16.2676 2.24902 16.2679H5.00195C5.60809 16.2678 6.18906 16.0225 6.6123 15.5882L13.1436 8.88508L8.85059 4.59309L2.27441 11.181ZM13.3418 1.86555C12.8536 1.37755 12.062 1.37805 11.5742 1.86653L9.91113 3.53157L14.1914 7.81184L15.8447 6.11555C16.3222 5.62547 16.3176 4.84171 15.834 4.35774L13.3418 1.86555Z"
                                                                                    fill="#7D7D7D"/>
                                                                            </svg>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div className="testimonial-body">
                                                                <p className="text-midnight-navy">
                                                                    {rev.decription ?? 'N/A'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            {reviewVisibleCount < reviewDetails.length && (
                                                <div className="row">
                                                    <div className="col-12">
                                                        <button
                                                            className="btn btn-link text-orange fw-bold ms-1"
                                                            onClick={handleShowReviewMore}
                                                        >
                                                            Show more...
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p>Not Found Review</p>
                                    )}
                                </>
                            )
                        ) : (
                            <>
                            {getReviews 
                                .slice(0, reviewVisibleCount)
                                .map((rev: any, index: number) => (
                                    <div
                                        key={index}
                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
                                    >
                                        <div className="testimonial-single position-relative">
                                            <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                <div className="test-image">
                                                    <img
                                                        src={rev.userImage || '/assets/images/other/testimonial-1.png'}
                                                        alt="Top Trail"
                                                        className="img-fluid"
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                            e.currentTarget.src =
                                                                '/assets/images/other/testimonial-1.png';
                                                        }}
                                                    />
                                                </div>

                                                <div className="test-head">
                                                    <h3 className="reviewer-name fw-normal mb-0">
                                                        {rev.userWithAddress ?? ''}
                                                    </h3>
                                                    <div className="rating">
                                                        <StarRating rating={Number(rev?.rating)} />
                                                    </div>
                                                    <p className="mb-0">
                                                        {rev.ratingOn ?? ''} • Hiking
                                                    </p>
                                                </div>

                                                
                                                <div className="right-abs">
                                                    <a
                                                        className="ms-2"
                                                        title="Edit Review"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (userReview) {
                                                                setRating(userReview.rating);
                                                                setReview(userReview.decription);
                                                            }
                                                            setIsReviewOpen(true);
                                                        }}
                                                    >
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="testimonial-body">
                                                <p className="text-midnight-navy">
                                                    {rev.decription ?? 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {reviewVisibleCount < getReviews .length && (
                                    <div className="row">
                                        <div className="col-12">
                                            <button
                                                className="btn btn-link text-orange fw-bold ms-1"
                                                onClick={handleShowReviewMore}
                                            >
                                                Show more...
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </> */}
                       
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative ">
                                {/* <div className="testimonial-body review_style" style={{paddingTop:'0px'}}> */}
                                    {/* <p className="text-midnight-navy">CoolTrails helped me discover hidden gems right in my backyard. The trail difficulty ratings were spot on, and the user tips saved me big time!</p> */}
                                    <div className="review-gallery">
                                        <div className="d-flex">
                                            {
                                                getReviewImages.length > 0 && (
                                                    getReviewImages.map((rvImages,index)=>(
                                                        <a key= {index} href={rvImages.review_img_path} data-fancybox="reviewImages">
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
                        
                    </div>
                    <div className="row">
                            
                            <div className="col-12 mb-4 text-center">
                                {isLoggedIn && getReviews?.length > 0 && (
                                    <button
                                        className="btn-style-1"
                                        onClick={() => setShowReviews(!showReviews)}
                                    >   
                                        {showReviews ? "Hide Reviews" : "Check All Reviews"}
                                    </button>
                                )}
                            </div>
                             {/* <a href="" className="btn-style-1">Check All Reviews</a> */}
                    </div>
                    
                </div>
                {/* <!-- review-end --> */}
            </div>
        </section>
        {/* <SearchDiscover/> */}
        {
            Array.isArray(nearTrails) && nearTrails.length > 0 && (
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
                                                nearTrails.map((trail:any,index:number)=>{
                                                    // const city    = trail.city    ?? null;
                                                    // const state   = trail.state   ?? null;
                                                    // const country = trail.country ?? "India";
                                                    // const slugTitle = trail.urlTitle ?? generateSlug(trail.title);
                                                    // const trailurl = `/${generateSlug(trail.type)}s/${generateSlug(country)}/${generateSlug(state)}/${generateSlug(city)}/${slugTitle}`;
                                                    const type    = generateSlug(trail.type);
                                                    const country = generateSlug(trail.country || "India");
                                                    const state   = trail.state ? generateSlug(trail.state) : null;
                                                    // const city    = trail.city ? generateSlug(trail.city) : null;
                                                    const title   = trail.urlTitle ?? generateSlug(trail.title);

                                                    let trailurl = `/${type}s/${country}`;

                                                    if (state) trailurl += `/${state}`;
                                                    // if (city)  trailurl += `/${city}`;

                                                    trailurl += `/${title}`;
                                                    return(
                                                    <div key={trail.id || index} className="slider-item-single">
                                                        <div className="local-favorite-single">
                                                            <div className="lfc-thumb position-relative">
                                                                <Link to={trail.type === 'Trail' ? trailurl : "#"} > 
                                                                <img
                                                                    src={trail.imagePath || '/assets/images/not-found.jpg'}
                                                                    alt="Top Trail" className="img-fluid img-fixed-size" 
                                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                        const target = e.currentTarget;
                                                                        target.onerror = null; // prevent infinite loop
                                                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                    }}
                                                                />
                                                                </Link>
                                                                {/* <a href="#!" className="bookmark-btn" title="Save"><i className="bi bi-bookmark"></i></a> */}
                                                            </div>
                                                            <div className="lfc-content">
                                                                <Link to={trail.type === 'Trail' ? trailurl : "#"} > 
                                                                    <h3 className="lfc-title">{trail.title}</h3>
                                                                    <p className="lfc-location mb-1">{trail.address}</p>
                                                                    <p className="lfc-tags"><i className="bi bi-star-fill"></i> {trail.rating}· Moderate · {trail.length} · Est. {trail.estimateTime}</p>
                                                                </Link>
                                                                {/* <a href="#!" className="btn-style-1 w-100">Check Details</a> */}
                                                                <Link to={trail.type === 'Trail' ? trailurl : "#"}  
                                                                className="btn-style-1 w-100"
                                                                >
                                                                Check Details
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )
                                                })
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
            )
        }
        
    </main>
  );
};

export default AffiliateDetailTrail;

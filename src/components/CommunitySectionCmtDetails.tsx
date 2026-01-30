// src/components/AffiliateTrail.tsx
import React, { useState,useEffect,useCallback,useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import data from '../../public/data/community.json';
import { Link } from 'react-router-dom';
import StarRating from './AffiliateDetails/StarRating';
import { useLocation, useParams } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle,timeAgo} from '../utils/helpers';
import  {useAutoClearMessage} from '../utils/useAutoClearMessage';
import {useAlertMessage}  from '../utils/useAlertMessage';
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { SquareLoader } from "react-spinners"; 
import { SyncLoader } from "react-spinners";

import {getAuth} from '../utils/storage';
import Swal from "sweetalert2";
import mapboxgl from "mapbox-gl";

// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiMTExMnZpcmVuZHJhIiwiYSI6ImNtYmE0emNyNjBwbHMyanNibHBpZHgxMjUifQ.5FSp2VZ1T1kXcGV38bC5jA";

interface Point {
  title: string;
  latitude: number; 
  longitude: number;
  pointOrder: number;
}
interface MapPoint {
  lat?: number;
  lng?: number;
  lon?: number;
  elevation?: number;
  latitude: number;
  longitude: number;
  time?: number;
}

interface suggestedNearby{
    id:number,
    name:string,
    date:string,
    logo:string,
    image_near:string,
    title:string,
    rating:number,
    description?:string
}
interface FollowingBy { 
    id: number;
    title: string;
    post_by_userid: string;
    image_near: string;
    rating: number;
    comment_count:number,
    like_count:number,
    do_like:boolean,
    share_count:number,
    total_reviews:number,
    description?: string,
    address?: string,
    trailType?: string,
    user_favorite?: string 
}
type ShareOption = {
  label: string;
//   icon: JSX.Element | (() => JSX.Element);
   action: (cmt: any) => void
};
interface ReviewUser {
  id: string;
  name: string;
  profile_pic?: string;
}
interface Review {
  userName: string;
  userId: string;
  title: string;
  descriptions: string;
  user:ReviewUser;
}

const CommunitySectionCmtDetails: React.FC = () => {
    const { slug } = useParams();
    const location = useLocation();
    const statePostId = location.state?.postId;
    // console.log('gettt',statePostId);
    // const [postId, setPostId] = useState(statePostId || localStorage.getItem("postId"));
    const [postId, setPostId] = useState(() => {
        // initialize from location.state or localStorage
        return statePostId || localStorage.getItem("postId") || null;
    });
    // console.log('postIdss',postId);
    const [activeTab, setActiveTab] = useState('');
    const [likeLoading, setLikeLoading] = useState(false);
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    
    const [CommunityLoading,setCommunityLoading] = useState(true);
    const [getprofileCommunity, setProfileCommunity ]= useState<any[]>([]);
    const [getfollowingBy, setFollowingBy] = useState<FollowingBy | null>(null);
    const [getComments, setComments ]= useState<any[]>([]);
    const [getpostData, setPostdata ]= useState<any[]>([]);
    const [commenttext, setInputTextValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [reviewVisibleCount, setReviewVisibleCount] = useState(4);
    // const pageTitle = slugToTitle(title);
    const [getImages, setImages] = useState([]);   
    const [currentIndex, setCurrentIndex] = useState(0); // image arrow
    const [loginId, setLoginId] = useState("");
    const [loginIdBased, setLoginIdBased] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [mapLoading, setMapLoading] = useState(true);

    // comment popup
    const [isOpen, setIsOpen] = useState(false);
    const [isSpam, setSpamModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState<any>(null);
    const [getBlockedId, setBlocked] = useState<any>(null);
    const [getCheckblock, setCheckblock] = useState(false);
    // const [getCheckblock, setCheckblock] = useState<{ [blockId: string]: boolean }>({});
    const [getBlockPostId, setBlockPostId] = useState<any>(null);
    const [getBlockedUserId, setBlockedUserId] = useState<any>(null);
    // const [reasonvalue, setReasonValue] = useState<any>(null); 
    const [getBlocekedTextvalidation, setBlocekedTextValidation] = useState<string | null>(null);
    // Popup comment check
    const [checkedUsers, setCheckedUsers] = useState<{ [userId: string]: boolean }>({});
    const [reasonValue, setReasonValue] = useState<{ [userId: string]: string }>({});
    const [isShareOpen, setShareIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // rating
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [reviewDetails, setReviewdetails] = useState<Review[]>([]);
    const [reviewListing, setReviewListing] = useState<Review[]>([]);
    const [userReview, setUserReview] = useState<any | null>(null); 
    const [getImagesArray, setImagesArray] = useState([]);    
    // start message show state define
    const [message, setMessage] = useState<string | null>(null);
    const [messageComment, setCommentMessage] = useState<string | null>(null);
    const [messageDeleteComment, setDeleteCommentMessage] = useState<string | null>(null);
    const [messageBlockComment, setBlockCommentMessage] = useState<string | null>(null);
    const [messageUpload, setMessageUpload] = useState<string | null>(null);
    const [messageUploadError, setMessageUploadError] = useState<string | null>(null);
    // end message show state define
    // Review Show
    const [showReviews, setShowReviews] = useState(true);
    // map state
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const walkerMarker = useRef<mapboxgl.Marker | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [getmapPoints, setMapPoints] = useState<MapPoint[]>([]);
     // map state close
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const shareUrl = window.location.href;
    // image popup
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    // Use hook for each Clear  message after success
    useAutoClearMessage(message, setMessage, 3000);
    useAutoClearMessage(messageComment, setCommentMessage, 3000);
    useAutoClearMessage(messageDeleteComment, setDeleteCommentMessage, 3000);
    useAutoClearMessage(messageBlockComment, setBlockCommentMessage, 3000);
    useAutoClearMessage(messageUpload, setMessageUpload, 3000);
    useAutoClearMessage(messageUploadError, setMessageUploadError, 3000);
    const [Multipleimages, setMultipleImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [postVisibleCount, setPostVisibleCount] = useState(10);
    const [deleting, setDeleting] = useState(false);
    // const mappointsData: MapPoint[] = [
    //     { latitude: 28.631233154913488, longitude: 77.21910966616741 },
    //     { latitude: 28.631953033233273, longitude: 77.21928688873709 },
    //     { latitude: 28.632340101444015, longitude: 77.2206593332844 },
    //     { latitude: 28.633714724673695, longitude: 77.21910966616741 },
    //     { latitude: 28.631233154913488, longitude: 77.21910966616741 },
    // ];
     // Get id by helper
    useEffect(() => {
        const { userId, token ,login,email} = getAuth();
            if (userId) setUserId(userId);
            if (token) setToken(token);
            if (login) setLoginIdBased(login);
            if (email) setLoginId(email);
    }, []);
    useEffect(() => {
        if (Array.isArray(reviewListing) && reviewListing.length > 0 && userId) {
            const myReview = reviewListing.find(
            r => r.user?.id === userId
            );

            setUserReview(myReview || null);
            
        }
    }, [reviewListing, userId]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        if (statePostId) {
        localStorage.setItem("postId", statePostId);
        setPostId(statePostId);
        }
    }, [statePostId]);
    
     const handleShowPostMore = () => {
        setPostVisibleCount((prev) => prev + 5); // Show 2 more each time
    };
    const MAX_FILE_SIZE = 500 * 1024; // 500 KB
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        if (selectedFiles.length === 0) return;
        
        const validFiles: File[] = [];
        const validImageURLs: string[] = [];

        selectedFiles.forEach((file) => {
            if (file.size <= MAX_FILE_SIZE && file.type.startsWith("image/")) {
                validFiles.push(file);
                validImageURLs.push(URL.createObjectURL(file));
            } else {
                const sizeKB = (file.size / 1024).toFixed(0);
                // setMessageUploadError(`${file.name} is ${sizeKB} KB — must be under 500 KB`);
                    useAlertMessage({
                        icon: "error",
                        title: "File Too Large",
                        html: `<strong>${file.name} is ${sizeKB} KB — must be under 500 KB</strong>`,
                        width: "350px",
                        confirmButtonColor: "#d33",
                        confirmButtonText: "OK",
                    });
               
            }
        });

        if (validFiles.length === 0) {
            e.target.value = ""; 
            return;
        }
        setMultipleImages((prev) => [...prev, ...validFiles]);
        setPreviewUrls((prev) => [...prev, ...validImageURLs]);
        await handleUploadImages(selectedFiles);
        
    };

    const handleUploadImages = async (files: File[]) => {
        if (!userId || !postId || files.length === 0) return;

        const formData = new FormData();
        formData.append("UserId", userId.toString());
        formData.append("feedId", postId.toString());
        formData.append("UploadTime", new Date().toISOString());

        files.forEach((file) => {
            formData.append("MediaFiles", file); // FIXED
        });

        try {
            setIsUploading(true);

            const response = await axios.post(`${BASE_URL}/feed/addimages`, formData);

            // console.log("API Response:", response.data);
            if (response.data.status === "success") {
                // Swal.fire("Uploaded!", "Images uploaded successfully!", "success");
                useAlertMessage({
                    icon: "success",
                    title: "Done!",
                    html: "<strong>Images uploaded successfully!</strong>",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    confirmButtonColor: "#fc673c",
                    padding: "1rem",
                });
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

        } catch (error: any) {
            useAlertMessage({
                title: "Upload Failed",
                html: "<strong>Error uploading images. Please try again.</strong>",
                icon: "error",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc3545",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteClick = (id:any ) => {
        //  alert(id);
        setSelectedCommentId(id); 
        setIsOpen(true); 
    };
    const handleConfirmDelete = async () =>{
        if (!selectedCommentId || deleting) return;

    setDeleting(true);
        try {
            console.log("Deleting comment:", selectedCommentId);
            const response = await axios.post(`${BASE_URL}/feed/comment/delete`, {
                commentId: selectedCommentId,
                UserId: userId
            });
            setComments((prev) =>
                prev.filter((c) => c.id !== selectedCommentId)
            );
            setIsOpen(false);
            setSelectedCommentId(null);
            if (response.data.status === "success") {
                useAlertMessage({
                    icon: "success",
                    title: "Done!",
                    html: "<strong>Comment deleted successfully!</strong>",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    confirmButtonColor: "#fc673c",
                    padding: "1rem",
                });
            } else {
                useAlertMessage({
                    title: "Failed",
                    html: "<strong>Report failed — server rejected</strong>",
                    icon: "error",
                    width: "350px",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                    padding: "1rem",
                });
            }
            
        }catch (error: any) {

            useAlertMessage({
                title: "Upload Failed",
                html: "<strong>Error uploading images. Please try again.</strong>",
                icon: "error",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc3545",
            });
        }finally {
            setDeleting(false);
        }
    }
    


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

    // BIND MAP DATA
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

        await updateRoute(points);
    };

    // GET ROUTE
    const getRoute = async (start: [number, number], end: [number, number]) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const res = await fetch(url);
        const json = await res.json();
        return json.routes?.[0]?.geometry?.coordinates || [];
    };

    // BUILD FULL ROUTE
    const updateRoute = async (points: [number, number][]) => {
        if (!map.current || points.length < 2) return;

        let fullRoute: [number, number][] = [];

        for (let i = 0; i < points.length - 1; i++) {
        const segment = await getRoute(points[i], points[i + 1]);
        if (i > 0) segment.shift();
        fullRoute.push(...segment);
        }

        const source = map.current.getSource("route") as mapboxgl.GeoJSONSource;
        source.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: fullRoute },
        });

        // animateAlongPath(fullRoute);
    };

   


    // CLEANUP
    useEffect(() => {
        return () => {
        map.current?.remove();
        map.current = null;
        };
    }, []);

    const fetchUserImages = async () => {
        if (!userId) return; 

        try {
            const response = await axios.post(
                `${BASE_URL}/feed/user/Images/${userId}`,
                {
                    LoginId: loginIdBased
                }
            );

            // console.log("Images:", response.data.data);
            if (Array.isArray(response.data?.data)) {
                setPreviewUrls(response.data.data); // this is your images array
            }

        } catch (error: any) {
            useAlertMessage({
                title: "Failed",
                html: `<strong style="color:red;">${error.response?.data || "Something went wrong."}</strong>`,
                icon: "error",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc3545",
                padding: "1rem",
            });
        }
    };

    useEffect(() => {
        if (userId && loginIdBased) {
            fetchUserImages();
        }
    }, [userId, loginIdBased]);

    
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
    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        // setTimeout(() => setCopied(false), 2000);
    };
    const shareoptions: ShareOption[] = [
        {
            label: copied ? "Link copied" : "Copy link",
            icon: copied ? <IconCheck /> : <IconCopy />,
            action: handleCopy,
        }, 
        
    
    ];
    
    
    const options: ShareOption[] = [
        {
            label: "Spam",
            action: (cmt: any) => {
                setIsOpen(false);
                setBlocked(cmt.id);
                setBlockPostId(cmt.postId);
                setBlockedUserId(cmt.userId);
                setSelectedComment(cmt.name);
                //  alert(getBlockedId());
                setSpamModal(true);
            },
        },
        {
            label: "Harmful content",
            action: () => {
               alert();
            },
        },
        {
            label: "Privacy issue",
            action: () => {
               // setSpamModal(true);
            },
        },
        {
            label: "Other",
            action: () => {
                //setSpamModal(true);
            },
        },
    ];
    
    

    

    // image arraw move
    const handleNextImage = useCallback(() => {
        setCurrentIndex(i => (i + 1) % getImagesArray.length);
    }, [getImagesArray.length]);




    const handleTextareaChange = (BlockedUserId: string, value: string) => {
        setReasonValue((prev) => ({ ...prev, [BlockedUserId]: value }));
    };
    
    const handleBlocked = (blockId:any ,BlockPostId: any, BlockedUserId: any,checked: boolean) => {
        // console.log('checkid',checked);
        setCheckblock(checked);
        //  console.log('getCheckblocsssssk',getCheckblock);
        setBlocked(blockId); 
        setBlockPostId(BlockPostId);
        setBlockedUserId(BlockedUserId);
         setCheckedUsers((prev) => ({ ...prev, [BlockedUserId]: checked }));
        // alert(` User ID: ${BlockedUserId}  blockedBy ID: ${userId} admin: ${reasonvalue}`);
    };
        const handleSubmitReport = async (getBlockedUserId:any,getBlockedId:any) => {
             
             const reason = reasonValue[getBlockedUserId];
            if (!getBlockPostId || !getBlockedUserId || !userId) {
                Swal.fire({
                    icon: "error",
                    title: "Missing Information",
                    text: "Missing user or post ID",
                    showConfirmButton: false,
                    width: "350px",
                    timer: 2500,
                });
            return;
            }
            

            try {
            const response = await axios.post(`${BASE_URL}/user/commentreportanissue`, {
                CommentId: getBlockedId,
                issueRaisedBy: userId,
                UserId: getBlockedUserId,
                Remark:reason ?? '',
                isBlocked:getCheckblock
            });
       
            // console.log('blocked',response.data);

            if (response.data.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Done!",
                        html: "<strong>User blocked successfully!</strong>",
                        confirmButtonText: "Ok!",
                        width: "350px",
                        confirmButtonColor: "#fc673c",
                    });
            }else if (response.data.status === "failed") {
                Swal.fire({
                    icon: "error",
                    title: "User Failed",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    html: `<strong style="color:red;">${response.data.message || "Something went wrong."}</strong>`,
                    confirmButtonColor: "#d32f2f",
                });
            }
            // setComments(response.data)
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Review Failed",
                    width: "350px",
                    confirmButtonColor: "#dc3545",
                    text: "Error Submit review. Please try again.",
                });
            }
        };
        const handleShowMore = () => {
            setVisibleCount((prev) => prev + 5); // Show 5 more each time
        };
        
        // Show review 
        const handleShowReviewMore = () => {
            setReviewVisibleCount((prev) => prev + 2); // Show 2 more each time
        };
    
        const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!commenttext.trim()) {
                console.warn("Comment is empty!");
                return;
            }
            if (!userId) {
                console.error("No valid userId found!");
                return;
            } 
            try {
                const response = await axios.post(
                        `${BASE_URL}/feed/comment/`,
                    {
                        PostId: postId,
                        // UserId: userId,   
                         UserId: userId,   
                        CommentText: commenttext,  
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }, 
                    }
                    );
                    console.log("Comment posted:", response.data);
                    if (response.data.status === "success") {
                        const newComment = {
                            id: response.data.id,              // or response.data.data.id
                            commentText: commenttext,
                            createdOn: new Date().toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                            }),
                            time: new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            }),
                            name: response.data.name || "You",
                            user_image: response.data.user_image,
                            userId: userId,
                            postId: postId,
                            isLike: false,
                            likeCount: 0,
                            replies: [],
                        };

                        // ✅ ADD TO TOP
                        setComments((prev) => [newComment, ...prev]);
                        fetchPostDetail(slug); //
                        setInputTextValue("");
                        // Swal.fire("Uploaded!", "Images uploaded successfully!", "success");
                        Swal.fire({
                            icon: "success",
                            title: "Done!",
                            html: "<strong>Comment Added successfully!</strong>",
                            confirmButtonText: "Ok!",
                             width: "350px",
                            confirmButtonColor: "#fc673c",
                            });
                       
                    } else {
                        Swal.fire({
                            title: "Failed",
                            html: "<strong>Comment failed — server rejected</strong>",
                            icon: "error",
                             width: "350px",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#dc3545",
                        });
                    }
                    
            } catch (error:any) {
                Swal.fire({
                    icon: "error",
                    title: "Upload Failed",
                    width: "350px",
                    confirmButtonColor: "#dc3545",
                    text: "Error Comment. Please try again.",
                });
            }
        };  
        // console.log(slug);
    //  List review by userid based
    const loadReviewPost = async () => {
        if (!userId) return; // wait until userId is available
        try {
        const response = await axios.post(`${BASE_URL}/feed/user/Review/${userId}`, {
            LoginId: loginIdBased,
            // LoginId: '1112VIRENDRA',
        });

        // console.log("REvi Data:", response.data);

        if (response.data.status === "success") {
            const data = response.data.data;
            setReviewdetails(data); //reviewDetails
        }
        } catch (error:any) {
            useAlertMessage({
                title: "Failed",
                html: `<strong style="color:red;">${error.response?.data || "Something went wrong."}</strong>`,
                icon: "error",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc3545",
                padding: "1rem",
            });
            // console.error("Error loading profile:", error);
            // alert("Failed to load profile");
        }
    };
    useEffect(() => {
            loadReviewPost();
    }, [userId]);
   

    const fetchPostDetail = async (slug: any) => {
        if (!loginId || !slug) return;

        try {
            const response = await axios.post(
            `${BASE_URL}/user/community/${slug}`,
            {
                LoginId: loginId,
                slug: slug,
            },
            {
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
            }
            );

            const data = response.data?.data;
            console.log('community/1',response.data.data.feed_fetails);
            // setMapPoints(mappointsData);
            // setMapPoints(data?.feed_fetails.mapPoints || []);
            const apiMapPoints = data?.feed_fetails?.mapPoints;

            setMapPoints(
            Array.isArray(apiMapPoints) && apiMapPoints.length > 0
                ? apiMapPoints.map((p: any) => ({
                    latitude: Number(p.latitude ?? p.lat),
                    longitude: Number(p.longitude ?? p.lng),
                }))
                : []  
            );
            setProfileCommunity(data?.profile_Community || []);
            setImagesArray(data?.feed_fetails?.images || []);
            setFollowingBy(data?.feed_fetails || []);
            // sorting order
            const sortedReviews = (data?.reviews || []).sort(
            (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            setReviewListing(sortedReviews);
            // setReviewListing(data?.reviews || []);
            setComments(data?.feed_fetails?.comments || []);

            let postDats: any[] = [];
            const followingBy = data?.feed_fetails;

            if (Array.isArray(followingBy)) {
            followingBy.forEach(item => {
                item?.comments?.forEach(c => c?.postDto && postDats.push(c.postDto));
            });
            }

            setPostdata(postDats);
        } catch (error) {
            console.error("Error fetching community data", error);
        } finally {
            setCommunityLoading(false);
        }
    };

    useEffect(() => {
        if (loginId && slug) {
            fetchPostDetail(slug);
        }
    }, [loginId, slug]);

        // Add rating // 27-11-25
        const addReviewAPI = async () => {
            return axios.post(`${BASE_URL}/feed/addrating`, {
                FeedId: postId,
                UserId: userId,
                Rating: rating,
                Review: review,
            });
        };

        const updateReviewAPI = async () => {
            return axios.post(`${BASE_URL}/feed/updaterating`, {
                // Id:1   optional check
                feedId: postId,
                UserId: userId,
                Rating: rating,
                Review: review,
            });
        };
        // console.log('PostId  handle',postId);
        const handleSubmitReview = async () => {
            if (!userId || !postId) {
                Swal.fire({
                    icon: "error",
                    title: "Missing Information",
                    text: "Missing user or post ID",
                    showConfirmButton: false,
                    width: "350px",
                    timer: 2500,
                });
                return;
            }

            try {
                let response;

                if (userReview) {
                // UPDATE existing review
                response = await updateReviewAPI();
                 console.log('update',response.data.data);
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
                
                await fetchPostDetail(slug);
                // loadReviewPost();
                } else {
                // ADD new review
                response = await addReviewAPI();
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
                    await fetchPostDetail(slug);
                // loadReviewPost();
                }

                if (response?.data?.status === "success") {
                    setUserReview({
                        UserId: userId,
                        Rating: rating,
                        Review: review,
                    });
                }

                setIsReviewOpen(false);
            } catch (error:any) {
                useAlertMessage({
                    title: "Upload Failed",
                    html: "<strong>Error. Please try again.</strong>",
                    icon: "error",
                    width: "350px",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                });
                
            }
        };
        const LikeHandle = async (postId: number) => {
            if (!postId || likeLoading) return; // prevent multiple clicks
            if (likedPosts.includes(postId)) return;
            setLikeLoading(true);

            try {
                const response = await axios.post(`${BASE_URL}/feed/like`, {
                PostId: postId,
                UserId: userId,
                });

                if (response.data.status === "success") {
                //alert('liked');
                setLikedPosts(prev => [...prev, postId]);
                setFollowingBy(prev => {
                    if (!prev) return prev;
                    return {
                    ...prev,
                    do_like: true,                     // mark as liked
                    like_count: (prev.like_count ?? 0) + 1, // increment count
                    };
                });
                }
            } catch (error) {
                console.error("Error liking post:", error);
            } finally {
                setLikeLoading(false);
            }
        };

    // const LikeHandle = useCallback(async (id: number) => {
        
    //     alert(id);
    //     if (id !== 0) {

    //         try {
    //             const response = await axios.post(
    //                 `${BASE_URL}/feed/like`,
    //                 {
    //                     PostId: id,
    //                     UserId: userId, 
    //                     // UserId: "e08ee354-20e2-4af6-a37f-c30127cf322d", 
    //                 },
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Accept: "application/json",
    //                     },
    //                 }
    //             );


    //             if (response.data.status === "success") {
    //             }  else {
    //                 console.warn("Unhandled response:", response.data);
    //             }
    //         } catch (error) {
    //             console.error("Error liking post", error);
    //         } finally {
    //             setCommunityLoading(false);
    //         }
    //     }
    // }, [BASE_URL]); 
        // console.log( 'dsklfas',getComments);
    if (CommunityLoading) {
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
    const limit = 150;
    // Safety check
    const rawDescription = getfollowingBy?.description ?? '';
    const cleanDescription = rawDescription
    .replace(/<[^>]+>/g, '')      // Remove HTML tags
    .replace(/&nbsp;| /g, '')     // Remove HTML entities
    .trim();

    const shortText = cleanDescription.slice(0, limit);
    
    const shouldTruncate = cleanDescription.length > limit;
    // console.log('ldd',shouldTruncate)

    return (
        <main className="mainContent">
            <section className="section-trail-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="trail-dt-top">
                                <h1 className="trail-dt-title">{getfollowingBy?.title ?? ''}</h1>
                                <p className="trail-dt-address text-grey mb-0">{getfollowingBy?.address ?? 'N/A'}<span className="tdt-add"> | <i className="bi bi-star-fill"></i> {getfollowingBy?.rating ? (Math.round(getfollowingBy.rating * 100) / 100).toFixed(1) : "0.00" } Moderate </span> <span className="tdt-separator">|</span> {getfollowingBy?.date??''}<span className="t-dt-r-and-o"></span></p>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
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
                                        <div>
                                            <h3 style={{ marginTop:'34px', display:"flex", justifyContent:"center"}}>Delete comment?</h3>
                                        <p style={{textAlign:"center"}}>Deleting a comment will erase it permanently.</p>
                                        </div>
                                        <button className="btn-cross" onClick={() => setIsOpen(false)}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <button className="btn-send" onClick={handleConfirmDelete}>Delete</button>
                                        {/* <button className="btn-style-3">Keep</button> */}
                                    </div>
                                    


                                    </div>
                                </div>
                            )}
                            {isSpam && (
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
                                    onClick={() => setSpamModal(false)}
                                >
                                   
                                    <div
                                        style={{
                                            background: "white",
                                            padding: "25px",
                                            borderRadius: "10px",
                                            width: "450px",
                                            maxHeight: "80vh",
                                            marginTop:"80px",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        >
                                        <div style={{ display: "flex", justifyContent: "end",margin:'15px 0px 15px 0px' }}>
                                            
                                            {/* <button className="btn-cross"
                                            onClick={() => {
                                                // setSpamModal(false);
                                                setIsOpen(true); // reopen Share modal
                                            }}
                                            > 
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 4L6 10L12 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>

                                            </button> */}
                                            <button className="btn-cross  ffssd" onClick={() => setSpamModal(false)}> 
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
    
                                            </button>
                                        </div>
                                        <div>
                                            <h3 style={{ marginTop:'25px',cursor:'pointer'}}>Report an issue</h3>
                                            <p>What would you like to report?</p>
                                            {/* <input
                                                type="tel"
                                                placeholder="Enter phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                                            /> */}
                                            <p>Spam</p>
                                             
                                                <textarea
                                                 value={reasonValue[getBlockedUserId] || ""}
                                                 onChange={(e) => handleTextareaChange(getBlockedUserId, e.target.value)}
                                                placeholder="Enter text"
                                                style={{
                                                    background: '#ccc',
                                                    padding: '10px',
                                                    width: '100%', 
                                                    borderRadius: '4px', 
                                                    border: '1px solid #999',
                                                    resize: 'vertical', 
                                                }}  
                                                />
                                                {getBlocekedTextvalidation && (
                                                <p style={{ color: "red", marginTop: "5px" }}>{getBlocekedTextvalidation}</p>
                                                )}
                                            {/* <p style={{background:'#ccc',padding:'10px'}}>This might include unwanted solicitations, advertising or promotions, fraud or phishing.</p> */}
                                            <h4>Block {selectedComment ?? ''}</h4>
                                            <div className="row">
                                                <div className='col-md-10'>
                                                    You’ll no longer see their reviews, photos, or posts. Neither of you will be able to see each other’s profiles.
                                                </div>
                                                 <div className='col-md-2'>
                                                   <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedUsers[getBlockedUserId] || false}
                                                        
                                                        onChange={(e) => handleBlocked(getBlockedId,getBlockPostId, getBlockedUserId,e.target.checked)}
                                                        
                                                    />

                                                        <span className="slider"></span>
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <button
                                                className="btn-send"
                                                disabled={
                                                !checkedUsers[getBlockedUserId] &&
                                                !(reasonValue[getBlockedUserId]?.trim())
                                                }
                                                onClick={() => {
                                                handleSubmitReport(getBlockedUserId,getBlockedId); // send this user's data
                                                setCheckedUsers((prev) => ({ ...prev, [getBlockedUserId]: false }));
                                                setReasonValue((prev) => ({ ...prev, [getBlockedUserId]: "" }));
                                                setSpamModal(false);
                                                }}
                                            >
                                                Submit report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                )}
                               
                                {isShareOpen && (
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
                                    onClick={() => setShareIsOpen(false)}
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
                                            <button className="btn-cross" onClick={() => setShareIsOpen(false)}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                            {shareoptions.map((opt, idx) => (
                                                <li
                                                key={idx}
                                                style={{
                                                    padding: "15px",
                                                    // borderBottom: "1px solid #eee",
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
                        {/* <div  className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 order-xl-first order-lg-first order-md-first order-sm-last order-last"> */}
                        <div  className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 order-xl-first order-lg-first order-md-first order-sm-last order-last">
                            
                            <ul className="d-flex trail-dt-nav list-unstyled pt-3" role="tablist">
                                    <li className="active" data-bs-toggle="list"><a href="#overviewData" role="button"
                                            className="active">Overview</a></li>
                                    {/* <li data-bs-toggle="list"><a href="#trailGuide" role="button">Following </a></li> */}
                                    
                                </ul>
                            <div className="trail-cover position-relative" id="overviewData">
                                                       
                               
                                {
                                    getImagesArray.length > 0 ? (
                                        getImagesArray.map((image: any, index: number) => {
                                        return (
                                            <a
                                            key={index}
                                            href={image.url}
                                            data-fancybox="MoreImages"
                                            style={{ display: index === currentIndex ? 'block' : 'none' }}
                                            >
                                                    
                                            <img
                                                src={image.url || '/assets/images/not-found.jpg'}
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
                                            src=''
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
                                            getImagesArray.length > 0
                                            ? getImagesArray[0] 
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
                                    {getImagesArray.length} + Photos 
                                          
                                    </a>
                                    <label htmlFor="imageInput"
                                    style={{background: "#FC673C", border: "none",borderRadius: "50px", padding: "10px"}}
                                        className="btn btn-sm btn-primary ms-2"
                                    >Add Image</label>
                                    <input id="imageInput" type="file" accept="image/*" multiple
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                    />
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
    
                                </div>
                            </div>

                            <div   className="trail-user-favorite-card br-20 bg-almost-white d-flex justify-content-between flex-wrap">

                                <div className="tuf-left-content d-flex align-items-center">
                                    <div className="tusc-cn-1">
                                        <p className="mb-0">Users Favorite </p>
                                    </div>
                                    <div className="tusc-cn-2">
                                        <p className="mb-0 text-midnight-navy">
                                            {/* {getfollowingBy?.user_favorite} */}
                                            </p>
                                    </div>
                                </div>

                                <div className="tuf-right-content d-flex align-items-center">
                                   
                                    <div className="tusc-cn-1 text-center">
                                        <p className="mb-0">{getfollowingBy?.rating ? (Math.round(getfollowingBy.rating * 100) / 100).toFixed(1) : "0.00" } </p>
                                        <StarRating rating={Number(getfollowingBy?.rating)}/>
                                    </div>
                                    <div className="tusc-cn-2 text-center">
                                        
                                        <p className="mb-0 text-midnight-navy">
                                        {/* <span className="d-block review-no">31</span> */}
                                            <span>{getfollowingBy?.total_reviews ?? ''}</span>
                                        </p>
                                    </div>
                                    <div className="tusc-cn-3">
                                        <a href="#reviews"
                                        className="btn-style-1">Show all Reviews</a>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="trail-stats d-flex flex-wrap">
                                <div className="trail-stat-single text-midnight-navy px-2">
                                    <h3> {getpostData.length ?? '0'}<span>km</span></h3>
                                    <p className="mb-0">Length</p>
                                </div>
                                <div className="trail-stat-single text-midnight-navy px-2">
                                    <h3>{getpostData.elevationGain ?? '0'}<span>m</span></h3>
                                    <p className="mb-0">Elevation gain</p>
                                </div>
                                <div className="trail-stat-single text-midnight-navy px-2">
                                    <img src="/assets/images/icons/loop.svg" alt="" className="tss-icon"/>
                                    <p className="mb-0">{getfollowingBy?.trailType ?? ''}</p>
                                </div>
                            </div>
                            <div className="trail-desc1 trail-detail-widget1">
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
                                {/* <p>{getfollowingBy.description??''}</p> */}
                            </div>
                            <div className="single-feed position-relative">
                                <div className="feed-footer d-flex">
                                    <button 
                                        onClick={() => getfollowingBy && LikeHandle(getfollowingBy.id)}
                                            disabled={
                                                getfollowingBy?.do_like === true    // already liked
                                                //getfollowingBy?.post_by_userid === userId // is the user’s own post
                                            }
                                            className="like-btn"
                                            style={{
                                                background: "transparent",
                                                padding: "6px 12px",
                                                cursor:
                                                getfollowingBy?.do_like === true 
                                                // getfollowingBy?.post_by_userid === userId
                                                    ? "not-allowed"
                                                    : "pointer",
                                                opacity:
                                                getfollowingBy?.do_like === true 
                                                // getfollowingBy?.post_by_userid === userId
                                                    ? 0.6
                                                    : 1,
                                            }}  
                                        
                                        
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.32083 3.55228C1.54093 4.54475 1.06838 5.90073 1.06838 7.31638C1.06838 10.4899 3.18627 13.1538 5.42249 15.071C6.52965 16.0202 7.63942 16.7633 8.47356 17.2694C8.89001 17.5221 9.23633 17.7148 9.47719 17.8437C9.52521 17.8694 9.56902 17.8926 9.60833 17.9131C9.64866 17.8909 9.6937 17.8658 9.74322 17.8379C9.98467 17.7017 10.3316 17.499 10.7488 17.2351C11.5842 16.7066 12.6957 15.9365 13.8047 14.9685C16.049 13.0096 18.1624 10.3462 18.1624 7.31638C18.1624 5.90094 17.6899 4.54496 16.91 3.55244C16.1327 2.56318 15.0713 1.95607 13.8722 1.95607C12.2147 1.95607 10.9292 3.03556 10.0949 4.73481L9.61539 5.71147L9.1359 4.73481C8.30155 3.03545 7.01597 1.95607 5.35855 1.95607C4.15962 1.95607 3.09813 2.56307 2.32083 3.55228ZM9.61539 18.5159C9.38365 18.9972 9.38328 18.997 9.38328 18.997L9.38088 18.9959L9.37479 18.9929L9.35294 18.9822C9.33413 18.9729 9.307 18.9594 9.27206 18.9417C9.20214 18.9063 9.10102 18.8541 8.97313 18.7857C8.71741 18.6489 8.35422 18.4467 7.91934 18.1828C7.05075 17.6558 5.89022 16.8793 4.72708 15.8821C2.4227 13.9064 0 10.9706 0 7.31638C0 5.67359 0.545529 4.08235 1.48078 2.89218C2.41859 1.69872 3.76928 0.887695 5.35855 0.887695C7.23013 0.887695 8.65337 1.9365 9.61539 3.41643C10.5774 1.93657 12.0006 0.887695 13.8722 0.887695C15.4616 0.887695 16.8123 1.69886 17.7501 2.89234C18.6853 4.08262 19.2308 5.67386 19.2308 7.31638C19.2308 10.8327 16.8036 13.7691 14.5073 15.7734C13.3459 16.787 12.1872 17.5893 11.3199 18.138C10.8857 18.4126 10.5231 18.6246 10.268 18.7685C10.1404 18.8404 10.0395 18.8954 9.96987 18.9328C9.9351 18.9515 9.90807 18.9657 9.88937 18.9755L9.86773 18.9868L9.8617 18.9899L9.85994 18.9908L9.85935 18.9911C9.85935 18.9911 9.85897 18.9913 9.61539 18.5159ZM9.61539 18.5159L9.85935 18.9911L9.62281 19.1123L9.38328 18.997L9.61539 18.5159Z"
                                            fill={getfollowingBy?.do_like===true  ? "#FC673C" : "#7D7D7D"}
                                            />
                                            
                                        </svg>
                                        {getfollowingBy?.like_count?? 0}  {getfollowingBy?.do_like===true ? "Liked" : "Like"}  
                                        
                                    </button>
                                    <button className="comment-btn">
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3.69445 11.0675H15.3056V10.0135H3.69445V11.0675ZM3.69445 7.90537H15.3056V6.85132H3.69445V7.90537ZM3.69445 4.74322H15.3056V3.68917H3.69445V4.74322ZM19 18L15.7521 14.7567H1.70578C1.21952 14.7567 0.813484 14.5944 0.487669 14.2697C0.161854 13.9451 -0.000701429 13.54 2.27491e-06 13.0544V1.70229C2.27491e-06 1.21743 0.16291 0.812323 0.488724 0.486973C0.814539 0.161623 1.21987 -0.000700428 1.70472 2.27166e-06H17.2953C17.7808 2.27166e-06 18.1862 0.162326 18.5113 0.486973C18.8364 0.81162 18.9993 1.21673 19 1.70229V18ZM1.70578 13.7026H16.2028L17.9444 15.4355V1.70335C17.9444 1.54102 17.8769 1.39205 17.7418 1.25643C17.6067 1.12081 17.4578 1.05335 17.2953 1.05405H1.70472C1.54287 1.05405 1.39404 1.12151 1.25822 1.25643C1.12241 1.39135 1.05485 1.53997 1.05556 1.70229V13.0544C1.05556 13.216 1.12311 13.3646 1.25822 13.5003C1.39334 13.6359 1.54217 13.7033 1.70472 13.7026"
                                                fill="#7D7D7D"
                                            />
                                        </svg>
                                            {getfollowingBy?.comment_count?? 0} Comment
                                    </button>

                                </div>
                                
                            </div>
                            
                                <div className="row">
                                {messageComment && <div style={{color:'#FC673C' , textAlign:'center'}}>{messageComment}</div>}
                                {messageDeleteComment && <div style={{color:'#FC673C' , textAlign:'center'}}>{messageDeleteComment}</div>}
                                {messageBlockComment && <div style={{color:'#FC673C' , textAlign:'left',margin:'0px'}}>{messageBlockComment}</div>}
                                {
                                    
                                    // getComments.map((cmt:any,index:number)=>(
                                    getComments.slice(0, visibleCount).map((cmt: any, index: number) => (
                                        <div key={index}  className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div  className="testimonial-single position-relative">
                                                <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                    <div className="test-image">
                                                        <img
                                                            style={{'height':'60px' ,'width':'60px'}}
                                                             src={cmt.user_image || '/assets/images/profile/profile-md.png'}
                                                            alt="Top Trail" className="user-profile-img" 
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                const target = e.currentTarget;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="test-head">
                                                       
                                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">{cmt.name ?? 'N/A'}<span style={{color:'gray',fontSize:'14px'}} className="d-inline-block mx-1">•  {timeAgo(cmt.createdOn,cmt.time)}</span> </h3>
                                                        {/* <StarRating rating={Number(review.rating)}/> */}
                                                        <p className="mb-0">{cmt.commentText ?? 'N/A'}</p>
                                                    </div>
                                                    {/* <div className="right-abs">
                                                        <i className="bi bi-three-dots"></i>
                                                    </div> */}
                                                    <div className="user-feed-options dropdown dropdown-no-arrow">
                                                        <a className="dropdown-toggle text-midnight-navy" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="bi bi-three-dots"></i>
                                                        </a>
                                                        <ul className="dropdown-menu dropdown-sm dropdown-rounded custom-dropdown">
                                                           {userId === cmt.userId ? (
                                                            <li>
                                                                <a className="dropdown-item" href="#"
                                                                style={{ cursor: 'pointer' }}
                                                                    // onClick={()=>{
                                                                      
                                                                    //     setIsOpen(true);
                                                                    //     setSelectedCommentId(cmt.id);
                                                                    // }}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleDeleteClick(cmt.id);
                                                                    }}
                                                                >
                                                                Delete
                                                                </a>
                                                            </li>
                                                            ) : (
                                                            <>
                                                                <li> 
                                                                    <a 
                                                                    className="dropdown-item" 
                                                                    style={{cursor: 'pointer' }}
                                                                    // onClick={() => {
                                                                    //     setIsOpen(true);
                                                                    //     setSelectedComment(cmt.name); 
                                                                    // }}
                                                                    //onClick={() => setIsOpen(true)}
                                                                     onClick={() => options[0].action(cmt)} 
                                                                    >
                                                                    Report an issue
                                                                </a>
                                                                </li>
                                                                <li>
                                                                    {/* <a className="dropdown-item" href="#">
                                                                        Block
                                                                    </a> */}
                                                                </li>
                                                            </>
                                                            )}
                                                            
                                                            {/* <li><a className="dropdown-item" href="#">Action 2</a></li> */}
                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        //  <p>{cmt.createdOn??''}</p>
                                    ))
                                }
                                {visibleCount < getComments.length && (

                                    <div className="row">
                                        <div className="col-12 text-end">
                                            <button
                                            style={{textDecoration:'none', marginBottom:'10px'}}
                                            className="btn btn-link text-orange fw-bold ms-1"
                                            onClick={handleShowMore}
                                            >
                                            Show more... 
                                            </button>
                                        </div>
                                    </div>

                                )}
                            </div>
                            
                            <div className='row d-flex justify-content-center'>
                                <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <form onSubmit={handleCommentSubmit} className="flex flex-col items-center">
                                        <div className="input-group mb-3">
                                        <input
                                            value={commenttext}
                                            onChange={(e) => setInputTextValue(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Add a comment"
                                            id="comment"
                                            style={{ borderRadius: "50px 0 0 50px" }}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary"
                                            style={{ borderRadius: "0 50px 50px 0" }}
                                            aria-label="Submit comment"
                                        >
                                            <i className="bi bi-send-fill"></i>
                                        </button>
                                        </div>
                                    </form>
                                    </div>
                            </div>
                        </div>

                        {/* <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12"> //15-1-26 */}
                        <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="trail-detail-map position-relative">
                                <div className="trail-detail-map-btn-group d-flex justify-content-xl-end justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center">
                                    <button onClick={() => setShareIsOpen(true)} className="btn-rounded-white rounded-circle" type="button" title="Share">
                                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12.125" cy="3.375" r="1.875" stroke="#05073D" strokeWidth="1.125"/>
                                    <circle cx="3.125" cy="8.625" r="1.875" stroke="#05073D" strokeWidth="1.125"/>
                                    <path d="M10.25 4.5L5 7.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4.625 10.125L10.25 13.5" stroke="#05073D" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12.125" cy="14.625" r="1.875" stroke="#05073D" strokeWidth="1.125"/>
                                    </svg>
                                    </button>
                                </div>
                                {/* <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194474.440444268!2d55.959295174859626!3d25.08154936413991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5a8616e5ca149%3A0x75d4f4005126006a!2sShawkah%20Dam!5e0!3m2!1sen!2sin!4v1749891263519!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> --> */}
                                {/* <img src="/assets/images/trails/map.png" alt="" className="map-img"/> */}
                                    
                                <div style={{ height: "75vh", width: "100%", position: "relative" }}>
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
                                    <div ref={mapContainer}  style={{ height: "100%", width: "100%",borderRadius: "10px" }}/>
                                    ) : (
                                     !mapLoading && <p style={{ textAlign: "center" }}>Map not available</p>
                                    )}                                   
                                </div>
 

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
                            disabled={!review.trim()}>
                               {userReview ? "Update" : "Add"}  
                            </button>
                            </div>
                        </div>
                        </div>
                    )}    

                    <div className="trails-reviews-widget" id="reviews">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title d-flex align-items-center">   
                                    <h2 className="title">Reviews</h2>
                                    
                                {/* {isLoggedIn &&(
                                    <a href="#" style={{background:'#FC673C',border:'none',borderRadius:'50px',padding:'10px'}} className="btn btn-sm btn-primary ms-2"  
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsReviewOpen(true);
                                        }}  
                                    >Add Review</a> 
                                )} */}
                                {isLoggedIn && userId !== getfollowingBy?.post_by_userid  && !userReview && (
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
                        {
                            showReviews &&(
                            <>
                                {message && <div style={{color:'#FC673C' , textAlign:'left',margin:'0px'}}>{message}</div>}
                                {reviewListing.length > 0 ? (
                                    <>
                                        <div className="row review-row g-3">
                                        {reviewListing.slice(0, reviewVisibleCount).map((rev:any,index:number) => (
                                        // reviewDetails.map((rev:any,index:number)=>(
                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div className="testimonial-single position-relative">
                                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                        <div className="test-image">
                                                            <img
                                                                src={rev.user.profile_pic || '/assets/images/other/testimonial-1.png'}
                                                                alt="Top Trail" className="img-fluid" 
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/other/testimonial-1.png'; // fallback image
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="test-head">
                                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0"> {rev.user.name ?? ''}</h3>
                                                            <div className="rating">
                                                                {/* <StarRating rating={Number(5)}/> */}
                                                                <StarRating rating={Number(rev?.rating)}/>
                                                            </div>
                                                            <p className="mb-0">{rev.date ?? ''} <span className="d-inline-block mx-1">•</span>{String(rev?.activity || '').trim() || 'Hiking'}</p>
                                                        </div>
                                                        <div className="right-abs">
                                                            {
                                                                rev?.user?.id === userId &&(
                                                                    <a className=" ms-2" title="Edit Review"
                                                                    onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // pre-fill if editing
                                                                    if (userReview) {
                                                                        // setRating(userReview.rating);
                                                                        setRating(userReview.rating);
                                                                        setReview(userReview.comment);}
                                                                    // } else {
                                                                    //     setRating(0);
                                                                    //     setReview("");
                                                                    // }
                                                                    setIsReviewOpen(true);
                                                                    }}
                                                                    >
                                                                    </a>
                                                                )
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="testimonial-body">
                                                        <p className="text-midnight-navy">{rev.comment ?? 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div> 
                                        ))}
                                        </div>
                                        {reviewVisibleCount < reviewListing.length && (
                                            <div className="row">
                                                <div className="col-12 text-end">
                                                    <button
                                                    style={{textDecoration:'none', marginBottom:'10px',float:'left'}}
                                                    className="btn btn-link text-orange fw-bold ms-1"
                                                    onClick={handleShowReviewMore}
                                                    >
                                                    Show more... 
                                                    </button>
                                                </div>
                                            </div>   
                                        )}
                                    </>
                                ):(
                                    <p>Not Found Review </p>
                                )}
                        </>
                            )
                        }
                        {/* <div className="row">
                            <div className="col-12">
                                <div className="section-title d-flex align-items-center">   
                                    <h2 className="title">Images</h2>
                                {isLoggedIn && (
                                    <div className="d-flex justify-content-between align-items-center">

                                        <label
                                        htmlFor="imageInput"
                                        style={{background: "#FC673C", border: "none",borderRadius: "50px", padding: "10px"}}
                                            className="btn btn-sm btn-primary ms-2"
                                        >
                                        Add more Images
                                        </label>
                                        
                                        <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        style={{ display: "none" }}
                                        />
                                    </div>
                                )}

                                </div>
                            </div>
                        </div> */}
                        {messageUpload && <div style={{color:'#FC673C' ,padding: '10px',marginBottom:'10px'}}>{messageUpload}</div>}
                        {messageUploadError && <div style={{color:'#dc3545' ,padding: '10px',marginBottom:'10px'}}>{messageUploadError}</div>}
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="testimonial-single position-relative ">
                                <div className="review-gallery" style={{overflow: 'visible'}}>
                                        <div className="d-flex flex-wrap gap-2">
                                            {previewUrls.length > 0 && (
                                                <>
                                                    {
                                                        previewUrls.slice(0, postVisibleCount).map((imgUrl:any,index:number) => (
                                                        //previewUrls.map((imgUrl: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="position-relative"
                                                            style={{ width: "90px", height: "90px" }}
                                                            >
                                                            <a
                                                                href={imgUrl.mediaUrl}
                                                                data-fancybox="reviewImages"
                                                                style={{ display: "block" }}
                                                            >
                                                                <img
                                                                src={imgUrl.mediaUrl}
                                                                alt="Preview"
                                                                style={{
                                                                    width: "90px",
                                                                    height: "90px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "8px",
                                                                }}
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null;
                                                                    target.src = "/assets/images/not-found.jpg";
                                                                }}
                                                                />
                                                            </a>

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-danger position-absolute"
                                                                style={{
                                                                top: "-8px",
                                                                right: "-8px",
                                                                padding: "2px 6px",
                                                                borderRadius: "50%",
                                                                fontSize: "12px",
                                                                lineHeight: "12px",
                                                                }}
                                                                
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        ))
                                                    }
                                                    {postVisibleCount < previewUrls.length && (
                                                        <div className="row">
                                                            <div className="col-12 text-end">
                                                                <button
                                                                style={{textDecoration:'none', marginBottom:'10px',float:'right'}}
                                                                className="btn btn-link text-orange fw-bold ms-1"
                                                                onClick={handleShowPostMore}
                                                                >
                                                                Show more... 
                                                                </button>
                                                            </div>
                                                        </div>   
                                                    )}
                                                </>
                                                
                                            ) }
                                        </div>
                                        {isUploading && <p style={{color:'#fc673c'}} className="text-info">Uploading...</p>}
                                </div>

                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="col-12 mb-4 text-center">
                                <a href="" className="btn-style-1">Check All Reviews</a>
                            </div>
                        </div> */}
                    </div>
                    {/* <!-- review-end --> */}
                </div>
            </section>
            
        </main>         

    );
};

export default CommunitySectionCmtDetails;

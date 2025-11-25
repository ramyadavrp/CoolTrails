// src/components/AffiliateTrail.tsx
import React, { useState,useEffect,useCallback,useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import data from '../../public/data/community.json';
import { Link } from 'react-router-dom';
import StarRating from './AffiliateDetails/StarRating';
import { useLocation, useParams } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle,timeAgo} from '../utils/helpers';
import  {useAutoClearMessage} from '../utils/useAutoClearMessage';
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { SquareLoader } from "react-spinners"; 
import {getAuth} from '../utils/storage';

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
interface Review {
  userName: string;
  title: string;
  descriptions: string;
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
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [reviewDetails, setReviewdetails] = useState<Review[]>([]);
    const [getImagesArray, setImagesArray] = useState([]);    
    // start message show state define
    const [message, setMessage] = useState<string | null>(null);
    const [messageComment, setCommentMessage] = useState<string | null>(null);
    const [messageDeleteComment, setDeleteCommentMessage] = useState<string | null>(null);
    const [messageBlockComment, setBlockCommentMessage] = useState<string | null>(null);
    // end message show state define
    // Review Show
    const [showReviews, setShowReviews] = useState(true);
    // map state
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    // const mapContainer = useRef<HTMLDivElement | null>(null);
    const walkerMarkerRef = useRef<mapboxgl.Marker | null>(null);
    const animationRef = useRef<number | null>(null);
    // const mapRef = useRef<mapboxgl.Map | null>(null);
  
    const [points, setPoints] = useState<[number, number][]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [loopClosed, setLoopClosed] = useState(false);
     // map state close
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const shareUrl = window.location.href;

    // Use hook for each Clear  message after success
    useAutoClearMessage(message, setMessage, 3000);
    useAutoClearMessage(messageComment, setCommentMessage, 3000);
    useAutoClearMessage(messageDeleteComment, setDeleteCommentMessage, 3000);
    useAutoClearMessage(messageBlockComment, setBlockCommentMessage, 3000);

     // Get id by helper
    useEffect(() => {
        const { userId, token ,login,email} = getAuth();
            if (userId) setUserId(userId);
            if (token) setToken(token);
            if (login) setLoginIdBased(login);
            if (email) setLoginId(email);
    }, []);

    useEffect(() => {
        // Check if token exists in localStorage
        // const token = localStorage.getItem("token");
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
    // useEffect(() => {
    //     const storeLocal = localStorage.getItem("login");
    //     console.log('logggg',storeLocal)
    //     if (storeLocal) {
    //         setLoginIdBased(storeLocal);
    //     }
    // }, []);

    useEffect(() => {
    if (statePostId) {
      localStorage.setItem("postId", statePostId);
      setPostId(statePostId);
    }
  }, [statePostId]);
    // useEffect(() => {
    // if (statePostId) localStorage.setItem("postId", statePostId);
    //     setPostId(statePostId);
    // }, [statePostId])
    // console.log('ss',statePostId)

    const handleDeleteClick = (id:any ) => {
        // alert(id);
        setSelectedCommentId(id); 
        setIsOpen(true); 
    };
    const handleConfirmDelete = async () =>{
         if (!selectedCommentId) return;
        try {
            // console.log("Deleting comment:", selectedCommentId);
            const response = await axios.post(`${BASE_URL}/feed/comment/delete`, {
                commentId: selectedCommentId,
                UserId: userId
            });
            setIsOpen(false);
            setSelectedCommentId(null);
            if (response.data.status === "success") {
                setDeleteCommentMessage("Comment deleted successfully!");
            } else {
                setDeleteCommentMessage("Error submitting report.");
            }
            
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report");
        }
    }
    // Add rating
    const handleSubmitReview = async () => {
        // alert(postId);
        // console.log('ratting',rating ); 
        // console.log('review',review );
        // console.log('userId',userId );
        // console.log('postIdaaasss',statePostId );
        try {
            if (userId && postId) {
            const response = await axios.post(`${BASE_URL}/feed/addrating`, {
                FeedId: postId,
                UserId: userId,
                // UserId: "e08ee354-20e2-4af6-a37f-c30127cf322d",
                Rating: rating,
                Review: review,
            });
             console.log('addReview',response.data );
            if (response.data.status === "success") {
                setMessage("Review added successfully!");
            } else {
                setMessage("Error submitting report.");
            }
            } else {
            alert("Missing user or post ID");
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report");
        }
    };


    
    //  List review
    useEffect(() => {
            if (!userId) return; // wait until userId is available
    
            const loadReviewPost = async () => {
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
                } catch (error) {
                console.error("Error loading profile:", error);
                alert("Failed to load profile");
                }
            };
    
            loadReviewPost();
    }, [userId]);
    // Start map creation
    // Initialize map
    useEffect(() => {
       const timeoutId = setTimeout(() => {
            if (!mapContainer.current) return;  
            // if (!mapContainer.current || mapRef.current) return;
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [78.0421, 27.1751],
                zoom: 16,
                pitch: 0,  
                bearing: 0,
                antialias: true,
            });
            mapRef.current = map; 
            
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                placeholder: "Search location",
            });
            map.addControl(geocoder);
            map.on("load", () => {
                map.addSource("route", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: { type: "LineString", coordinates: [] as [number, number][] },
                    },
                });

                map.addLayer({
                    id: "route-layer",
                    type: "line",
                    source: "route",
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: { "line-color": "#3b9ddd", "line-width": 5 },
                });

                // Walker marker
                const el = document.createElement("div");
                el.style.width = "30px";
                el.style.height = "30px";
                el.style.backgroundImage = "url('https://img.icons8.com/color/48/person-male--v1.png')";
                el.style.backgroundSize = "cover";
                el.style.borderRadius = "50%";
                el.style.border = "2px solid white";

                walkerMarkerRef.current = new mapboxgl.Marker(el).setLngLat([0, 0]).addTo(map);
                loadMap();
            });
        }, 500); // <-- delay (in ms)
        return () => {
            // map.remove(); 
            clearTimeout(timeoutId);
            if (mapRef.current) mapRef.current.remove();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [mapRef.current]); 

    // Map click handler
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const handleClick = async (e: mapboxgl.MapMouseEvent) => {
            if (loopClosed) return alert("Loop already closed.");

            const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];

            if (points.length > 2) {
                const first = points[0];
                const dist = Math.sqrt(Math.pow(first[0] - coords[0], 2) + Math.pow(first[1] - coords[1], 2));
                if (dist < 0.0001) {
                    setLoopClosed(true);
                    alert("Loop closed!");
                    setPoints(prev => {
                        const newPoints = [...prev, coords];
                        updateRoute(newPoints);
                        return newPoints;
                    });
                    return;
                }
            }

            const title = prompt("Enter title for this point:");
            if (!title) return;

            const index = points.length; // assign index for this marker

            const marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat(coords)
                .setPopup(new mapboxgl.Popup().setText(title))
                .addTo(mapRef.current!);

            marker.togglePopup();

            // marker drag updates correct index
            marker.on("dragend", () => {
                const lngLat = marker.getLngLat();
                setPoints(prev => {
                    const updatedPoints = [...prev];
                    updatedPoints[index] = [lngLat.lng, lngLat.lat];
                    updateRoute(updatedPoints);
                    return updatedPoints;
                });
            });

            setMarkers(prev => [...prev, marker]);
            setTitles(prev => [...prev, title]);
            setPoints(prev => {
                const newPoints = [...prev, coords];
                updateRoute(newPoints);
                return newPoints;
            });
        };

            map.on("click", handleClick);

            return () => {
                map.off("click", handleClick);
            };
    }, [points, titles, loopClosed]);

    // Get route using Mapbox Directions API
    const getRoute = async (start: [number, number], end: [number, number]) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const res = await fetch(url);
        const json = await res.json();
        return json.routes?.[0]?.geometry.coordinates || null;
    };

    const updateRoute = async (pts: [number, number][]) => {
        const map = mapRef.current;
        if (!map) return;
        if (pts.length < 2) {
            const source = map.getSource("route") as mapboxgl.GeoJSONSource;
            if (source) {
                source.setData({
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: [],
                    },
                });
            }
            return;
        }
        let fullRoute: [number, number][] = [];

        for (let i = 0; i < pts.length - 1; i++) {
            const route = await getRoute(pts[i], pts[i + 1]);
            if (!route) return;
            if (i > 0) route.shift();
            fullRoute = fullRoute.concat(route);
        }

        if (loopClosed && pts.length > 2) {
            const closeRoute = await getRoute(pts[pts.length - 1], pts[0]);
            if (closeRoute) {
                closeRoute.shift();
                fullRoute = fullRoute.concat(closeRoute);
            }
        }

        walkerMarkerRef.current?.setLngLat(fullRoute[0]);
        const source = map.getSource("route") as mapboxgl.GeoJSONSource;
        if (source) {
            source.setData({
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: fullRoute,
                },
            });
        }
        animateAlongPath(fullRoute);
    };

    const animateAlongPath = (coords: [number, number][]) => {
        if (!walkerMarkerRef.current) return;

        let i = 0;

        const step = () => {
            if (i >= coords.length - 1) return;
            const start = coords[i];
            const end = coords[i + 1];
            let progress = 0;
            const duration = 200;
            const startTime = performance.now();

            const animate = (t: number) => {
                progress = Math.min((t - startTime) / duration, 1);
                const lng = start[0] + (end[0] - start[0]) * progress;
                const lat = start[1] + (end[1] - start[1]) * progress;
                walkerMarkerRef.current?.setLngLat([lng, lat]);

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    i++;
                    animationRef.current = requestAnimationFrame(step);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        };

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(step);
    };

    const clearMap = () => {
        markers.forEach((m) => m.remove());
        setMarkers([]);
        setPoints([]);
        setTitles([]);
        setLoopClosed(false);
        walkerMarkerRef.current?.setLngLat([0, 0]);
        mapRef.current?.getSource("route")?.setData({
            type: "Feature",
            geometry: { type: "LineString", coordinates: [] },
        });
    };

    const toggle3D = () => {
        const map = mapRef.current;
        if (!map) return;
        const pitch = map.getPitch();
        map.easeTo({ pitch: pitch === 0 ? 60 : 0, bearing: pitch === 0 ? 20 : 0 });
    };


    const loadMap = async () => {
        //alert('load'); 
        const res = await fetch("/Trails/Load");
        if (!res.ok) return console.warn("Map not found.");
        const data = await res.json();

        clearMap();
        const bounds = new mapboxgl.LngLatBounds();
        const newPoints: [number, number][] = [];
        const newMarkers: mapboxgl.Marker[] = [];
        const newTitles: string[] = [];

        data.points.data.forEach((p: any, idx: number) => {
            const coords: [number, number] = [p.longitude, p.latitude];
            const marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat(coords)
                .setPopup(new mapboxgl.Popup().setText(p.title))
                .addTo(mapRef.current!);
            marker.togglePopup();

            // use index binding
            marker.on("dragend", () => {
                const lngLat = marker.getLngLat();
                setPoints(prev => {
                    const updatedPoints = [...prev];
                    updatedPoints[idx] = [lngLat.lng, lngLat.lat];
                    updateRoute(updatedPoints);
                    return updatedPoints;
                });
            });

            newPoints.push(coords);
            newMarkers.push(marker);
            newTitles.push(p.title);
            bounds.extend(coords);
        });

        setPoints(newPoints);
        setMarkers(newMarkers);
        setTitles(newTitles);

        if (newPoints.length > 2) {
            const first = newPoints[0],
                last = newPoints[newPoints.length - 1];
            const dist = Math.sqrt(Math.pow(first[0] - last[0], 2) + Math.pow(first[1] - last[1], 2));
            setLoopClosed(dist < 0.0001);
        }

        if (!bounds.isEmpty()) mapRef.current!.fitBounds(bounds, { padding: 50, maxZoom: 17 });

        updateRoute(newPoints);
    };
 
  // End map creation
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
        // {
        //     label: "Text",
        //     icon: <IconChat />,
        //     action: () => {
        //     setShareIsOpen(false);
        //     // setShowTextModal(true);
        //     },
        // }
    
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
    
    

    // useEffect(() => {
    //     const storeLocal = localStorage.getItem("email");
    //     if (storeLocal) {
    //         setLoginId(storeLocal);
    //     }
    // }, []);
    // useEffect(() => {
    // if (statePostId) localStorage.setItem("postId", statePostId);
    //     setPostId(statePostId);
    // }, [statePostId])
    // console.log('ss',statePostId)

    // image arraw move
    const handleNextImage = useCallback(() => {
        setCurrentIndex(i => (i + 1) % getImagesArray.length);
    }, [getImagesArray.length]);

    // useEffect(() => {
    //         const storedId = localStorage.getItem("id");
    //         //  console.log("Stored IDss:", storedId); // should print the ID string
    //         if (storedId) {
    //             setUserId(storedId.trim());
    //         }  
    // }, []);



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
    // Submit report API call
    //commentreportanissue
        const handleSubmitReport = async (getBlockedUserId:any,getBlockedId:any) => {
             console.log('comment',getBlockedId); 
             
             const reason = reasonValue[getBlockedUserId];
            if (!getBlockPostId || !getBlockedUserId || !userId) {
                alert("Please select all required IDs!");
            return;
            }
            
        //    if (!reasonvalue.trim()) {
        //     setBlocekedTextValidation("This field is required!");
        //     return;
        //     }

            try {
            const response = await axios.post(`${BASE_URL}/user/commentreportanissue`, {
                // CommentId:2,
                // issueRaisedBy:'360ccff6-2f3b-4f27-9d06-692ca03657c3',
                // UserId:'9458d7d7-9268-457c-b27a-3011976bb2e4',
                CommentId: getBlockedId,
                issueRaisedBy: userId,
                UserId: getBlockedUserId,
                Remark:reason ?? '',
                isBlocked:getCheckblock
                // PostId: 2,
                // issueRaisedBy: '360ccff6-2f3b-4f27-9d06-692ca03657c3',
                // UserId: '9458d7d7-9268-457c-b27a-3011976bb2e4',
                // CommentId: 2,
                // issueRaisedBy: userId,
                // UserId: getBlockedUserId,
                // BlockedReason: "This is test"
                // Remark: reason,
                // isBlocked:true
                // BlockedReason: reason
            });
        // alert("Report submitted successfully!");
            console.log('blocked',response.data);
            if(response.data.status=== "success"){
                setBlockCommentMessage('User blocked.');
            }else{
                setBlockCommentMessage('Error submitting report.');
            }
            // setComments(response.data)
            } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report");
            }
        };
        // blocked user mess hide
        // useEffect(() => {
        //     if (message) {
        //         const timer = setTimeout(() => {
        //         setMessage(null); 
        //         }, 3000); 

        //         return () => clearTimeout(timer);
        //     }
        // }, [message]);
        // Show comment
        const handleShowMore = () => {
            setVisibleCount((prev) => prev + 5); // Show 5 more each time
        };
        
        // Show review 
        const handleShowReviewMore = () => {
            setReviewVisibleCount((prev) => prev + 2); // Show 2 more each time
        };
        
        //  console.log('PostId',postId);
        //  console.log('UserId',userId)
        //  console.log('loginId',loginId)
    
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
                    // console.log("Comment posted:", response.data);
                    if (response.data.status === "success") {
                        // console.log("Comment resposn posted:", response.data);
                        setCommentMessage('Comment added.');
                        const newComment = response.data.comment_text;
                        // setComments((prev) => [...prev, newComment]);
                        // Clear input
                        setInputTextValue("");
                    } else {
                        console.warn("Failed to post comment:", response.data);
                    }
            } catch (error) {
                console.error("Error posting comment:", error);
            }
        };  
        console.log(slug);
    //  call api all single page data  
        // const fetchData= async (title:String) => {
        useEffect(() => {
            if (!loginId || !slug) {
                return;
            }
            const fetchPostDetail = async (slug:any) => {
                try {
                const response = await axios.post(
                    `${BASE_URL}/user/community/${slug}`,
                    {
                    LoginId: loginId,
                    // LoginId: "1113virendra@gmail.com",
                    slug: slug,
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    }
                );
     
                console.log('community/1',response.data);
                setProfileCommunity(response.data?.data?.profile_Community || []);
                const followingBy = response.data?.data?.following_by;
                const images = response.data?.data?.following_by.images || [];
                // console.log('images from API:', images);
                setImagesArray(images);
                setFollowingBy(followingBy || []);
                setComments(response.data.data.following_by.comments);
                let postDats = [];

                if (Array.isArray(followingBy)) {
                followingBy.forEach(item => {
                    if (!item) return;

                    if (Array.isArray(item.comments)) {
                    item.comments.forEach(c => c?.postDto && postDats.push(c.postDto));
                    } else if (item.comments?.postDto) {
                    postDats.push(item.comments.postDto);
                    } else if (item.postDto) {
                    postDats.push(item.postDto);
                    }
                });
                } else if (followingBy && typeof followingBy === "object") {
                    if (Array.isArray(followingBy.comments)) {
                        postDats = followingBy.comments.map(c => c?.postDto).filter(Boolean);
                    } else if (followingBy.comments?.postDto) {
                        postDats = [followingBy.comments.postDto];
                    } else if (followingBy.postDto) {
                        postDats = [followingBy.postDto];
                    }       
                }
                // console.log("postDats", postDats);
                setPostdata(postDats);

                } catch (error) {
                console.error("Error fetching community data", error);
                } finally {
                setCommunityLoading(false);
                }
            };

            fetchPostDetail(slug);
        }, [loginId,slug]); 


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
                                <p className="trail-dt-address text-grey mb-0">{getfollowingBy?.address ?? 'N/A'}<span className="tdt-add"> | <i className="bi bi-star-fill"></i> {getfollowingBy?.rating ? (Math.round(getfollowingBy.rating * 100) / 100).toFixed(2) : "0.00" } Moderate </span> <span className="tdt-separator">|</span> {getfollowingBy?.date??''}<span className="t-dt-r-and-o"></span></p>
                                
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
                                    
                                    {/* <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {options.map((opt, idx) => (
                                            <li
                                            key={idx}
                                            style={{
                                                padding: "15px",
                                                borderBottom: "1px solid #eee",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between", // <- push SVG to right
                                                
                                            }}
                                            onClick={opt.action}
                                            >
                                            <span>{opt.label}</span>
                                            
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                d="M6 4L14 10L6 16"
                                                stroke="#05073D"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                />
                                            </svg>
                                            </li>
                                        ))}
                                        </ul> */}


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
                                                // onChange={(e) => {
                                                //  const value = e.target.value.trim(); 
                                                //     setCheckedUsers((prev) => ({
                                                //         ...prev,
                                                //         [getBlockedUserId]: value, // only this user
                                                //         }));    
                                                // }}
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
                                                        // onChange={(e) => {
                                                        //     handleBlocked(getBlockPostId, getBlockedUserId, reasonvalue,); // your API call or logic
                                                        //     setCheckedUsers((prev) => ({
                                                        //     ...prev,
                                                        //     [getBlockedUserId]: e.target.checked, // only this user
                                                        //     }));    
                                                        // }}
                                                    />

                                                        {/* <input type="checkbox" 
                                                        onClick={() => handleBlocked(getBlockPostId,getBlockedUserId,reasonvalue)}

                                                        /> */}
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
                        <div  className="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 order-xl-first order-lg-first order-md-first order-sm-last order-last">
                            
                            <ul className="d-flex trail-dt-nav list-unstyled pt-3" role="tablist">
                                    <li className="active" data-bs-toggle="list"><a href="#overviewData" role="button"
                                            className="active">Overview</a></li>
                                    {/* <li data-bs-toggle="list"><a href="#trailGuide" role="button">Following </a></li> */}
                                    
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
                                    getImagesArray.length > 0 ? (
                                        getImagesArray.map((image: any, index: number) => {
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

                            <div   className="trail-user-favorite-card br-20 bg-almost-white d-flex justify-content-between flex-wrap">

                                <div className="tuf-left-content d-flex align-items-center">
                                    <div className="tusc-cn-1">
                                        <p className="mb-0">Users Favorite </p>
                                    </div>
                                    <div className="tusc-cn-2">
                                        <p className="mb-0 text-midnight-navy">N/A</p>
                                    </div>
                                </div>

                                <div className="tuf-right-content d-flex align-items-center">
                                   
                                    <div className="tusc-cn-1 text-center">
                                        <p className="mb-0">{getfollowingBy?.rating ? (Math.round(getfollowingBy.rating * 100) / 100).toFixed(2) : "0.00" } </p>
                                        <StarRating rating={Number(getfollowingBy?.rating)}/>
                                        {/* <div className="rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                         </div> */}
                                    </div>
                                    <div className="tusc-cn-2 text-center">
                                        
                                        <p className="mb-0 text-midnight-navy"><span className="d-block review-no">31</span>
                                            {/* <span>{getfollowingBy?.total_reviews ?? ''}</span> */}
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
                                        className="like-btn"
                                        style={{
                                            background: "transparent",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                        }}
                                        >
                                        <svg 
                                            width="20" 
                                            height="20" 
                                            viewBox="0 0 20 20" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.32083 3.55228C1.54093 4.54475 1.06838 5.90073 1.06838 7.31638C1.06838 10.4899 3.18627 13.1538 5.42249 15.071C6.52965 16.0202 7.63942 16.7633 8.47356 17.2694C8.89001 17.5221 9.23633 17.7148 9.47719 17.8437C9.52521 17.8694 9.56902 17.8926 9.60833 17.9131C9.64866 17.8909 9.6937 17.8658 9.74322 17.8379C9.98467 17.7017 10.3316 17.499 10.7488 17.2351C11.5842 16.7066 12.6957 15.9365 13.8047 14.9685C16.049 13.0096 18.1624 10.3462 18.1624 7.31638C18.1624 5.90094 17.6899 4.54496 16.91 3.55244C16.1327 2.56318 15.0713 1.95607 13.8722 1.95607C12.2147 1.95607 10.9292 3.03556 10.0949 4.73481L9.61539 5.71147L9.1359 4.73481C8.30155 3.03545 7.01597 1.95607 5.35855 1.95607C4.15962 1.95607 3.09813 2.56307 2.32083 3.55228ZM9.61539 18.5159C9.38365 18.9972 9.38328 18.997 9.38328 18.997L9.38088 18.9959L9.37479 18.9929L9.35294 18.9822C9.33413 18.9729 9.307 18.9594 9.27206 18.9417C9.20214 18.9063 9.10102 18.8541 8.97313 18.7857C8.71741 18.6489 8.35422 18.4467 7.91934 18.1828C7.05075 17.6558 5.89022 16.8793 4.72708 15.8821C2.4227 13.9064 0 10.9706 0 7.31638C0 5.67359 0.545529 4.08235 1.48078 2.89218C2.41859 1.69872 3.76928 0.887695 5.35855 0.887695C7.23013 0.887695 8.65337 1.9365 9.61539 3.41643C10.5774 1.93657 12.0006 0.887695 13.8722 0.887695C15.4616 0.887695 16.8123 1.69886 17.7501 2.89234C18.6853 4.08262 19.2308 5.67386 19.2308 7.31638C19.2308 10.8327 16.8036 13.7691 14.5073 15.7734C13.3459 16.787 12.1872 17.5893 11.3199 18.138C10.8857 18.4126 10.5231 18.6246 10.268 18.7685C10.1404 18.8404 10.0395 18.8954 9.96987 18.9328C9.9351 18.9515 9.90807 18.9657 9.88937 18.9755L9.86773 18.9868L9.8617 18.9899L9.85994 18.9908L9.85935 18.9911C9.85935 18.9911 9.85897 18.9913 9.61539 18.5159ZM9.61539 18.5159L9.85935 18.9911L9.62281 19.1123L9.38328 18.997L9.61539 18.5159Z"
                                            fill={getfollowingBy?.do_like===true  ? "#FC673C" : "#7D7D7D"}
                                            />
                                            
                                        </svg>{getfollowingBy?.like_count?? 0}  {getfollowingBy?.do_like===true ? "Liked" : "Like"}  
                                        
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
                                    {/* <button className="share-btn">
                                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20.4601 7.96745L12.4501 1.32995C12.2278 1.14185 11.9555 1.02254 11.6665 0.986577C11.3775 0.950618 11.0842 0.999567 10.8226 1.12745C10.5648 1.2485 10.3468 1.44044 10.194 1.68083C10.0413 1.92123 9.96015 2.20014 9.96009 2.48495V3.98495C7.04123 5.00521 4.51317 6.91027 2.72794 9.43487C0.942708 11.9595 -0.0108345 14.9779 9.28794e-05 18.0699C-0.000854163 18.8512 0.0618532 19.6313 0.187593 20.4024C0.212056 20.5575 0.284563 20.701 0.394897 20.8127C0.505231 20.9244 0.647828 20.9986 0.802593 21.0249H0.930093C1.06577 21.0246 1.19881 20.9874 1.31504 20.9174C1.43126 20.8474 1.52632 20.7472 1.59009 20.6274C2.44778 19.0138 3.63682 17.5997 5.07928 16.4778C6.52173 15.3559 8.18501 14.5515 9.96009 14.1174V15.7374C9.96015 16.0223 10.0413 16.3012 10.194 16.5416C10.3468 16.782 10.5648 16.9739 10.8226 17.0949C11.029 17.1924 11.2543 17.2436 11.4826 17.2449C11.8375 17.2432 12.1803 17.1156 12.4501 16.8849L16.0951 13.8849L16.1626 13.8324L20.4601 10.2699C20.6273 10.1291 20.7618 9.95349 20.854 9.75527C20.9463 9.55706 20.994 9.34107 20.994 9.12245C20.994 8.90382 20.9463 8.68784 20.854 8.48963C20.7618 8.29141 20.6273 8.11575 20.4601 7.97495V7.96745ZM15.2626 12.6174L15.1951 12.6699L11.4451 15.7449V13.1799C11.4494 13.1602 11.4494 13.1397 11.4451 13.1199C11.4451 13.1199 11.4451 13.0749 11.4451 13.0524C11.4451 13.0299 11.4451 12.9999 11.4076 12.9699C11.3934 12.9237 11.3758 12.8786 11.3551 12.8349C11.3279 12.7887 11.2923 12.748 11.2501 12.7149C11.2263 12.6773 11.1958 12.6442 11.1601 12.6174C11.1208 12.5831 11.0781 12.5529 11.0326 12.5274L10.9201 12.4749H10.7551H10.6801H10.6201H10.5526C6.94145 13.0978 3.70388 15.0747 1.50009 18.0024C1.50308 15.1499 2.41916 12.3733 4.11423 10.079C5.80929 7.7847 8.19431 6.09331 10.9201 5.25245H10.9576C11.0071 5.23451 11.0548 5.21191 11.1001 5.18495C11.1527 5.15668 11.2029 5.12407 11.2501 5.08745L11.3401 4.98245C11.3719 4.94716 11.3973 4.90654 11.4151 4.86245C11.4346 4.82167 11.4497 4.77892 11.4601 4.73495C11.4643 4.68254 11.4643 4.62986 11.4601 4.57745V2.52245L19.5001 9.11495L15.2626 12.6174Z"
                                                fill="#7D7D7D"
                                            />
                                        </svg>
                                        {getfollowingBy?.share_count?? 0}  Share
                                    </button> */}

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
                                                            src='/assets/images/profile/profile-md.png'
                                                            alt="Top Trail" className="user-profile-img" 
                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                const target = e.currentTarget;
                                                                target.onerror = null; // prevent infinite loop
                                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="test-head">
                                                       
                                                        <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">{cmt.name ?? 'N/A'}{cmt.id}<span style={{color:'gray',fontSize:'14px'}} className="d-inline-block mx-1">•  {timeAgo(cmt.createdOn)}</span> </h3>
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

                                    // <div className="text-center mt-3">
                                    // <button className="btn btn-link text-orange" onClick={handleShowMore}>
                                    //     Show Comment more
                                    // </button>
                                    // </div>
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

                        <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
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
                                    {/* <button className="btn-rounded-white rounded-circle" type="button" title="Bookmark">                                        
                                        <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0601 0.25H1.93993C1.63227 0.25 1.33722 0.372216 1.11967 0.589763C0.902124 0.807309 0.779907 1.10237 0.779907 1.41002V14.1703C0.779959 14.2738 0.80771 14.3754 0.860281 14.4646C0.912852 14.5537 0.988327 14.6272 1.07887 14.6774C1.16942 14.7275 1.27174 14.7525 1.37522 14.7498C1.47869 14.7471 1.57955 14.7167 1.66732 14.6618L6.00001 11.9539L10.3334 14.6618C10.4212 14.7165 10.522 14.7467 10.6253 14.7494C10.7287 14.752 10.8309 14.7269 10.9213 14.6768C11.0118 14.6267 11.0871 14.5533 11.1397 14.4642C11.1922 14.3752 11.22 14.2737 11.2201 14.1703V1.41002C11.2201 1.10237 11.0979 0.807309 10.8804 0.589763C10.6628 0.372216 10.3678 0.25 10.0601 0.25ZM10.0601 13.1241L6.30669 10.7787C6.21451 10.721 6.10799 10.6905 5.99929 10.6905C5.89058 10.6905 5.78406 10.721 5.69188 10.7787L1.93993 13.1241V1.41002H10.0601V13.1241Z" fill="#05073D"/>
                                        </svg>
                                    </button>
                                    <button className="btn-rounded-white rounded-circle" type="button" title="Location">
                                        <svg width="15.16" height="18" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.68182 5.21429C8.68182 4.19131 8.29391 3.21023 7.60344 2.48687C6.91296 1.76352 5.97648 1.35714 5 1.35714C4.02352 1.35714 3.08704 1.76352 2.39656 2.48687C1.70609 3.21023 1.31818 4.19131 1.31818 5.21429C1.31818 6.79657 2.52664 8.85886 5 11.3291C7.47336 8.85886 8.68182 6.79657 8.68182 5.21429ZM5 12.5C1.99973 9.64314 0.5 7.214 0.5 5.21429C0.5 3.96398 0.974106 2.76488 1.81802 1.88078C2.66193 0.996682 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.996682 8.18198 1.88078C9.02589 2.76488 9.5 3.96398 9.5 5.21429C9.5 7.214 8.00027 9.64314 5 12.5Z" fill="#05073D"/>
                                        <path d="M5.00004 6.5C5.32554 6.5 5.6377 6.36454 5.86786 6.12342C6.09802 5.8823 6.22732 5.55528 6.22732 5.21428C6.22732 4.87329 6.09802 4.54626 5.86786 4.30515C5.6377 4.06403 5.32554 3.92857 5.00004 3.92857C4.67455 3.92857 4.36239 4.06403 4.13223 4.30515C3.90207 4.54626 3.77277 4.87329 3.77277 5.21428C3.77277 5.55528 3.90207 5.8823 4.13223 6.12342C4.36239 6.36454 4.67455 6.5 5.00004 6.5ZM5.00004 7.35714C4.45756 7.35714 3.93729 7.13138 3.55369 6.72951C3.17009 6.32765 2.95459 5.7826 2.95459 5.21428C2.95459 4.64596 3.17009 4.10092 3.55369 3.69905C3.93729 3.29719 4.45756 3.07143 5.00004 3.07143C5.54253 3.07143 6.0628 3.29719 6.4464 3.69905C6.83 4.10092 7.0455 4.64596 7.0455 5.21428C7.0455 5.7826 6.83 6.32765 6.4464 6.72951C6.0628 7.13138 5.54253 7.35714 5.00004 7.35714Z" fill="#05073D"/>
                                        </svg>
                                    </button> */}
                                </div>
                                {/* <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194474.440444268!2d55.959295174859626!3d25.08154936413991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5a8616e5ca149%3A0x75d4f4005126006a!2sShawkah%20Dam!5e0!3m2!1sen!2sin!4v1749891263519!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> --> */}
                                {/* <img src="/assets/images/trails/map.png" alt="" className="map-img"/> */}
                                    <div
                                            style={{
                                            // position: "absolute",
                                            top: 10,
                                            left: 10,
                                            background: "white",
                                            padding: 10,
                                            borderRadius: 8,
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                                            zIndex: 1,
                                            display: "flex",
                                            gap: "8px",
                                            flexWrap: "wrap",
                                            marginBottom: "25px",
                                            justifyContent:"space-around", 
                                            }}
                                        > 
                                            {/* <button onClick={saveMap}>💾 Save Map</button>
                                            <button onClick={deleteMap}>🗑️ Delete Map</button>
                                            <button onClick={() => window.location.reload()}>🔄 Refresh</button> */}
                                            <button className="btn-style-12" onClick={toggle3D}>3D View</button>
                                            <button  className="btn-style-12" onClick={clearMap}>Clear</button>
                                            {/* <button  className="btn-style-12" onClick={() => (window.location.href = "")}>Trail Details</button>  */}
                                            {/* <button  className="btn-style-12" onClick={() => (window.location.href = "/Trails/Details")}>Trail Details</button>  */}
                                    </div>  
                                <div style={{ height: "100vh", width: "100%", position: "relative" }}>
                                    {/* Map Container */}
                                    
                                    <div
                                        ref={mapContainer} 
                                        style={{ height: "100%", width: "100%",borderRadius: "10px" }}
                                    />  

                                    {/* Buttons Overlay */}
                                     
                                </div>
 

                                {/* <a href="/assets/images/trails/map.png" data-fancybox="mapImg"
                                    className="arrow-btn d-flex align-items-center justify-content-center rounded-circle">
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.15005 13.5003H3.68251C3.30557 13.5003 3 13.1947 3 12.8178L3 10.3503M3.52497 12.9754L7.20003 9.30033M13.5 6.15005V3.68251C13.5 3.30557 13.1944 3 12.8175 3L10.35 3M12.975 3.52503L9.29993 7.20009"
                                            stroke="#717171" strokeLinecap="round" />
                                    </svg>
                                </a> */}
                            </div>
                                {/* <div className="trail-sidebar-widget bg-almost-white br-20">
                                    <h3 className="text-midnight-navy">What this place offers</h3>
                                    <ul className="trail-side-nav list-unstyled mt-0">
                                        <li><a href=""><img src="/assets/images/icons/scamble.svg" alt=""/> Scramble </a></li>
                                        <li><a href=""><img src="/assets/images/icons/off-trail.svg" alt=""/> Off-trail
                                                (bushwhack) </a></li>
                                        <li><a href=""><img src="/assets/images/icons/lakes.svg" alt=""/> Lakes </a></li>
                                        <li><a href=""><img src="/assets/images/icons/views.svg" alt=""/> Views </a></li>
                                        <li><a href=""><img src="/assets/images/icons/hiking.svg" alt=""/> Hiking </a></li>
                                        <li><a href=""><img src="/assets/images/icons/walking.svg" alt=""/> Walking </a></li>
                                    </ul> 
                                    <div className="d-flex flex-wrap align-items-center">
                                        <a href="" className="btn-style-3">Get Directions</a>
                                        <a href="" className="btn-style-1">Hit the Trail</a>
                                    </div>
                                </div> */}
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
                                <h3 style={{ marginTop:'34px'}}>Add Your Review</h3>
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
                                Submit
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
                                    
                                     {isLoggedIn &&(
                                    <a href="#" style={{background:'#FC673C',border:'none',borderRadius:'50px',padding:'10px'}} className="btn btn-sm btn-primary ms-2"  
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsReviewOpen(true);
                                        }}  
                                    >Add Review</a> 
                                )}
                                </div>
                            </div>

                        </div>
                        {
                            showReviews &&(
                            <div className="row review-row g-3">
                                {message && <div style={{color:'#FC673C' , textAlign:'left',margin:'0px'}}>{message}</div>}
                                {reviewDetails.length > 0 ? (
                                    <>
                                        {reviewDetails.slice(0, reviewVisibleCount).map((rev:any,index:number) => (
                                        // reviewDetails.map((rev:any,index:number)=>(
                                            <div key={index} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div className="testimonial-single position-relative">
                                                    <div className="testimonial-head d-flex w-100 align-items-center position-relative">
                                                        <div className="test-image">
                                                            <img
                                                                src={rev.userImage || '/assets/images/other/testimonial-1.png'}
                                                                alt="Top Trail" className="img-fluid" 
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/other/testimonial-1.png'; // fallback image
                                                                }}
                                                            />
                                                            {/* <img src="/assets/images/other/testimonial-1.png" alt="" className="img-fluid"/> */}
                                                        </div>
                                                        <div className="test-head">
                                                            <h3 className="reviewer-name fw-normal text-midnight-navy mb-0">{rev.userWithAddress ?? ''} </h3>
                                                                <StarRating rating={Number(rev?.rating)}/>
                                                            {/* <div className="rating">
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                            </div> */}
                                                            <p className="mb-0">{rev.ratingOn ?? ''} <span className="d-inline-block mx-1">•</span>
                                                            {rev.category ?? 'N/A'} </p>
                                                        </div>
                                                        {/* <div className="right-abs">
                                                            <i className="bi bi-three-dots"></i>
                                                        </div> */}
                                                    </div>
                                                    <div className="testimonial-body">
                                                        <p className="text-midnight-navy">{rev.decription ?? 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {reviewVisibleCount < reviewDetails.length && (
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
                        </div>
                            )
                        }
                        
                        <div className="row">
                            <div className="col-12 mb-4 text-center">
                            <button
                                className="btn-style-1"
                                onClick={() => setShowReviews(!showReviews)}
                            >
                                {showReviews ? "Hide Reviews" : "Check All Reviews"}
                            </button>
                            </div>
                        </div>
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

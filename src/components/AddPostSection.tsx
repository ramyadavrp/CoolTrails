// src/components/ProfileEditSection.tsx
import React, { useState, useEffect,useRef,useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Trash2, Upload } from "lucide-react";
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import {getAuth} from '../utils/storage';
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiMTExMnZpcmVuZHJhIiwiYSI6ImNtYmE0emNyNjBwbHMyanNibHBpZHgxMjUifQ.5FSp2VZ1T1kXcGV38bC5jA";

declare const Masonry: any;
const BASE_URL = import.meta.env.VITE_API_URL;


interface Point {
  title: string;
  latitude: number; 
  longitude: number;
  pointOrder: number;
}

interface FavoriteActivity {
  title: string;
}

interface ProfileData {
    postTitle: string;
    UserId: string;
    Content: string;
    CategoryId: string;
    CountryId: string;
    StateId: string;
    CityId: string;
    TrailLevel: string;
    TrailType: string;
    favorite_activities: FavoriteActivity[];
    showStateCity:boolean;
    points: Point[];
}
interface Categorylist{
    id:string,
    name:string
}
interface CountryList{
    id:string,
    name:string
}
interface StateList{
    id:string,
    name:string
}
interface CityList{
    id:string,
    name:string
}
interface ImagePreview {
  file: File;
  preview: string;
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
const AddPostSection: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFileName] = useState<File|null>(null);
    const [preview, setPreview] = useState<string|null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [imgMessage, setImgMessage] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loadingFeed,setLoadingFeed] = useState(true);
    const [errorsFeed,setErrorsFeed] = useState('');
    const[getCategoryList,setCategoryList] = useState<Categorylist[]>([]);
    const[getCountryList,setCountryList] = useState<CountryList[]>([]);
    const[getCountryId,setCountryId] = useState<CountryList[]>([]);
    const[getStateList,setStateList] = useState<StateList[]>([]);
    const[getCityList,setCityList] = useState<CityList[]>([]);
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [getActivity, setActivity] = useState<Activity[]>([]);
    
    const [profileData, setProfileData] = useState<ProfileData>({
        postTitle: "",
        UserId: "",
        Content: "",
        CategoryId: "",
        CountryId: "",
        StateId: "",
        CityId: "",
        TrailLevel: "",
        TrailType: "",
        favorite_activities: [],
        showStateCity: true,
        points:[],
    });
     const [loadingMap,setLoadingMap] = useState(true);
     // map state
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const walkerMarkerRef = useRef<mapboxgl.Marker | null>(null);
    const animationRef = useRef<number | null>(null);
    // const mapRef = useRef<mapboxgl.Map | null>(null);
    const [points, setPoints] = useState<[number, number][]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [loopClosed, setLoopClosed] = useState(false);
        // map state close
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptValue, setPromptValue] = useState("");
    const [promptCallback, setPromptCallback] = useState<((value: string | null) => void) | null>(null);
    
    useEffect(() => {
        const { userId, token ,login,email} = getAuth();
            if (userId) setUserId(userId);
            // if (token) setToken(token);
            // if (login) setLoginIdBased(login);
            // if (email) setLoginId(email);
    }, []);
    // Function you will call instead of prompt()
    const openCustomPrompt = (callback: (value: string | null) => void) => {
        setPromptCallback(() => callback);
        setPromptValue("");
        setShowPrompt(true);
    };

    // close popup
    const closePrompt = (value: string | null) => {
        setShowPrompt(false);
        if (promptCallback) promptCallback(value);
    };
    // Map
    // Start map creation 
    // Initialize map
    

    useLayoutEffect(() => {
  if (!mapContainer.current) return;

  const map = new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [78.0421, 27.1751],
    zoom: 16,
    attributionControl:false,
  });

  mapRef.current = map;

  return () => map.remove();
}, [mapContainer.current]);

    // console.log('mapContainer.current',mapContainer.current);
  // Map click handler
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
    
        const handleClick = (e: mapboxgl.MapMouseEvent) => {
        if (loopClosed) return alert("Loop already closed.");

        const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];

        // Loop detection
        if (points.length > 2) {
            const first = points[0];
            const dist =
            Math.sqrt(Math.pow(first[0] - coords[0], 2) + Math.pow(first[1] - coords[1], 2));
            if (dist < 0.0001) {
            setLoopClosed(true);
            alert("Loop closed!");
            setPoints((prev) => {
                const newPoints = [...prev, coords];
                updateRoute(newPoints);
                // handleAddMapPoints(newPoints);
                return newPoints;
            });
            return;
            }
        }

        // Prompt for title
        openCustomPrompt((title) => {
            if (!title) return;
            // alert('hh');
            const index = points.length;

            const marker = new mapboxgl.Marker({ draggable: true })
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup().setText(title))
            .addTo(mapRef.current!);

            marker.togglePopup();

            // Drag update
            marker.on("dragend", () => {
            const lngLat = marker.getLngLat();
            setPoints((prev) => {
                const updatedPoints = [...prev];
                updatedPoints[index] = [lngLat.lng, lngLat.lat];
                updateRoute(updatedPoints);
                // handleAddMapPoints(updatedPoints); // 30-12-25
                return updatedPoints;
            });
            });

            // Update state
            setPoints((prev) => {
            const newPoints = [...prev, coords];
            setTitles((prevTitles) => [...prevTitles, title]);
            setMarkers((prevMarkers) => [...prevMarkers, marker]);

            updateRoute(newPoints);

            // API call
            handleAddMapPoints(newPoints);

            return newPoints;
            });
        });
        };

        map.on("click", handleClick);
        return () => {
        map.off("click", handleClick);
        };
        // return () => map.off("click", handleClick);
    }, [points, loopClosed]); 

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
        // alert('load'); 
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
    const handleAddMapPoints = (pointsArray: [number, number][]) => {
        console.log("pointsWithCoords", pointsArray);  
        setProfileData(prev => ({
            ...prev,
            points: [
            ...prev.points,
            ...pointsArray.map((coords, index) => ({
                title: `Point ${prev.points.length + index + 1}`,
                latitude: coords[1],
                longitude: coords[0],
                pointOrder: prev.points.length + index + 1
            }))
            ]
        }));
    };
 

    // API call
//   const handleAddMapPoints = async (pointsWithCoords: [number, number][]) => {
//     console.log("pointsWithCoords", pointsWithCoords);

//     const payload = {
//       UserId: "20c8a597-25b7-414d-8b9c-c9575f40b9fc",
//       feedId: 1,
//       points: pointsWithCoords.map((p) => ({
//         Latitude: p[1].toString(),
//         Longitude: p[0].toString(),
//       })),
//     };

//     console.log("Payload to send:", payload);

//     try {
//       const res = await axios.post(`${BASE_URL}/feed/addmap`, payload);
//       console.log("API response:", res.data);
//       if (res.data.success) alert("Points saved successfully!");
//     } catch (err) {
//       console.error("API error:", err);
//       alert("Failed to save points.");
//     }
//   };



    

    // useEffect(() => {
    //         // const storedId = localStorage.getItem("id");
    //         const storedId = sessionStorage.getItem("id");
    //         if (storedId) {
    //             // setUserId(storedId); 
    //             setUserId(storedId.trim());
    //         }  
    //     }, []);
    
    //Multiple image upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
            console.log(fileArray);
        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
            setImages((prev) => [...prev, { file, preview: reader.result as string }]);
            };
            reader.readAsDataURL(file);
        });

        setImgMessage("Image(s) uploaded successfully!");
        e.target.value = ""; // reset input to allow same file re-upload
    };
    
    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;
           console.log('add',profileData);
            // console.log('add',value);
        setProfileData((prev) => {
            let updatedData = { ...prev, [name]: value };

            // When Country changes → reset State and City
            if (name === "CountryId") {
            updatedData.StateId = "";
            updatedData.CityId = "";
            // Check if country is India (adjust value as per your data)
            updatedData.showStateCity = value === "kUmC3E3SjKUnOrfnRDZcGg==" || value === "India";
            }

            // When State changes → reset City
            if (name === "StateId") {
            updatedData.CityId = "";
            }

            return updatedData;
        });
    }; 

    const handleActivityToggle = (activity: string) => {
        setProfileData((prev) => {
            const exists = prev.favorite_activities.some((a) => a.title === activity);
            const updatedActivities = exists
            ? prev.favorite_activities.filter((a) => a.title !== activity)
            : [...prev.favorite_activities, { title: activity }];

            return { ...prev, favorite_activities: updatedActivities };
        });
    };
    const handleProfileUpdate = async () => {
        if (!userId) {
            setMessage('User ID not loaded yet!');
            return;
        }

        const formData = new FormData();
        formData.append("UserId", userId);
        formData.append("Title", profileData.postTitle);
        formData.append("Content", profileData.Content);
        formData.append("CategoryId", profileData.CategoryId);
        formData.append("CountryId", profileData.CountryId);
        formData.append("StateId", profileData.StateId);
        formData.append("CityId", profileData.CityId);
        formData.append("TrailType", profileData.TrailType);
        formData.append("TrailLevel", profileData.TrailLevel);
        formData.append("points", JSON.stringify(profileData.points));
        formData.append("UserFavorite", JSON.stringify(profileData.favorite_activities));
        // if (file) formData.append("MediaFiles", file);
         // Add all selected images
        if (images.length > 0) {
            images.forEach((imgObj, index) => {
            formData.append("MediaFiles", imgObj.file);
            });
        }
        

        console.log(formData);
        try {
            const response = await axios.post(`${BASE_URL}/feed/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log('add feed',response.data);
            if (response.data.status === "success") {
                setMessage('Feed added successfully!');
                // Reset form fields completely
                setProfileData({
                    postTitle: "",
                    UserId: userId,
                    Content: "",
                    CategoryId: "",
                    CountryId: "",
                    StateId: "",
                    CityId: "",
                    TrailType: "",
                    TrailLevel: "",
                    favorite_activities: [],
                    showStateCity: true,
                    points: [],   
                });
            } else {
                //alert(response.data.message || "Unexpected response from server");
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
            // Flatten array of messages into single string per field
            const formattedErrors: { [key: string]: string } = {};
            for (const key in error.response.data.errors) {
                formattedErrors[key] = error.response.data.errors[key].join(", ");
            }
            setErrors(formattedErrors);
            }
            console.error("Update failed:", error.response?.data || error);
            //alert("Failed to update feed. Check console for details.");
        }
    };

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/home/topcategory/10`);
                setActivity(response.data.data);
                //  console.log('topcategory',response.data.data);
            } catch (error) {
                console.error('API Error:', error);
                // setErrorLocatTrails('Unable to fetch top local trails');
            } finally {
                // setloadingExplore(false);
            }
        }
        fetchActivity();
    }, []);
   

    useEffect(() => {
        const categoryList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/categorylist`);
                //  console.log(response.data.data);
                setCategoryList(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to fetch Category');
            } finally{
                setLoadingFeed(false);
            }
        };
        categoryList();
    }, []);

    useEffect(() => {
        const countryList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/countrylist`);
                console.log(response.data.data);
                setCountryList(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to fetch Country');
            } finally{
                setLoadingFeed(false);
            }
        };
        countryList();
    }, []);

    useEffect(() => {
        // console.log('countryId',profileData.CountryId);
        if (!profileData.CountryId) return;
        const stateList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/statelistbycountry/${profileData.CountryId}`);
                console.log('state',response.data.data);
                setStateList(response.data.data);
                // setPrak(response.data.data.parks);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to State');
            } finally{
                setLoadingFeed(false);
            }
        };
        stateList();
    }, [profileData.CountryId]);

    useEffect(() => {
        // console.log('StateId',profileData.StateId);
        if (!profileData.StateId) return;
        const cityList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/citylistbystate/${profileData.StateId}`);
                // console.log('state',response.data.data);
                setCityList(response.data.data);
                 console.log('CITY',response.data.data);
                // setPrak(response.data.data.parks);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to State');
            } finally{
                setLoadingFeed(false);
            }
        };
        cityList();
    }, [profileData.StateId]);
   
   
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
            setMessage(null); 
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [message]);
    useEffect(() => {
        if (imgMessage) {
            const timer = setTimeout(() => {
            setImgMessage(null); 
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [imgMessage]);

    useEffect(() => {
        // Initialize Masonry after the component mounts
        const grid = document.querySelector('.edit-profile-row');
        if (grid && typeof Masonry !== 'undefined') {
        new Masonry(grid, {
            itemSelector: '.grid-item', // Adjust if your grid items have different classes
            percentPosition: true
        });
        }
    }, []);
   
    if (loadingFeed) {
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
    if (errorsFeed) return <p>{errorsFeed}</p>;
    if (getCategoryList.length === 0) return <p>NO Category found.</p>;
    if (getCountryList.length === 0) return <p>NO Country found.</p>;
    
    

  return (
    <main className="mainContent">
        <section className="section-profile-feed position-relative default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title">
                            <h2 className="title title-sm">Add Post</h2>
                            {message && <div style={{color:'#FC673C' , textAlign:'center'}}>{message}</div>}
                        </div>
                    </div>
                </div> 
                <div className="row g-4 edit-profile-row" data-masonry='{"percentPosition": true }'>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                                {images.slice(0, 4).map((img, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                    src={img.preview}
                                    alt={`preview-${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                                    />
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer",
                                    }}
                                    >
                                    &times;
                                    </button>
                                </div>
                                ))} 
                                
                                <div className="upload-btn-wrapper" style={{display: "flex",alignItems: "center", gap: "100px"}}>
                                    {/* <label htmlFor="imageInput"
                                    style={{background: "#FC673C", border: "none",borderRadius: "50px", padding: "10px", width:'100px'}}
                                        className="btn btn-sm btn-primary ms-2"
                                    >Add Images</label>
                                    <input id="imageInput" type="file" accept="image/*" multiple
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    /> */}
                                    {/* <label htmlFor="thumbnail" style={{ minWidth: "150px" }}>Thumbnail Image</label> */}
                                    <input type="file"  multiple ref={fileInputRef} onChange={handleFileChange} /> 
                                </div>
                                <div>
                                     {imgMessage && <div style={{color:'#FC673C' , fontSize: "11px",textAlign:'center'}}>{imgMessage}</div>}
                                </div>
                                        {/* <div>    
                                            <button type="button" className="btn"  onClick={() => fileInputRef.current?.click()} >
                                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8.5L19 8.5C21.2091 8.5 23 10.2909 23 12.5L23 17.5C23 19.7091 21.2091 21.5 19 21.5L7 21.5C4.79086 21.5 3 19.7091 3 17.5L3 12.5C3 10.2909 4.79086 8.5 7 8.5L9 8.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 5.5L13.7071 3.20711C13.3166 2.81658 12.6834 2.81658 12.2929 3.20711L10 5.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 3.5L13 15.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                                Upload photo</button>
                                               
                                            <input type="file"  multiple ref={fileInputRef} onChange={handleFileChange} />
                                            {imgMessage && <div style={{color:'#FC673C' , fontSize: "11px",textAlign:'center'}}>{imgMessage}</div>}
                                        </div> */}
                                    {images.length > 4 && (
                                        <div
                                        style={{
                                            // width: "100px",
                                            // height: "100px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "5px",
                                            background: "#eee",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            color:"#FC673C",
                                            padding:"5px",
                                        }}
                                        >
                                        +{images.length - 4} more
                                        </div>
                                    )}
                            </div>
                            </>
                            
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Post information</h2>
                            <div className="profile-inner-form">
                                <div className="form-floating mb-3">
                                    <input type="email" className={`form-control ${errors.Title ? "is-invalid" : ""}`} name="postTitle" id="postTitle" placeholder=""
                                        value={profileData.postTitle}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="postTitle">Title</label>
                                    {errors.Title && <div  style={{color:'#FC673C'}} className="invalid-feedback">{errors.Title}</div>}
                                </div>
                                <div className="form-floating mb-3">
                                    
                                    <textarea
                                        className={`form-control ${errors.Title ? "is-invalid" : ""}`}
                                        name="Content"
                                        id="description"
                                        rows={4}
                                        placeholder="Enter about yourself"
                                        value={profileData.Content}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="description">Description</label>
                                    {errors.Content && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.Content}</div>}
                                </div>
                                {/* <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="phone_no" id="phone" placeholder=""
                                         value={profileData.phone_no}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>  */}
                                {/* <div className="mb-3">
                                    <div className="input-group flex-nowrap custom-form-group">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <svg width="13" height="16" viewBox="0 0 10 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.68182 5.21429C8.68182 4.19131 8.29391 3.21023 7.60344 2.48687C6.91296 1.76352 5.97648 1.35714 5 1.35714C4.02352 1.35714 3.08704 1.76352 2.39656 2.48687C1.70609 3.21023 1.31818 4.19131 1.31818 5.21429C1.31818 6.79657 2.52664 8.85886 5 11.3291C7.47336 8.85886 8.68182 6.79657 8.68182 5.21429ZM5 12.5C1.99973 9.64314 0.5 7.214 0.5 5.21429C0.5 3.96398 0.974106 2.76488 1.81802 1.88078C2.66193 0.996682 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.996682 8.18198 1.88078C9.02589 2.76488 9.5 3.96398 9.5 5.21429C9.5 7.214 8.00027 9.64314 5 12.5Z"
                                                    fill="#05073D" />
                                                <path
                                                    d="M5.00004 6.5C5.32554 6.5 5.6377 6.36454 5.86786 6.12342C6.09802 5.8823 6.22732 5.55528 6.22732 5.21428C6.22732 4.87329 6.09802 4.54626 5.86786 4.30515C5.6377 4.06403 5.32554 3.92857 5.00004 3.92857C4.67455 3.92857 4.36239 4.06403 4.13223 4.30515C3.90207 4.54626 3.77277 4.87329 3.77277 5.21428C3.77277 5.55528 3.90207 5.8823 4.13223 6.12342C4.36239 6.36454 4.67455 6.5 5.00004 6.5ZM5.00004 7.35714C4.45756 7.35714 3.93729 7.13138 3.55369 6.72951C3.17009 6.32765 2.95459 5.7826 2.95459 5.21428C2.95459 4.64596 3.17009 4.10092 3.55369 3.69905C3.93729 3.29719 4.45756 3.07143 5.00004 3.07143C5.54253 3.07143 6.0628 3.29719 6.4464 3.69905C6.83 4.10092 7.0455 4.64596 7.0455 5.21428C7.0455 5.7826 6.83 6.32765 6.4464 6.72951C6.0628 7.13138 5.54253 7.35714 5.00004 7.35714Z"
                                                    fill="#05073D" />
                                            </svg>
                                        </span>
                                        <input type="text" className="form-control" name="member_location" placeholder="Location"
                                        value={profileData.member_location}
                                        onChange={handleInputChange}
                                            aria-label="Username" aria-describedby="addon-wrapping" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div> 
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item"> 
                        <div className="bg-almost-white br-20 profile-card-2 fav-acivities-card">
                            <h2 className="profile-card-title text-midnight-navy">Favorite activities</h2>
                            <div className="bg-almost-white d-flex flex-wrap fav-activity-list position-relative">
                                {
                                    getActivity.map((act: any, index: number) => {
                                    const isSelected = profileData.favorite_activities.some(
                                        (a) => a.title === act.title
                                    );

                                        return (
                                        
                                            <div key={index} className={`fav-activity-single ${isSelected ? "active" : ""}`}
                                                onClick={() => handleActivityToggle(act.title)}
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: isSelected ? "#05073D" : "#f8f9fa",
                                                    color: isSelected ? "#fff" : "#333", padding: "8px 12px",
                                                    borderRadius: "60px", margin: "5px",display: "flex",alignItems: "center", transition: "all 0.2s ease",
                                                }}
                                                >
                                                    {/* <img src="assets/images/icons/check-white.svg" alt="" /> */}
                                                <img  src="assets/images/icons/check-white.svg" alt=""
                                                    style={{ 
                                                        width: "16px", height: "16px", marginRight: "6px",visibility: isSelected ? "visible" : "hidden",
                                                    }}
                                                />
                                                {act.title}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {/* <div ref={mapContainer}
                        style={{width: "100%", height: "100%",borderRadius: "10px",
                            }}/></div> */}
                                   
                    
                        </div>
                         
                        
                        
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            {/* <h2 className="profile-card-title text-midnight-navy">Calorie counter info</h2> */}
                            <div className="profile-inner-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="CategoryId" id="category" 
                                                 value={profileData.CategoryId}
                                                onChange={handleInputChange} 
                                            >   <option>All Category</option>
                                                {   
                                                    getCategoryList.map((cat:any, index:number)=>(
                                                        <option key={index} value={cat.id}>{cat.name}</option>
                                                    ))
                                                }
                                                 
                                            </select>
                                            <label htmlFor="category">Category</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select
                                                name="CountryId"
                                                className="form-control"
                                                value={profileData.CountryId}
                                                onChange={handleInputChange}
                                                >
                                                <option value="">Select Country</option>
                                                {getCountryList.map((c) => (
                                                    <option key={c.id} value={c.id}>
                                                    {c.name} 
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <select className="form-select" name="CountryId" id="CountryId"
                                                value={profileData.CountryId}
                                                onChange={handleInputChange}
                                            >   <option>All Country</option>
                                                {
                                                    getCountryList.map((country:any, index:number)=>(
                                                        <option key={index} value={country.id}>{country.name}</option>
                                                    ))
                                                }
                                                
                                            </select> */}
                                            <label htmlFor="CountryId">Country</label>
                                        </div>
                                    </div>
                                    
                                    {
                                        profileData.showStateCity  &&(
                                            <>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-floating mb-3">
                                                        <select
                                                            name="StateId"
                                                            className="form-control"
                                                            value={profileData.StateId}
                                                            onChange={handleInputChange}
                                                            disabled={!profileData.CountryId}
                                                            >
                                                            <option value="">Select State</option>
                                                            {getStateList.map((s) => (
                                                                <option key={s.id} value={s.id}>
                                                                {s.name}
                                                                </option>
                                                            ))}
                                                            </select>
                                                        {/* <select className="form-select" name="StateId" id="StateId"
                                                        value={profileData.StateId}
                                                            onChange={handleInputChange}
                                                        >
                                                            {
                                                                getStateList.map((state:any, index:number)=>(
                                                                    <option key={index} value={state.id}>{state.name}</option>
                                                                ))
                                                            }
                                                            
                                                        </select> */}
                                                        <label htmlFor="StateId">State</label>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-floating mb-3">
                                                        <select
                                                            name="CityId"
                                                            className="form-control"
                                                            value={profileData.CityId}
                                                            onChange={handleInputChange}
                                                            disabled={!profileData.StateId}
                                                            >
                                                            <option value="">Select City</option>
                                                            {getCityList.map((c) => (
                                                                <option key={c.id} value={c.id}>
                                                                {c.name} 
                                                                </option>
                                                            ))}
                                                            </select>
                                                        {/* <select className="form-select" name="CityId" id="CityId"
                                                        value={profileData.CityId}
                                                            onChange={handleInputChange}
                                                        >
                                                            {
                                                                getCityList.map((city:any, index:number)=>(
                                                                    <option key={index} value={city.id}>{city.name}</option>
                                                                ))
                                                            }
                                                            
                                                        </select> */}
                                                        <label htmlFor="CityId">City</label>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    
                                </div>

                            </div>
                        </div>
                        
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <p style={{margin:'0px',color:'#FC673C'}}>Please click the over map and set point.</p>
                        <div ref={mapContainer} className="map-container"></div>
                        {/* <div ref={mapContainer} style={{ width: "100%", height: "400px",borderRadius:'10px'}}></div> */}
                        <div className="my-4">
                            <button className="btn-style-1" onClick={handleProfileUpdate}>Add Post</button>
                            <button className="btn-style-0">Cancel</button>
                        </div>
                    </div>
                     <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy"></h2>
                            <div className="profile-inner-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="TrailLevel" id="TrailLevel" 
                                                 value={profileData.TrailLevel}
                                                onChange={handleInputChange} 
                                            >
                                                <option value="1">Difficulty</option>
                                                <option value="2">Easy</option>
                                                <option value="3">Moderate</option>
                                                <option value="4">Hard</option>
                                            </select>
                                            <label htmlFor="TrailLevel">TrailLevel</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="weight" id="weight"
                                                // value={profileData.weight}
                                                // onChange={handleInputChange}
                                            >
                                                <option value="1">Unspecified</option>
                                                <option value="2">One</option>
                                            </select>
                                            <label htmlFor="weight">Weight</label>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="birthday_month" id="birthday"
                                            // value={profileData.birthday_month}
                                            //     onChange={handleInputChange}
                                            >
                                                <option >Month</option>
                                                <option value="01">January</option>
                                            </select>
                                            <label htmlFor="birthday">Estimated Time </label>
                                        </div>
                                    </div> */}
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3"> 
                                                <input type="text" className="form-control" placeholder="" name="EstimatedTime_H" id="EstimatedTime_H"  
                                                // value={profileData.birthday_date}
                                                // onChange={handleInputChange}
                                                /> 
                                            <label htmlFor="EstimatedTime_H">Time Hour</label>
                                        </div>
                                            
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3"> 
                                                <input type="text" className="form-control" placeholder="" name="EstimatedTime_M" id="EstimatedTime_M"  
                                                // value={profileData.birthday_date}
                                                // onChange={handleInputChange}
                                                /> 
                                            <label htmlFor="EstimatedTime_M">Time M</label>
                                        </div>
                                            
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3"> 
                                                <input type="text" className="form-control" placeholder="" name="EstimatedTime_D" id="EstimatedTime_D"  
                                                // value={profileData.birthday_date}
                                                // onChange={handleInputChange}
                                                /> 
                                            <label htmlFor="EstimatedTime_D">Time D</label>
                                        </div>
                                            
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                            <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="" name="Length" id="Length"  
                                            //  value={profileData.birthday_year}
                                            //     onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="Length">Length</label>
                                        </div>                                             
                                    </div>
                                    
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="" name="ElevationGain" id="ElevationGain"  
                                            //  value={profileData.birthday_year}
                                            //     onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="ElevationGain">ElevationGain</label>
                                        </div>                                             
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="" name="TrailType" id="TrailType"  
                                             value={profileData.TrailType}
                                                onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="TrailType">TrailType</label>
                                        </div>                                             
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> 
                {showPrompt && (
                    <div style={{position: "fixed",top: 0,left: 0, right: 0,bottom: 0, background: "rgba(0,0,0,0.5)",display: "flex", 
                            alignItems: "center", justifyContent: "center", zIndex: 1000,}}
                        onClick={() => closePrompt(null)}>
                        <div
                            style={{ background: "white",padding: "25px",borderRadius: "10px",width: "450px",maxHeight: "80vh", overflowY: "auto",}}
                            onClick={(e) => e.stopPropagation()}>

                            {/* Close Button */}
                            <div style={{ display: "flex", justifyContent: "end" }}>
                                <button className="btn-cross" onClick={() => closePrompt(null)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L16 16M16 4L4 16" stroke="#05073D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                            {/* Title */}
                            <h4>Enter Title for This Point</h4>
                            {/* Input */}
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <input type="text" value={promptValue} onChange={(e) => setPromptValue(e.target.value)}
                                        autoFocus
                                        style={{width: "100%",padding: "10px",borderRadius: "6px", border: "1px solid #ccc",}}
                                        placeholder="Enter title"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                                {/* <button className="btn-send" 
                                // onClick={() => closePrompt(promptValue)} 
                                 onClick={() => handleAddMapPoints(points)} 
                                disabled={!promptValue.trim()}> */}
                                <button
                                    className="btn-send"
                                    onClick={() => {
                                        if (promptCallback) promptCallback(promptValue);
                                        closePrompt(promptValue)
                                    }}
                                    disabled={!promptValue.trim()}
                                    >
                                    OK</button>
                                <button className="btn-cancel" onClick={() => closePrompt(null)}
                                 style={{ background: "#ddd",padding: "9px 11px",borderRadius: "50px",border:'none'}}>Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* end popup */} 
                {/* <div className="row">
                    <div className="col-12">
                            <div ref={mapContainer} style={{ width: "100%", height: "400px",borderRadius:'10px'}}></div>
                    </div>
                        <div className="my-4">
                        <button className="btn-style-1" onClick={handleProfileUpdate}>Add Post</button>
                        <button className="btn-style-0">Cancel</button>
                    </div>
                </div> */}
            </div>
        </section>
    </main>
  );
};

export default AddPostSection;
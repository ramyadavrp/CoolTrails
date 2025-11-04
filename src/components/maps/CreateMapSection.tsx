// src/components/AffiliateTrail.tsx
import React, { useState,useEffect,useCallback,useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
// import data from '../../public/data/community.json';
import { Link } from 'react-router-dom';
// import StarRating from './AffiliateDetails/StarRating';
import { useLocation, useParams } from 'react-router-dom';
import { decodeId,encodeId, generateSlug ,slugToTitle,timeAgo} from '../../utils/helpers';
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';
import { SquareLoader } from "react-spinners"; 

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


type ShareOption = {
  label: string;
//   icon: JSX.Element | (() => JSX.Element);
   action: (cmt: any) => void
};

const CreateMapSection: React.FC = () => {
    const { slug } = useParams();
    const location = useLocation();
    const statePostId = location.state?.postId;
    const [message, setMessage] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingMap,setLoadingMap] = useState(true);
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
    const shareUrl = window.location.href;
    useEffect(() => {
        // Check if token exists in localStorage
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
        
    // Start map creation
    // Initialize map
    useEffect(() => {
        if (!mapContainer.current) return;
        setLoadingMap(true);
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [78.0421, 27.1751],
            zoom: 16,
            pitch: 0,
            bearing: 0,
            antialias: true,
            attributionControl: false // remove © Mapbox © OpenStreetMap Improve this map
        });
        mapRef.current = map; 
        
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false,
            placeholder: "Search location",
        });

        map.addControl(geocoder);
        // ✅ Add custom button to map
        // class CreateMapButton {
        //     onAdd(map: mapboxgl.Map) {
        //         this._map = map;
        //         this._btn = document.createElement("button");
        //         this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-create-map";
        //         this._btn.type = "button";
        //         this._btn.title = "Create Map";
        //         // this._btn.innerHTML = `
        //         //     <img src="https://img.icons8.com/fluency/48/plus-math.png" 
        //         //         alt="create" width="24" height="24" />
        //         // `;
        //         this._btn.textContent = `+ Add`;
        //         this._btn.textContent = "+ Add";
        //         this._btn.style.whiteSpace = "nowrap";    
        //         this._btn.style.display = "inline-flex";   
        //         this._btn.style.alignItems = "center";   
        //         this._btn.style.justifyContent = "center";
        //         this._btn.style.minWidth = "60px";        
        //         this._btn.style.padding = "5px 10px";
        //         this._btn.style.fontWeight = "600";
        //         this._btn.style.fontSize = "14px";
        //         this._btn.style.border = "none";
        //         this._btn.style.background = "#FC673C";
        //         this._btn.style.color = "white";
        //         this._btn.style.borderRadius = "4px";
        //         this._btn.style.cursor = "pointer";
        //         this._btn.onmouseenter = () => (this._btn.style.background = "#FC673C");
        //         this._btn.onmouseleave = () => (this._btn.style.background = "#FC673C");
        //         this._btn.addEventListener("click", () => {
        //             alert("Create Map Clicked!");
        //             // 🔹 You can call any function here
        //             // loadMap();
        //             // clearMap();
        //             // toggle3D();
        //         });

        //         const container = document.createElement("div");
        //         container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
        //         container.appendChild(this._btn);
        //         return container;
        //     }

        //     onRemove() {
        //         this._btn.parentNode.removeChild(this._btn);
        //         this._map = undefined;
        //     }
        // }

        // map.addControl(new CreateMapButton(), "top-right");
        map.on("load", () => {
            setLoadingMap(false);
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

        return () => {
            map.remove();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

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
    
    return (
        <main className="mainContent">
            <section className="section-trail-detail">
                <div style={{paddingLeft: '20px'}}>
                    <h1>Create Map</h1>
                    <p style={{margin:'0px',color:'#FC673C'}}>Please click the over map and set point.</p>
                </div>
                <div
                    style={{
                    // position: "absolute",
                    top: 10,
                    left: 10,
                    // background: "white",
                    padding: 10,
                    borderRadius: 8,
                    // boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 1,
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    // marginBottom: "25px",
                    justifyContent: 'end' 
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
                {/* <div style={{ height: "100vh", width: "100%", position: "relative" ,padding:'20px'}}>
                    <div ref={mapContainer}  style={{ height: "100%", width: "100%",borderRadius: "10px" }}/>           
                </div> */}
                
                <div style={{ position: "relative", width: "100%", height: "100vh",padding:'20px' }}>
                    <div
                    ref={mapContainer}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        visibility: loadingMap ? "hidden" : "visible",
                    }}
                    />
                    {loadingMap && (
                    <div
                        style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "#FFF5E9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        }}
                    >
                        <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} />
                    </div>
                    )}
                </div>
                
            </section>
            
        </main>         

    );
};

export default CreateMapSection;

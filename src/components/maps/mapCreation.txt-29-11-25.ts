// src/components/CreateMapSection.tsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { SquareLoader } from "react-spinners";

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateMapSection: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const statePostId = location.state?.postId;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const walkerMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const animationRef = useRef<number | null>(null);

  const [points, setPoints] = useState<[number, number][]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [loopClosed, setLoopClosed] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);

  const [showPrompt, setShowPrompt] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [promptCallback, setPromptCallback] = useState<
    ((value: string | null) => void) | null
  >(null);

  const openCustomPrompt = (callback: (value: string | null) => void) => {
    setPromptCallback(() => callback);
    setPromptValue("");
    setShowPrompt(true);
  };

  const closePrompt = (value: string | null) => {
    setShowPrompt(false);
    if (promptCallback) promptCallback(value);
  };

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
      attributionControl: false,
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
      el.style.backgroundImage =
        "url('https://img.icons8.com/color/48/person-male--v1.png')";
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
            handleAddMapPoints(newPoints);
            return newPoints;
          });
          return;
        }
      }

      // Prompt for title
      openCustomPrompt((title) => {
        if (!title) return;

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
            handleAddMapPoints(updatedPoints);
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
    return () => map.off("click", handleClick);
  }, [points, loopClosed]);

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
      source?.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [] },
      });
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
    source?.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: fullRoute },
    });

    animateAlongPath(fullRoute);
  };

  const animateAlongPath = (coords: [number, number][]) => {
    if (!walkerMarkerRef.current) return;
    let i = 0;
    const step = () => {
      if (i >= coords.length - 1) return;
      const start = coords[i];
      const end = coords[i + 1];
      const duration = 200;
      const startTime = performance.now();

      const animate = (t: number) => {
        let progress = Math.min((t - startTime) / duration, 1);
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

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setPoints((prev) => {
          const updatedPoints = [...prev];
          updatedPoints[idx] = [lngLat.lng, lngLat.lat];
          updateRoute(updatedPoints);
          handleAddMapPoints(updatedPoints);
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

    if (!bounds.isEmpty()) mapRef.current!.fitBounds(bounds, { padding: 50, maxZoom: 17 });
    updateRoute(newPoints);
  };

  // API call
  const handleAddMapPoints = async (pointsWithCoords: [number, number][]) => {
    console.log("pointsWithCoords", pointsWithCoords);

    const payload = {
      UserId: "20c8a597-25b7-414d-8b9c-c9575f40b9fc",
      feedId: 1,
      points: pointsWithCoords.map((p) => ({
        Latitude: p[1].toString(),
        Longitude: p[0].toString(),
      })),
    };

    console.log("Payload to send:", payload);

    try {
      const res = await axios.post(`${BASE_URL}/feed/addmap`, payload);
      console.log("API response:", res.data);
      if (res.data.success) alert("Points saved successfully!");
    } catch (err) {
      console.error("API error:", err);
      alert("Failed to save points.");
    }
  };

  return (
    <main className="mainContent">
      <section className="section-trail-detail">
        <div style={{ paddingLeft: "20px" }}>
          <h1>Create Map</h1>
          <p style={{ margin: "0px", color: "#FC673C" }}>Click the map to set points.</p>
        </div>

        {showPrompt && (
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
            onClick={() => closePrompt(null)}
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
              <div style={{ display: "flex", justifyContent: "end" }}>
                <button className="btn-cross" onClick={() => closePrompt(null)}>
                  ×
                </button>
              </div>
              <h4>Enter Title for This Point</h4>
              <input
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                }}
              />
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  className="btn-send"
                  onClick={() => {
                    if (promptCallback) promptCallback(promptValue);
                  }}
                  disabled={!promptValue.trim()}
                >
                  OK
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => closePrompt(null)}
                  style={{ background: "#ddd", padding: "9px 11px", borderRadius: "50px", border: "none" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ position: "relative", width: "100%", height: "100vh", padding: "20px" }}>
          <div
            ref={mapContainer}
            style={{ width: "100%", height: "100%", borderRadius: "10px", visibility: loadingMap ? "hidden" : "visible" }}
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

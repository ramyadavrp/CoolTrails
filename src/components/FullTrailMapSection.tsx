import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;
mapboxgl.accessToken = 'pk.eyJ1IjoiMTExMnZpcmVuZHJhIiwiYSI6ImNtYmE0emNyNjBwbHMyanNibHBpZHgxMjUifQ.5FSp2VZ1T1kXcGV38bC5jA';
interface TrailPoint {
  latitude: number;
  longitude: number;
}

const FullTrailMapSection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const stored = localStorage.getItem("trailPoints");
  //   if (!stored || mapRef.current) return;

  //   const points: TrailPoint[] = JSON.parse(stored);
  //   if (!points.length || !mapContainer.current) return;

  //   const firstPoint = points[0];

  //   mapRef.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/outdoors-v12",
  //     center: [firstPoint.longitude, firstPoint.latitude],
  //     zoom: 13,
  //     attributionControl: false,
  //   });

  //   mapRef.current.on("load", () => {
  //     const bounds = new mapboxgl.LngLatBounds();

  //     points.forEach((p, index) => {
  //       const coords: [number, number] = [p.longitude, p.latitude];

  //       new mapboxgl.Marker()
  //         .setLngLat(coords)
  //         .setPopup(
  //           new mapboxgl.Popup().setText(`Trail Point ${index + 1}`)
  //         )
  //         .addTo(mapRef.current!);

  //       bounds.extend(coords);
  //     });

  //     mapRef.current!.fitBounds(bounds, { padding: 80 });
  //   });

  //   return () => {
  //     mapRef.current?.remove();
  //     mapRef.current = null;
  //   };
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem("trailPoints");
    if (!stored || mapRef.current || !mapContainer.current) return;

    const points: TrailPoint[] = JSON.parse(stored);
    if (points.length < 2) return;

    const firstPoint = points[0];

    // INIT MAP
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [firstPoint.longitude, firstPoint.latitude],
      zoom: 13,
      attributionControl: false,
    });

    mapRef.current.on("load", async () => {
      const bounds = new mapboxgl.LngLatBounds();

      // ADD MARKERS
      points.forEach((p) => {
        const coord: [number, number] = [p.longitude, p.latitude];
        new mapboxgl.Marker().setLngLat(coord).addTo(mapRef.current!);
        bounds.extend(coord);
      });

      // BUILD DIRECTIONS REQUEST
      const coordsString = points
        .map((p) => `${p.longitude},${p.latitude}`)
        .join(";");

      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordsString}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

      const res = await fetch(directionsUrl);
      const data = await res.json();

      if (!data.routes?.length) return;

      const routeCoords = data.routes[0].geometry.coordinates;

      // ADD ROUTE SOURCE
      mapRef.current!.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: routeCoords,
          },
        },
      });

      // ROUTE LINE
      mapRef.current!.addLayer({
        id: "route-layer",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1e90ff",
          "line-width": 5,
        },
      });

      // LOAD ARROW IMAGE
      mapRef.current!.loadImage(
        "https://cdn-icons-png.flaticon.com/512/271/271228.png",
        (error, image) => {
          if (error || !image) return;

          if (!mapRef.current!.hasImage("arrow")) {
            mapRef.current!.addImage("arrow", image);
          }

          // ARROW LAYER
          mapRef.current!.addLayer({
            id: "arrow-layer",
            type: "symbol",
            source: "route",
            layout: {
              "symbol-placement": "line",
              "symbol-spacing": 80,
              "icon-image": "arrow",
              "icon-size": 0.06,
              "icon-allow-overlap": true,
              "icon-rotation-alignment": "map",
              "icon-keep-upright": false,
            },
          });
        }
      );

      // FIT MAP
      routeCoords.forEach((c: any) => bounds.extend(c));
      mapRef.current!.fitBounds(bounds, { padding: 80 });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const storedTitle = localStorage.getItem("trailTitle") || "Trail Map";

  return (
    <>
    
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
    {/* HEADER */}
    <div
      style={{height: "56px", display: "flex",alignItems: "center",padding: "0 16px", borderBottom: "1px solid #ddd",background: "#fff",zIndex: 10,}}
    >
      <button
        onClick={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = "/";
          }
        }}
        style={{border: "none", background: "none",fontSize: "18px",cursor: "pointer",marginRight: "12px", }}
      >
        ←
      </button>
      <strong>{storedTitle}</strong>
    </div>

    {/* MAP */}
    <div ref={mapContainer} style={{height: "calc(100vh - 56px)", width: "100%",}}/>
  </div>
  
    </>
    
    
  );
};

export default FullTrailMapSection;

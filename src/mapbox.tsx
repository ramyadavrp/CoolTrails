import mapboxgl from "mapbox-gl";

const token = import.meta.env.VITE_MAPBOX_TOKEN;

if (!token) {
  console.error("❌ VITE_MAPBOX_TOKEN is missing");
}

mapboxgl.accessToken = token;

export default mapboxgl;

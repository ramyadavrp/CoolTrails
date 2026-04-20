import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from '/assets/images/marker-icon-2x.png';
import iconUrl from '/assets/images/marker-icon.png';
import shadowUrl from '/assets/images/marker-shadow.png';

// Fixing marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const CustomMapPage = () => {
    const position = [26.8467, 80.9462]; // Example: Lucknow coordinates

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-[400px] bg-white border-r p-6 overflow-y-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <span className="font-semibold text-black">Members</span> &gt;{' '}
          <span className="font-semibold text-black">Sandeep Verma</span> &gt;{' '}
          <span className="font-semibold text-black">Maps</span>
        </nav>

        <h1 className="text-2xl font-bold mb-2">Create a custom map</h1>
        <p className="text-gray-600 mb-4">
          Easily plan the perfect path for your next hike, bike, or run with our Map Creator tool.
        </p>

        <div className="bg-orange-100 text-orange-800 text-sm p-4 rounded mb-6">
          ⚠️ Stay tuned for a new custom routing experience coming soon!
        </div>

        <h2 className="text-lg font-semibold mb-2">Your route</h2>
        <div className="space-y-3 mb-6">
          <button className="w-full py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">
            Draw on map
          </button>
          <button className="w-full py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">
            Upload from file
          </button>
        </div>

        <details className="mb-4">
          <summary className="cursor-pointer text-gray-800 font-medium">Description</summary>
          <div className="mt-2 text-sm text-gray-600">
            Add a description for your custom route here.
          </div>
        </details>

        <details className="mb-6">
          <summary className="cursor-pointer text-gray-800 font-medium">Waypoints</summary>
          <div className="mt-2 text-sm text-gray-600">
            Add and manage waypoints for your route.
          </div>
        </details>

        <button className="w-full py-3 rounded-full bg-[#12180B] text-white font-semibold hover:bg-black">
          Save custom map
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <MapContainer center={[25.3176, 82.9739]} zoom={7} className="w-full h-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
            Purwanchal NGO Office<br /> Lucknow.
            </Popup>
        </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default CustomMapPage;

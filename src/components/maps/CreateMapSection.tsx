import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

// ... (L.Icon.Default.mergeOptions remains the same)

const CreateMapSection = () => {
  const position: [number, number] = [26.8467, 80.9462];
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const [isDrawingMode, setIsDrawingMode] = useState(false); // State for 'Draw on map'
  const [smartRoutingEnabled, setSmartRoutingEnabled] = useState(false); // State for 'Smart routing'
  const [drawnLayers, setDrawnLayers] = useState<L.Layer[]>([]); // To store drawn layers

  // This custom hook will allow us to interact with the map instance
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (isDrawingMode && !smartRoutingEnabled) {
          // Logic for drawing directly on map (without smart routing)
          // You might add markers or connect points to form a polyline manually
          console.log("Map clicked at:", e.latlng);
          // For a simple example, add a marker
          // const newMarker = L.marker(e.latlng).addTo(map);
          // setDrawnLayers(prev => [...prev, newMarker]);
        }
      },
    });
    return null;
  };


  useEffect(() => {
    // This part should be safe after the featureGroup fix
    if (featureGroupRef.current) {
        const leafletFeatureGroup = featureGroupRef.current.leafletElement;
        // console.log("FeatureGroup ref current:", leafletFeatureGroup);
        // You might want to bind events directly to the featureGroup if needed
    }
  }, []);

  // Handler for drawing events
  const onCreated = (e: any) => {
    const layer = e.layer;
    console.log('Shape created:', layer.toGeoJSON());
    // Add the newly created layer to your state
    setDrawnLayers((prevLayers) => [...prevLayers, layer]);
  };

  const onEdited = (e: any) => {
    e.layers.eachLayer((layer: L.Layer) => {
      console.log('Shape edited:', layer.toGeoJSON());
      // Update state to reflect edited layers
      setDrawnLayers((prevLayers) =>
        prevLayers.map((l) => (l.options.id === layer.options.id ? layer : l))
      );
    });
  };

  const onDeleted = (e: any) => {
    console.log('Shape(s) deleted', e.layers);
    // Remove deleted layers from state
    e.layers.eachLayer((layer: L.Layer) => {
      setDrawnLayers((prevLayers) =>
        prevLayers.filter((l) => l.options.id !== layer.options.id)
      );
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* ... (Breadcrumb remains the same) ... */}

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] bg-white border-r overflow-y-auto p-6 relative">
          <h1 className="text-2xl font-bold mb-2">Create a custom map</h1>
          <p className="text-gray-600 mb-4">
            Easily plan the perfect path for your next hike, bike, or run with our Map Creator tool.
          </p>

          <div className="bg-orange-100 text-orange-800 text-sm p-4 rounded mb-6">
            ⚠️ Stay tuned for a new custom routing experience coming soon!
          </div>

          <h2 className="text-lg font-semibold mb-2">Your route</h2>
          <div className="space-y-3 mb-6">
            <button
              className={`w-full py-3 rounded-full font-medium ${isDrawingMode ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
              onClick={() => setIsDrawingMode(!isDrawingMode)} // Toggle drawing mode
            >
              Draw on map
            </button>
            <button className="w-full py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">
              Upload from file
            </button>
          </div>

          {/* Smart Routing Toggle (if isDrawingMode is true) */}
          {isDrawingMode && (
            <div className="flex items-center justify-between my-4 border-t pt-4">
              <span className="font-semibold text-gray-800">Smart routing</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={smartRoutingEnabled}
                  onChange={() => setSmartRoutingEnabled(!smartRoutingEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}

          {/* Routing Type (if smartRoutingEnabled is true) */}
          {isDrawingMode && smartRoutingEnabled && (
            <div className="mb-4">
              <label htmlFor="routing-type" className="block text-sm font-medium text-gray-700 mb-1">
                Routing type
              </label>
              <select
                id="routing-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Hiking</option>
                <option>Biking</option>
                <option>Running</option>
              </select>
            </div>
          )}

          {/* Route Length & Elevation */}
          <div className="my-4">
            <h3 className="font-semibold text-gray-800 mb-2">Route details</h3>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Length: <span className="font-bold">0.00 km</span></span>
              <span>Elev. gain: <span className="font-bold">--</span></span>
            </div>
          </div>

          {/* Route Color (Placeholder for now) */}
          <div className="my-4">
            <h3 className="font-semibold text-gray-800 mb-2">Route color</h3>
            <div className="flex gap-2">
              {['red', 'green', 'blue', 'yellow', 'purple'].map(color => (
                <div key={color} className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer`} style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>

          {/* Route Options */}
          <div className="my-4">
            <h3 className="font-semibold text-gray-800 mb-2">Route options</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">Double-back</button>
              <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">Close loop</button>
              <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">Reverse</button>
            </div>
          </div>


          {/* ... (Description and Waypoints accordions remain the same) ... */}

          <div className="sticky bottom-0 bg-white pt-6 pb-4">
            <button className="w-full py-3 rounded-full bg-[#12180B] text-white font-semibold hover:bg-black transition">
              Save custom map
            </button>
          </div>
        </div>

        {/* Right Map Section */}
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

            <MapEvents /> {/* Add MapEvents component here */}

            {/* FeatureGroup for EditControl */}
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position="topright"
                draw={{
                  rectangle: isDrawingMode && !smartRoutingEnabled, // Only enable if drawing mode is on and smart routing is off
                  polygon: isDrawingMode && !smartRoutingEnabled,
                  circle: isDrawingMode && !smartRoutingEnabled,
                  polyline: isDrawingMode && !smartRoutingEnabled, // Polyline is key for routes
                  marker: isDrawingMode && !smartRoutingEnabled,
                  circlemarker: false,
                }}
                edit={{
                  featureGroup: featureGroupRef.current || new L.FeatureGroup(),
                  remove: true,
                }}
                onCreated={onCreated}
                onEdited={onEdited}
                onDeleted={onDeleted}
              />
            </FeatureGroup>

            {/* Display drawn layers (if any)
            {drawnLayers.map((layer, index) => (
              // You'd need to use a component that renders the specific Leaflet layer type
              // This is a simplified example; actual implementation might be more complex
              // For polylines, you might use <Polyline positions={layer.getLatLngs()} />
              // For markers, <Marker position={layer.getLatLng()} /> etc.
              // react-leaflet-draw often manages these directly within the FeatureGroup
              null
            ))}
            */}

          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CreateMapSection;
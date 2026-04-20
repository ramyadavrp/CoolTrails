// src/components/AdventureAnywhere.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const AdventureAnywhere: React.FC = () => {

  const [topCities, setTopCities] = useState([]);
  const [topParks, setTopParks] = useState([]);
  const [topTrails, setTopTrails] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingParks, setLoadingParks] = useState(true);
  const [loadingTrails, setLoadingTrails] = useState(true);
  const [errorCities, setErrorCities] = useState('');
  const [errorParks, setErrorParks] = useState('');
  const [errorTrails, setErrorTrails] = useState('');

  useEffect(() => {
    // Fetch top cities
    axios.get(`${BASE_URL}/home/topcity`)
      .then(res => {
        setTopCities(res.data.data);
        setLoadingCities(false);
      })
      .catch(err => {
        console.error(err);
        setErrorCities('Unable to fetch top cities');
        setLoadingCities(false);
      });

    // Fetch top parks
    axios.get(`${BASE_URL}/home/topparks`)
      .then(res => {
        setTopParks(res.data.data);
        setLoadingParks(false);
      })
      .catch(err => {
        console.error(err);
        setErrorParks('Unable to fetch top parks');
        setLoadingParks(false);
      });

    // Fetch top trails
    axios.get(`${BASE_URL}/home/toptrail`)
      .then(res => {
        setTopTrails(res.data.data);
        setLoadingTrails(false);
      })
      .catch(err => {
        console.error(err);
        setErrorTrails('Unable to fetch top parks');
        setLoadingTrails(false);
      });

  }, []);

  return (
    <section className="bg-cover bg-center w-full clt-adventure-anywhere py-16" style={{ backgroundImage: "url('../assets/images/v16_288.png')" }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Adventure Anywhere</h1>
        <div className="grid md:grid-cols-3 gap-8 text-center text-white">
          
          {/* Column 1 */}
          <div className="col-span-1">
          <div className="px-[1.5rem] py-[0.5rem] sm:py-[4.5rem] rounded-lg">
              <select className="w-full mt-4 p-2 bg-white text-black rounded">
                <option>Top 15 Cities</option>
                {topCities.map((city: { id: number; name: string }) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {loadingCities && <p className="text-white text-sm mt-2">Loading cities...</p>}
              {errorCities && <p className="text-red-400 text-sm mt-2">{errorCities}</p>}
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-span-1">
          <div className="px-[1.5rem] py-[0.5rem] sm:py-[4.5rem] rounded-lg">
              <select className="w-full mt-4 p-2 bg-white text-black rounded">
                <option>Top 15 Parks</option>
                {topParks.map((park: { id: number; name: string }) => (
                  <option key={park.id} value={park.id}>{park.name}</option>
                ))}
              </select>
              {loadingParks && <p className="text-white text-sm mt-2">Loading parks...</p>}
              {errorParks && <p className="text-red-400 text-sm mt-2">{errorParks}</p>}
            </div>
          </div>

          {/* Column 3 */}
          <div className="col-span-1">
          <div className="px-[1.5rem] py-[0.5rem] sm:py-[4.5rem] rounded-lg">
              <select className="w-full mt-4 p-2 bg-white text-black rounded">
                <option>Top 15 Trails</option>
                {topTrails.map((trail: { id: number; name: string }) => (
                  <option key={trail.id} value={trail.id}>{trail.name}</option>
                ))}
              </select>
              {loadingTrails && <p className="text-white text-sm mt-2">Loading parks...</p>}
              {errorTrails && <p className="text-red-400 text-sm mt-2">{errorTrails}</p>}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdventureAnywhere;

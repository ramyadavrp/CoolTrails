// src/components/FrameTrailSection.tsx
import React, { useState } from 'react';

const FrameTrailSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState(0); // 0 = first item expanded

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };
    
  return (
    <div>
     
        {/* Hero Section */}
        <div
            className="h-[28rem] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
            style={{
            backgroundImage: "url('../assets/images/affiliate_hero.jpg')", // change path if needed
            }}
        >
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
            WHAT IS LOREM IPSUM?
            </h2>
            <p className="max-w-lg text-sm md:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
            </p>
            <input
            type="text"
            placeholder="Search..."
            className="mt-6 px-4 py-2 rounded-full text-black w-[250px] md:w-[300px]"
            />
        </div>

        <div className="w-full">

            {/* Detail Section */}
            <div className="container mx-auto px-4 py-6 text-center">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2">
                        Explore 200+ <br />national park guides
                    </h1>
                    <p className="text-sm mb-2">
                        Get insider tips, curated trail collections, and more from AllTrails experts.
                    </p>
                </div>
            </div>

            
            <div style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    flexWrap: 'nowrap',
                    }}>
                    {/* Card 1 */}
                    <div className="card-collaps" style={{
                        width: '180px',
                        height: '270px',
                        backgroundColor: '#2B0052',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'scale(1.1)'
                    }}>
                        <img className="object-cover" src="../assets/images/top-trail.png" alt="Card 1" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                        <div style={{ padding: '12px', flexGrow: 1 }}>
                        <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
                            Top Picks in Yosemite National Park
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card-collaps" style={{
                        width: '180px',
                        height: '300px',
                        backgroundColor: '#A94E00',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'scale(1.2)'
                    }}>
                        <img className="object-cover" src="../assets/images/top-trail.png" alt="Card 2" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                        <div style={{ padding: '12px', flexGrow: 1 }}>
                        <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
                            Top Picks in Yosemite National Park
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p>
                        </div>
                    </div>

                    {/* Card 3 - Center */}
                    <div className="card-collaps" style={{
                        width: '200px',
                        height: '340px',
                        backgroundColor: '#006387',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        zIndex: 2,
                        transform: 'scale(1.3)'
                    }}>
                        <img className="object-cover" src="../assets/images/top-trail.png" alt="Card 3" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                        <div style={{ padding: '12px', textAlign: 'center', flexGrow: 1 }}>
                        <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
                        <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
                            Top Picks in Yosemite National Park
                        </p>
                        <button style={{
                            backgroundColor: '#fff',
                            color: '#006387',
                            padding: '6px 12px',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            borderRadius: '5px',
                            marginTop: 'auto',
                            cursor: 'pointer'
                        }}>
                            Explore Now
                        </button>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="card-collaps" style={{
                        width: '180px',
                        height: '300px',
                        backgroundColor: '#A94E00',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1,
                        transform: 'scale(1.2)'
                    }}>
                        <img className="object-cover" src="../assets/images/top-trail.png" alt="Card 4" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                        <div style={{ padding: '12px', flexGrow: 1 }}>
                        <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
                            Top Picks in Yosemite National Park
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="card-collaps" style={{
                        width: '180px',
                        height: '270px',
                        backgroundColor: '#2B0052',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'scale(1.1)'
                    }}>
                        <img className="object-cover" src="../assets/images/top-trail.png" alt="Card 5" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                        <div style={{ padding: '12px', flexGrow: 1 }}>
                        <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
                        <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
                            Top Picks in Yosemite National Park
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>


            <div style={{ padding: '20px', backgroundColor: '#fff' }}>
  <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexWrap: 'nowrap',
        gap: '20px',
        '@media (max-width: 767px)': { // Styles for mobile devices
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: '10px',
        },
      }}
    >
      {/* Card 1 */}
      <div
        className="card-collaps"
        style={{
          width: '180px',
          height: '270px',
          backgroundColor: '#2B0052',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'scale(1.1)',
          '@media (max-width: 767px)': {
            width: '80%', // Adjust width for mobile
            maxWidth: '300px',
            height: 'auto',
            transform: 'scale(1)',
          },
        }}
      >
        <img
          className="object-cover"
          src="../assets/images/top-trail.png"
          alt="Card 1"
          style={{ width: '100%', height: '140px', objectFit: 'cover' }}
        />
        <div style={{ padding: '12px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
          {/* <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
            Top Picks in Yosemite National Park
          </p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p> */}
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="card-collaps"
        style={{
          width: '180px',
          height: '300px',
          backgroundColor: '#A94E00',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'scale(1.2)',
          '@media (max-width: 767px)': {
            width: '80%',
            maxWidth: '300px',
            height: 'auto',
            transform: 'scale(0.95)', // Slight scale down for layering
            marginTop: '-10px', // Overlap with the previous card
          },
        }}
      >
        <img
          className="object-cover"
          src="../assets/images/top-trail.png"
          alt="Card 2"
          style={{ width: '100%', height: '140px', objectFit: 'cover' }}
        />
        <div style={{ padding: '12px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
          {/* <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
            Top Picks in Yosemite National Park
          </p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p> */}
        </div>
      </div>

      {/* Card 3 - Center */}
      <div
        className="card-collaps"
        style={{
          width: '200px',
          height: '340px',
          backgroundColor: '#006387',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          zIndex: 2,
          transform: 'scale(1.3)',
          '@media (max-width: 767px)': {
            width: '90%',
            maxWidth: '320px',
            height: 'auto',
            transform: 'scale(1.05)', // Slight scale up for emphasis
            marginTop: '-15px',
          },
        }}
      >
        <img
          className="object-cover"
          src="../assets/images/top-trail.png"
          alt="Card 3"
          style={{ width: '100%', height: '160px', objectFit: 'cover' }}
        />
        <div style={{ padding: '12px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
          {/* <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
            Top Picks in Yosemite National Park
          </p>
          <button
            style={{
              backgroundColor: '#fff',
              color: '#006387',
              padding: '6px 12px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '13px',
              borderRadius: '5px',
              marginTop: 'auto',
              cursor: 'pointer',
            }}
          >
            Explore Now
          </button> */}
        </div>
      </div>

      {/* Card 4 */}
      <div
        className="card-collaps"
        style={{
          width: '180px',
          height: '300px',
          backgroundColor: '#A94E00',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1,
          transform: 'scale(1.2)',
          '@media (max-width: 767px)': {
            width: '80%',
            maxWidth: '300px',
            height: 'auto',
            transform: 'scale(0.9)',
            marginTop: '-10px',
          },
        }}
      >
        <img
          className="object-cover"
          src="../assets/images/top-trail.png"
          alt="Card 4"
          style={{ width: '100%', height: '140px', objectFit: 'cover' }}
        />
        <div style={{ padding: '12px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
          {/* <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
            Top Picks in Yosemite National Park
          </p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p> */}
        </div>
      </div>

      {/* Card 5 */}
      <div
        className="card-collaps"
        style={{
          width: '180px',
          height: '270px',
          backgroundColor: '#2B0052',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'scale(1.1)',
          '@media (max-width: 767px)': {
            width: '80%',
            maxWidth: '300px',
            height: 'auto',
            transform: 'scale(0.85)',
            marginTop: '-10px',
          },
        }}
      >
        <img
          className="object-cover"
          src="../assets/images/top-trail.png"
          alt="Card 5"
          style={{ width: '100%', height: '140px', objectFit: 'cover' }}
        />
        <div style={{ padding: '12px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: '12px', margin: 0 }}>📘 Guide</p>
          {/* <p style={{ fontWeight: 'bold', fontSize: '14px', margin: '8px 0' }}>
            Top Picks in Yosemite National Park
          </p>
          <p style={{ fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>Explore Now</p> */}
        </div>
      </div>
    </div>
  </div>
</div>



            {/* Fourth Section – Full Width Split in Two Columns */}
            <div className="w-full pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Image */}
                    <div>
                    <img
                        src="../assets/images/sun-frame.png"
                        alt="Working"
                        className="w-full h-full object-cover"
                    />
                    </div>

                    {/* Right Content */}
                    <div className="px-6 py-10 bg-[#FEEBDF]">
                        {/* Section 1 */}
                        <div>
                            <h2 className="text-xl font-bold mb-2">Trails we love</h2>
                            <p className="text-sm text-gray-800 text-justify">
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <hr className="mt-4 border-t border-black" />
                        </div>

                        {/* Section 2 - Right aligned heading and justified text */}
                        <div className="mt-[15px]">
                            <h2 className="text-xl font-bold mb-2 text-right">Insider tips and tricks</h2>
                            <div className="text-sm text-gray-800 text-right">
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                            <hr className="mt-4 border-t border-black" />
                        </div>

                        {/* Section 3 */}
                        <div className="mt-[15px]">
                            <h2 className="text-xl font-bold mb-2">All the details you need</h2>
                            <p className="text-sm text-gray-800 text-justify">
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>


                </div>

            </div>

        </div>


        <div className="container w-full px-4 py-8 mx-auto">
            <div className="p-4 border-[2px] border-gray-300 rounded" style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-sm text-gray-700 mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
                <span>63 Parks · 132 Guides</span>
                <div className="flex items-center gap-1">
                    <span>Sort by</span>
                    <select className="border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent text-sm">
                    <option>Most popular</option>
                    </select>
                </div>
                </div>

                {/* Accordion Item 1 */}
                <div className="mb-4">
                    <div className="p-2 rounded hover:bg-gray-100 transition cursor-pointer" onClick={() => toggle(0)}>
                        <div className="flex justify-between items-start sm:items-center">
                        <div className="flex items-start space-x-3">
                            <img src="../assets/images/sunset-circle.png" alt="Park" className="w-14 h-14 rounded-full object-cover" />
                            <div>
                            <h3 className="font-semibold text-[17px] text-[#913D00]">Top Picks in Banff National Park</h3>
                            <p className="text-sm text-black-600 font-medium flex items-center gap-2 mt-1">
                                <img src="../assets/images/v4_39.png" alt="Expand" className="w-5 h-5" />
                                <span>Utah · National Park</span>
                            </p>
                            </div>
                        </div>
                        <img
                            src="../assets/images/down-arrow.png"
                            alt="Expand"
                            className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                        />
                        </div>
                    </div>

                    {openIndex === 0 && (
                        <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <img src="../assets/images/sunset-trail.png" alt="Banff" className="w-full rounded md:col-span-1" />
                        <div className="md:col-span-3">
                            <h4 className="text-lg font-semibold text-[#913D00] mb-2">Top Picks in Banff National Park</h4>
                            <div className="border-b-2 border-[#fab081] mb-2"></div>
                            <p className="text-sm text-gray-800 text-justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                            </p>
                        </div>
                        </div>
                    )}
                </div>

                {/* Accordion Item 2 */}
                <div className="mb-4">
                    <div className="p-2 rounded hover:bg-gray-100 transition cursor-pointer" onClick={() => toggle(1)}>
                        <div className="flex justify-between items-start sm:items-center">
                        <div className="flex items-start space-x-3">
                            <img src="../assets/images/sunset-circle.png" alt="Park" className="w-14 h-14 rounded-full object-cover" />
                            <div>
                            <h3 className="font-semibold text-[17px] text-[#913D00]">Top Picks in Banff National Park</h3>
                            <p className="text-sm text-black-600 font-medium flex items-center gap-2 mt-1">
                                <img src="../assets/images/v4_39.png" alt="Expand" className="w-5 h-5" />
                                <span>Utah · National Park</span>
                            </p>
                            </div>
                        </div>
                        <img
                            src="../assets/images/down-arrow.png"
                            alt="Expand"
                            className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                        />
                        </div>
                    </div>

                    {openIndex === 1 && (
                        <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <img src="../assets/images/sunset-trail.png" alt="Banff" className="w-full rounded md:col-span-1" />
                        <div className="md:col-span-3">
                            <h4 className="text-lg font-semibold text-[#913D00] mb-2">Top Picks in Banff National Park</h4>
                            <div className="border-b-2 border-[#fab081] mb-2"></div>
                            <p className="text-sm text-gray-800 text-justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                            </p>
                        </div>
                        </div>
                    )}
                </div>

                {/* Accordion Item 3 */}
                <div className="mb-4">
                    <div className="p-2 rounded hover:bg-gray-100 transition cursor-pointer" onClick={() => toggle(2)}>
                        <div className="flex justify-between items-start sm:items-center">
                        <div className="flex items-start space-x-3">
                            <img src="../assets/images/sunset-circle.png" alt="Park" className="w-14 h-14 rounded-full object-cover" />
                            <div>
                            <h3 className="font-semibold text-[17px] text-[#913D00]">Top Picks in Banff National Park</h3>
                            <p className="text-sm text-black-600 font-medium flex items-center gap-2 mt-1">
                                <img src="../assets/images/v4_39.png" alt="Expand" className="w-5 h-5" />
                                <span>Utah · National Park</span>
                            </p>
                            </div>
                        </div>
                        <img
                            src="../assets/images/down-arrow.png"
                            alt="Expand"
                            className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                        />
                        </div>
                    </div>

                    {openIndex === 2 && (
                        <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <img src="../assets/images/sunset-trail.png" alt="Banff" className="w-full rounded md:col-span-1" />
                        <div className="md:col-span-3">
                            <h4 className="text-lg font-semibold text-[#913D00] mb-2">Top Picks in Banff National Park</h4>
                            <div className="border-b-2 border-[#fab081] mb-2"></div>
                            <p className="text-sm text-gray-800 text-justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                            </p>
                        </div>
                        </div>
                    )}
                </div>

            </div>
        </div>


        

        


    </div>
  );
};

export default FrameTrailSection;

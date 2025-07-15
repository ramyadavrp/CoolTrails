// src/components/FrameTrailSection.tsx
import React, { useState } from 'react';

const Trail5PageSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState(0); // 0 = first item expanded

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const checkIcon = "../assets/images/v5-check_arrow.png";
    
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

            {/* Breadcrumb Section */}
            <div className="">
                <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
                    <p className="text-[#000000] text-[17px]">
                        <span><a href="#">Back to Explore / </a></span>
                        <span><a href="#">Hiking / </a></span>
                        <span>India</span>
                    </p>
                </div>
            </div>

        </div>

        {/* Full Section */}
        <div className="w-full py-4 bg-[#F5F4F4]">
            <div className="text-sm text-gray-700 flex items-center justify-between px-4">
                <h3 className="font-bold text-[26px]">Best trail in India</h3>
                <div className="flex items-center gap-2 font-bold text-[17px]">
                    <span className="text-[#FF8C43]">☆</span><span>4.3 (12,799 reviews)</span>
                </div>
            </div>
        </div>

        <div className="w-full px-4">
            <div className="flex flex-col md:flex-row py-12">
                {/* LEFT MAIN COLUMN (md:6) */}
                <div className="w-full md:w-1/2 flex relative">
                {/* Left sub-column (7/12) */}
                <div className="w-7/12 relative">
                    <img
                    src="../assets/images/v5_1.png"
                    alt="Main"
                    className="w-full h-auto"
                    />
                </div>

                {/* Right sub-column (5/12) */}
                <div className="w-5/12 relative flex flex-col items-center absolute right-[35px]">
                    {/* Top Overlay */}
                    <img
                    src="../assets/images/v5_3.png"
                    alt="Top Right"
                    className="w-[100px] h-auto relative top-[25px] z-[-1]"
                    />
                    {/* Bottom Center Overlay */}
                    <div className="w-full flex justify-center">
                    <img
                        src="../assets/images/v5_2.png"
                        alt="Bottom Overlay"
                        className="w-full h-auto rounded"
                    />
                    </div>
                </div>
                </div>

                {/* RIGHT COLUMN (md:6) */}
                <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
                <p className="mb-4 text-gray-800 text-sm leading-relaxed">
                    Ready to check out the best trails in India for hiking, mountain biking, climbing or other outdoor activities? AllTrails has 3,849 hiking trails, mountain biking routes, backpacking trips and more. Discover hand-curated trail maps, along with reviews and photos from nature lovers like you. No matter what you're looking for, you can find a diverse range of the best hiking trails in India to suit your needs. Explore one of 721 family-friendly hikes for a sunny weekend. Check out 3 wheelchair-friendly trails with helpful accessibility guidance. Plan your next outdoor adventure to one of 4,424 routes with waterfalls or scenic views
                </p>
                <p className="text-gray-800 text-sm leading-relaxed">
                    Ready to check out the best trails in India for hiking, mountain biking, climbing or other outdoor activities? AllTrails has 3,849 hiking trails, mountain biking routes, backpacking trips and more. Discover hand-curated trail maps, along with reviews and photos from nature lovers like you. No matter what you're looking for, you can find a diverse range of the best hiking trails in India to suit your needs. Explore one of 721 family-friendly hikes for a sunny weekend. Check out 3 wheelchair-friendly trails with helpful accessibility guidance. Plan your next outdoor adventure to one of 4,424 routes with waterfalls or scenic views.  <a href='#' className="underline">Read More</a>
                </p>
                </div>
            </div>
        </div>

        <div className="w-full">
            <div>
                <img
                    src="../assets/images/v5_map.png"
                    alt="Working"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        {/* <section className="container mx-auto px-4 py-8 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src="../assets/images/v5_top.png" />
                    <div>Lorem ipsum</div>
                    <img src="../assets/images/v5_top.png" />
                    <div>Lorem ipsum</div>
                </div>
            </div>
        </section> */}

        <div className="container mx-auto px-4 py-10">
            <div className="py-6">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-center">
                    Top Trails
                </h1>
                
            </div>
            <div className="flex flex-wrap -mx-2">
                {/* Card 1 */}
                {/* <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex">
                        <img
                        src="../assets/images/v5_top.png"
                        alt="Triund Hill Trek"
                        className="w-1/2 object-cover"
                        />
                        <div className="w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#1. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                            This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div> */}
                <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex flex-col sm:flex-row"> {/* Stack on small, row on sm and up */}
                        <img
                            src="../assets/images/v5_top.png"
                            alt="Triund Hill Trek"
                            className="w-full sm:w-1/2 object-cover mb-2 sm:mb-0"
                        />
                        <div className="w-full sm:w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#1. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                                This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex flex-col sm:flex-row"> {/* Stack on small, row on sm and up */}
                        <img
                            src="../assets/images/v5_top.png"
                            alt="Triund Hill Trek"
                            className="w-full sm:w-1/2 object-cover mb-2 sm:mb-0"
                        />
                        <div className="w-full sm:w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#2. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                                This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex flex-col sm:flex-row"> {/* Stack on small, row on sm and up */}
                        <img
                            src="../assets/images/v5_top.png"
                            alt="Triund Hill Trek"
                            className="w-full sm:w-1/2 object-cover mb-2 sm:mb-0"
                        />
                        <div className="w-full sm:w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#3. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                                This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex flex-col sm:flex-row"> {/* Stack on small, row on sm and up */}
                        <img
                            src="../assets/images/v5_top.png"
                            alt="Triund Hill Trek"
                            className="w-full sm:w-1/2 object-cover mb-2 sm:mb-0"
                        />
                        <div className="w-full sm:w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#4. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                                This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex flex-col sm:flex-row"> {/* Stack on small, row on sm and up */}
                        <img
                            src="../assets/images/v5_top.png"
                            alt="Triund Hill Trek"
                            className="w-full sm:w-1/2 object-cover mb-2 sm:mb-0"
                        />
                        <div className="w-full sm:w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#5. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                                This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-2 mb-6">
                    <div className="flex flex-col sm:flex-row"> {/* Stack on small, row on sm and up */}
                        <img
                            src="../assets/images/v5_top.png"
                            alt="Triund Hill Trek"
                            className="w-full sm:w-1/2 object-cover mb-2 sm:mb-0"
                        />
                        <div className="w-full sm:w-1/2 px-4 flex flex-col">
                            <h3 className="font-bold text-md mb-1">#6. Triund Hill Trek</h3>
                            <p className="text-sm text-gray-600 mb-2">47(144), Hard, 95Km</p>
                            <p className="text-sm text-gray-700">
                                This is one of the top tourist destinations in the vicinity of Dharmshala, Himachal Pradesh. Spectacular views with some of the most dramatic weather conditions make up the visuals of this location. Weather is so dramatic that it visuals of this location. Weather is so dramatic that it... <a href="#" className="font-semibold text-black underline">Read More</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Add more cards as needed */}
            </div>
        </div>

        <div className="grid grid-cols-12 h-[400px] w-full overflow-hidden relative">

            <div className="col-span-12 md:col-span-4 h-full relative z-10 overflow-hidden">
                <img
                    src="../assets/images/v5_rev1.png"
                    alt="Left"
                    className="w-full h-full object-cover clip-curve-left"
                />
            </div>

            <div className="col-span-12 md:col-span-8 h-full relative z-0 overflow-hidden">
                <img
                    src="../assets/images/v5_rev2.png"
                    alt="Right"
                    className="w-full h-full object-cover clip-curve-right"
                />


                <div className="absolute top-1/4 left-[10%] bg-white p-4 rounded shadow-lg w-[80%] max-w-[400px]">
                    <h4 className="text-sm font-semibold text-blue-600">Kelly Somal</h4>
                    <p className="text-sm mt-2 text-gray-700 leading-snug">
                        This is a longer and more challenging hike but so rewarding. The views were inspiring throughout the hike but the summit is spectacular.
                    </p>
                    <div className="flex items-center mt-3">
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="ml-2 text-xs text-gray-500">Feb 25, 2025 · Hiking</span>
                    </div>
                </div>

            </div>

        </div>

        

        <div className="container max-auto px-4 py-10">
            <div className="grid grid-cols-12 w-full overflow-hidden relative">
        
                {/* Left Image: col-span-4 (col-md-4) */}
                {/* <div className="col-span-4 h-full relative z-10 overflow-hidden">
                    <div className="flex flex-col justify-center w-1/2 p-4">
                    <h2 className="font-bold" style={{ fontSize: '40px' }}>Frequently asked Questions </h2>
                    </div>
                </div> */}

                <div className="col-span-12 md:col-span-4 h-full relative z-10 overflow-hidden flex items-center justify-center md:justify-start p-4">
                    <h2 className="font-bold text-3xl md:text-4xl">Frequently asked Questions </h2>
                </div>

                {/* Right Image: col-span-8 (col-md-8) */}
                {/* <div className="col-span-8 h-full relative z-0 overflow-hidden"> */}
                <div className="col-span-12 md:col-span-8 h-full relative z-0 overflow-hidden p-4">
                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(0)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
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
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(1)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
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
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(2)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
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
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(3)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
                                    </div>
                                </div>
                                <img
                                    src="../assets/images/down-arrow.png"
                                    alt="Expand"
                                    className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                                />
                            </div>
                        </div>

                            {openIndex === 3 && (
                                <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(4)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
                                    </div>
                                </div>
                                <img
                                    src="../assets/images/down-arrow.png"
                                    alt="Expand"
                                    className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                                />
                            </div>
                        </div>

                            {openIndex === 4 && (
                                <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(5)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
                                    </div>
                                </div>
                                <img
                                    src="../assets/images/down-arrow.png"
                                    alt="Expand"
                                    className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                                />
                            </div>
                        </div>

                            {openIndex === 5 && (
                                <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(6)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
                                    </div>
                                </div>
                                <img
                                    src="../assets/images/down-arrow.png"
                                    alt="Expand"
                                    className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                                />
                            </div>
                        </div>

                            {openIndex === 6 && (
                                <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                    <div className="md:col-span-3">
                                        <p className="text-sm text-gray-800 text-justify">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="mb-4">
                        <div className="p-2 rounded border border-[#C1C1C1] transition cursor-pointer" onClick={() => toggle(7)}>
                            <div className="flex justify-between items-start sm:items-center">
                                <div className="flex items-start space-x-3">
                                    
                                    <div>
                                    <h3 className="font-semibold text-[17px]">Where can I get some?</h3>
                                    
                                    </div>
                                </div>
                                <img
                                    src="../assets/images/down-arrow.png"
                                    alt="Expand"
                                    className="w-5 h-5 border border-black rounded-full mt-2 sm:mt-0"
                                />
                            </div>
                        </div>

                            {openIndex === 7 && (
                                <div className="mt-2 px-2 pb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                    <div className="md:col-span-3">
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



        <div className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Top regions in India</h2>
                <button className="bg-[#7dd3fc] text-sm text-black px-4 py-1 rounded hover:bg-blue-200">
                Show All
                </button>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left: Full Height Image */}
                <div className="relative h-full">
                <img
                    src="../assets/images/v5_r_1.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                    Himachal Pradesh
                </div>

                </div>

                {/* Middle: Two Half-Height Images */}
                <div className="flex flex-col gap-4 h-full">
                <div className="relative h-1/2">
                    <img
                    src="../assets/images/v5_r_2.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>
                <div className="relative h-1/2">
                    <img
                    src="../assets/images/v5_r_3.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>
                </div>

                {/* Right: Full Height Image */}
                <div className="relative h-full">
                <img
                    src="../assets/images/v5_r_1.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                    Himachal Pradesh
                </div>
                </div>
            </div>
        </div>


        <div className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Top parks in India</h2>
                <button className="bg-[#7dd3fc] text-sm text-black px-4 py-1 rounded hover:bg-blue-200">
                Show All
                </button>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                <div className="relative h-full">
                    <img
                        src="../assets/images/v5_r_1.png"
                        alt="Himachal Pradesh"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>

                <div className="relative h-full">
                    <img
                        src="../assets/images/v5_r_1.png"
                        alt="Himachal Pradesh"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>

                <div className="relative h-full">
                    <img
                        src="../assets/images/v5_r_1.png"
                        alt="Himachal Pradesh"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>

                <div className="relative h-full">
                    <img
                        src="../assets/images/v5_r_1.png"
                        alt="Himachal Pradesh"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>

                {/* <div className="relative h-full">
                <img
                    src="../assets/images/v5_r_1.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 text-white font-medium">
                    Himachal Pradesh
                </div>
                </div> */}
            </div>
        </div>

        <div className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Top cities in India</h2>
                <button className="bg-[#7dd3fc] text-sm text-black px-4 py-1 rounded hover:bg-blue-200">
                Show All
                </button>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left: Full Height Image */}
                <div className="relative h-full">
                <img
                    src="../assets/images/v5_r_1.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                    Himachal Pradesh
                </div>

                </div>

                {/* Middle: Two Half-Height Images */}
                <div className="flex flex-col gap-4 h-full">
                <div className="relative h-1/2">
                    <img
                    src="../assets/images/v5_r_2.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>
                <div className="relative h-1/2">
                    <img
                    src="../assets/images/v5_r_3.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                        Himachal Pradesh
                    </div>
                </div>
                </div>

                {/* Right: Full Height Image */}
                <div className="relative h-full">
                <img
                    src="../assets/images/v5_r_1.png"
                    alt="Himachal Pradesh"
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-medium text-center">
                    Himachal Pradesh
                </div>
                </div>
            </div>
        </div>

        

        <div className="bg-gray-100 p-8">
            <h2 className="text-2xl font-semibold mb-6">Explore India</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-16">
                {/* First Column */}
                <div>
                <h3 className="font-semibold mb-4">Top 15 regions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2">
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                </div>
                </div>

                {/* Second Column */}
                <div>
                <h3 className="font-semibold mb-4">Top 15 regions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2">
                <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Column */}
                <div>
                <h3 className="font-semibold mb-4">Top 15 regions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2">
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                </div>
                </div>

                {/* Second Column */}
                <div>
                <h3 className="font-semibold mb-4">Top 15 regions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2">
                <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Himachal Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Uttarakhand</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Maharashtra</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Karnataka</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Telangana</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Ladakh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Andhra Pradesh</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                    <div className="flex items-center space-x-2"><img src="../assets/images/v5-check_arrow.png" alt="arrow" className="" /><span>Sikkim</span></div>
                </div>
                </div>
            </div>

            
        </div>

        


    </div>
  );
};

export default Trail5PageSection;

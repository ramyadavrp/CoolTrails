// src/components/FrameTrailSection.tsx
import React, { useState } from 'react';

const GiftPageSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState(0); // 0 = first item expanded

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const checkIcon = "../assets/images/v5-check_arrow.png";

    const items = [
        '../assets/images/v16_288.png',
        '../assets/images/v5_rev1.png',
        '../assets/images/v6_1.png',
        '../assets/images/v9_56.png',
        '../assets/images/v5_top.png',
        '../assets/images/v5_r_2.png',
        '../assets/images/v5_r_1.png',
        '../assets/images/v9_55.png',
        '../assets/images/v5_r_2.png',
      ];
    
  return (
    <div>
     
        <div className="w-full">
            {/* Background Section */}
            <div
                className="w-full bg-cover bg-center text-white"
                style={{ backgroundImage: "url('../assets/images/affiliate_hero.jpg')" }}
            >
                <div className="bg-black bg-opacity-50">
                    {/* <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        
                        <div className="md:text-left">
                        <h2 className="text-4xl font-semibold leading-tight">
                            GIVE THE GIFT<br />OF ADVENTURE
                        </h2>
                        </div>

                        
                        <div className="border-l-2 border-yellow-500 pl-6 space-y-4 text-sm md:text-base">
                        <p>Download maps to stay on track without service</p>
                        <p>Never miss a turn with wrong-turn alerts</p>
                        <p>Keep your crew in the loop with Live Share</p>
                        <p>Know what to expect with real-time map overlays</p>
                        </div>
                    </div> */}

                    <div className="grid grid-cols-1 md:grid-cols-12 items-start px-4 py-20 gap-8">
                        {/* Left Section - col-md-5 equivalent */}
                        <div className="md:col-span-6">
                            <h3 className="text-4xl font-semibold mb-4 md:pl-[135px] md:pr-[80px] py-[10px] text-left md:float-right">
                            GIVE THE GIFT<br />OF ADVENTURE
                            </h3>
                        </div>

                        {/* Right Section - col-md-7 equivalent */}
                        <div className="md:col-span-6 border-l-2 border-yellow-500 pl-16">
                            <p className="text-sm md:text-base mb-4">
                                Download maps to stay on track without service
                            </p>
                            <p className="text-sm md:text-base mb-4">
                                Never miss a turn with wrong-turn alerts
                            </p>
                            <p className="text-sm md:text-base mb-4">
                                Keep your crew in the loop with Live Share
                            </p>
                            <p className="text-sm md:text-base mb-4">
                                Know what to expect with real-time map overlays
                            </p>
                            <button className="bg-[#00C7E5] text-white font-semibold px-4 py-2 rounded">
                                Start earning
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <div className="w-full bg-gray-100">
            {/* Pricing Section */}
            <div className="container mx-auto py-6 px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Left Text */}
                <div>
                    <p className="font-bold mb-1 text-[24px]">
                    ₹ 83.25/month - billed once at ₹ 999.00
                    </p>
                    <p className="text-[17px] text-gray-600">
                    Cancel within 30 days and receive a full-refund.
                    </p>
                </div>

                {/* Right Button */}
                <div>
                    <button className="bg-[#7dd3fc] hover:bg-blue-200 text-[17px] text-black font-semibold px-6 py-2 rounded">
                    Buy Gift
                    </button>
                </div>
                </div>
            </div>
        </div>

        <div className="container max-auto px-4 py-6">
            <div className="text-center">
                <p className="font-semibold mb-1 text-[36px]">
                An easy way to give joy
                </p>
                <p className="text-[17px] text-gray-600">
                Send the gift of exploration to your friends and family with an AllTrails+ gift subscription.
                </p>
            </div>
        </div>

        
        <div className="grid grid-cols-12 w-full overflow-hidden relative bg-[#F9F9F9]">

            <div className="col-span-12 md:col-span-4 h-full relative z-10 overflow-hidden px-4 py-8 md:py-0">
                <div className=""> 
                    <h2 className="font-semibold text-xl sm:text-[30px] mt-6">Quick and easy</h2>
                    <p className="text-sm sm:text-[17px] text-gray-600">Purchase a gift subscription easily. It arrives in moments and we notify you of delivery.</p>

                    <h2 className="font-semibold text-xl sm:text-[30px] mt-6">Customizable</h2>
                    <p className="text-sm sm:text-[17px] text-gray-600">Choose a design you love and personalize a message.</p>

                    <h2 className="font-semibold text-xl sm:text-[30px] mt-6">Send via email or print</h2>
                    <p className="text-sm sm:text-[17px] text-gray-600">Choose the delivery date the gift subscription will be emailed. Or, print and hand-deliver.</p>
                </div>
            </div>

            <div className="col-span-12 md:col-span-8 h-64 md:h-full relative z-0 overflow-hidden">
                <img
                    src="../assets/images/v6_1.png"
                    alt="Right"
                    className="w-full h-full object-cover clip-curve-right2"
                />
            </div>

        </div>

        <div className="container max-auto px-4 py-6">
            <div className="text-center">
                <p className="font-semibold mb-1 text-[36px]">
                Perfect for all occasions and outdoor enthusiasts.
                </p>
                <p className="text-[17px] text-gray-600">
                Celebrate the people you appreciate on birthdays, holidays, graduations and more. With the ability to browse <br /> by activity, it’s a fitting gift for any type of outdoor explorer in your life.
                </p>
            </div>
        </div>


        <section className="px-4 py-10">
            <div className="max-w-7xl mx-auto">
                
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                {items.map((src, index) => (
                    <div key={index} className="break-inside-avoid rounded overflow-hidden shadow">
                    <img src={src} alt={`Item ${index + 1}`} className="w-full h-auto" />
                    </div>
                ))}
                </div>
            </div>
        </section>


        <div className="container max-auto px-4 py-10">
            <div className="grid grid-cols-12 w-full overflow-hidden relative">
        
                {/* Left Image: col-span-4 (col-md-4) */}
                {/* <div className="col-span-4 h-full relative z-10 overflow-hidden">
                    <div className="flex flex-col justify-center w-1/2 p-4">
                    <h2 className="font-bold" style={{ fontSize: '40px' }}>Frequently asked Questions </h2>
                    </div>
                </div> */}
                <div className="col-span-12 md:col-span-3 lg:col-span-4 h-full relative z-10 overflow-hidden">
                    <div className="flex flex-col justify-center md:w-full p-4">
                        <h2 className="font-bold" style={{ fontSize: '40px' }}>Frequently asked Questions </h2>
                    </div>
                </div>

                {/* Right Image: col-span-8 (col-md-8) */}
                {/* <div className="col-span-8 h-full relative z-0 overflow-hidden"> */}
                <div className="col-span-12 md:col-span-9 lg:col-span-8 h-full relative z-0 overflow-hidden">
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

        <div className="w-full bg-[#EEEEEE]">
            <div className="container max-auto px-4 py-6">
                <div className="text-center">
                    
                    {/* <p className="text-[17px] text-gray-600">
                    As a proud member of 1% for the Planet, we give 1% of our<br /> annual sales to nonprofit organizations focusing on protecting<br /> the wild places we cherish and creating positive change for a<br /> healthier planet.</p> */}
                    <p className="text-[17px] text-gray-600">
                        As a proud member of 1% for the Planet, we give 1% of our
                        <span className="hidden md:inline"><br /></span>
                        annual sales to nonprofit organizations focusing on protecting
                        <span className="hidden md:inline"><br /></span>
                        the wild places we cherish and creating positive change for a
                        <span className="hidden md:inline"><br /></span>
                        healthier planet.
                    </p>
                </div>
            </div>
        </div>

        <section className="bg-white w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Image */}
                <div>
                <img
                    src="../assets/images/mountain.png" // Replace with your actual image path
                    alt="Mountain View"
                    className="w-full h-auto object-cover"
                />
                </div>

                {/* Right Text */}
                <div className="flex items-center justify-center mb-10 md:mb-0">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-semibold mb-2">
                            Give an AllTrails +<br />gift subscription
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Help them get the adventure started.
                        </p>
                        <button className="bg-[#7dd3fc] hover:bg-blue-200 text-black font-semibold px-6 py-2 rounded">
                            Buy Gifts
                        </button>
                    </div>
                </div>

            </div>
        </section>
        


    </div>
  );
};

export default GiftPageSection;

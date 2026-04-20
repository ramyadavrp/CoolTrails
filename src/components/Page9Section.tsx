// src/components/Page9Section.tsx
import React from 'react';
import { Link } from 'react-scroll';

const Page9Section: React.FC = () => {
  return (
    <div>
     
        {/* Hero Section */}
        <div
            className="relative h-[14rem] md:h-[28rem] bg-cover bg-center text-white text-center"
            style={{
                backgroundImage: "url('/assets/images/v9-banner.png')", // fixed path for Vite
            }}
            >
            <div className="absolute inset-0 bg-black opacity-70"></div>

            <div className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 px-4 w-full md:w-auto">
                <p className="text-xs md:text-sm font-semibold uppercase w-full md:max-w-lg">
                Careers at AllTrails
                </p>
                <h2 className="text-sm md:text-2xl font-medium w-full md:max-w-lg">
                Help us kindle the spirit of adventure
                </h2>
            </div>
        </div>


        {/* <div
            className="relative h-[14rem] md:h-[28rem] bg-cover bg-center text-white text-center"
            style={{
                backgroundImage: "url('../assets/images/v9-banner.png')", // adjust path if needed
            }}
        >
           
            <div className="absolute inset-0 bg-black opacity-70"></div>

            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 w-full md:w-auto">
                <p className="max-w-lg text-sm md:text-base font-semibold uppercase">
                    Careers at AllTrails
                </p>
                <h2 className="text-xl md:text-2xl font-medium">
                    Help us kindle the spirit of adventure
                </h2>
            </div>
        </div> */}

        {/* Breadcrumb Section */}
        <div className="bg-[#F5F4F4] w-full">
            <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
                <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-8 space-y-2 md:space-y-0 font-medium">
                
                    {/* Careers Heading */}
                    <button className="text-[18px] md:text-[24px] leading-tight">
                        Careers
                    </button>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 md:gap-y-0">
                        <Link
                        to="aboutAllTrails"
                        smooth={true}
                        duration={500}
                        className="text-gray-500 cursor-pointer"
                        >
                        About AllTrails
                        </Link>
                        <Link
                        to="ourBenefits"
                        smooth={true}
                        duration={500}
                        className="text-gray-500 cursor-pointer"
                        >
                        Our Benefits
                        </Link>
                        <Link
                        to="openPosition"
                        smooth={true}
                        duration={500}
                        className="text-gray-500 cursor-pointer"
                        >
                        Open Position
                        </Link>
                        <Link
                        to="openPosition"
                        smooth={true}
                        duration={500}
                        className="text-gray-500 cursor-pointer"
                        >
                        Browse Open Position
                        </Link>
                    </div>
                </div>
            </div>
        </div>


{/* <div className="bg-[#F5F4F4] w-full">
    <div className="container mx-auto px-4 py-3 text-sm text-gray-600">
        <div className="grid grid-cols-3 gap-x-6 text-sm font-medium md:flex md:space-x-6 md:grid-cols-none">
            <button className="py-2 text-[24px]">Careers</button>
            <button className="py-2 text-gray-500">About AllTrails</button>
            <button className="py-2 text-gray-500">Our Benefits</button>
            <button className="py-2 text-gray-500">Open Position</button>
            <button className="py-2 text-gray-500">Browse Open Position</button>
        </div>
    </div>
</div> */}

        <div className="w-full" id="aboutAllTrails">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Image */}
                
                <div className="px-6 py-10">
                    <p className="mb-4 text-[30px]">
                    Calling all nature lovers
                    </p>
                    <p className="mb-8">We’re out here inspiring people worldwide to enjoy the outdoors. And as a remote-friendly company, our team is distributed too. Just like the trails we love, we’re in the mountains, in deserts, on waterfronts, and in cities big and small. And what brings us together is our love for the trail. Come join us.</p>

                    <img
                        src="../assets/images/v9-3.png"
                        alt="Working"
                        className="w-[70%]"
                    />

                </div>

                {/* Right Content */}
                <div>
                    <img
                        src="../assets/images/v9-2.png"
                        alt="Working"
                        className="w-full object-cover"
                    />
                </div>

            </div>

        </div>

        <div className="py-4 bg-[#F5F4F4] w-full" id="ourBenefits">
            <div className="container mx-auto px-4">
                <div className="text-center">
                <h2 className="text-[46px]">
                With great responsibility comes great benefits
                </h2>
                <p className="mb-4">We’re focused on creating an environment where everyone can do their best work and thrive.<br />
                These benefits are offered to all salaried employees.</p>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 bg-white">
                {/* Card 1 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-4.png" alt="Competitive pay" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">Competitive pay + equity</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-5.png" alt="Unlimited time off" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">Unlimited time off + monthly trail day</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-6.png" alt="Free medical" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">Free medical coverage</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-7.png" alt="Paid parental leave" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">Paid parental leave</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 5 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-8.png" alt="Remote-friendly culture" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">Remote-friendly culture</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 6 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-9.png" alt="401k match" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">401(k) + match</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 7 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-10.png" alt="Internet stipend" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">Internet and education stipends</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>

                {/* Card 8 */}
                <div className="mb-4">
                    <img src="../assets/images/v9-11.png" alt="Donation match" className="mb-3 w-full object-cover rounded-lg" />
                    <h3 className="font-semibold text-[20px] mb-2">100% donation matching</h3>
                    <p className="text-gray-600">
                    When it’s time to focus on the little one, we’ve got you covered. Whether you’re giving birth or adopting, we’re here to support you in your new parent journey.
                    </p>
                </div>
            </div>
        </div>
        
        <div className="w-full bg-[#f5f4f4]">
            <div className="container max-auto px-4 py-6">
                <div className="px-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
                    {/* Left Side */}
                    <div className="md:w-1/4 border-r border-gray-400 pr-4">
                        <h2 className="text-4xl font-medium leading-tight">
                        Working at<br />AllTrails
                        </h2>
                    </div>

                    {/* Right Side */}
                    <div className="md:w-3/4">
                        <p className="text-sm md:text-base mb-2">
                    "I love the flexibility to work remotely. My family is in France and I am very fortunate to be able to work from there at any time of the year."
                        </p>
                        <p className="text-xs text-gray-700">
                        Manon N.<br />DI Operations Manager
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="container max-auto" id="openPosition">
            <div className="py-10 px-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">Find your Path</h2>
                <p className="text-sm mb-1">
                    Ready for a new career adventure? Check out our open positions.
                </p>
                <p className="text-sm mb-8">
                    We love non-traditional candidates, interesting backstories, and people who are here for the mission.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white p-6 text-left border-t border-l border-gray-200 shadow-[6px_6px_12px_rgba(0,0,0,0.15)]">
                    <h3 className="font-semibold mb-2">Design</h3>
                    <p>Lead Product Designer<br />(Remote)</p>
                    <p className="mt-4 font-semibold">Full-time, Remote</p>
                    <div className="mt-4">
                        <img src="../assets/images/icon-arrow-right.png" alt="arrow" className="w-5" />
                    </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 text-left border-t border-l border-gray-200 shadow-[6px_6px_12px_rgba(0,0,0,0.15)]">
                    <h3 className="font-semibold mb-2">Engineering</h3>
                    <p>Engineering Manager<br />DevOps</p>
                    <p className="mt-4 font-semibold">Full-time, Remote</p>
                    <div className="mt-4">
                        <img src="../assets/images/icon-arrow-right.png" alt="arrow" className="w-5" />
                    </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 text-left border-t border-l border-gray-200 shadow-[6px_6px_12px_rgba(0,0,0,0.15)]">
                    <h3 className="font-semibold mb-2">Design</h3>
                    <p>Lead Product Designer<br />(Remote)</p>
                    <p className="mt-4 font-semibold">Full-time, Remote</p>
                    <div className="mt-4">
                        <img src="../assets/images/icon-arrow-right.png" alt="arrow" className="w-5" />
                    </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-6 text-left border-t border-l border-gray-200 shadow-[6px_6px_12px_rgba(0,0,0,0.15)]">
                    <h3 className="font-semibold mb-2">Engineering</h3>
                    <p>Engineering Manager<br />DevOps</p>
                    <p className="mt-4 font-semibold">Full-time, Remote</p>
                    <div className="mt-4">
                        <img src="../assets/images/icon-arrow-right.png" alt="arrow" className="w-5" />
                    </div>
                    </div>
                </div>
            </div>


        </div>

        <div className="w-full flex flex-col md:flex-row items-stretch overflow-hidden bg-[#e7f3f8]">
            {/* Left Section */}
            <div className="w-full md:w-6/12 flex items-center justify-center p-10 relative z-10">
                <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                    We believe nature is what unites us all
                </h2>
                <p className="text-sm mb-6">
                    Learn more about who we are as a company and what we’re all about.
                </p>
                <button className="bg-[#57c1e8] text-black font-semibold text-sm py-2 px-6 rounded hover:bg-[#42b3de] transition">
                    About Us
                </button>
                </div>
            </div>

            {/* Right Section with curved clip-path */}
            <div className="w-full md:w-6/12 relative">
                <img
                src="../assets/images/v9-15.png"
                alt="Sunset"
                className="w-full object-cover relative z-10"
                style={{
                    clipPath: {
                        '@media (min-width: 768px)': 'polygon(28% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    },
                }}
                />

            </div>
        </div>
      

    </div>
  );
};

export default Page9Section;

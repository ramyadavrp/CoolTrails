import React from 'react';

export default function Login() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      
      <nav className="bg-white h-24 shadow relative">
        <div className="container mx-auto flex items-center justify-between px-4 h-full relative z-10">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img src="../assets/images/v66_603.png" alt="CoolTrails Logo" className="h-[115px] w-auto" />
          </div>

          <div className="flex space-x-8 text-sm font-medium pr-4 items-center">
            {/* Explore with dropdown */}
            <div className="relative group">
              <a href="#" className="text-black hover:underline flex items-center gap-1">
                Explore
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md mt-2 rounded text-sm w-40 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Countries</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Regions</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cities</a>
              </div>
            </div>

            {/* Saved */}
            <div className="relative group">
              <a href="#" className="text-black hover:underline flex items-center gap-1">
                Saved
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md mt-2 rounded text-sm w-40 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Trails</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Favorites</a>
              </div>
            </div>

            {/* Shop */}
            <div className="relative group">
              <a href="#" className="text-black hover:underline flex items-center gap-1">
                Shop
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </a>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md mt-2 rounded text-sm w-40 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Gear</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Apparel</a>
              </div>
            </div>

            {/* Login button */}
            <a
              href="#"
              className="hover:underline border-2 border-[#111111] px-3 py-1 rounded-xl flex items-center"
              style={{ color: '#100F0F', fontWeight: 700 }}
            >
              Log In
            </a>
          </div>

        </div>

        {/* Blue background bar with only left curve */}
        <div className="absolute top-0 left-1/4 w-3/4 h-full bg-sky-300 z-0"></div>
        <div className="absolute top-0 left-1/4 -ml-8 w-16 h-full bg-sky-300 -skew-x-[34deg] z-0"></div>
      </nav>

      <div className="flex min-h-screen">
        {/* Left Side - Background Image with Static Overlay */}
        <div
          className="w-1/2 bg-cover bg-center relative overflow-hidden flex flex-col justify-center items-center text-white p-10"
          style={{ backgroundImage: "url('../assets/images/signup-bg.png')" }}
        >
          {/* Always-visible Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

          <div className="relative z-10 text-center">
            <img
              src="../assets/images/signup-logo.png"
              alt="CoolTrails"
              className="w-40 mb-4"
            />
            <h1 className="text-3xl font-bold">Welcome to CoolTrails</h1>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-1/2 bg-[#FED5B5] flex justify-center items-center p-8">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            {/* Tabs */}
            <div className="flex justify-start space-x-4 mb-4 text-sm font-medium">
              <button className="border-b-2 border-black">Sign Up</button>
              <button className="text-gray-500">Sign In</button>
            </div>

            {/* Form Fields */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border-b border-gray-400 outline-none py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-gray-400 outline-none py-2"
              />
              <input
                type="text"
                placeholder="Mobile No"
                className="w-full border-b border-gray-400 outline-none py-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-400 outline-none py-2"
              />

              <button
                type="submit"
                className="bg-orange-400 text-white w-full py-2 mt-2 rounded"
              >
                Sign Up
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="#" className="text-black font-medium">
                Sign In
              </a>
            </p>

            {/* OR line */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-sm text-gray-500">or Sign in with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4">
              <a href="#"><img src="../assets/images/fb.png" alt="Facebook" className="h-8 w-8" /></a>
              <a href="#"><img src="../assets/images/insta.png" alt="Instagram" className="h-8 w-8" /></a>
              <a href="#"><img src="../assets/images/twitter.png" alt="Twitter" className="h-8 w-8" /></a>
              <a href="#"><img src="../assets/images/youtube.png" alt="Youtube" className="h-8 w-8" /></a>
              <a href="#"><img src="../assets/images/whatsapp.png" alt="Whatsapp" className="h-8 w-8" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <footer className="bg-[#3d3d3d] text-white py-12">
        <div className="container mx-auto px-6">
          
          {/* Top Row: Logo and Language Dropdown */}
          <div className="flex justify-between items-center mb-8">
            {/* Logo on the left */}
            <div>
              <img src="../assets/images/v36_46.png" alt="Logo" className="h-[122px]" style={{ position: 'relative', left: '-35px' }} />
            </div>

            {/* Language Dropdown on the right */}
            <div>
              <select
                className="bg-white text-gray-900 px-4 py-2 rounded-xl"
                defaultValue="English"
              >
                <option value="English">English Us</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-12 gap-8 mb-12">
            {/* Left Section (7 columns) */}
            <div className="md:col-span-7 pt-10">
              {/* Footer Links */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                <div>
                  <h3 className="text-xl font-bold mb-4">Explore</h3>
                  <ul className="space-y-2">
                    <li>Countries</li>
                    <li>Regions</li>
                    <li>Cities</li>
                    <li>Parks</li>
                    <li>Trails</li>
                    <li>Trail Features</li>
                    <li>Point of Interest</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Maps</h3>
                  <ul className="space-y-2">
                    <li>My map</li>
                    <li>Create map</li>
                    <li>Print map</li>
                    <li>Route Converter</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li>About</li>
                    <li>Job</li>
                    <li>Press</li>
                    <li>Ambassador</li>
                    <li>Affiliated</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Community</h3>
                  <ul className="space-y-2">
                    <li>Support</li>
                    <li>Give Alltrails+</li>
                    <li>Alltrails Gear</li>
                  </ul>
                </div>
              </div>

              <br />
              <br />

              {/* Footer Bottom Row: App + Planet */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-6 md:space-y-0">
                {/* Left: App promotion */}
                <div>
                  <p className="mb-2 text-lg font-medium">An App for the Outdoor</p>
                  <div className="flex space-x-3">
                    <img src="../assets/images/v13_120.png" alt="Google Play" className="h-8" />
                    <img src="../assets/images/v13_121.png" alt="App Store" className="h-8" />
                  </div>
                </div>

                {/* Right: Planet member badges */}
                <div className="">
                  <p className="font-bold text-lg">Member of the planet</p>
                  <div className="flex space-x-6 mt-2 justify-end">
                    <div className="flex items-center space-x-2 text-[11px]">
                      <img src="../assets/images/vg9_1.png" alt="1%" className="h-6 clt-member-planet-icon" />
                      <span className="clt-member-planet-text">1% for <br />the planet</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <img src="../assets/images/vg9_2.png" alt="One Tree" className="h-6 clt-member-planet-icon" />
                      <span className="clt-member-planet-text">One tree <br /> planet</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <img src="../assets/images/vg9_3.png" alt="Leave no trace" className="h-6 clt-member-planet-icon" />
                      <span className="clt-member-planet-text">Leave no <br />trace</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>


            {/* Right Section (5 columns) */}
            <div className="md:col-span-5">
              <h3 className="text-xl font-bold mb-4 text-white text-center">Contact us</h3>

              <div className="flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-lg">
                
                {/* Left: White form section */}
                <div className="bg-white p-[15px] md:basis-7/12">
                  <h4 className="text-2xl font-bold text-black mb-6">
                    Get in <span className="text-pink-600">Touch</span>
                  </h4>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Phone number *"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700"
                      defaultValue=""
                    >
                      <option value="" disabled>How did you find us?</option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend/Referral</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
                    >
                      SEND
                    </button>
                  </form>

                  {/* Bottom contact info */}
                  <div className="mt-6 text-[7px] text-gray-700 flex flex-wrap justify-between gap-4">
                    <div className="flex items-start space-x-2">
                      <img src="../assets/images/phone_icon.png" alt="Phone" className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-semibold">Phone:</p>
                        <p>03 5428 1234</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <img src="../assets/images/fax_icon.png" alt="Fax" className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-semibold">Fax:</p>
                        <p>03 5428 1234</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <img src="../assets/images/email_icon.png" alt="Email" className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="font-semibold">Email:</p>
                        <p>info@marsc.com.au</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Map section */}
                <div className="bg-black md:basis-5/12 flex items-center justify-center px-4 py-12 pl-0">
                  <img
                    src="../assets/images/v21_69.png"
                    alt="Map"
                    className="w-full object-cover h-[302px]"
                  />
                </div>
              </div>
            </div>
            
            <div className="clt-social-icons md:col-span-12 text-right">
              <div className="inline-flex gap-2">
                <a href="#" className="border border-white p-1 rounded">
                  <img src="../assets/images/v14_209.png" alt="Instagram" className="h-6 w-6" />
                </a>
                <a href="#" className="border border-white p-1 rounded">
                  <img src="../assets/images/v14_210.png" alt="Twitter" className="h-6 w-6" />
                </a>
                <a href="#" className="border border-white p-1 rounded">
                  <img src="../assets/images/v14_211.png" alt="TikTok" className="h-6 w-6" />
                </a>
                <a href="#" className="border border-white p-1 rounded">
                  <img src="../assets/images/v14_212.png" alt="LinkedIn" className="h-6 w-6" />
                </a>
                <a href="#" className="border border-white p-1 rounded">
                  <img src="../assets/images/v14_213.png" alt="Facebook" className="h-6 w-6" />
                </a>
              </div>
            </div>



          </div>

          {/* Bottom links */}
          <div className="border-t border-gray-500 pt-4 text-sm flex flex-wrap justify-between">
            <div className="space-x-4">
              <a href="#">Privacy policy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies Policy</a>
              <a href="#">Manage Cookies</a>
            </div>
          </div>

          {/* Copyright */}
          <p className="mt-4 text-xs text-gray-300">
          © 2010-2025 AllTrails, LLC <br /> ALLTRAILS® and the AllTrails Mountain Design are registered trademarks of AllTrails,
 <br />LLC in the United States as well as certain other jurisdictions.
<br />FIND YOUR OUTSIDE™ is a trademark of AllTrails, LLC.
          </p>
        </div>
      </footer>

    </div>
  );
}

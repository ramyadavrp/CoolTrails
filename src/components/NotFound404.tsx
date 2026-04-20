import React from 'react';

const NotFound404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white">
      {/* Icon */}
      <div className="mb-6">
        {/* Replace this with your actual SVG or <img src={campIcon} /> */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-black"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M20 54L32 10L44 54H36L32 40L28 54H20Z"
          />
          <path
            d="M48 10L44 54"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="52" cy="12" r="2" fill="currentColor" />
        </svg> */}
      </div>

      {/* 404 Label */}
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-400">404</h2>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
        We've reached the end of the trail
      </h1>

      {/* Description */}
      <p className="mt-4 text-gray-700 text-base max-w-xl">
        The page you're looking for either doesn't exist or has a new link. Let's get you back on the right path.
      </p>

      {/* Button */}
      <button className="mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition">
        Find your next trail
      </button>
    </div>
  );
};

export default NotFound404;

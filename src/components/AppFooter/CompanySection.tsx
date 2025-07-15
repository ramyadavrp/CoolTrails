// src/components/CompanySection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const CompanySection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left">
    {/* Logo on the top (mobile) or left (desktop) */}
    <div className="mb-4 md:mb-0">
      <Link to="/">
        <img
          src="../assets/images/v36_46.png"
          alt="Logo"
          className="h-[122px] mx-auto md:mx-0 md:relative md:left-[-35px]"
        />
      </Link>
    </div>

    {/* Language Dropdown on the bottom (mobile) or right (desktop) */}
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
  );
};

export default CompanySection;

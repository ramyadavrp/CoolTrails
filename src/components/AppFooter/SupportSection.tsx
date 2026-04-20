// src/components/SupportSection.tsx
import React from 'react';

const SupportSection: React.FC = () => {
  return (
    <div>
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
  );
};

export default SupportSection;

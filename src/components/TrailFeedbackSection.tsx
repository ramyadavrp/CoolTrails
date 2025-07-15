// src/components/TrailFeedbackSection.tsx
import React from 'react';

const TrailFeedbackSection: React.FC = () => {
  return (
    <section className="w-full py-16 text-white clt-blue-section" style={{ backgroundColor: '#87CEEB' }}>
      <div className="container mx-auto px-4">
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Column 1 */}
          <div className="flex flex-col items-center px-[30px]">
            <img src="../assets/images/vg9_1.png" alt="One Tree Planted" className="w-16 h-16 mb-4 clt-img-icon" />
            <h3 className="text-xl font-semibold mb-2">1% of planet</h3>
            <p>From new member invites to employee anniversaries, we celebrate by giving to One Tree Planted.</p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center px-[30px]">
            <img src="../assets/images/vg9_2.png" alt="1% for the Planet" className="w-16 h-16 mb-4 clt-img-icon" />
            <h3 className="text-xl font-semibold mb-2">10,000 trees (and counting)</h3>
            <p>We contribute a portion of proceeds to global sustainability efforts through the 1% for the Planet initiative.</p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center px-[30px]">
            <img src="../assets/images/vg9_3.png" alt="Leave No Trace" className="w-16 h-16 mb-4 clt-img-icon" />
            <h3 className="text-xl font-semibold mb-2">No trace on the trail</h3>
            <p>As a Leave No Trace partner, we’re committed to keeping outdoor spaces clean, safe, and kind.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-lg font-medium">
            Get AllTrails+ and give feedback
          </button>
        </div>

      </div>
    </section>
  );
};

export default TrailFeedbackSection;

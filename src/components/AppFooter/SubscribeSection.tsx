// src/components/SubscribeSection.tsx
import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const SubscribeSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    find_us: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // clear error on change
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    //console.log(formData);
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phone_no.trim()) {
      newErrors.phone_no = 'Phone number is required.';
    } else if (!/^\d+$/.test(formData.phone_no)) {
      newErrors.phone_no = 'Phone number must contain only digits.';
    }
    if (!formData.find_us) {
      newErrors.find_us = 'Please select how you found us.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/home/getintouchform`, formData);

      if (response.data.status === 'success') {
        setSuccessMsg('Message sent successfully!');
        setFormData({ name: '', email: '', phone_no: '', find_us: '' });
        setErrors({});
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Server error. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-12 gap-8 mb-12">
            {/* Left Section (7 columns) */}
            <div className="md:col-span-7 pt-10">
              {/* Footer Links */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-center md:text-left">
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

              <span className="hidden md:inline">
                <br />
                <br />
              </span>


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
                <div className="text-center md:text-left">
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
                  {/* <form className="space-y-4">
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
                  </form> */}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none text-black`}
                      />
                      {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none text-black`}
                      />
                      {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="phone_no"
                        placeholder="Phone number *"
                        value={formData.phone_no}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.phone_no ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none text-black`}
                      />
                      {errors.phone_no && <p className="text-red-600 text-sm">{errors.phone_no}</p>}
                    </div>

                    <div>
                      <select
                        name="find_us"
                        value={formData.find_us}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.find_us ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-700 text-black`}
                      >
                        <option value="" disabled>How did you find us?</option>
                        <option value="search">Search Engine</option>
                        <option value="social">Social Media</option>
                        <option value="friend">Friend/Referral</option>
                      </select>
                      {errors.find_us && <p className="text-red-600 text-sm">{errors.find_us}</p>}
                    </div>

                    {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
                    {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'SEND'}
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
                <div className="bg-black md:basis-5/12 flex items-center justify-center px-4 py-12 pl-4 md:pl-0">
                  <img
                    src="../assets/images/v21_69.png"
                    alt="Map"
                    className="w-full object-cover h-[302px]"
                  />
                </div>
              </div>
            </div>
            
            <div className="clt-social-icons text-center md:text-right md:col-span-12">
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
  );
};

export default SubscribeSection;

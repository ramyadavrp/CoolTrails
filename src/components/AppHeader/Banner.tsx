// src/components/Banner.tsx
import React from 'react';

const Banner: React.FC = () => {
  return (
      <section className="home-hero-section">
        <div className="container-fluid  bg-image">
            <div className="row">
                <div className="col-xl-12">
                    <div className="home-hero-content text-center">
                        <h1 className="hh-title text-white mb-4"><span className="d-block text-1">Find Your</span> <span
                                className="d-block text-2">Next Adventure</span></h1>

                        <form action="#!" className="hh-search-form position-relative">
                            <input type="text" placeholder="Search by City, Park or Trail Name" className="inputbox"
                                name="Searchbox" />
                            <button className="search-btn" title="Search"><i className="bi bi-search"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>
  );
};

export default Banner;

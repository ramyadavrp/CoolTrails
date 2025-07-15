// src/components/ReviewSection.tsx
import React, { useEffect, useRef } from 'react';

// Declare jQuery globally for TypeScript
declare global {
  interface Window {
    $: JQuery;
    jQuery: JQuery;
  }
}

const ReviewSection: React.FC = () => {
    // Create refs for your slider elements
    const followSl1Ref = useRef<HTMLDivElement>(null);
    const followSl2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to initialize a slick slider
        const initSlickSlider = (ref: React.RefObject<HTMLDivElement>, options: object) => {
            if (ref.current && window.$ && typeof window.$.fn.slick === 'function') {
                // Check if slick is already initialized to prevent re-initialization errors
                if (!window.$(ref.current).hasClass('slick-initialized')) {
                    window.$(ref.current).slick(options);
                }
            } else {
                console.warn("jQuery or Slick Carousel is not defined or ref is null. Ensure they are loaded correctly.");
            }
        };

        // Initialize the first slider
        initSlickSlider(followSl1Ref, {
            centerMode: true,
            centerPadding: '80px',
            slidesToShow: 3,
            dots: false,
            arrows: false,
            cssEase: 'linear',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 15000,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3, centerPadding: '10px' } },
                { breakpoint: 1023, settings: { slidesToShow: 2, centerPadding: '30px' } },
                { breakpoint: 991, settings: { slidesToShow: 2, centerPadding: '30px' } },
                { breakpoint: 767, settings: { slidesToShow: 1, centerPadding: '50px' } },
                { breakpoint: 576, settings: { slidesToShow: 1, centerPadding: '10px' } },
                { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '10px' } }
            ]
        });

        // Initialize the second slider
        initSlickSlider(followSl2Ref, {
            centerMode: true,
            centerPadding: '80px',
            slidesToShow: 3,
            dots: false,
            arrows: false,
            cssEase: 'linear',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 15000,
            pauseOnHover: true,
            pauseOnFocus: true,
            rtl: true,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3, centerPadding: '10px' } },
                { breakpoint: 1023, settings: { slidesToShow: 2, centerPadding: '30px' } },
                { breakpoint: 991, settings: { slidesToShow: 2, centerPadding: '30px' } },
                { breakpoint: 767, settings: { slidesToShow: 1, centerPadding: '50px' } },
                { breakpoint: 576, settings: { slidesToShow: 1, centerPadding: '10px' } },
                { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '10px' } }
            ]
        });

        // Cleanup function: This runs when the component unmounts
        return () => {
            const destroySlickSlider = (ref: React.RefObject<HTMLDivElement>) => {
                if (ref.current && window.$ && typeof window.$.fn.slick === 'function') {
                    // Check if slick is initialized before unslicking
                    if (window.$(ref.current).hasClass('slick-initialized')) {
                        try {
                            window.$(ref.current).slick('unslick');
                        } catch (e) {
                            console.error("Error unslicking slider:", e);
                        }
                    }
                }
            };
            destroySlickSlider(followSl1Ref);
            destroySlickSlider(followSl2Ref);
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    // Data for explorers to use with .map() and unique keys
    const explorers = [
        { id: 1, name: "Amar Zahid", location: "Pershore, Worcestershire, England", memberSince: "August 2024", image: "assets/images/fellow-explorer/1.png" },
        { id: 2, name: "Maikhal", location: "Pershore, Worcestershire, England", memberSince: "August 2024", image: "assets/images/fellow-explorer/2.png" },
        { id: 3, name: "Britt Willoughby", location: "Pershore, Worcestershire, England", memberSince: "August 2024", image: "assets/images/fellow-explorer/3.png" },
        // Add more explorers as needed, ensuring unique IDs
    ];

    return (
        <section className="section-fellow-explorers">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title text-center">
                            <h2 className="title">Follow Fellow <span>Explorers</span></h2>
                            <p className="mb-4">Stay inspired by following hikers, bikers, and nature lovers who share your
                                passion for adventure.</p>
                            <a href="" className="btn-style-3">Explore the Community</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 px-0">
                        <div className="position-relative">
                            {/* Attach the ref to the slider container */}
                            <div className="follow-fellow-slider" id="followSl-1" ref={followSl1Ref}>
                                {explorers.map(explorer => (
                                    <div key={explorer.id}> {/* Add unique key here */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative">
                                            <div className="ff-thumb">
                                                <img src={explorer.image} alt="" className="img-fluid" />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.name}</h3>
                                                <p>{explorer.location} Member since&nbsp;{explorer.memberSince} </p>
                                                <a href="" className="btn-style-1 stretched-link">Follow</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Duplicate explorers for the second carousel to ensure enough items for continuous scroll */}
                                {explorers.map(explorer => (
                                    <div key={`dup1-${explorer.id}`}> {/* Unique key for duplicated items */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative">
                                            <div className="ff-thumb">
                                                <img src={explorer.image} alt="" className="img-fluid" />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.name}</h3>
                                                <p>{explorer.location} Member since&nbsp;{explorer.memberSince} </p>
                                                <a href="" className="btn-style-1 stretched-link">Follow</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-0">
                        <div className="position-relative" dir="rtl">
                            {/* Attach the ref to the second slider container */}
                            <div className="follow-fellow-slider" id="followSl-2" ref={followSl2Ref}>
                                {explorers.map(explorer => (
                                    <div key={`2-${explorer.id}`}> {/* Unique key for second carousel */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative"
                                            dir="rtl">
                                            <div className="ff-thumb">
                                                <img src={explorer.image} alt="" className="img-fluid" />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.name}</h3>
                                                <p>{explorer.location} Member since&nbsp;{explorer.memberSince} </p>
                                                <a href="" className="btn-style-1 stretched-link">Follow</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* Duplicate explorers for the second carousel to ensure enough items for continuous scroll */}
                                {explorers.map(explorer => (
                                    <div key={`dup2-${explorer.id}`}> {/* Unique key for duplicated items in second carousel */}
                                        <div className="follow-fellow-single d-flex br-20 align-items-center position-relative"
                                            dir="rtl">
                                            <div className="ff-thumb">
                                                <img src={explorer.image} alt="" className="img-fluid" />
                                            </div>
                                            <div className="ff-content">
                                                <h3 className="ff-title">{explorer.name}</h3>
                                                <p>{explorer.location} Member since&nbsp;{explorer.memberSince} </p>
                                                <a href="" className="btn-style-1 stretched-link">Follow</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ReviewSection;
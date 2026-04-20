import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { generateSlug } from "../utils/helpers";

import "owl.carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const HomeTrails: React.FC = () => {
  const [topCategory, setCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    axios
      .get(`${BASE_URL}/home/topcategory/10`)
      .then((res) => setCategory(res.data.data || []))
      .catch(() => setError("Unable to fetch category"))
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- INIT OWL ---------------- */
  useEffect(() => {
    if (!loading && topCategory.length > 0) {
      const $owl = $("#activitySl");

      if ($owl.hasClass("owl-loaded")) {
        $owl.trigger("destroy.owl.carousel");
        $owl.removeClass("owl-loaded");
        $owl.find(".owl-stage-outer").children().unwrap();
      }

      $owl.owlCarousel({
        loop: true,
        center: true,
        autoplay: true,
        autoplayTimeout: 5000,
        margin: 15,
        dots: false,
        nav: false,
        responsive: {
          0: { items: 2 },
          768: { items: 3 },
          992: { items: 4 },
          1300: { items: 6 },
        },
      });
    }
  }, [loading]);

  /* ---------------- STATES ---------------- */
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <SyncLoader color="#FC673C" size={18} />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  /* ---------------- JSX ---------------- */
  return (
    <section className="section-activity default-padding">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="cooltrails-title text-center">
              <h2 className="title">
                Browse by <span>Activity</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 px-0">
            <div className="position-relative activity-wrapper">
              {/* SLIDER */}
              <div
                className="activity-slider-container owl-carousel owl-theme"
                id="activitySl"
              >
                {topCategory.map((cat, index) => (
                  <div className="activity-single" key={index}>
                    <div className="activity-img position-relative">
                      <img
                        src={cat.image || "/assets/images/not-found.jpg"}
                        alt={cat.title}
                        onError={(e: any) =>
                          (e.currentTarget.src =
                            "/assets/images/not-found.jpg")
                        }
                      />
                      <Link
                        to={`/explore/${generateSlug(cat.title)}`}
                        className="activity-overlay d-flex align-items-end h-100 w-100"
                      >
                        <span className="overlay-title d-block w-100 text-center">
                          {cat.title}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONTROLS */}
              <div className="best-view-slider-control activity-slider-controls">
                <button
                  type="button"
                  className="arrow-btn btn-abs-middle btn-previous rounded-circle"
                  onClick={() => $("#activitySl").owlCarousel("prev")}
                >
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M7.38118 15L1.52122 9.23744C0.826258 8.55402 0.826258 7.44598 1.52122 6.76256L7.38118 0.999999M2.04246 8L17 8"
                          stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />

                  </svg>
                </button>

                <button
                  type="button"
                  className="arrow-btn btn-abs-middle btn-next rounded-circle"
                  onClick={() => $("#activitySl").owlCarousel("next")}
                >
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.6188 15L16.4788 9.23744C17.1737 8.55402 17.1737 7.44598 16.4788 6.76256L10.6188 0.999999M15.9575 8L1 8"
                                    stroke="#C6C6D1" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrails;

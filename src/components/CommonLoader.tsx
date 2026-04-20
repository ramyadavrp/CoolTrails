import React from "react";
// import "./loader.css"; // animation ke liye

const CommonLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#FFF5E9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <img
        src="/assets/images/logo.svg"
        alt="Loading..."
        style={{
          width: "150px",
          height: "150px",
          animation: "zoomSpin 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default CommonLoader;
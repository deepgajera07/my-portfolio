import React, { useState, useEffect } from "react";
import "./Preloader.css";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Allow the liquid animation to play smoothly for a brief moment
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1200);
      return timer;
    };

    let timerId;
    if (document.readyState === "complete") {
      timerId = handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback in case load takes longer or readyState is interactive
      const fallbackTimer = setTimeout(() => {
        setLoading(false);
      }, 2500);

      return () => {
        window.removeEventListener("load", handleLoad);
        if (timerId) clearTimeout(timerId);
        clearTimeout(fallbackTimer);
      };
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  // Remove preloader from DOM after fade-out transition completes
  useEffect(() => {
    if (!loading) {
      const unmountTimer = setTimeout(() => {
        setIsMounted(false);
      }, 550);
      return () => clearTimeout(unmountTimer);
    }
  }, [loading]);

  if (!isMounted) return null;

  return (
    <div
      className={`preloader-overlay ${!loading ? "fade-out" : ""}`}
      aria-hidden={!loading}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="liquid-loader">
        <div className="loading-text">
          Loading<span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>

        <div className="loader-track">
          <div className="liquid-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

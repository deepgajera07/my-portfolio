import React, { useState, useRef, useEffect, useCallback } from "react";
import { portfolioData } from "../../config/portfolioData";
import Button from "../Button";
import "./OurWork.css";

// Import project showcase images
import rhodiumErpImg from "../../assets/images/Rhodium-Master_ERP.jpg";
import cavierIndiaImg from "../../assets/images/cavierIndia.jpg";
import invoiceSoftImg from "../../assets/images/Invoice-Soft.jpg";
import finoxImg from "../../assets/images/Finox-Brass-Industries.jpg";
import rhodiumMasterImg from "../../assets/images/Rhodium-Master.jpg";
import caneIndiaImg from "../../assets/images/Caneindia.jpg";
import sunriseImg from "../../assets/images/Sunrise-BrassIndustries.jpg";
import skylineImg from "../../assets/images/Skyline.jpg";
import mmplImg from "../../assets/images/MMPL.jpg";
import aumAutomationImg from "../../assets/images/Aumautomation.jpg";

// Map image names to imported image assets
const projectImages = {
  "Rhodium-Master_ERP.jpg": rhodiumErpImg,
  "Rhodium-Master_ERP": rhodiumErpImg,
  "cavierIndia.jpg": cavierIndiaImg,
  "cavierIndia": cavierIndiaImg,
  "Invoice-Soft.jpg": invoiceSoftImg,
  "Invoice-Soft": invoiceSoftImg,
  "Finox-Brass-Industries.jpg": finoxImg,
  "Finox-Brass-Industries": finoxImg,
  "Rhodium-Master.jpg": rhodiumMasterImg,
  "Rhodium-Master": rhodiumMasterImg,
  "Caneindia.jpg": caneIndiaImg,
  "Caneindia": caneIndiaImg,
  "Sunrise-BrassIndustries.jpg": sunriseImg,
  "Sunrise-BrassIndustries": sunriseImg,
  "Skyline.jpg": skylineImg,
  "Skyline": skylineImg,
  "MMPL.jpg": mmplImg,
  "MMPL": mmplImg,
  "Aumautomation.jpg": aumAutomationImg,
  "Aumautomation": aumAutomationImg,
};

const OurWork = () => {
  const { ourWork } = portfolioData;
  const rawProjects = ourWork?.projects || [];
  const totalSlides = rawProjects.length;

  // Infinite Loop Slider Setup:
  // We prepend the last slide and append the first two slides so peek view is seamless.
  // [last, ...projects, first, second]
  const extendedSlides = totalSlides > 0
    ? [
        { ...rawProjects[totalSlides - 1], _virtualKey: "clone-prev" },
        ...rawProjects.map((p) => ({ ...p, _virtualKey: p.id })),
        { ...rawProjects[0], _virtualKey: "clone-next-0" },
        { ...rawProjects[1 % totalSlides], _virtualKey: "clone-next-1" },
      ]
    : [];

  // Start at index 1 (the first real project)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const isAnimatingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Seamless Infinite Jump at boundary
  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;

    if (currentIndex >= totalSlides + 1) {
      // Reached the clone of slide 0 -> jump silently to real slide 0 (index 1)
      setWithTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached the clone of slide 3 -> jump silently to real slide 3 (index totalSlides)
      setWithTransition(false);
      setCurrentIndex(totalSlides);
    }
  };

  // Re-enable transitions after silent jump
  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  // Autoplay Loop (Runs every 4.5 seconds, pauses on hover or user drag)
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [handleNext, isPaused, totalSlides]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  // Touch & Swipe handlers
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 45;
    if (Math.abs(diff) > threshold && touchEndXRef.current !== 0) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
    setIsPaused(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsPaused(true);
    isDraggingRef.current = true;
    touchStartXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    touchEndXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 60;
    if (Math.abs(diff) > threshold && touchEndXRef.current !== 0) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
    setIsPaused(false);
  };

  if (!rawProjects.length) return null;

  return (
    <section
      id="projects"
      className="work-section"
      aria-label="Our Work Portfolio Showcase"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="work-container">
        {/* Top Header: Subheading & Heading (Left) + Prev/Next Controls (Right) */}
        <div className="work-header">
          <div className="work-header-left">
            <span className="work-eyebrow">{ourWork.eyebrow}</span>
            <h2 className="work-title">
              {ourWork.titlePrefix || "Our"}{" "}
              <span className="work-title-accent">
                {ourWork.titleAccent || "Work"}
                <span className="work-title-dot">.</span>
              </span>
            </h2>
            {ourWork.subtitle && (
              <p className="work-subtitle">{ourWork.subtitle}</p>
            )}
          </div>

          {/* Hero-styled Prev & Next Buttons on Upper Right (Looping Continuous) */}
          <div className="work-nav-controls" aria-label="Slider Controls">
            <div className="work-nav-buttons">
              <button
                type="button"
                className="work-nav-btn work-prev-btn"
                onClick={handlePrev}
                aria-label="Previous Slide (Loops)"
                title="Previous Slide"
              >
                <svg
                  className="nav-arrow-icon"
                  width="18"
                  height="14"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M15 6H1M1 6L6 1M1 6L6 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="work-nav-btn work-next-btn"
                onClick={handleNext}
                aria-label="Next Slide (Loops)"
                title="Next Slide"
              >
                <svg
                  className="nav-arrow-icon"
                  width="18"
                  height="14"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 6H15M15 6L10 1M15 6L10 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider Wrapper */}
        <div
          className="work-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className={`work-slider-track ${!withTransition ? "no-transition" : ""}`}
            onTransitionEnd={handleTransitionEnd}
            style={{
              "--current-index": currentIndex,
            }}
          >
            {extendedSlides.map((project, idx) => {
              const imageSrc =
                projectImages[project.imageName] || project.image || rhodiumErpImg;

              const isCurrentActive = idx === currentIndex;

              return (
                <article
                  key={`${project._virtualKey}-${idx}`}
                  className={`work-card ${isCurrentActive ? "work-card-active" : ""}`}
                  aria-hidden={!isCurrentActive}
                >
                  {/* Upper Image Display */}
                  <div className="work-image-wrapper">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="work-image"
                      loading="lazy"
                    />
                    <div className="work-image-glow-overlay" />
                  </div>

                  {/* Work Details with Space Below Image */}
                  <div className="work-details">
                    {/* Sub Heading */}
                    <span className="work-card-category">{project.category}</span>

                    {/* Heading */}
                    <h3 className="work-card-title">{project.title}</h3>

                    {/* View Project Link Styled with Button Component (Variant 1: Purple Theme) */}
                    {Boolean(project.link) && (
                      <div className="work-action-group">
                        <Button
                          variant="purple"
                          href={project.link}
                          className="work-view-btn"
                          target={project.link?.startsWith("http") ? "_blank" : "_self"}
                          rel={project.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                          ariaLabel={`View Project: ${project.title}`}
                        >
                          {project.linkText || "View Project"}
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;

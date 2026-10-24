import React from "react";
import Button from "./Button";
import HeroBackground from "./HeroBackground";
import { siteConfig } from "../config/siteConfig";
import profileImage from "../assets/images/profile.png";

const Hero = () => {
  const { hero, personal } = siteConfig;

  return (
    <section className="hero-section" id="home" aria-label="Hero Introduction">
      {/* Falling Vertical Lines Background Animation */}
      <HeroBackground />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Content & Call-to-Action */}
          <div className="hero-content">
            <span className="hero-intro-label" role="doc-subtitle">
              {hero.intro}
            </span>

            <h1 className="hero-main-headline">
              <span className="hero-headline-primary">{hero.mainHeadlinePrefix} </span>
              <span className="hero-headline-accent">{hero.mainHeadlineAccent}</span>
            </h1>

            <h2 className="hero-supporting-headline">
              {hero.supportingHeadline}
            </h2>

            <p className="hero-paragraph">
              {hero.paragraph}
            </p>

            <div className="hero-cta-group">
              <Button
                variant="purple"
                href={hero.secondaryCta.href}
                className="hero-contact-cta"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Right Column: Prominent Portrait Image */}
          <div className="hero-image-column">
            <div className="hero-image-wrapper">
              <img
                src={profileImage}
                alt={`${personal.name} - ${personal.role} Portrait`}
                className="hero-profile-image"
                loading="eager"
                width={832}
                height={671}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

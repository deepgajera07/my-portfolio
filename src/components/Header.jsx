import React, { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ContactLink from "./ContactLink";
import MobileMenu from "./MobileMenu";
import { siteConfig } from "../config/siteConfig";

const Header = ({ activeSection = "Home", onSectionChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container header-container">
        {/* Left: Text-based Personal Logo */}
        <Logo
          onClick={() => {
            if (onSectionChange) onSectionChange("Home");
          }}
        />

        {/* Center / Right: Desktop Navigation */}
        <div className="header-actions">
          <Navigation
            items={siteConfig.navigation}
            activeItem={activeSection}
            className="desktop-nav"
            onItemClick={(item) => {
              if (onSectionChange) onSectionChange(item.label);
            }}
          />

          {/* Far Right: Contact Number with Phone Icon */}
          <ContactLink className="desktop-contact" />

          {/* Mobile 9-Dots Menu Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="nine-dots-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="3" cy="3" r="2" />
              <circle cx="10" cy="3" r="2" />
              <circle cx="17" cy="3" r="2" />
              <circle cx="3" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="17" cy="10" r="2" />
              <circle cx="3" cy="17" r="2" />
              <circle cx="10" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeItem={activeSection}
        onNavigate={(item) => {
          if (onSectionChange) onSectionChange(item.label);
        }}
      />
    </header>
  );
};

export default Header;

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import ContactLink from "./ContactLink";
import { siteConfig } from "../config/siteConfig";

const MobileMenu = ({ isOpen, onClose, activeItem, onNavigate }) => {
  const closeButtonRef = useRef(null);

  // Focus trap / escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { logoText, logoAccent, role } = siteConfig.personal;

  return (
    <div
      className="mobile-menu-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div
        className="mobile-menu-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of Offcanvas */}
        <div className="mobile-menu-header">
          <div className="mobile-brand-box">
            <span className="mobile-brand-title">
              {logoText}
              <span className="logo-dot">{logoAccent}</span>
            </span>
            <span className="mobile-brand-subtitle">{role}</span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-menu-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>

        {/* Editorial Numbered Navigation List */}
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <span className="mobile-section-heading">Navigation</span>
          <ul className="mobile-nav-list">
            {siteConfig.navigation.map((item, index) => {
              const isActive = activeItem === item.label;

              return (
                <li
                  key={item.label}
                  className="mobile-nav-item"
                  style={{ "--item-index": index }}
                >
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={(e) => {
                      if (onNavigate) onNavigate(item);
                      onClose();
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="mobile-link-label">{item.label}</span>
                    <ArrowUpRight
                      className="mobile-link-arrow"
                      size={18}
                      strokeWidth={2}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with Status & Executive Phone Link */}
        <div className="mobile-menu-footer">
          <div className="mobile-contact-group">
            <span className="mobile-contact-caption">Direct Line</span>
            <ContactLink className="mobile-contact-link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

import React from "react";
import Logo from "../Logo";
import { siteConfig } from "../../config/siteConfig";
import { portfolioData } from "../../config/portfolioData";
import { ArrowUpRight } from "lucide-react";
import "./Footer.css";

// Social Icons SVGs (LinkedIn & Instagram)
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const { navigation } = siteConfig;
  const socials = portfolioData?.contact?.socials || [];

  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Main 2-Part Grid: 80% About Me | 20% Quick Links */}
        <div className="footer-main-grid">
          {/* Left Column (80%): About Me */}
          <div className="footer-about-col">
            <div className="footer-brand-wrap">
              <Logo />
              <span className="footer-role-badge">Jr. Web Developer</span>
            </div>

            <p className="footer-about-text">
              Passionate Junior Web Developer specialized in creating modern, responsive, and reliable web applications. Focused on writing clean, maintainable code using HTML5, CSS3, JavaScript, Bootstrap 5, PHP, Laravel, and MySQL to craft intuitive digital experiences.
            </p>

            <div className="footer-social-group">
              <span className="footer-social-label">CONNECT WITH ME</span>
              <div className="footer-social-links" role="list">
                {socials.map((social) => {
                  const isInstagram = social.name?.toLowerCase().includes("instagram");
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`footer-social-link ${
                        isInstagram
                          ? "footer-social-instagram"
                          : "footer-social-linkedin"
                      }`}
                      aria-label={`${social.name} Profile`}
                      title={social.name}
                    >
                      {isInstagram ? <InstagramIcon /> : <LinkedinIcon />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (20%): Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-nav-list" role="list">
              {navigation.map((item) => (
                <li key={item.label} className="footer-nav-item">
                  <a href={item.href} className="footer-nav-link">
                    <span>{item.label}</span>
                    <ArrowUpRight size={15} className="footer-nav-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section: Reserved & Developed By */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {CURRENT_YEAR} <span className="footer-highlight">Deep Patel</span>. All Rights Reserved.
            </p>
            <p className="footer-credit">
              Designed &amp; Developed by <span className="footer-highlight">Deep Patel</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

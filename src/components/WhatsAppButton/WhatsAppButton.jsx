import React, { useState } from "react";
import "./WhatsAppButton.css";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.569.722 4.969 1.975 7.022L2.5 29.5l6.684-1.934A13.438 13.438 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.625c-2.222 0-4.334-.634-6.134-1.734l-.441-.269-4.325 1.25 1.259-4.225-.288-.456A11.12 11.12 0 0 1 4.875 16c0-6.134 4.991-11.125 11.125-11.125 6.134 0 11.125 4.991 11.125 11.125 0 6.134-4.991 11.125-11.125 11.125zm6.541-8.319c-.359-.181-2.128-1.05-2.459-1.169-.328-.122-.569-.181-.809.181-.241.359-.928 1.169-1.138 1.409-.209.241-.422.269-.781.091-2.269-1.134-3.75-2.025-5.244-4.594-.397-.681.397-.631 1.134-2.106.122-.241.059-.453-.031-.634-.091-.181-.809-1.95-1.109-2.672-.294-.703-.594-.606-.809-.619-.209-.009-.45-.009-.691-.009-.241 0-.631.091-.962.45-.331.359-1.262 1.234-1.262 3.009s1.294 3.491 1.472 3.731c.181.241 2.544 3.884 6.166 5.447.862.372 1.534.594 2.059.759.866.275 1.653.238 2.275.144.694-.103 2.128-.869 2.428-1.709.303-.841.303-1.559.213-1.709-.091-.15-.328-.241-.688-.422z" />
  </svg>
);

const WhatsAppButton = ({
  phone = "919313490447",
  message = "Hello Deep, I visited your portfolio and would like to discuss a web development project with you.",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="whatsapp-float-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip Bubble */}
      <span
        className={`whatsapp-tooltip ${isHovered ? "whatsapp-tooltip-visible" : ""}`}
        role="tooltip"
      >
        Chat on WhatsApp
      </span>

      {/* Floating WhatsApp Anchor Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Contact Deep Patel on WhatsApp"
        title="Chat with Deep Patel on WhatsApp"
      >
        {/* Soft Glowing Outer Pulse Rings */}
        <span className="whatsapp-pulse-ring" aria-hidden="true" />
        <span className="whatsapp-outer-glow" aria-hidden="true" />

        {/* Central Core Circle with Icon */}
        <span className="whatsapp-core-circle">
          <WhatsAppIcon />
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;

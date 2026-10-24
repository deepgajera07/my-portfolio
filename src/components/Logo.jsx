import React from "react";
import { siteConfig } from "../config/siteConfig";

const Logo = ({ onClick }) => {
  const { logoText, logoAccent } = siteConfig.personal;

  return (
    <a
      href="#home"
      className="site-logo"
      onClick={onClick}
      aria-label={`${siteConfig.personal.name} Portfolio Homepage`}
    >
      <span className="logo-text">{logoText}</span>
      <span className="logo-dot">{logoAccent}</span>
    </a>
  );
};

export default Logo;

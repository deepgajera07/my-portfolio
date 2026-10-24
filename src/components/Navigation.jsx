import React from "react";
import { siteConfig } from "../config/siteConfig";

const Navigation = ({
  items = siteConfig.navigation,
  activeItem = "Home",
  onItemClick,
  className = "",
}) => {
  return (
    <nav className={`navigation ${className}`.trim()} aria-label="Main Navigation">
      <ul className="nav-list">
        {items.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <li key={item.label} className="nav-item">
              <a
                href={item.href}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={(e) => {
                  if (onItemClick) {
                    onItemClick(item, e);
                  }
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;

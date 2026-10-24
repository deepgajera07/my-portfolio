import React from "react";
import { UserRound, BriefcaseBusiness, GraduationCap, ExternalLink } from "lucide-react";

const ICON_MAP = {
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
};

const TimelineItem = ({
  icon,
  heading,
  description,
  description2,
  descriptions,
  metadata,
  isFirst = false,
  isLast = false,
  children,
}) => {
  const IconComponent = typeof icon === "string" ? ICON_MAP[icon] || UserRound : icon;

  return (
    <div className={`timeline-item ${isFirst ? "is-first" : ""} ${isLast ? "is-last" : ""}`}>
      {/* 1. Track Column: Sleek Indicator Node & Continuous Vertical Line */}
      <div className="timeline-track-col">
        <span className="timeline-marker-node" aria-hidden="true" />
        <div className="timeline-vertical-line" aria-hidden="true" />
      </div>

      {/* 2. Full-Width Milestone Card */}
      <div className="timeline-card">
        <div className="timeline-card-header">
          <div className="timeline-icon-box">
            {IconComponent && (
              <IconComponent
                className="timeline-step-icon"
                size={22}
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="timeline-header-text">
            <h3 className="timeline-heading">{heading}</h3>
            {metadata && (
              <div className="timeline-metadata">
                {metadata.role && (
                  <span className="timeline-meta-role">{metadata.role}</span>
                )}
                {metadata.company && (
                  <>
                    <span className="timeline-meta-separator" aria-hidden="true">•</span>
                    {metadata.website ? (
                      <a
                        href={metadata.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-meta-company timeline-meta-link"
                        title={`Visit ${metadata.company} Website`}
                      >
                        {metadata.company}
                        <ExternalLink size={13} className="timeline-ext-icon" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="timeline-meta-company">{metadata.company}</span>
                    )}
                  </>
                )}
                {metadata.duration && (
                  <>
                    <span className="timeline-meta-separator" aria-hidden="true">•</span>
                    <span className="timeline-meta-duration">{metadata.duration}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Full-width Description Text (supports multiple paragraphs) */}
        {description && (
          <p className="timeline-description">{description}</p>
        )}
        {description2 && (
          <p className="timeline-description">{description2}</p>
        )}
        {Array.isArray(descriptions) &&
          descriptions.map((desc, idx) => (
            <p key={idx} className="timeline-description">
              {desc}
            </p>
          ))}

        {/* Nested Education Content */}
        {children && (
          <div className="timeline-nested-wrapper">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;

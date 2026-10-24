import React from "react";

const EducationTimeline = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="nested-education-timeline">
      {items.map((edu, index) => {
        const isLast = index === items.length - 1;
        return (
          <div
            key={edu.id || index}
            className={`nested-edu-item ${isLast ? "is-last" : ""}`}
          >
            {/* Nested track connector & marker */}
            <div className="nested-edu-track">
              <span className="nested-edu-marker" aria-hidden="true" />
              {!isLast && <span className="nested-edu-line" aria-hidden="true" />}
            </div>

            {/* Nested Content */}
            <div className="nested-edu-content">
              <div className="nested-edu-header">
                <span className="nested-edu-type">{edu.type}</span>
                <span className="nested-edu-qual">{edu.qualification}</span>
              </div>
              <div className="nested-edu-meta">
                <span className="nested-edu-institution">{edu.institution}</span>
                <span className="nested-edu-bullet" aria-hidden="true">•</span>
                <span className="nested-edu-duration">{edu.duration}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EducationTimeline;

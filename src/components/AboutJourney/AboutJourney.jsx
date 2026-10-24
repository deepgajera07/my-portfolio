import React from "react";
import { portfolioData } from "../../config/portfolioData";
import TimelineItem from "./TimelineItem";
import EducationTimeline from "./EducationTimeline";
import "./AboutJourney.css";

const AboutJourney = () => {
  const { journey } = portfolioData;

  return (
    <section id="about" className="journey-section" aria-label="About Me and Career Journey">
      <div className="journey-container">
        {/* Left-Aligned Header Group matching Project Aesthetics */}
        <header className="journey-header">
          <span className="journey-eyebrow">{journey.eyebrow}</span>
          <h2 className="journey-title">
            Who <span className="journey-title-accent">I Am<span className="journey-title-dot">.</span></span>
          </h2>
          <p className="journey-subtitle">{journey.subtitle}</p>
        </header>

        {/* Full-Width Vertical Timeline Structure */}
        <div className="journey-timeline" role="list">
          {journey.milestones.map((milestone, index) => {
            const isFirst = index === 0;
            const isLast = index === journey.milestones.length - 1;

            const metadata =
              milestone.role || milestone.company || milestone.duration
                ? {
                    role: milestone.role,
                    company: milestone.company,
                    website: milestone.website || milestone.companyUrl,
                    duration: milestone.duration,
                  }
                : null;

            return (
              <TimelineItem
                key={milestone.id || index}
                icon={milestone.icon}
                heading={milestone.heading}
                description={milestone.description}
                description2={milestone.description2}
                descriptions={milestone.descriptions}
                metadata={metadata}
                isFirst={isFirst}
                isLast={isLast}
              >
                {milestone.educationList && (
                  <EducationTimeline items={milestone.educationList} />
                )}
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutJourney;

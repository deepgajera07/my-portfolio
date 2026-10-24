import React from "react";
import { portfolioData } from "../../config/portfolioData";
import SkillCard from "./SkillCard";
import "./Skills.css";

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="skills-section" aria-label="Skills and Technologies">
      <div className="skills-container">
        {/* Left-Aligned Header Group */}
        <header className="skills-header">
          <span className="skills-eyebrow">{skills.eyebrow}</span>
          <h2 className="skills-title">
            Technologies <span className="skills-title-accent">I Use<span className="skills-title-dot">.</span></span>
          </h2>
          <p className="skills-subtitle">{skills.subtitle}</p>
        </header>

        {/* Responsive Skill Cards Grid */}
        <div className="skills-grid" role="list">
          {skills.items.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

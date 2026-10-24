import React from "react";
import html5Icon from "../../assets/skills/html5.svg";
import css3Icon from "../../assets/skills/css3.svg";
import javascriptIcon from "../../assets/skills/javascript.svg";
import bootstrapIcon from "../../assets/skills/bootstrap.svg";
import phpIcon from "../../assets/skills/php.svg";
import laravelIcon from "../../assets/skills/laravel.svg";
import mysqlIcon from "../../assets/skills/mysql.svg";

const ICONS = {
  html5: html5Icon,
  css3: css3Icon,
  javascript: javascriptIcon,
  bootstrap: bootstrapIcon,
  php: phpIcon,
  laravel: laravelIcon,
  mysql: mysqlIcon,
};

const SkillCard = ({ skill }) => {
  const iconSrc = ICONS[skill.id];

  return (
    <div
      className="skill-card"
      style={{
        "--skill-gradient": skill.gradient,
        "--skill-color": skill.brandColor,
        "--skill-shadow": skill.shadow || "rgba(139, 92, 246, 0.4)",
      }}
      tabIndex={0}
      role="listitem"
      aria-label={skill.name}
    >
      <div className="skill-icon-wrapper">
        <img
          src={iconSrc}
          alt={`${skill.name} official icon`}
          className="skill-icon-img"
          width={48}
          height={48}
        />
      </div>
      <span className="skill-name">{skill.name}</span>
    </div>
  );
};

export default SkillCard;

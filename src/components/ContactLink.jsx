import React from "react";
import { PhoneCall } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

const ContactLink = ({ className = "" }) => {
  const { phone, phoneHref } = siteConfig.personal;

  return (
    <a
      href={phoneHref}
      className={`header-contact-link ${className}`.trim()}
      aria-label={`Call ${siteConfig.personal.name} at ${phone}`}
    >
      <span className="contact-icon-badge" aria-hidden="true">
        <PhoneCall size={15} strokeWidth={2.2} className="contact-phone-icon" />
      </span>
      <span className="contact-phone-number">{phone}</span>
    </a>
  );
};

export default ContactLink;

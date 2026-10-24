import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../../config/portfolioData";
import { web3formsConfig } from "../../config/web3formsConfig";
import Button from "../Button";
import { Phone, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import "./Contact.css";

// Social Icons SVGs (LinkedIn & Instagram)
const LinkedinIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Validation rules following standard jQuery Validation Plugin specifications
const validateField = (name, value) => {
  let error = "";
  const trimmed = typeof value === "string" ? value.trim() : "";

  switch (name) {
    case "name":
      if (!trimmed) {
        error = "Please enter your full name";
      } else if (trimmed.length < 3) {
        error = "Full name must be at least 3 characters long";
      } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        error = "Please enter a valid name (letters only)";
      }
      break;

    case "email":
      if (trimmed) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
          error = "Please enter a valid email address";
        }
      }
      break;

    case "phone":
      if (!trimmed) {
        error = "Please enter your phone number";
      } else {
        const cleanPhone = trimmed.replace(/[\s\-()]/g, "");
        if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
          error = "Please enter a valid phone number (at least 10 digits)";
        }
      }
      break;

    case "subject":
      if (!trimmed) {
        error = "Please enter a subject";
      } else if (trimmed.length < 3) {
        error = "Subject must be at least 3 characters long";
      }
      break;

    case "message":
      if (!trimmed) {
        error = "Please write your message";
      } else if (trimmed.length < 10) {
        error = "Message must be at least 10 characters long";
      }
      break;

    default:
      break;
  }

  return error;
};

const Contact = () => {
  const { contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, type: "", message: "" });
  const alertTimerRef = useRef(null);

  const showAlert = (type, message) => {
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }
    setAlertInfo({ show: true, type, message });

    // Automatically hide after 2 seconds
    alertTimerRef.current = setTimeout(() => {
      setAlertInfo((prev) => ({ ...prev, show: false }));
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (alertInfo.show) {
      setAlertInfo({ show: false, type: "", message: "" });
    }

    // Instant live validation if field was touched (jQuery Validation style)
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate all fields on submit
    const newErrors = {};
    const allTouched = {};
    let firstErrorField = null;

    Object.keys(formData).forEach((field) => {
      allTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        if (!firstErrorField) {
          firstErrorField = field;
        }
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);

    // Focus the first invalid element if any error exists
    if (firstErrorField) {
      const firstInvalidElement = document.getElementById(`contact-${firstErrorField}`);
      if (firstInvalidElement) {
        firstInvalidElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate access key configuration
      if (
        !web3formsConfig.accessKey ||
        web3formsConfig.accessKey === "YOUR_ACCESS_KEY_HERE"
      ) {
        throw new Error(
          "Web3Forms Access Key is missing. Please add your Access Key in src/config/web3formsConfig.js or .env file."
        );
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsConfig.accessKey,
          name: formData.name,
          email: formData.email || "No email provided",
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Inquiry)`,
          replyto: formData.email || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
        setTouched({});
        showAlert("success", "Message sent successfully!");
      } else {
        throw new Error(data.message || "Failed to submit form. Please check your Access Key.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setIsSubmitting(false);
      showAlert(
        "error",
        err?.message || "Failed to send message. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Section">
      <div className="contact-container">
        <div className="contact-grid">
          {/* ================================================================
              Left Column: Subheading, Heading, Description, Info & Socials
              ================================================================ */}
          <div className="contact-info-col">
            <span className="contact-eyebrow">{contact.eyebrow}</span>
            <h2 className="contact-title">
              {contact.titlePrefix}{" "}
              <span className="contact-title-accent">
                {contact.titleAccent}
                <span className="contact-title-dot">.</span>
              </span>
            </h2>
            <p className="contact-description">{contact.subtitle}</p>

            {/* Professional Clean Contact Info (Without Bulky Cards) */}
            <div className="contact-info-list">
              {/* Phone / WhatsApp */}
              <div className="contact-info-row">
                <div className="contact-icon-bubble" aria-hidden="true">
                  <Phone size={22} className="contact-info-icon" />
                </div>
                <div className="contact-info-meta">
                  <span className="contact-meta-label">PHONE / WHATSAPP</span>
                  <a
                    href={contact.whatsappHref || contact.phoneHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-meta-value"
                    title="Chat on WhatsApp"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              {/* Email Address */}
              <div className="contact-info-row">
                <div className="contact-icon-bubble" aria-hidden="true">
                  <Mail size={22} className="contact-info-icon" />
                </div>
                <div className="contact-info-meta">
                  <span className="contact-meta-label">EMAIL ADDRESS</span>
                  <a
                    href={contact.emailHref}
                    className="contact-meta-value"
                    title="Send an email"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links: LinkedIn & Instagram */}
            <div className="contact-social-section">
              <span className="contact-social-heading">CONNECT ON SOCIAL MEDIA</span>
              <div className="contact-social-links" role="list">
                {contact.socials?.map((social) => {
                  const isInstagram = social.name?.toLowerCase().includes("instagram");
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`contact-social-btn ${isInstagram ? "contact-social-instagram" : ""}`}
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

          {/* ================================================================
              Right Column: Interactive Contact Form
              ================================================================ */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3 className="contact-form-title">Send Me a Message</h3>
                <p className="contact-form-subtitle">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Name & Email Row */}
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-name" className="contact-form-label">
                        Your Name <span className="required-star">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        className={`contact-form-input ${touched.name && errors.name ? "error" : ""}`}
                        placeholder="Enter FullName"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? "contact-name-error" : undefined}
                      />
                      {touched.name && errors.name && (
                        <label id="contact-name-error" className="error" htmlFor="contact-name">
                          {errors.name}
                        </label>
                      )}
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-email" className="contact-form-label">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className={`contact-form-input ${touched.email && errors.email ? "error" : ""}`}
                        placeholder="Enter EmailAddress"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? "contact-email-error" : undefined}
                      />
                      {touched.email && errors.email && (
                        <label id="contact-email-error" className="error" htmlFor="contact-email">
                          {errors.email}
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-phone" className="contact-form-label">
                        Phone Number <span className="required-star">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        className={`contact-form-input ${touched.phone && errors.phone ? "error" : ""}`}
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!(touched.phone && errors.phone)}
                        aria-describedby={touched.phone && errors.phone ? "contact-phone-error" : undefined}
                      />
                      {touched.phone && errors.phone && (
                        <label id="contact-phone-error" className="error" htmlFor="contact-phone">
                          {errors.phone}
                        </label>
                      )}
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-subject" className="contact-form-label">
                        Subject <span className="required-star">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        className={`contact-form-input ${touched.subject && errors.subject ? "error" : ""}`}
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!(touched.subject && errors.subject)}
                        aria-describedby={touched.subject && errors.subject ? "contact-subject-error" : undefined}
                      />
                      {touched.subject && errors.subject && (
                        <label id="contact-subject-error" className="error" htmlFor="contact-subject">
                          {errors.subject}
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="contact-form-group">
                    <label htmlFor="contact-message" className="contact-form-label">
                      Your Message <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className={`contact-form-textarea ${touched.message && errors.message ? "error" : ""}`}
                      placeholder="Write Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!(touched.message && errors.message)}
                      aria-describedby={touched.message && errors.message ? "contact-message-error" : undefined}
                    />
                    {touched.message && errors.message && (
                      <label id="contact-message-error" className="error" htmlFor="contact-message">
                        {errors.message}
                      </label>
                    )}
                  </div>

                  {/* Submit Button & Alert Box */}
                  <div className="contact-form-actions">
                    <Button
                      variant="purple"
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <span className="btn-loading-content">
                          <Loader2 size={16} className="btn-spinner" />
                          Sending Message...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>

                    {/* Simple Alert Box below button */}
                    {alertInfo.show && (
                      <div
                        className={`contact-alert-box contact-alert-${alertInfo.type}`}
                        role="alert"
                      >
                        {alertInfo.type === "success" ? (
                          <CheckCircle2 size={18} className="contact-alert-icon" />
                        ) : (
                          <AlertCircle size={18} className="contact-alert-icon" />
                        )}
                        <span className="contact-alert-text">{alertInfo.message}</span>
                      </div>
                    )}
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

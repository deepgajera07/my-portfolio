import React from "react";

/**
 * Reusable Animated CTA Button component (Uiverse style)
 * Features an expanding pill background animation on hover with translating arrow icon.
 * Supports:
 * - 'purple' theme: Glowing purple pill for dark matte-black background
 * - 'white' theme: Glowing white pill that transitions text to matte-black on hover
 */
const Button = ({
  children,
  variant = "purple",
  href,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  ...props
}) => {
  const isCtaStyle = ["purple", "white", "primary", "secondary", "cta"].includes(variant);
  const normalizedVariant = variant === "primary" ? "purple" : variant;
  const baseClass = isCtaStyle
    ? `cta cta-${normalizedVariant} ${className}`.trim()
    : `btn btn-${variant} ${className}`.trim();

  const content = isCtaStyle ? (
    <>
      <span className="cta-label">{children}</span>
      <svg
        className="cta-arrow"
        width="15px"
        height="10px"
        viewBox="0 0 13 10"
        aria-hidden="true"
      >
        <path d="M1,5 L11,5" />
        <polyline points="8 1 12 5 8 9" />
      </svg>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClass}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;

import React from "react";

export const TechIcon = ({ name, size = 44, isWhite = false, color }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className: "skill-icon-svg",
    "aria-hidden": "true",
  };

  const whiteColor = "#FFFFFF";
  const whiteSoft = "rgba(255, 255, 255, 0.82)";

  switch (name.toLowerCase()) {
    case "html5":
    case "html":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <path d="M4 3L5.6 20.2L12 22L18.4 20.2L20 3H4Z" stroke={whiteColor} strokeWidth="1.8" fill="none" />
              <path d="M12 4.8V20.1L16.8 18.8L18 4.8H12Z" fill="rgba(255, 255, 255, 0.25)" />
              <path d="M12 8.4H8.4L8.7 11.5H12V14.1L8.9 13.3L8.8 11.9H6.9L7.2 15.6L12 16.9V14.1L12 8.4Z" fill={whiteSoft} />
              <path d="M12 8.4V11.5H15.3L15 14.8L12 15.6V16.9L16.8 15.6L17.3 8.4H12Z" fill={whiteColor} />
            </>
          ) : (
            <>
              <path d="M4 3L5.6 20.2L12 22L18.4 20.2L20 3H4Z" fill={color || "#E34F26"} />
              <path d="M12 4.6V20.3L16.9 18.9L18.2 4.6H12Z" fill="#EF652A" />
              <path d="M12 8.4H8.4L8.7 11.5H12V14.1L8.9 13.3L8.8 11.9H6.9L7.2 15.6L12 16.9V14.1L12 8.4Z" fill="#EBEBEB" />
              <path d="M12 8.4V11.5H15.3L15 14.8L12 15.6V16.9L16.8 15.6L17.3 8.4H12Z" fill="#FFFFFF" />
            </>
          )}
        </svg>
      );

    case "css3":
    case "css":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <path d="M4 3L5.6 20.2L12 22L18.4 20.2L20 3H4Z" stroke={whiteColor} strokeWidth="1.8" fill="none" />
              <path d="M12 4.8V20.1L16.8 18.8L18 4.8H12Z" fill="rgba(255, 255, 255, 0.25)" />
              <path d="M12 8.4H8.4L8.7 11.5H12V8.4ZM12 14.1L8.9 13.3L8.8 11.9H6.9L7.2 15.6L12 16.9V14.1Z" fill={whiteSoft} />
              <path d="M15.4 10.4L15.6 8.4H12V11.5H15.3L15 14.8L12 15.6V16.9L16.8 15.6L17.3 8.4H15.6L15.4 10.4Z" fill={whiteColor} />
            </>
          ) : (
            <>
              <path d="M4 3L5.6 20.2L12 22L18.4 20.2L20 3H4Z" fill={color || "#1572B6"} />
              <path d="M12 4.6V20.3L16.9 18.9L18.2 4.6H12Z" fill="#33A9DC" />
              <path d="M12 8.4H8.4L8.7 11.5H12V8.4ZM12 14.1L8.9 13.3L8.8 11.9H6.9L7.2 15.6L12 16.9V14.1Z" fill="#EBEBEB" />
              <path d="M15.4 10.4L15.6 8.4H12V11.5H15.3L15 14.8L12 15.6V16.9L16.8 15.6L17.3 8.4H15.6L15.4 10.4Z" fill="#FFFFFF" />
            </>
          )}
        </svg>
      );

    case "javascript":
    case "js":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <rect x="1" y="1" width="22" height="22" rx="4" stroke={whiteColor} strokeWidth="1.8" fill="none" />
              <path d="M7.5 17.5C8.5 17.5 9.3 16.9 9.6 15.9L7.8 14.9C7.6 15.3 7.3 15.6 6.8 15.6C6.2 15.6 5.8 15.1 5.8 14.2V9.5H3.8V14.3C3.8 16.3 5.2 17.5 7.5 17.5ZM14.8 17.5C17.2 17.5 18.6 16.2 18.6 14.2C18.6 12.5 17.6 11.6 15.7 10.9L14.7 10.5C13.8 10.2 13.3 9.7 13.3 9.1C13.3 8.4 13.9 7.9 14.8 7.9C15.6 7.9 16.1 8.3 16.5 8.9L18.1 7.7C17.4 6.6 16.2 6 14.7 6C12.5 6 11.3 7.3 11.3 9.1C11.3 10.7 12.2 11.6 14.1 12.3L15.1 12.7C16.1 13.1 16.6 13.6 16.6 14.3C16.6 15.1 15.9 15.6 14.8 15.6C13.8 15.6 13.1 15 12.7 14.2L11 15.4C11.7 16.7 13.1 17.5 14.8 17.5Z" fill={whiteColor} />
            </>
          ) : (
            <>
              <rect width="24" height="24" rx="4" fill={color || "#F7DF1E"} />
              <path d="M7.5 18C8.5 18 9.3 17.4 9.6 16.4L7.8 15.4C7.6 15.8 7.3 16.1 6.8 16.1C6.2 16.1 5.8 15.6 5.8 14.7V10H3.8V14.8C3.8 16.8 5.2 18 7.5 18ZM14.8 18C17.2 18 18.6 16.7 18.6 14.7C18.6 13 17.6 12.1 15.7 11.4L14.7 11C13.8 10.7 13.3 10.2 13.3 9.6C13.3 8.9 13.9 8.4 14.8 8.4C15.6 8.4 16.1 8.8 16.5 9.4L18.1 8.2C17.4 7.1 16.2 6.5 14.7 6.5C12.5 6.5 11.3 7.8 11.3 9.6C11.3 11.2 12.2 12.1 14.1 12.8L15.1 13.2C16.1 13.6 16.6 14.1 16.6 14.8C16.6 15.6 15.9 16.1 14.8 16.1C13.8 16.1 13.1 15.5 12.7 14.7L11 15.9C11.7 17.2 13.1 18 14.8 18Z" fill="#18181B" />
            </>
          )}
        </svg>
      );

    case "bootstrap 5":
    case "bootstrap":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <rect x="1" y="1" width="22" height="22" rx="5" stroke={whiteColor} strokeWidth="1.8" fill="none" />
              <path d="M8.5 6.8H12.8C14.8 6.8 16.1 7.8 16.1 9.4C16.1 10.6 15.3 11.4 14.2 11.8C15.6 12.2 16.6 13.1 16.6 14.6C16.6 16.4 15.1 17.6 12.9 17.6H8.5V6.8ZM10.8 8.6V11.2H12.5C13.6 11.2 14.2 10.6 14.2 9.8C14.2 9 13.5 8.6 12.4 8.6H10.8ZM10.8 13V15.8H12.7C13.9 15.8 14.7 15.2 14.7 14.3C14.7 13.4 13.9 13 12.6 13H10.8Z" fill={whiteColor} />
            </>
          ) : (
            <>
              <rect width="24" height="24" rx="5" fill={color || "#7952B3"} />
              <path d="M8.5 6.8H12.8C14.8 6.8 16.1 7.8 16.1 9.4C16.1 10.6 15.3 11.4 14.2 11.8C15.6 12.2 16.6 13.1 16.6 14.6C16.6 16.4 15.1 17.6 12.9 17.6H8.5V6.8ZM10.8 8.6V11.2H12.5C13.6 11.2 14.2 10.6 14.2 9.8C14.2 9 13.5 8.6 12.4 8.6H10.8ZM10.8 13V15.8H12.7C13.9 15.8 14.7 15.2 14.7 14.3C14.7 13.4 13.9 13 12.6 13H10.8Z" fill="#FFFFFF" />
            </>
          )}
        </svg>
      );

    case "php":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <ellipse cx="12" cy="12" rx="10" ry="6" stroke={whiteColor} strokeWidth="1.8" fill="none" />
              <path d="M6.2 9H8.8C9.8 9 10.5 9.4 10.5 10.3C10.5 11.3 9.7 11.8 8.6 11.8H7.3L6.8 15H5.4L6.2 9ZM7.5 10.6H8.4C8.9 10.6 9.3 10.5 9.3 10.2C9.3 9.9 9 9.8 8.6 9.8H7.6L7.5 10.6ZM11.1 9H12.5L12 12.3H13.6L14.1 9H15.5L14.6 15H13.2L13.6 13.3H12L11.7 15H10.3L11.1 9ZM16 9H18.6C19.6 9 20.3 9.4 20.3 10.3C20.3 11.3 19.5 11.8 18.4 11.8H17.1L16.6 15H15.2L16 9ZM17.3 10.6H18.2C18.7 10.6 19.1 10.5 19.1 10.2C19.1 9.9 18.8 9.8 18.4 9.8H17.4L17.3 10.6Z" fill={whiteColor} />
            </>
          ) : (
            <>
              <ellipse cx="12" cy="12" rx="11" ry="6.5" fill={color || "#777BB4"} />
              <path d="M6.2 9H8.8C9.8 9 10.5 9.4 10.5 10.3C10.5 11.3 9.7 11.8 8.6 11.8H7.3L6.8 15H5.4L6.2 9ZM7.5 10.6H8.4C8.9 10.6 9.3 10.5 9.3 10.2C9.3 9.9 9 9.8 8.6 9.8H7.6L7.5 10.6ZM11.1 9H12.5L12 12.3H13.6L14.1 9H15.5L14.6 15H13.2L13.6 13.3H12L11.7 15H10.3L11.1 9ZM16 9H18.6C19.6 9 20.3 9.4 20.3 10.3C20.3 11.3 19.5 11.8 18.4 11.8H17.1L16.6 15H15.2L16 9ZM17.3 10.6H18.2C18.7 10.6 19.1 10.5 19.1 10.2C19.1 9.9 18.8 9.8 18.4 9.8H17.4L17.3 10.6Z" fill="#FFFFFF" />
            </>
          )}
        </svg>
      );

    case "laravel":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <path d="M8.2 4.2L14.7 8.3L14.7 15.6L8.2 11.6V4.2Z" fill={whiteColor} />
              <path d="M15.8 8.9L22.3 13V20.3L15.8 16.3V8.9Z" fill="rgba(255, 255, 255, 0.75)" />
              <path d="M7.1 12.2L13.6 16.3L13.6 23.6L7.1 19.6V12.2Z" fill="rgba(255, 255, 255, 0.6)" />
              <path d="M1.7 8.5L8.2 12.6L8.2 19.9L1.7 15.9V8.5Z" fill="rgba(255, 255, 255, 0.5)" />
            </>
          ) : (
            <>
              <path d="M8.2 4.2L14.7 8.3L14.7 15.6L8.2 11.6V4.2Z" fill={color || "#FF2D20"} />
              <path d="M15.8 8.9L22.3 13V20.3L15.8 16.3V8.9Z" fill={color || "#FF2D20"} opacity="0.9" />
              <path d="M7.1 12.2L13.6 16.3L13.6 23.6L7.1 19.6V12.2Z" fill={color || "#FF2D20"} opacity="0.8" />
              <path d="M1.7 8.5L8.2 12.6L8.2 19.9L1.7 15.9V8.5Z" fill={color || "#FF2D20"} opacity="0.7" />
            </>
          )}
        </svg>
      );

    case "mysql":
      return (
        <svg {...iconProps} fill="none">
          {isWhite ? (
            <>
              <ellipse cx="12" cy="7" rx="9" ry="3.5" stroke={whiteColor} strokeWidth="1.8" />
              <path d="M3 7V12C3 13.9 7 15.5 12 15.5C17 15.5 21 13.9 21 12V7" stroke={whiteColor} strokeWidth="1.8" />
              <path d="M3 12V17C3 18.9 7 20.5 12 20.5C17 20.5 21 18.9 21 17V12" stroke={whiteColor} strokeWidth="1.8" />
              <circle cx="12" cy="12" r="1.5" fill={whiteColor} />
            </>
          ) : (
            <>
              <ellipse cx="12" cy="7" rx="9" ry="3.5" stroke={color || "#00758F"} strokeWidth="1.8" />
              <path d="M3 7V12C3 13.9 7 15.5 12 15.5C17 15.5 21 13.9 21 12V7" stroke={color || "#00758F"} strokeWidth="1.8" />
              <path d="M3 12V17C3 18.9 7 20.5 12 20.5C17 20.5 21 18.9 21 17V12" stroke={color || "#00758F"} strokeWidth="1.8" />
              <circle cx="12" cy="12" r="1.5" fill={color || "#F29111"} />
            </>
          )}
        </svg>
      );

    default:
      return (
        <svg {...iconProps} fill="none" stroke={isWhite ? whiteColor : color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
};

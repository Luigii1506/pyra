/**
 * Card Component
 * Reusable card component for displaying content in a structured way
 * @created 2024-12-19
 */

import React from "react";

const Card = ({
  children,
  className = "",
  variant = "default",
  shadow = true,
  hover = false,
  padding = "default",
  onClick = null,
}) => {
  // Definir variantes de estilo
  const variants = {
    default: "bg-white border border-gray-200",
    primary: "bg-amber-50 border border-amber-200",
    secondary: "bg-stone-50 border border-stone-200",
    danger: "bg-red-50 border border-red-200",
    success: "bg-green-50 border border-green-200",
    warning: "bg-yellow-50 border border-yellow-200",
    dark: "bg-gray-800 border border-gray-700 text-white",
  };

  // Definir tamaños de padding
  const paddings = {
    none: "",
    sm: "p-3",
    default: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  // Clases base del card
  const baseClasses = `
    rounded-lg transition-all duration-200
    ${variants[variant]}
    ${paddings[padding]}
    ${shadow ? "shadow-sm" : ""}
    ${hover ? "hover:shadow-md hover:scale-[1.02] cursor-pointer" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={baseClasses}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(e);
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

// Subcomponentes para mayor flexibilidad
const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);
CardHeader.displayName = "Card.Header";

const CardTitle = ({ children, className = "", as: Component = "h3" }) => (
  <Component className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </Component>
);
CardTitle.displayName = "Card.Title";

const CardSubtitle = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
);
CardSubtitle.displayName = "Card.Subtitle";

const CardBody = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);
CardBody.displayName = "Card.Body";

const CardFooter = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);
CardFooter.displayName = "Card.Footer";

const CardImage = ({
  src,
  alt,
  className = "",
  rounded = true,
  aspectRatio = "aspect-video",
}) => (
  <div
    className={`${aspectRatio} overflow-hidden ${
      rounded ? "rounded-lg" : ""
    } ${className}`}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);
CardImage.displayName = "Card.Image";

const CardBadge = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) => {
  const badgeVariants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-amber-100 text-amber-800",
    secondary: "bg-stone-100 text-stone-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  const badgeSizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`
      inline-flex items-center font-medium rounded-full
      ${badgeVariants[variant]}
      ${badgeSizes[size]}
      ${className}
    `}
    >
      {children}
    </span>
  );
};
CardBadge.displayName = "Card.Badge";

const CardActions = ({ children, className = "", align = "right" }) => {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`flex items-center space-x-2 ${alignClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
};
CardActions.displayName = "Card.Actions";

// Asignar subcomponentes al componente principal
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Badge = CardBadge;
Card.Actions = CardActions;

export default Card;

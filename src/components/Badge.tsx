import React from "react";
import type { ComponentProps } from "react";

export interface BadgeProps {
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  onClick?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  onClick,
  className
}) => {
  // Base styles for all badges
  const baseStyle = "px-2.5 py-1 inline-block rounded-full text-xs font-medium transition-colors duration-200";
  
  // Variant-specific styles
  const variantStyles: { [key: string]: string } = {
    "default": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    "primary": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "success": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "warning": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "error": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "info": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  };

  // Add cursor-pointer only if onClick is provided
  const cursorStyle = onClick ? "cursor-pointer hover:opacity-80" : "";

  // Combine all classes
  const badgeClasses = [
    baseStyle,
    variantStyles[variant || 'default'],
    cursorStyle,
    className || ''
  ].filter(Boolean).join(" ");

  return (
    <span
      className={badgeClasses}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

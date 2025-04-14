import React from "react";
import type { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "text" | "icon" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  type,
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  ...props
}) => {
  // Base styles for all buttons
  const baseStyle = "rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant-specific styles
  const variantStyles: { [key: string]: string } = {
    "primary": "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed",
    "secondary": "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 focus:ring-blue-500",
    "text": "bg-transparent text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 active:bg-blue-100 dark:active:bg-blue-900/30 focus:ring-blue-500",
    "icon": "p-2 bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-blue-500",
    "danger": "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
  };
  
  // Size-specific styles
  const sizeStyles: { [key: string]: string } = {
    "sm": "px-3 py-1 text-xs",
    "md": "px-4 py-2 text-sm",
    "lg": "px-6 py-3 text-base"
  };

  // Combine all classes
  const buttonClasses = [
    baseStyle,
    // Get variant style
    variantStyles[variant || "primary"],
    // Get size style
    variant !== "icon" ? sizeStyles[size || "md"] : "",
    // Add custom className if provided
    className || ""
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

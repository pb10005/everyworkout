import React from "react";
import type { ComponentProps } from "react";

export interface SubheaderProps {
  content: string;
  variant?: "default" | "section" | "subsection";
  className?: string;
}

export const Subheader: React.FC<SubheaderProps> = ({
  content,
  variant = "default",
  className
}) => {
  // Base styles for all subheaders
  const baseStyle = "font-semibold tracking-tight mb-2";
  
  // Variant-specific styles
  const variantStyles: { [key: string]: string } = {
    "default": "text-lg text-gray-900 dark:text-white py-2 border-b border-gray-200 dark:border-gray-700",
    "section": "text-xl text-gray-900 dark:text-white py-3",
    "subsection": "text-base text-gray-700 dark:text-gray-300 py-1.5"
  };

  // Combine all classes
  const subheaderClasses = [
    baseStyle,
    variantStyles[variant || 'default'],
    className || ''
  ].filter(Boolean).join(" ");

  return (
    <h3 className={subheaderClasses}>
      {content}
    </h3>
  );
};

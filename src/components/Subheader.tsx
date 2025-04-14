import React from "react";

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
    "default": "text-lg text-gray-900 dark:text-white py-2 border-b border-gray-200 dark:border-gray-700 flex items-center",
    "section": "text-xl text-gray-900 dark:text-white py-3 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/5 before:w-1 before:bg-blue-500 before:rounded",
    "subsection": "text-base text-gray-700 dark:text-gray-300 py-1.5 flex items-center"
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

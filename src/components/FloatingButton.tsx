import React from "react";
import type { ComponentProps } from "react";
import Link from "next/link";

export interface FloatingButtonProps {
  children?: React.ReactNode;
  href: string;
  variant?: "standard" | "mini" | "extended";
  className?: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  href,
  variant = "standard",
  className
}) => {
  // Base styles for all floating action buttons
  const baseStyle = "fixed z-50 right-4 bottom-16 md:right-6 md:bottom-6 rounded-full bg-blue-500 dark:bg-blue-600 text-white shadow-lg transition-all duration-200 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl active:bg-blue-700 dark:active:bg-blue-800 flex justify-center items-center";
  
  // Variant-specific styles
  const variantStyles: { [key: string]: string } = {
    "standard": "w-14 h-14",
    "mini": "w-10 h-10",
    "extended": "px-6 py-3 flex items-center gap-2"
  };
  
  // Icon size based on variant
  const getIconSize = () => {
    if (variant === "mini") return "w-5 h-5";
    return "w-6 h-6";
  };
  
  // Process children based on variant
  const processedChildren = () => {
    if (variant === "extended" && React.Children.count(children) > 1) {
      return children;
    }
    
    // For standard and mini variants, or when there's only one child in extended variant
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      // For SVG icons, just return them as is
      return child;
    });
  };

  // Combine all classes
  const buttonClasses = [
    baseStyle,
    variantStyles[variant || 'standard'],
    className || ''
  ].filter(Boolean).join(" ");

  return (
    <Link
      className={buttonClasses}
      href={href}
    >
      {processedChildren()}
    </Link>
  );
};

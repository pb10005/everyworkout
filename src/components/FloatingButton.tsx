import React from "react";
import Link from "next/link";

export interface FloatingButtonProps {
  children?: React.ReactNode;
  href: string;
  variant?: "standard" | "mini" | "extended";
  className?: string;
  ariaLabel?: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  href,
  variant = "standard",
  className,
  ariaLabel
}) => {
  // Base styles for all floating action buttons
  const baseStyle = "fixed z-50 right-4 bottom-16 md:right-6 md:bottom-6 rounded-full bg-blue-500 dark:bg-blue-600 text-white shadow-lg transition-all duration-200 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl active:bg-blue-700 dark:active:bg-blue-800 flex justify-center items-center transform hover:scale-105 active:scale-95";
  
  // Variant-specific styles
  const variantStyles: { [key: string]: string } = {
    "standard": "w-14 h-14",
    "mini": "w-10 h-10",
    "extended": "px-6 py-3 flex items-center gap-2"
  };
  
  // Process children based on variant
  const processedChildren = () => {
    if (variant === "extended" && React.Children.count(children) > 1) {
      return children;
    }
    
    // For standard and mini variants, or when there's only one child in extended variant
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      // Just return the child as is to avoid TypeScript errors
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
      aria-label={ariaLabel}
      role="button"
    >
      {processedChildren()}
    </Link>
  );
};

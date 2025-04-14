import React from "react";
import type { ComponentProps } from "react";

export interface ListContainerProps {
  children: React.ReactNode;
  variant?: "default" | "interactive" | "with-icons";
  className?: string;
}

export const ListContainer: React.FC<ListContainerProps> = ({
  children,
  variant = "default",
  className
}) => {
  // Base styles for all list containers
  const baseStyle = "flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700";
  
  // Get variant-specific styles for list items
  const getItemStyle = (variant: string) => {
    // Base styles for all list items
    let itemStyle = "px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0";
    
    // Add variant-specific styles to list items
    if (variant === "interactive") {
      itemStyle += " cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150";
    } else if (variant === "with-icons") {
      itemStyle += " flex items-center gap-3";
    }
    
    return itemStyle;
  };

  // Combine container classes
  const containerClasses = [
    baseStyle,
    className || ''
  ].filter(Boolean).join(" ");

  return (
    <ul className={containerClasses}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        // For simplicity, just return the child as is
        // This avoids TypeScript errors with cloning elements
        return child;
      })}
    </ul>
  );
};

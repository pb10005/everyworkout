import React from "react";

export interface EmptyStateProps {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No data available",
  description,
  icon,
  className,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${className || ""}`}>
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-500">{icon}</div>}
      <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
        {message}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

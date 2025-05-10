import { EmptyState } from "./EmptyState";

export default {
  component: EmptyState,
  title: 'EmptyState',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    message: "No data available",
  },
};

export const WithDescription = {
  args: {
    message: "No workouts found",
    description: "Start by adding a new workout to see it here.",
  },
};

export const WithIcon = {
  args: {
    message: "Your exercise list is empty",
    description: "Search for exercises to add them to your list.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
  },
};

export const CustomStyle = {
  args: {
    message: "No results found",
    description: "Try adjusting your search criteria.",
    className: "bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
  },
};

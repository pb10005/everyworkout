# Coding Rules and Standards

## Table of Contents
- [Introduction](#introduction)
- [Component Design](#component-design)
  - [Atomic Design](#atomic-design)
  - [Component Structure](#component-structure)
- [Naming Conventions](#naming-conventions)
- [TypeScript Guidelines](#typescript-guidelines)
- [Styling Guidelines](#styling-guidelines)
- [State Management](#state-management)
- [Testing](#testing)
- [Performance Considerations](#performance-considerations)
- [Git Workflow](#git-workflow)

## Introduction

This document outlines the coding standards and best practices for the EveryWorkout project. Following these guidelines ensures consistency, maintainability, and scalability of our codebase.

## Component Design

### Atomic Design

We adopt the **Atomic Design** methodology for our component architecture. Atomic Design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner.

The five stages of Atomic Design are:

1. **Atoms**: Basic building blocks of matter, such as buttons, inputs, and other HTML tags that can't be broken down any further without ceasing to be functional.
   - Examples: Button, Input, Label, Icon

2. **Molecules**: Groups of atoms bonded together to form a functional unit.
   - Examples: SearchForm (Input + Button), NavigationItem (Icon + Text)

3. **Organisms**: Groups of molecules joined together to form a relatively complex, distinct section of an interface.
   - Examples: Navigation, WorkoutCard, ExerciseSelector

4. **Templates**: Page-level objects that place components into a layout and articulate the design's underlying content structure.
   - Examples: DashboardTemplate, WorkoutDetailTemplate

5. **Pages**: Specific instances of templates that show what a UI looks like with real representative content in place.
   - Examples: DashboardPage, WorkoutDetailPage

#### Implementation Guidelines

- Organize component directories to reflect the Atomic Design hierarchy
- Keep atoms and molecules as reusable and stateless as possible
- Document component interfaces with TypeScript and Storybook
- Ensure components follow the single responsibility principle

### Component Structure

Each component should follow this structure:

```tsx
// Imports
import React from 'react';
import type { ComponentProps } from 'react';

// Types
export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
}

// Component
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  // Logic
  
  // Render
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Naming Conventions

- **Files and Directories**:
  - React components: PascalCase (e.g., `Button.tsx`, `WorkoutCard.tsx`)
  - Hooks: camelCase with 'use' prefix (e.g., `useNotification.ts`)
  - Utilities: camelCase (e.g., `formatDate.ts`)
  - Test files: Same name as the file being tested with `.test` or `.spec` suffix

- **Components**:
  - Component names: PascalCase (e.g., `Button`, `WorkoutCard`)
  - Props interfaces: ComponentNameProps (e.g., `ButtonProps`, `WorkoutCardProps`)

- **Variables and Functions**:
  - Use camelCase (e.g., `getUserData`, `isLoading`)
  - Boolean variables should have 'is', 'has', or 'should' prefix (e.g., `isVisible`, `hasError`)

- **Constants**:
  - Use UPPER_SNAKE_CASE for true constants (e.g., `MAX_ITEMS`, `API_URL`)

## TypeScript Guidelines

- Always define proper types for props, state, and function returns
- Use TypeScript interfaces for object shapes
- Avoid using `any` type; use `unknown` if the type is truly unknown
- Use type inference when it's clear what the type should be
- Use union types for props that can accept multiple types

```typescript
// Good
interface User {
  id: string;
  name: string;
  age?: number;
}

// Avoid
const user: any = { id: '123', name: 'John' };
```

## Styling Guidelines

- Use Tailwind CSS for styling components
- For complex components, consider using CSS modules or styled-components
- Follow a consistent color scheme defined in the tailwind config
- Use responsive design principles and mobile-first approach

## State Management

- Use React hooks for component-level state
- Use context API for shared state across multiple components
- Consider using libraries like React Query for server state management
- Keep state as close as possible to where it's used

## Testing

- Write unit tests for utilities and hooks
- Write component tests for complex components
- Use Storybook for visual testing and documentation
- Aim for good test coverage, especially for critical paths

## Performance Considerations

- Use React.memo for expensive components that render often
- Optimize re-renders by using callback functions properly
- Implement code-splitting for large components or pages
- Use proper keys in lists to optimize rendering

## Git Workflow

- Use feature branches for new features
- Write meaningful commit messages
- Keep pull requests focused on a single feature or fix
- Review code before merging

---

This document is a living guide and should be updated as our practices evolve.

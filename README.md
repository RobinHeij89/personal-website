# Personal Website

A modern personal website built with React, TypeScript, Vite, and Three.js.

## Features

- Interactive 3D elements with Three.js and React Three Fiber
- Custom cursor with hover effects
- Responsive design with CSS modules
- Modern animations with GSAP
- TypeScript for type safety

## Development

### Prerequisites

- Node.js (18+ recommended)
- pnpm (preferred package manager)

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Coding Guidelines

### CSS Class Management

- **Multiple CSS classes** should be managed using the `clsx` package for conditional and dynamic class assignment
- This ensures clean, readable, and maintainable class concatenation

Example usage:
```tsx
import clsx from 'clsx';
import styles from './component.module.css';

// Simple conditional classes
<div className={clsx(styles.base, isActive && styles.active)} />

// Multiple conditions
<div className={clsx(
  styles.component,
  {
    [styles.loading]: isLoading,
    [styles.error]: hasError,
    [styles.disabled]: isDisabled
  }
)} />

// With external classes
<div className={clsx(styles.component, 'external-class', customClass)} />
```

### Component Structure

- Use CSS Modules for component-specific styling
- Follow BEM methodology for CSS class naming
- Include comprehensive JSDoc comments for component documentation
- Use TypeScript interfaces for props definition

### File Organization

- Components in `/src/components/` with subdirectories for `ui/` and `three/`
- Custom hooks in `/src/hooks/`
- Utilities in `/src/utils/`
- Type definitions in `/src/types/`

## Technology Stack

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - High-performance animations
- **CSS Modules** - Scoped styling
- **clsx** - Conditional CSS class utility
- **ESLint** - Code linting and formatting

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

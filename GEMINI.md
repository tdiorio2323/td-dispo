# GEMINI.md

## Project Overview

This is a web application for "Quick Printz", a print-on-demand service. The application is built using the following technologies:

*   **Vite:** A fast build tool for modern web projects.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript.
*   **shadcn-ui:** A collection of re-usable UI components.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **React Router:** For client-side routing.
*   **React Query:** For data fetching and state management.
*   **Supabase:** Used as a backend, as indicated by the `integrations/supabase` directory.

The project is structured with a `src` directory containing the main application code, including components, pages, hooks, and integrations. The `public` directory contains static assets.

## Building and Running

To get the project up and running locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server and make the application available at `http://localhost:5173` by default.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the optimized production build of the application.

4.  **Lint the code:**
    ```bash
    npm run lint
    ```
    This will run ESLint to check for any code quality issues.

## Development Conventions

*   **Component-Based Architecture:** The application is built using a component-based architecture, with components located in the `src/components` directory.
*   **Routing:** Client-side routing is handled by `react-router-dom`. Pages are located in the `src/pages` directory.
*   **Styling:** Styling is done using Tailwind CSS and shadcn-ui components.
*   **State Management:** React Query is used for managing server state.
*   **Type Safety:** TypeScript is used throughout the project to ensure type safety.
*   **Code Quality:** ESLint is configured to enforce code quality and consistency.
*   **Aliases:** A path alias `@` is configured to point to the `src` directory for easier imports.

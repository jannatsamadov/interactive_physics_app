# Physics App

A web application designed to help users explore and understand various physics concepts. This application provides interactive tools and visualizations to enhance the learning experience.

## Features

-   **Interactive Visualizations:** Explore physics concepts through dynamic and engaging visual aids.
-   **Concept Explanations:** Get clear and concise explanations of fundamental physics principles.
-   **Problem-Solving Tools:** Utilize tools to assist in solving physics problems.
-   **User-Friendly Interface:** A clean and intuitive design for an optimal learning experience.

## Technologies Used

-   **Frontend:** React (with Vite for fast development and bundling)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS (based on common practices for modern React apps with Radix UI components)
-   **UI Components:** Radix UI
-   **Package Manager:** npm

## Project Structure

The project is structured as a standard Vite-React application:

-   `src/`: Contains all source code for the React application.
-   `public/`: Static assets.
-   `vite.config.ts`: Vite configuration file, including build output directory (`build`).
-   `package.json`: Project dependencies and scripts.

## Local Development

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (comes with Node.js)

### Installation

1.  Clone the repository:

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd Physics_app
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Deployment

This application can be deployed to platforms like Netlify. If you are deploying to Netlify, please ensure the following build settings:

-   **Build command:** `npm run build`
-   **Publish directory:** `build` (This is crucial as the application builds to a `build` directory, not the default `dist`.)

### Netlify Specifics

If you encounter a "Deploy directory 'dist' does not exist" error, navigate to your Netlify project settings, go to "Build & deploy" -> "Build settings", and change the "Publish directory" from `dist` to `build`.

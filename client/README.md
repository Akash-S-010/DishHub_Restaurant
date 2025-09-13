# Client (Frontend) - DishHub Restaurant Site

This directory contains the frontend application for the Restaurant Site, built with React.js.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **React Router DOM**: For declarative routing in React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Razorpay**: For secure online payments.
- **Vite**: A fast build tool that provides a lightning-fast development experience.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the necessary dependencies for the frontend application.

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Project Structure

```
client/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable UI components
│   │   └── ui/         # UI specific components like Button, Loader
│   ├── config/         # Frontend specific configurations (e.g., axios instance)
│   ├── layouts/        # Layout components (e.g., header, footer)
│   ├── pages/          # Page-specific components (e.g., Home, Admin, User)
│   ├── routes/         # React Router configuration
│   ├── store/          # Zustand store for state management
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point for the React application
├── .gitignore
├── index.html
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## Deployment

This frontend application can be deployed to platforms like Vercel, Netlify, or other static site hosting services. Ensure that environment variables (if any) are correctly configured on your chosen platform.

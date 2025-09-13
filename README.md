# DishHub - Restaurant Site - MERN Stack

This is a full-stack restaurant website built using the MERN (MongoDB, Express.js, React, Node.js) stack. It features user authentication, food menu management, shopping cart functionality, and an admin panel for managing orders and food items.

## Features

- **User Authentication**: Secure signup, login, and logout for customers and administrators.
- **Profile Management**: Users can manage their personal information and update their profiles.
- **Multiple Address Management**: Users can add, edit, and delete multiple delivery addresses.
- **Food Menu**: Browse a variety of food items with details and images.
- **Shopping Cart**: Add, remove, and update items in the cart.
- **Order Management**: Place orders, view order history, and track order status.
- **Payment Gateway Integration**: Secure online payments through Razorpay.
- **Admin Panel**: Dedicated interface for administrators to manage food items, view orders, and manage users.
- **Responsive Design**: Optimized for various screen sizes.

## Technologies Used

- **Frontend**: React.js, React Router DOM, Tailwind CSS, Zustand (for state management), Axios, Razorpay (for payments).
- **Backend**: Node.js, Express.js, MongoDB (via Mongoose), JWT (for authentication), Bcrypt.js (for password hashing), Cookie-parser, Cloudinary (for image storage).

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd Restaurant_site
    ```

2.  **Backend Setup**:
    Navigate to the `server` directory and follow the instructions in `server/README.md`.

3.  **Frontend Setup**:
    Navigate to the `client` directory and follow the instructions in `client/README.md`.

## Project Structure

```
Restaurant_site/
├── client/                     # Frontend (React.js)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons, etc.
│   │   ├── components/         # Reusable UI components
│   │   │   └── ui/             # UI specific components like Button, Loader
│   │   ├── config/             # Frontend specific configurations (e.g., axios instance)
│   │   ├── layouts/            # Layout components (e.g., header, footer)
│   │   ├── pages/              # Page-specific components (e.g., Home, Admin, User)
│   │   ├── routes/             # React Router configuration
│   │   ├── store/              # Zustand store for state management
│   │   ├── App.jsx             # Main application component
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point for the React application
│   ├── .gitignore
│   ├── index.html
│   ├── package.json            # Project dependencies and scripts
│   ├── vite.config.js          # Vite configuration
│   └── README.md               # Frontend README
├── server/                     # Backend (Node.js, Express.js)
│   ├── src/
│   │   ├── config/             # Database connection, Cloudinary config
│   │   ├── controllers/        # Logic for handling API requests
│   │   ├── middlewares/        # Authentication middleware, error handling
│   │   ├── models/             # Mongoose schemas and models
│   │   ├── routes/             # API routes definitions
│   │   └── utils/              # Utility functions (e.g., token generation)
│   ├── .gitignore
│   ├── package.json            # Project dependencies and scripts
│   ├── server.js               # Main server file
│   └── README.md               # Backend README
├── .gitignore
├── package.json
├── package-lock.json
└── README.md                   # This file (Root README)
```

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License.
# Server (Backend) - DishHub Restaurant Site API

This directory contains the backend API for the Restaurant Site, built with Node.js and Express.js.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt.js**: For hashing passwords.
- **Cookie-parser**: Middleware to parse Cookie headers and populate `req.cookies`.
- **Cloudinary**: For image storage and management.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the necessary dependencies for the backend application.

### `npm start`

Runs the Express.js server in development mode.

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

- `PORT`: The port number for the server to listen on (e.g., `5000`)
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for JWT token generation.
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Log in a user.
- `GET /api/auth/me`: Get current user's profile (requires authentication).
- `POST /api/auth/logout`: Log out a user (requires authentication).
- `PUT /api/auth/update-profile`: Update user profile (requires authentication).
- `GET /api/auth/all-users`: Get all users (Admin only).
- `PATCH /api/auth/:id/block`: Block/unblock a user (Admin only).

### Address Routes (`/api/address`)
- `GET /api/address/`: Get all addresses for the authenticated user.
- `POST /api/address/`: Add a new address for the authenticated user.
- `PUT /api/address/:addressId`: Update an existing address for the authenticated user.
- `DELETE /api/address/:addressId`: Delete an address for the authenticated user.

### Cart Routes (`/api/cart`)
- `POST /api/cart/add`: Add an item to the authenticated user's cart.
- `GET /api/cart/`: Get the authenticated user's cart.
- `PUT /api/cart/update`: Update an item in the authenticated user's cart.
- `DELETE /api/cart/remove/:foodId`: Remove an item from the authenticated user's cart.
- `DELETE /api/cart/clear`: Clear the authenticated user's cart.

### Food Routes (`/api/food`)
- `GET /api/food/all-food`: Get all food items.
- `GET /api/food/:id`: Get a single food item by ID.
- `POST /api/food/create`: Create a new food item (Admin only, with image upload).
- `PUT /api/food/:id/`: Update a food item (Admin only, with image upload).
- `DELETE /api/food/:id/delete`: Delete a food item (Admin only).
- `POST /api/food/:id/review`: Add a review to a food item (requires authentication).

### Order Routes (`/api/order`)
- `POST /api/order/place`: Place a new order (requires authentication).
- `POST /api/order/verify`: Verify payment for an order (requires authentication).
- `POST /api/order/cancel`: Cancel payment for an order (requires authentication).
- `GET /api/order/my-orders`: Get all orders for the authenticated user.
- `GET /api/order/`: Get all orders (Admin only).
- `PUT /api/order/:id/status`: Update order status (Admin only).

## Project Structure

```
server/
├── src/
│   ├── config/         # Database connection, Cloudinary config
│   ├── controllers/    # Logic for handling API requests
│   ├── middlewares/    # Authentication middleware, error handling
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # API routes definitions
│   └── utils/          # Utility functions (e.g., token generation)
├── .gitignore
├── package.json        # Project dependencies and scripts
├── server.js           # Main server file
└── README.md           # This file
```

## Deployment

This backend application can be deployed to platforms like Render, Heroku, or other cloud hosting services. Ensure that environment variables are correctly configured on your chosen platform.
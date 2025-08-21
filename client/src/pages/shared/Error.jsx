import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface  px-4">
      <div className="max-w-md text-center p-8  bg-surface rounded-lg shadow">
        <h1 className="text-6xl font-extrabold text-primary">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Sorry — we couldn't find the page you were looking for.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-5 py-2 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-black font-medium"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;

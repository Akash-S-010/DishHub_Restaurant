import React from "react";
import { Loader } from "lucide-react";

export const Button = ({
  title = "Button",
  className = "",
  onClick,
  loading = false,
  children,
  type = "button",
  ...rest
}) => {
  const defaultClasses =
    "inline-flex items-center justify-center px-4 py-2 rounded-md cursor-pointer hover:scale-103  font-semibold transition disabled:opacity-50 bg-primary hover:bg-primary-600 text-black";
  const classes = `${defaultClasses} ${className || ""}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={classes}
      {...rest}
    >
      {loading ? (
        <Loader className="animate-spin w-5 h-5 text-black" />
      ) : children ? (
        children
      ) : (
        title
      )}
    </button>
  );
};

export const SubmitBtn = ({
  title = "Submit",
  width = "100%",
  loading = false,
  className = "",
}) => {
  const defaultClasses =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-extrabold cursor-pointer hover:scale-103 transition disabled:opacity-50 bg-primary hover:bg-primary-600 text-black w-full";
  const classes = `${defaultClasses} ${className || ""}`.trim();

  return (
    <button
      type="submit"
      disabled={loading}
      className={classes}
      style={{ width }}
    >
      {loading ? (
        <Loader className="animate-spin w-5 h-5 text-black mx-auto" />
      ) : (
        title
      )}
    </button>
  );
};

export default Button;

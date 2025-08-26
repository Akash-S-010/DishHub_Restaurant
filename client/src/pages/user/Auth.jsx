import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/authStore.js";
import { SubmitBtn } from "../../components/ui/Button.jsx";

const EmailOrPhone = ({ register, errors }) => {
  return (
    <div>
      <label className="block text-off-white text-sm mb-1">Email or Phone</label>
      <input
        {...register("login", {
          required: "Email or phone is required",
          validate: (v) => {
            const isEmail = /\S+@\S+\.\S+/.test(v);
            const isPhone = /^[6-9]\d{9}$/.test(v);
            return isEmail || isPhone || "Enter a valid email or 10-digit phone";
          },
        })}
        placeholder="you@example.com or 9876543210"
        className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
      />
      {errors.login && (
        <p className="text-accent text-xs mt-1">{errors.login.message}</p>
      )}
    </div>
  );
};

const SignupFields = ({ register, errors }) => (
  <>
    <div>
      <label className="block text-off-white text-sm mb-1">Name</label>
      <input
        {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
        placeholder="Your good name"
        className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
      />
      {errors.name && <p className="text-accent text-xs mt-1">{errors.name.message}</p>}
    </div>

    <div>
      <label className="block text-off-white text-sm mb-1">Email</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
        })}
        placeholder="you@example.com"
        className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
      />
      {errors.email && <p className="text-accent text-xs mt-1">{errors.email.message}</p>}
    </div>

    <div>
      <label className="block text-off-white text-sm mb-1">Phone</label>
      <input
        {...register("phone", {
          required: "Phone is required",
          pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit phone" },
        })}
        placeholder="9876543210"
        className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
      />
      {errors.phone && <p className="text-accent text-xs mt-1">{errors.phone.message}</p>}
    </div>
  </>
);

const PasswordField = ({ register, errors }) => (
  <div>
    <label className="block text-off-white text-sm mb-1">Password</label>
    <input
      type="password"
      {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
      placeholder="••••••"
      className="w-full px-4 py-2 rounded-md bg-card border border-surface text-off-white placeholder:text-muted"
    />
    {errors.password && (
      <p className="text-accent text-xs mt-1">{errors.password.message}</p>
    )}
  </div>
);

const Auth = () => {
  const { mode = "login" } = useParams();
  const navigate = useNavigate();
  const { login, signup, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (mode === "login") {
      const res = await login({ login: data.login, password: data.password });
      if (res.ok) navigate("/");
    } else {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      const res = await signup(payload);
      if (res.ok) navigate("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10 items-center">
      {/* Left: brand/illustration */}
      <div className="hidden lg:block">
        <div className="rounded-2xl border border-surface bg-card h-[420px]" />
      </div>

      {/* Right: form */}
      <div className="rounded-2xl border border-surface bg-card p-6 md:p-8">
        <div className="flex items-center gap-6 mb-6">
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-off-white"
            }
            end
          >
            Login
          </NavLink>
          <NavLink
            to="/auth/signup"
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : "text-off-white"
            }
          >
            Sign Up
          </NavLink>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === "login" ? (
            <>
              <EmailOrPhone register={register} errors={errors} />
              <PasswordField register={register} errors={errors} />
            </>
          ) : (
            <>
              <SignupFields register={register} errors={errors} />
              <PasswordField register={register} errors={errors} />
            </>
          )}

          <SubmitBtn title={mode === "login" ? "Login" : "Create Account"} loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Auth;


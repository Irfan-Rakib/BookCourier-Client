import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const { loginUser, resetPassword } = UseAuth(); // resetPassword = Firebase sendPasswordResetEmail
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login successful!");
      navigate(location?.state || "/");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/invalid-credential") {
        toast.error("Incorrect email or password!");
        setError("password", {
          type: "custom",
          message: "Incorrect email or password!",
        });
      } else if (err.code === "auth/user-not-found") {
        toast.error("Email not registered!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async () => {
    const email = getValues("email");

    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("Email not registered!");
      } else {
        toast.error("Failed to send reset email.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      {/* Left Side Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <div>
          <h1 className="text-5xl font-bold text-secondary mb-4">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Access thousands of books, manage your library and continue your
            reading journey.
          </p>
        </div>
      </div>

      {/* Right Side Login Card */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="card max-w-sm w-full bg-base-100 shadow-xl p-6 relative z-10">
          <h2 className="text-2xl font-bold text-center text-secondary mb-1">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Password */}
            <label className="label mt-3">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
                })}
                className="input input-bordered w-full"
                placeholder="Password"
              />

              {/* Eye Icon */}
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>

            {/* Errors */}
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be 6 characters or longer.
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Must include uppercase, lowercase, number & special character.
              </p>
            )}
            {errors.password?.type === "custom" && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Forgot Password */}
            <div className="flex justify-between mt-2">
              <button
                type="button"
                className="link text-sm"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button className="btn btn-primary w-full mt-4">Login</button>
          </form>

          {/* Register Link */}
          <p className="mt-3 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-primary font-semibold"
            >
              Register
            </Link>
          </p>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;

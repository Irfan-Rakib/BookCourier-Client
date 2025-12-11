import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import UseAuth from "../../../Hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = UseAuth();

  const handleRegister = async (data) => {
    try {
      const profileImg = data.photo[0];

      // Create account
      const result = await registerUser(data.email, data.password);

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgbb_host_API
      }`;

      const imgRes = await axios.post(image_API_URL, formData);

      if (!imgRes.data.success) {
        toast.error("Image upload failed, try again.");
        return;
      }

      // Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL: imgRes.data.data.url,
      };

      await updateUserProfile(userProfile);

      toast.success("Account created successfully!");
      navigate(location?.state || "/");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already registered!");
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      {/* Left Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <div>
          <h1 className="text-5xl font-bold text-secondary mb-4">Join Us</h1>
          <p className="text-lg text-gray-600 max-w-md">
            Create an account to explore thousands of books and manage your
            reading journey efficiently.
          </p>
        </div>
      </div>

      {/* Right Register Card */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="card max-w-sm w-full bg-base-100 dark:border shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-secondary mb-1">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Fill the information to register
          </p>

          <form onSubmit={handleSubmit(handleRegister)}>
            {/* Photo */}
            <label className="label">Your Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">Photo is required</p>
            )}

            {/* Name */}
            <label className="label mt-3">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}

            {/* Email */}
            <label className="label mt-3">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && (
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

              {/* Show/Hide Icon */}
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
              >
                {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>

            {/* Password Errors */}
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Minimum 6 characters required
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Must include uppercase, lowercase, number & special character.
              </p>
            )}

            {/* Submit */}
            <button className="btn btn-primary w-full mt-5">Register</button>

            {/* Login Redirect */}
            <p className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <Link
                state={location.state}
                to="/login"
                className="text-secondary font-bold link"
              >
                Login
              </Link>
            </p>
          </form>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;

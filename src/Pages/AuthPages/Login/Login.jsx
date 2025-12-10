import React from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { loginUser } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await loginUser(data.email, data.password);
      console.log(result.user);
      navigate(location?.state || "/");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-credential") {
        setError("password", {
          type: "custom",
          message: "Your email or password does not exist",
        });
        // alert("Your email or password does not exist");
      }
    }
  };

  return (
    <div className="card max-w-sm w-full mx-auto">
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500" role="alert">
              Email is required
            </p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
            })}
            className="input"
            placeholder="Password"
          />

          {/* Add this for custom Firebase error */}
          {errors.password?.type === "custom" && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 charecters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must include at least one uppercase, one lowercase, one
              number, and one special character.
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p className="mt-3">
          {" "}
          Don't have an account?{" "}
          <Link
            state={location.state}
            className="link-hover font-bold"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;

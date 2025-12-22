import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.get(
        "https://book-courier-server-snowy.vercel.app/superadmin/dashboard",
        {
          headers: {
            "x-admin-email": creds.email,
            "x-admin-pass": creds.password,
          },
        }
      );

      toast.success("✅ Super Admin Login Success!");
      navigate(location.state?.from || "/superadmin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-2xl rounded-3xl border-4 border-red-500">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            🔥 SUPER ADMIN
          </h1>
          <p className="text-xl text-gray-600 font-bold">
            System Control Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="🔑 Super Admin Email"
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            className="input input-bordered input-lg w-full text-lg"
            required
          />

          <input
            type="password"
            placeholder="🔐 Super Admin Password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            className="input input-bordered input-lg w-full text-lg"
            required
          />

          <button
            type="submit"
            className="btn btn-error w-full btn-lg text-xl font-bold"
            disabled={loading}
          >
            {loading ? "🔄 Logging in..." : "🚀 ENTER SUPER ADMIN"}
          </button>
        </form>

        <div className="mt-8 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-center">
          <p className="font-bold text-red-800 mb-2">📋 Default Credentials:</p>
          <div className="font-mono text-sm space-y-1 text-red-700">
            <p>📧 superadmin@bookcourier.com</p>
            <p>🔑 BookCourier2025!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

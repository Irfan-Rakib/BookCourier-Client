import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import UseAuth from "../Hooks/UseAuth";
import { Link } from "react-router";
import { toast } from "react-toastify";

const UserDashboardChart = () => {
  const { user } = UseAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalPaid: 0,
    totalPending: 0,
    wishlistCount: 0,
    monthlyOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchUserStats();
    }
  }, [user?.email]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);

      const [ordersRes, wishlistRes] = await Promise.all([
        axios.get(`http://localhost:3000/orders/${user.email}`),
        axios.get(`http://localhost:3000/wishlist/${user.email}`),
      ]);

      const orders = ordersRes.data;

      const totalOrders = orders.length;
      const totalPaid = orders.filter((o) => o.paymentStatus === "paid").length;
      const totalPending = orders.filter(
        (o) => o.orderStatus === "pending"
      ).length;

      // Monthly orders
      const monthlyData = orders.reduce((acc, order) => {
        const month = new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      const monthlyOrders = Object.entries(monthlyData)
        .map(([month, count]) => ({ month, orders: count }))
        .slice(-6); // Last 6 months

      setStats({
        totalOrders,
        totalPaid,
        totalPending,
        wishlistCount: wishlistRes.data.length,
        monthlyOrders,
      });
    } catch (error) {
      console.error("User stats error:", error);
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: "Pending", value: stats.totalPending, color: "#F59E0B" },
    { name: "Paid", value: stats.totalPaid, color: "#10B981" },
    {
      name: "Cancelled",
      value: stats.totalOrders - stats.totalPending - stats.totalPaid,
      color: "#EF4444",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4 block mx-auto"></span>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            👋 Welcome Back
          </h1>
          <p className="text-xl text-gray-600 font-semibold">
            {user?.displayName || user?.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-primary">🛒</div>
            <div className="stat-value text-2xl">{stats.totalOrders}</div>
            <div className="stat-title">Total Orders</div>
          </div>
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-success">✅</div>
            <div className="stat-value text-2xl text-success">
              {stats.totalPaid}
            </div>
            <div className="stat-title">Completed</div>
          </div>
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-warning">⏳</div>
            <div className="stat-value text-2xl text-warning">
              {stats.totalPending}
            </div>
            <div className="stat-title">Pending</div>
          </div>
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-secondary">❤️</div>
            <div className="stat-value text-2xl">{stats.wishlistCount}</div>
            <div className="stat-title">Wishlist</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card shadow-lg rounded-lg p-4 bg-base-100">
            <h3 className="text-xl font-semibold mb-4">📈 Your Orders Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card shadow-lg rounded-lg p-4 bg-base-100">
            <h3 className="text-xl font-semibold mb-4">📊 Orders Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData.filter((d) => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/dashboard//user/my-orders"
            className="card bg-primary text-primary-content shadow-lg p-4 rounded-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">🛒</div>
              <h2 className="text-lg font-semibold">My Orders</h2>
              <p className="text-sm opacity-90">({stats.totalOrders})</p>
            </div>
          </Link>

          <Link
            to="/dashboard//user/wishlist"
            className="card bg-secondary text-secondary-content shadow-lg p-4 rounded-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">❤️</div>
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <p className="text-sm opacity-90">({stats.wishlistCount})</p>
            </div>
          </Link>

          <Link
            to="/dashboard/user/invoices"
            className="card bg-success text-success-content shadow-lg p-4 rounded-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">📄</div>
              <h2 className="text-lg font-semibold">Invoices</h2>
              <p className="text-sm opacity-90">({stats.totalPaid})</p>
            </div>
          </Link>

          <a
            href="/books"
            className="card bg-accent text-accent-content shadow-lg p-4 rounded-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">📚</div>
              <h2 className="text-lg font-semibold">Browse Books</h2>
            </div>
          </a>
        </div>

        {/* Refresh */}
        <div className="text-center mt-8">
          <button
            onClick={fetchUserStats}
            className="btn btn-outline btn-primary btn-lg"
            disabled={loading}
          >
            🔄 Refresh Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardChart;

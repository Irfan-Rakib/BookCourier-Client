import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { Link } from "react-router";
import UseAuth from "../Hooks/UseAuth";

const LibrarianDashboardChart = () => {
  const { user } = UseAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchStats();
  }, [user?.email]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/librarian/stats/${user.email}`
      );
      setStats(res.data);
      console.log("Librarian Stats:", res.data);
    } catch (error) {
      console.error("Librarian stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: "Pending", value: stats.pending || 0, color: "#F59E0B" },
    { name: "Confirmed", value: stats.confirmed || 0, color: "#10B981" },
    { name: "Cancelled", value: stats.cancelled || 0, color: "#EF4444" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl  ">📚 Librarian Dashboard</h1>
          <p className="text-xl mt-4">
            Welcome, {user?.displayName || user?.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 shadow-2xl mb-12 gap-4">
          <div className="stat p-4 rounded-lg bg-base-200">
            <div className="stat-figure text-3xl text-primary">📚</div>
            <div className="stat-value text-2xl">{stats.totalBooks}</div>
            <div className="stat-title">My Books</div>
          </div>
          <div className="stat p-4 rounded-lg bg-base-200">
            <div className="stat-figure text-3xl text-warning">⏳</div>
            <div className="stat-value text-2xl text-warning">
              {stats.pending}
            </div>
            <div className="stat-title">Pending Orders</div>
          </div>
          <div className="stat p-4 rounded-lg bg-base-200">
            <div className="stat-figure text-3xl text-secondary">📦</div>
            <div className="stat-value text-2xl">{stats.totalOrders}</div>
            <div className="stat-title">Total Orders</div>
          </div>
        </div>

        {/* Orders Status Pie Chart */}
        <div className="card bg-base-100 shadow-xl rounded-lg mb-12">
          <div className="card-body">
            <h3 className="card-title mb-4 text-lg md:text-xl font-semibold">
              📊 Orders Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={2}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            to="/dashboard/librarian/add-books"
            className="card bg-success text-success-content shadow-xl hover:shadow-2xl transition p-4 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-2">➕</div>
              <h2 className="text-lg font-semibold">Add New Book</h2>
            </div>
          </Link>

          <Link
            to="/dashboard/librarian/books"
            className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition p-4 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-2">📚</div>
              <h2 className="text-lg font-semibold">
                My Books ({stats.totalBooks})
              </h2>
            </div>
          </Link>

          <Link
            to="/dashboard/librarian/orders"
            className="card bg-warning text-warning-content shadow-xl hover:shadow-2xl transition p-4 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-2">📦</div>
              <h2 className="text-lg font-semibold">
                My Orders ({stats.totalOrders})
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboardChart;

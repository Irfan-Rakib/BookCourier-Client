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
  Legend,
} from "recharts";
import axios from "axios";
import { Link } from "react-router";

const AdminDashboardChart = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Admin stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    {
      name: "Users",
      value: stats.totalUsers - (stats.librarians || 0) - (stats.admins || 0),
    },
    { name: "Librarians", value: stats.librarians || 0 },
    { name: "Admins", value: stats.admins || 1 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl ">👑 Admin Analytics</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-primary">👥</div>
            <div className="stat-value text-2xl">{stats.totalUsers}</div>
            <div className="stat-title">Total Users</div>
          </div>
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-secondary">📚</div>
            <div className="stat-value text-2xl">{stats.totalBooks}</div>
            <div className="stat-title">Published Books</div>
          </div>
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-figure text-3xl text-success">📦</div>
            <div className="stat-value text-2xl">{stats.totalOrders}</div>
            <div className="stat-title">Total Orders</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="card bg-base-100 shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">📈 Books Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    month: "Total",
                    books: stats.totalBooks,
                    orders: stats.totalOrders,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="books" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="card bg-base-100 shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">
              👥 User Roles Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
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
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/dashboard/admin/users"
            className="card bg-primary text-primary-content shadow-lg p-4 rounded-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">👥</div>
              <h2 className="text-lg font-semibold">Manage Users</h2>
              <p>{stats.totalUsers} users</p>
            </div>
          </Link>

          <Link
            to="/dashboard/admin/manage-book"
            className="card bg-secondary text-secondary-content shadow-lg p-4 rounded-lg hover:shadow-2xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl mb-2">📚</div>
              <h2 className="text-lg font-semibold">Manage Books</h2>
              <p>{stats.totalBooks} books</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardChart;

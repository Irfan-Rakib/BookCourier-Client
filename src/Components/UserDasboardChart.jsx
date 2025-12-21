import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";
import UseAuth from "../Hooks/UseAuth";
import { Link } from "react-router";

const UserDashboardChart = () => {
  const { user } = UseAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/orders/${user.email}`)
        .then((res) => setOrders(res.data))
        .catch(console.error);
    }
  }, [user]);

  const chartData = [
    { month: "Jan", orders: 2 },
    { month: "Feb", orders: 3 },
    { month: "Mar", orders: 1 },
    { month: "Apr", orders: 4 },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome back, {user?.displayName}
        </h1>
      </div>

      {/* Stats */}
      <div className="stats shadow mb-8">
        <div className="stat">
          <div className="stat-figure text-primary">🛒</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-title">Total Orders</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-success">⭐</div>
          <div className="stat-value">4.8</div>
          <div className="stat-title">Avg Rating</div>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h3 className="card-title">📊 My Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dashboard/orders" className="card bg-primary shadow-xl">
          <div className="card-body">
            <h2 className="card-title">🛒 My Orders</h2>
          </div>
        </Link>
        <Link to="/dashboard/wishlist" className="card bg-secondary shadow-xl">
          <div className="card-body">
            <h2 className="card-title">❤️ Wishlist</h2>
          </div>
        </Link>
        <Link to="/books" className="card bg-accent shadow-xl">
          <div className="card-body">
            <h2 className="card-title">📚 Browse Books</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardChart;

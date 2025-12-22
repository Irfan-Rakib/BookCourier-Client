import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const Orders = () => {
  const { user } = UseAuth(); // Librarian email
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      console.log("🔍 Fetching orders for:", user.email); // DEBUG
      const res = await axios.get(
        `https://book-courier-server-snowy.vercel.app/librarian/orders/${user.email}`
      );
      console.log("📦 Orders received:", res.data.length); // DEBUG
      setOrders(res.data);
    } catch (error) {
      console.error("❌ Orders error:", error.response?.data || error.message);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.email]); // ✅ FIXED: user?.email dependency

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      console.log("❌ Cancelling order:", orderId); // DEBUG
      const res = await axios.patch(
        `https://book-courier-server-snowy.vercel.app/librarian/orders/status/${orderId}`,
        { orderStatus: "cancelled" } // ✅ Body properly formatted
      );
      console.log("✅ Cancel response:", res.data); // DEBUG
      toast.success("Order cancelled successfully!");
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("❌ Cancel error:", error.response?.data || error.message);
      toast.error("Failed to cancel order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "confirmed":
        return "badge-success";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  // ✅ Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4 block mx-auto"></span>
          <p className="text-lg text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          📦 My Book Orders
        </h1>
        <p className="text-xl text-gray-600">
          All orders for books added by <strong>{user?.email || "you"}</strong>
        </p>
        <button
          onClick={fetchOrders}
          className="btn btn-outline btn-primary mt-4"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="stats shadow-2xl bg-base-100 mb-8 max-w-4xl mx-auto">
        <div className="stat">
          <div className="stat-figure text-primary">📦</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-title">Total Orders</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-warning">⏳</div>
          <div className="stat-value text-warning">
            {orders.filter((o) => o.orderStatus === "pending").length}
          </div>
          <div className="stat-title">Pending</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-success">✅</div>
          <div className="stat-value text-success">
            {orders.filter((o) => o.orderStatus === "confirmed").length}
          </div>
          <div className="stat-title">Confirmed</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">❌</div>
          <div className="stat-value text-error">
            {orders.filter((o) => o.orderStatus === "cancelled").length}
          </div>
          <div className="stat-title">Cancelled</div>
        </div>
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover">
                    {/* Book Image */}
                    <td>
                      <img
                        src={
                          order.bookImg_URL ||
                          "https://via.placeholder.com/64x80"
                        }
                        alt={order.bookName}
                        className="w-16 h-20 object-cover rounded-lg shadow-md"
                      />
                    </td>

                    {/* Book Name */}
                    <td className="font-semibold max-w-xs">
                      <div className="truncate" title={order.bookName}>
                        {order.bookName || "Deleted Book"}
                      </div>
                    </td>

                    {/* Customer Name */}
                    <td className="font-medium">{order.userName || "N/A"}</td>

                    {/* Phone */}
                    <td className="font-mono text-sm">{order.phone}</td>

                    {/* Quantity */}
                    <td className="font-mono font-bold text-lg text-success">
                      ×{order.quantity || 1}
                    </td>

                    {/* Total Price */}
                    <td className="font-mono font-bold text-2xl text-primary">
                      ৳{(order.totalPrice || 0)?.toLocaleString()}
                    </td>

                    {/* Payment Status */}
                    <td>
                      <span
                        className={`badge-lg px-4 py-3 ${
                          order.paymentStatus === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {order.paymentStatus?.toUpperCase() || "UNPAID"}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td>
                      <span
                        className={`badge-lg px-4 py-3 ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus || "pending"}
                      </span>
                    </td>

                    {/* Action - Cancel Button */}
                    <td>
                      {order.orderStatus !== "cancelled" &&
                        order.paymentStatus !== "paid" && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="btn btn-sm btn-error"
                          >
                            ❌ Cancel
                          </button>
                        )}
                      {order.orderStatus === "cancelled" && (
                        <span className="badge badge-error px-4 py-3 font-bold">
                          Cancelled
                        </span>
                      )}
                      {order.paymentStatus === "paid" && (
                        <span className="badge badge-success px-4 py-3 font-bold">
                          Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="mx-auto w-32 h-32 mb-8 bg-base-200 rounded-2xl flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-700 mb-4">
            No orders yet
          </h3>
          <p className="text-xl text-gray-500 mb-8">
            No orders for your books. Customers will place orders soon!
          </p>
          <button
            onClick={fetchOrders}
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            🔄 Refresh Orders
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="text-center mt-12 pt-8 border-t border-base-200">
        <p className="text-sm text-gray-500">
          Showing <strong>{orders.length}</strong> orders for librarian:{" "}
          <strong>{user?.email}</strong>
        </p>
      </div>
    </div>
  );
};

export default Orders;

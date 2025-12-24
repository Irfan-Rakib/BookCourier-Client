import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const Orders = () => {
  const { user } = UseAuth(); // Librarian email
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchOrders = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      console.log("🔍 Fetching orders for:", user.email);
      const res = await axios.get(
        `https://book-courier-server-snowy.vercel.app/librarian/orders/${user.email}`
      );
      console.log("📦 Orders received:", res.data.length);
      setOrders(res.data);

      if (res.data.length > 0) {
        toast.success(`Loaded ${res.data.length} orders!`);
      }
    } catch (error) {
      console.error("❌ Orders error:", error.response?.data || error.message);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?.email]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      console.log("❌ Cancelling order:", orderId);
      const res = await axios.patch(
        `https://book-courier-server-snowy.vercel.app/librarian/orders/status/${orderId}`,
        { orderStatus: "cancelled" }
      );
      console.log("✅ Cancel response:", res.data);
      toast.success("Order cancelled successfully!");
      fetchOrders();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="text-center max-w-md w-full">
          <span className="loading loading-spinner loading-lg text-primary mb-4 block mx-auto"></span>
          <p className="text-lg text-gray-600">Loading orders...</p>
          <p className="text-sm text-gray-500 mt-2">{user?.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      {/* Header - Responsive */}
      <div className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
          📦 My Book Orders
        </h1>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
          All orders for books added by <strong>{user?.email || "you"}</strong>
        </p>
        <button
          onClick={fetchOrders}
          className="btn btn-outline btn-primary mt-4 btn-lg w-full sm:w-auto max-w-sm mx-auto"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Stats - Responsive Grid */}
      <div className="stats shadow-2xl bg-base-100 mb-8 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 sm:p-0">
          <div className="stat place-items-center">
            <div className="stat-figure text-primary text-2xl sm:text-3xl">
              📦
            </div>
            <div className="stat-value text-lg sm:text-3xl">
              {orders.length}
            </div>
            <div className="stat-title text-xs sm:text-base">Total Orders</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-figure text-warning text-2xl sm:text-3xl">
              ⏳
            </div>
            <div className="stat-value text-warning text-lg sm:text-3xl">
              {orders.filter((o) => o.orderStatus === "pending").length}
            </div>
            <div className="stat-title text-xs sm:text-base">Pending</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-figure text-success text-2xl sm:text-3xl">
              ✅
            </div>
            <div className="stat-value text-success text-lg sm:text-3xl">
              {orders.filter((o) => o.orderStatus === "confirmed").length}
            </div>
            <div className="stat-title text-xs sm:text-base">Confirmed</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-figure text-error text-2xl sm:text-3xl">
              ❌
            </div>
            <div className="stat-value text-error text-lg sm:text-3xl">
              {orders.filter((o) => o.orderStatus === "cancelled").length}
            </div>
            <div className="stat-title text-xs sm:text-base">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Orders - Cards on Mobile, Table on Desktop */}
      {orders.length > 0 ? (
        <div className="max-w-7xl mx-auto w-full space-y-4">
          {isMobile ? (
            // ✅ MOBILE: Card Layout
            orders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 shadow-xl compact"
              >
                <div className="card-body p-4 sm:p-6 gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img
                      src={
                        order.bookImg_URL ||
                        "https://via.placeholder.com/64x80?text=Book"
                      }
                      alt={order.bookName}
                      className="w-20 h-24 sm:w-16 sm:h-20 object-cover rounded-lg shadow-md flex-shrink-0"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/64x80?text=Book")
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-bold text-lg truncate"
                        title={order.bookName}
                      >
                        {order.bookName || "Deleted Book"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.userName || "N/A"} • {order.phone}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold">Qty:</span> ×
                      {order.quantity || 1}
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xl text-primary block">
                        ৳{(order.totalPrice || 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`badge badge-sm ${
                          order.paymentStatus === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {order.paymentStatus?.toUpperCase() || "UNPAID"}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`badge badge-sm ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus || "pending"}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Action */}
                  <div className="pt-3">
                    {order.orderStatus !== "cancelled" &&
                    order.paymentStatus !== "paid" ? (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="btn btn-sm btn-error w-full"
                      >
                        ❌ Cancel Order
                      </button>
                    ) : order.orderStatus === "cancelled" ? (
                      <span className="badge badge-error px-4 py-2 font-bold w-full text-center block">
                        Cancelled
                      </span>
                    ) : (
                      <span className="badge badge-success px-4 py-2 font-bold w-full text-center block">
                        Paid
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // ✅ DESKTOP: Table Layout
            <div className="card bg-base-100 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Image</th>
                      <th>Book</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="hover">
                        <td>
                          <img
                            src={
                              order.bookImg_URL ||
                              "https://via.placeholder.com/64x80?text=Book"
                            }
                            alt={order.bookName}
                            className="w-16 h-20 object-cover rounded-lg shadow-md"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/64x80?text=Book")
                            }
                          />
                        </td>
                        <td className="max-w-xs">
                          <div
                            className="font-semibold truncate"
                            title={order.bookName}
                          >
                            {order.bookName || "Deleted Book"}
                          </div>
                        </td>
                        <td className="font-medium">
                          {order.userName || "N/A"}
                        </td>
                        <td className="font-mono text-sm">{order.phone}</td>
                        <td className="font-bold text-success">
                          ×{order.quantity || 1}
                        </td>
                        <td className="font-bold text-2xl text-primary">
                          ৳{(order.totalPrice || 0).toLocaleString()}
                        </td>
                        <td>
                          <span
                            className={`badge-lg px-4 py-3 font-semibold ${
                              order.paymentStatus === "paid"
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {order.paymentStatus?.toUpperCase() || "UNPAID"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge-lg px-4 py-3 font-semibold ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus || "pending"}
                          </span>
                        </td>
                        <td>
                          {order.orderStatus !== "cancelled" &&
                          order.paymentStatus !== "paid" ? (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="btn btn-sm btn-error"
                            >
                              ❌ Cancel
                            </button>
                          ) : order.orderStatus === "cancelled" ? (
                            <span className="badge badge-error px-4 py-3 font-bold">
                              Cancelled
                            </span>
                          ) : (
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
          )}
        </div>
      ) : (
        <div className="text-center py-20 max-w-2xl mx-auto px-4">
          <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-8 bg-base-200 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 sm:w-20 sm:h-20 text-gray-400"
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
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
            No orders yet
          </h3>
          <p className="text-lg sm:text-xl text-gray-500 mb-8 px-4">
            No orders for your books. Customers will place orders soon!
          </p>
          <button
            onClick={fetchOrders}
            className="btn btn-primary btn-lg w-full sm:w-auto max-w-sm"
            disabled={loading}
          >
            🔄 Refresh Orders
          </button>
        </div>
      )}

      {/* Summary - Responsive */}
      <div className="text-center mt-12 pt-8 border-t border-base-200 px-4">
        <p className="text-sm text-gray-500">
          Showing <strong>{orders.length}</strong> orders for librarian:{" "}
          <strong className="truncate max-w-full">{user?.email}</strong>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Orders;

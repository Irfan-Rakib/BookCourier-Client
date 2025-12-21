import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const MyOrders = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/orders/${user.email}`);
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user?.email]);

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmed) return;

    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
      toast.success("Order cancelled successfully!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };

  const handlePay = async (id) => {
    navigate(`/dashboard/user/payment/${id}`);
  };

  const getStatusBadge = (status) => {
    const classes = {
      pending: "badge-warning",
      confirmed: "badge-success",
      cancelled: "badge-error",
      delivered: "badge-success",
    };
    return `badge ${classes[status] || "badge-ghost"}`;
  };

  const getPaymentBadge = (status) => {
    const classes = {
      paid: "badge-success",
      unpaid: "badge-warning",
    };
    return `badge ${classes[status] || "badge-ghost"}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const totalAmount = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
          My Orders
        </h1>
        {orders.length > 0 && (
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">Total Orders</div>
              <div className="stat-value text-primary">{orders.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Spent</div>
              <div className="stat-value text-secondary">
                ৳{totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 mb-6">
            <svg
              className="w-full h-full text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start shopping to see your orders here
          </p>
          <button
            className="btn btn-primary btn-wide"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Mobile: Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {orders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 shadow-xl compact"
              >
                <div className="card-body p-4">
                  {/* Book Info + Amount */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg leading-tight line-clamp-1 mb-1">
                        {order.bookName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="text-gray-500">Qty:</span>
                        <span className="font-semibold">
                          {order.quantity || 1}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-primary font-bold">
                          ৳
                          {(
                            order.totalPrice ||
                            order.price ||
                            0
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className={getStatusBadge(order.orderStatus)}>
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="text-xs space-y-1 mb-4 text-gray-500">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span>{order.phone}</span>
                    </div>
                  </div>

                  {/* Status & Payment */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={getPaymentBadge(order.paymentStatus)}>
                      {order.paymentStatus}
                    </span>
                  </div>

                  {/* Actions */}
                  {order.orderStatus === "pending" && (
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="btn btn-sm btn-error flex-1"
                      >
                        Cancel
                      </button>
                      {order.paymentStatus !== "paid" && (
                        <button
                          onClick={() => handlePay(order._id)}
                          className="btn btn-sm btn-primary flex-1"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-200">
              <table className="table w-full">
                <thead className="bg-base-200/50">
                  <tr>
                    <th>Book</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover">
                      <td className="font-semibold max-w-xs">
                        <div className="truncate">{order.bookName}</div>
                      </td>
                      <td className="text-center font-mono">
                        {order.quantity || 1}
                      </td>
                      <td className="font-bold text-primary text-lg">
                        ৳
                        {(
                          order.totalPrice ||
                          order.price ||
                          0
                        ).toLocaleString()}
                      </td>
                      <td className="text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        <span className={getStatusBadge(order.orderStatus)}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>
                        <span className={getPaymentBadge(order.paymentStatus)}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="text-center">
                        {order.orderStatus === "pending" && (
                          <div className="flex gap-2 justify-center btn-group btn-group-vertical sm:btn-group-horizontal">
                            <button
                              onClick={() => handleCancel(order._id)}
                              className="btn btn-sm btn-error"
                            >
                              Cancel
                            </button>
                            {order.paymentStatus !== "paid" && (
                              <button
                                onClick={() => handlePay(order._id)}
                                className="btn btn-sm btn-primary"
                              >
                                Pay Now
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;

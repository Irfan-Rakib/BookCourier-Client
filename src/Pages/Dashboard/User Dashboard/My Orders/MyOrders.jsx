import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const MyOrders = () => {
  const { user } = UseAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/orders/${user.email}`);
      // Sort newest first
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user?.email]);

  const handleCancel = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
      toast.success("Order cancelled successfully!");
      fetchOrders();
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  const handlePay = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/pay/${id}`);
      toast.success("Payment successful!");
      fetchOrders();
    } catch {
      toast.error("Payment failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders yet</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover">
                  <td className="truncate max-w-xs font-semibold">
                    {order.bookName}
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.orderStatus === "pending"
                          ? "badge-warning"
                          : order.orderStatus === "cancelled"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="text-center">
                    {order.orderStatus === "pending" && (
                      <div className="flex gap-2 justify-center">
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
      )}
    </div>
  );
};

export default MyOrders;

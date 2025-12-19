import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const Orders = () => {
  const { user } = UseAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/librarian/orders/${user.email}`
      );
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
      toast.success("Order cancelled");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error(error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/orders/status/${id}`, {
        orderStatus: newStatus,
      });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    }
  };

  const nextStatuses = {
    Pending: ["Shipped", "Cancelled"],
    Shipped: ["Delivered", "Cancelled"],
    Delivered: [],
    Cancelled: [],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Orders for My Books</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.bookName}</td>
                  <td>{order.userName}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    {order.orderStatus === "Cancelled" ? (
                      <span className="badge badge-error">Cancelled</span>
                    ) : (
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="select select-bordered select-sm"
                        disabled={loading}
                      >
                        {[
                          order.orderStatus,
                          ...nextStatuses[order.orderStatus],
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    {order.paymentStatus === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-outline">Unpaid</span>
                    )}
                  </td>
                  <td>
                    {order.orderStatus !== "Cancelled" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No orders found for your books
        </p>
      )}
    </div>
  );
};

export default Orders;

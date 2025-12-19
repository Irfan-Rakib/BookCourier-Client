import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/orders/single/${orderId}`
        );
        setOrder(res.data);
      } catch (err) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      setPaying(true);

      // ✅ FIX 1: Update BOTH paymentStatus & orderStatus
      await axios.patch(`http://localhost:3000/orders/pay/${orderId}`);

      toast.success("Payment successful! Order confirmed.");

      // ✅ FIX 2: Go back to MyOrders (not dashboard)
      navigate("/dashboard/user/orders");
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Payment</h2>

      <div className="card p-6 shadow-lg max-w-md mx-auto flex flex-col items-center">
        {/* Book Image */}
        <img
          src={order.bookImg_URL}
          alt={order.bookName}
          className="w-48 h-64 object-cover rounded-lg mb-4"
        />

        <p className="text-lg">
          <span className="font-semibold">Book:</span> {order.bookName}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Amount:</span> ৳ {order.price}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Order Status:</span>{" "}
          <span
            className={`badge capitalize ${
              order.orderStatus === "pending"
                ? "badge-warning"
                : "badge-success"
            }`}
          >
            {order.orderStatus}
          </span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Payment Status:</span>{" "}
          <span
            className={`badge capitalize ${
              order.paymentStatus === "paid" ? "badge-success" : "badge-warning"
            }`}
          >
            {order.paymentStatus}
          </span>
        </p>

        <button
          onClick={handlePayment}
          disabled={
            paying ||
            order.paymentStatus === "paid" ||
            order.orderStatus === "cancelled"
          }
          className="btn btn-primary mt-4 w-full"
        >
          {paying ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Pay Now"
          )}
        </button>

        {order.paymentStatus === "paid" && (
          <p className="text-green-600 mt-2 font-semibold">✅ Already Paid</p>
        )}
        {order.orderStatus === "cancelled" && (
          <p className="text-red-600 mt-2 font-semibold">❌ Order Cancelled</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

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
        setError("Order not found");
        toast.error("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    if (order.paymentStatus === "paid") {
      toast.info("Already paid!");
      return;
    }
    try {
      setPaying(true);
      await axios.patch(`http://localhost:3000/orders/pay/${orderId}`);
      toast.success(
        `Payment successful! ৳${(
          order.totalPrice || order.price
        ).toLocaleString()}`
      );
      navigate("/dashboard/user/my-orders");
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4 block mx-auto"></span>
          <p className="text-lg text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
          <div className="card-body items-center text-center p-6 sm:p-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-error rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => navigate("/dashboard/user/my-orders")}
                className="btn btn-primary flex-1"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate("/")}
                className="btn btn-outline flex-1"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const displayAmount = order.totalPrice || order.price || 0;
  const isPaid = order.paymentStatus === "paid";
  const isCancelled = order.orderStatus === "cancelled";
  const canPay = order.orderStatus === "pending" && !isPaid && !isCancelled;

  return (
    <div className="min-h-screen bg-base-200 py-6 ">
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Complete Payment
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
            Secure checkout for your book order
          </p>
        </div>

        {/* Payment Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-200 p-4 sm:p-6 lg:p-8 rounded-xl">
          {/* Book Preview */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 mb-6 lg:mb-8 text-center lg:text-left">
            <div className="flex-shrink-0">
              <div className="w-28 h-40 sm:w-32 sm:h-48 lg:w-40 lg:h-56 bg-base-200 rounded-xl overflow-hidden shadow-md mx-auto lg:mx-0">
                <img
                  src={order.image || order.bookImg_URL}
                  alt={order.bookName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Order Details */}
            <div className="flex-1 space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold  line-clamp-2">
                {order.bookName}
              </h2>

              {order.quantity && (
                <div className="flex items-center gap-2 text-sm sm:text-base  px-3 py-1 rounded-full w-fit mx-auto lg:mx-0">
                  <span className="font-semibold">Qty:</span>
                  <span className="font-mono">{order.quantity}</span>
                </div>
              )}

              <div className=" p-3 sm:p-4 rounded-xl shadow-lg mt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm sm:text-base font-medium text-success-content uppercase tracking-wide">
                    Total Amount
                  </span>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-secondary">
                      ৳{displayAmount.toLocaleString()}
                    </div>
                    {order.quantity && (
                      <div className="text-xs sm:text-sm opacity-90">
                        ৳{order.price?.toLocaleString()} × {order.quantity}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Order Status</div>
                <div
                  className={` ${
                    order.orderStatus === "pending"
                      ? "text-warning"
                      : order.orderStatus === "cancelled"
                      ? "text-error"
                      : "text-success"
                  }`}
                >
                  {order.orderStatus}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Payment Status</div>
                <div
                  className={` ${
                    order.paymentStatus === "paid"
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {order.paymentStatus}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 mb-4">
            {canPay && (
              <button
                onClick={handlePayment}
                disabled={paying}
                className="btn btn-primary flex-1 h-12 sm:h-14 text-lg sm:text-xl font-bold"
              >
                {paying ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Processing...
                  </>
                ) : (
                  `Pay Now ৳${displayAmount.toLocaleString()}`
                )}
              </button>
            )}
            {isPaid && (
              <button
                onClick={() => navigate("/dashboard/user/my-orders")}
                className="btn btn-success flex-1 h-12 sm:h-14 text-lg sm:text-xl"
              >
                View My Orders
              </button>
            )}
            {isCancelled && (
              <button
                onClick={() => navigate("/dashboard/user/my-orders")}
                className="btn btn-outline flex-1 h-12 sm:h-14 text-lg sm:text-xl"
              >
                Back to Orders
              </button>
            )}
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={() => navigate("/dashboard/user/my-orders")}
              className="btn btn-outline btn-wide"
            >
              ← Back to My Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

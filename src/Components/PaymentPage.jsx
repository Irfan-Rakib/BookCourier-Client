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
        // ✅ FIX 1: Use correct endpoint (add this to backend)
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

      // ✅ FIX 2: Go to MyOrders with success message
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
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4 block mx-auto"></span>
          <p className="text-lg text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
          <div className="card-body items-center text-center p-8">
            <div className="w-24 h-24 bg-error rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-12 h-12 text-white"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <div className="space-x-3">
              <button
                onClick={() => navigate("/dashboard/user/my-orders")}
                className="btn btn-primary"
              >
                View Orders
              </button>
              <button onClick={() => navigate("/")} className="btn btn-outline">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate display amount (totalPrice preferred)
  const displayAmount = order.totalPrice || order.price || 0;
  const isPaid = order.paymentStatus === "paid";
  const isCancelled = order.orderStatus === "cancelled";
  const canPay = order.orderStatus === "pending" && !isPaid && !isCancelled;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Complete Payment
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Secure checkout for your book order
          </p>
        </div>

        {/* Payment Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-200 max-w-2xl mx-auto">
          <div className="card-body p-8 lg:p-12">
            {/* Book Preview */}
            <div className="flex flex-col lg:flex-row items-center gap-6 mb-8 text-center lg:text-left">
              <div className="flex-shrink-0">
                <div className="w-32 h-48 lg:w-40 lg:h-56 bg-base-200 rounded-xl overflow-hidden shadow-xl mx-auto lg:mx-0">
                  <img
                    src={order.image || order.bookImg_URL}
                    alt={order.bookName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Order Details */}
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 line-clamp-2">
                  {order.bookName}
                </h2>

                {order.quantity && (
                  <div className="flex items-center gap-2 text-sm bg-base-200 px-4 py-2 rounded-full w-fit">
                    <span className="font-semibold">Qty:</span>
                    <span className="font-mono text-lg">{order.quantity}</span>
                  </div>
                )}

                {/* Amount - Highlighted */}
                <div className="bg-gradient-to-r from-success to-primary p-4 rounded-2xl shadow-lg">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-success-content uppercase tracking-wide">
                      Total Amount
                    </span>
                    <div className="text-right">
                      <div className="text-3xl lg:text-4xl font-black text-success-content">
                        ৳{displayAmount.toLocaleString()}
                      </div>
                      {order.quantity && (
                        <div className="text-sm opacity-90">
                          ৳{order.price?.toLocaleString()} × {order.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Order Status</div>
                  <div
                    className={`stat-value ${
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
                    className={`stat-value ${
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

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <span className="text-gray-500">Order ID:</span>
                <div className="font-mono bg-base-200 px-3 py-1 rounded mt-1 text-xs">
                  {orderId.slice(-8).toUpperCase()}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <div className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>
              {order.phone && (
                <div className="md:col-span-2">
                  <span className="text-gray-500">Phone:</span>
                  <div>{order.phone}</div>
                </div>
              )}
            </div>

            {/* Payment Button */}
            <div className="card-actions justify-center">
              {isPaid && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-success-content"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-success mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-success-content bg-success/20 px-6 py-3 rounded-full">
                    ✅ Already paid for this order
                  </p>
                  <button
                    onClick={() => navigate("/dashboard/user/my-orders")}
                    className="btn btn-success mt-4 w-full"
                  >
                    View My Orders
                  </button>
                </div>
              )}

              {isCancelled && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-error-content"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-error mb-2">
                    Order Cancelled
                  </h3>
                  <p className="text-error-content bg-error/20 px-6 py-3 rounded-full">
                    ❌ This order has been cancelled
                  </p>
                  <button
                    onClick={() => navigate("/dashboard/user/my-orders")}
                    className="btn btn-outline mt-4 w-full"
                  >
                    Back to Orders
                  </button>
                </div>
              )}

              {canPay && (
                <button
                  onClick={handlePayment}
                  disabled={paying}
                  className="btn btn-primary shadow-2xl border-2 border-primary hover:border-primary-focus w-full h-14 text-xl font-bold transform hover:scale-[1.02] transition-all duration-200"
                >
                  {paying ? (
                    <>
                      <span className="loading loading-spinner loading-lg mr-3"></span>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay Now ৳${displayAmount.toLocaleString()}`
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Back Navigation */}
          <div className="card-actions justify-center mt-6">
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

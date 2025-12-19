import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import BookReviews from "../../../Components/BookReviews";
import { useNavigate } from "react-router";

const OrderModal = ({ book, closeModal }) => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <-- added

  const handleOrder = async () => {
    if (!phone || !address) {
      return toast.error("Phone and address are required");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/orders", {
        bookId: book._id,
        bookName: book.bookName,
        price: book.price,
        userName: user.displayName,
        email: user.email,
        phone,
        address,
      });

      toast.success("Order placed successfully");
      closeModal();

      // Navigate to My Orders page
      navigate("/dashboard/user/my-orders");
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Order Book</h3>

        <input
          value={user?.displayName}
          readOnly
          className="input input-bordered w-full mb-3"
        />

        <input
          value={user?.email}
          readOnly
          className="input input-bordered w-full mb-3"
        />

        <input
          placeholder="Phone number"
          className="input input-bordered w-full mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Address"
          className="textarea textarea-bordered w-full mb-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="flex justify-end gap-3 mb-4">
          <button onClick={closeModal} className="btn btn-outline">
            Cancel
          </button>
          <button
            onClick={handleOrder}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </div>

        {/* Reviews Component */}
        <BookReviews bookId={book._id} userEmail={user?.email} />
      </div>
    </div>
  );
};

export default OrderModal;

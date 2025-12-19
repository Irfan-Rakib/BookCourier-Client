import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const BookReviews = ({ bookId, userEmail }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch existing reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/reviews/${bookId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Check if user purchased this book
  const checkPurchase = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/orders/${user?.email}`
      );
      const orderedBooks = res.data.map((o) => o.bookId);
      setCanReview(orderedBooks.includes(bookId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
    if (userEmail) checkPurchase();
  }, [bookId, userEmail]);

  const handleSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      return toast.error("Please provide rating and review");
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/reviews", {
        bookId,
        email: user.email,
        rating,
        review: reviewText,
      });

      toast.success("Review submitted successfully");
      setRating(0);
      setReviewText("");
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Reviews</h3>

      {/* Existing reviews */}
      <div className="space-y-2 mb-4">
        {reviews.length === 0 && <p>No reviews yet</p>}
        {reviews.map((r, idx) => (
          <div key={idx} className="border p-2 rounded">
            <p className="font-semibold">{r.email}</p>
            <p>⭐ {r.rating}</p>
            <p>{r.review}</p>
          </div>
        ))}
      </div>

      {/* Add review (if purchased) */}
      {canReview ? (
        <div className="space-y-2">
          <h4 className="font-semibold">Add your review</h4>
          <input
            type="number"
            min={1}
            max={5}
            placeholder="Rating (1-5)"
            className="input input-bordered w-full mb-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <textarea
            placeholder="Write your review"
            className="textarea textarea-bordered w-full mb-2"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You can only review books you have purchased.
        </p>
      )}
    </div>
  );
};

export default BookReviews;

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
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Fetch existing reviews
  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const res = await axios.get(
        `https://book-courier-server-snowy.vercel.app/reviews/${bookId}`
      );
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Check if user purchased this book - FIXED
  const checkPurchase = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        `https://book-courier-server-snowy.vercel.app/orders/${user.email}`
      );
      const orderedBookIds = res.data.map((o) => o.bookId.toString()); // ✅ Convert to string
      setCanReview(orderedBookIds.includes(bookId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
    checkPurchase();
  }, [bookId, user?.email]);

  const handleSubmit = async () => {
    if (!rating || !reviewText.trim()) {
      return toast.error("Please provide rating and review");
    }

    try {
      setLoading(true);
      await axios.post("https://book-courier-server-snowy.vercel.app/reviews", {
        bookId,
        email: user.email,
        rating,
        review: reviewText,
      });

      toast.success("Review submitted successfully!");
      setRating(0);
      setReviewText("");
      fetchReviews(); // Refresh reviews
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-secondary">📖 Reviews</h3>
        <span className="badge badge-outline badge-sm">{reviews.length}</span>
      </div>

      {/* Existing Reviews */}
      <div className="max-h-48 overflow-y-auto space-y-3 p-2 bg-base-100 rounded-lg">
        {reviewsLoading ? (
          <div className="flex justify-center items-center py-8">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm mb-2">No reviews yet</p>
            <p className="text-xs">Be the first to review!</p>
          </div>
        ) : (
          reviews.map((r, idx) => (
            <div key={idx} className="card bg-base-100 shadow-sm p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {r.email?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm truncate max-w-[120px]">
                      {r.email}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-warning text-xs ${
                            i < r.rating ? "fill-current" : "text-gray-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {r.review}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Review Form */}
      {canReview && user ? (
        <div className="card bg-base-200 p-4 rounded-xl">
          <h4 className="font-semibold mb-3 text-secondary">
            ✍️ Add Your Review
          </h4>

          {/* Rating */}
          <div className="mb-3">
            <label className="label">
              <span className="label-text text-sm">Rating</span>
            </label>
            <div className="flex items-center gap-2 mb-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-all ${
                    rating >= star
                      ? "text-warning"
                      : "text-gray-300 hover:text-warning"
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">Selected: {rating || 0}/5</p>
          </div>

          {/* Review Text */}
          <textarea
            placeholder="Share your thoughts about this book..."
            className="textarea textarea-bordered w-full mb-3 resize-none"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !rating || !reviewText.trim()}
            className="btn btn-primary w-full disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      ) : (
        <div className="text-center py-6 bg-base-100 rounded-lg">
          <p className="text-gray-500 text-sm mb-1">
            {user ? "💝 Purchase this book to review" : "👤 Login to review"}
          </p>
          <p className="text-xs text-gray-400">
            Only verified buyers can leave reviews
          </p>
        </div>
      )}
    </div>
  );
};

export default BookReviews;

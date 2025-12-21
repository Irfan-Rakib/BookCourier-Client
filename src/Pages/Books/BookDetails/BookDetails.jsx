import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OrderModal from "../OrderModel/OrderModel";
import { AuthContext } from "../../../Context/AuthContext";
import BookReviews from "../../../Components/BookReviews";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(res.data);
      } catch {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  const handleWishlist = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    try {
      await axios.post("http://localhost:3000/wishlist", {
        email: user.email,
        bookId: book._id,
        bookName: book.bookName,
        price: book.price,
        image: book.bookImg_URL,
      });

      toast.success("Added to wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already in wishlist");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <img
          src={book.bookImg_URL}
          alt={book.bookName}
          className="rounded-xl shadow-lg w-full h-[420px] object-cover"
        />

        {/* Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{book.bookName}</h2>
          <p className="text-gray-500 dark:text-gray-400">By {book.author}</p>

          <div className="flex gap-3">
            {book.category && (
              <span className="badge badge-secondary">{book.category}</span>
            )}
            {book.status && (
              <span className="badge badge-outline">{book.status}</span>
            )}
          </div>

          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {book.comment}
          </p>

          <p className="text-lg">
            <span className="font-semibold">Price:</span>{" "}
            <span className="text-primary dark:text-secondary font-bold">
              ৳ {book.price}
            </span>
          </p>

          {book.rating && (
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {book.rating}
            </p>
          )}

          <p>
            <span className="font-semibold">Stock:</span>{" "}
            {book.stock > 0 ? book.stock : "Out of stock"}
          </p>
          <div>
            <BookReviews />
          </div>

          <div className="flex gap-4 pt-3">
            <button
              onClick={() => setOpen(true)}
              disabled={book.stock === 0}
              className="btn btn-primary hover:bg-secondary"
            >
              Order Now
            </button>

            <button
              onClick={handleWishlist}
              className="btn btn-outline dark:border-secondary btn-primary"
            >
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {open && <OrderModal book={book} closeModal={() => setOpen(false)} />}
    </div>
  );
};

export default BookDetails;

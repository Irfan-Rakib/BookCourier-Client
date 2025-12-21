import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { toast } from "react-toastify";
import UseAuth from "../../../Hooks/UseAuth";
import { FiShoppingBag } from "react-icons/fi";
const Wishlist = () => {
  const { user } = UseAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/wishlist/${user.email}`
        );
        setWishlist(res.data);
      } catch (err) {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.email]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
      setWishlist(wishlist.filter((item) => item._id !== id));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">Your wishlist is empty 💔</h2>
          <p className="text-gray-500 mb-8">
            Explore our collection and save your favorite books for later!
          </p>
          <Link to="/books" className="btn btn-primary px-8">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          My Wishlist <span className="text-primary">({wishlist.length})</span>
        </h2>
        <Link
          to="/books"
          className="btn btn-outline btn-sm md:btn-md rounded-full flex items-center gap-2 group transition-all"
        >
          <FiShoppingBag className="text-lg group-hover:scale-110 transition-transform" />
          <span>Continue Shopping</span>
        </Link>
      </header>

      {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on laptop, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="group bg-base-100 border border-base-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Image Container with fixed aspect ratio */}
            <div className="relative aspect-[3/4] overflow-hidden bg-base-200">
              <img
                src={item.book.bookImg_URL}
                alt={item.book.bookName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                {item.book.bookName}
              </h3>
              <p className="text-sm text-gray-500 mb-2 italic">
                by {item.book.author}
              </p>

              <div className="mt-auto">
                <p className="text-xl font-bold text-secondary mb-4">
                  ৳{item.book.price}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={`/books/${item.book._id}`}
                    className="btn btn-primary btn-sm md:btn-md"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-outline btn-error btn-sm md:btn-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

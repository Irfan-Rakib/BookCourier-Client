import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        // ✅ Backend এর নতুন route
        const res = await axios.get("http://localhost:3000/books/latest");
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch latest books", error);
        toast.error("Failed to load latest books");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-center mb-2 text-2xl md:text-4xl font-bold text-secondary">
            🆕 Latest Books
          </h2>
          <p className="text-gray-600 dark:text-white mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-3 text-center">
            Discover the newest additions to our library collection. Fresh books
            added daily!
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          /* Books Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`/books/${book._id}`)}
                  className="cursor-pointer card bg-base-100 shadow-md hover:shadow-xl dark:bg-gray-800 gap-5 space-x-1 transition-all"
                >
                  <figure>
                    <img
                      src={book.bookImg_URL}
                      alt={book.bookName}
                      className="h-56 w-full object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    <h3 className="card-title line-clamp-1">{book.bookName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {book.author}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="badge badge-secondary">
                        {book.category}
                      </span>
                      <span className="font-bold dark:text-secondary text-primary">
                        ৳ {book.price}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                      <span>⭐ {book.rating}</span>
                      <span>Stock: {book.stock}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="mx-auto w-24 h-24 mb-6 bg-base-200 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No Latest Books
                </h3>
                <p className="text-gray-600 mb-4 dark:text-white text-sm md:text-base">
                  New books will appear here soon!
                </p>
              </div>
            )}
          </div>
        )}

        {/* View All Button */}
        {!loading && books.length > 0 && (
          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/books")}
              className="btn btn-outline btn-lg btn-wide border-2 border-primary px-12"
            >
              View All Books →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBooks;

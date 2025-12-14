import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        // Fetch latest 6 books sorted by createdAt descending
        const res = await axios.get(
          "http://localhost:3000/books?latest=true&limit=6"
        );
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch latest books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Latest Books
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
          Check out the newest additions to our library collection.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                onClick={() => navigate(`/books/${book._id}`)}
                className="cursor-pointer card bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-lg overflow-hidden"
              >
                <figure>
                  <img
                    src={book.bookImg_URL}
                    alt={book.bookName}
                    className="h-56 w-full object-cover"
                  />
                </figure>

                <div className="card-body p-4">
                  <h3 className="card-title line-clamp-1 text-gray-900 dark:text-gray-100">
                    {book.bookName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {book.author}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="badge badge-secondary">
                      {book.category}
                    </span>
                    <span className="font-bold text-primary">
                      ৳ {book.price}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>⭐ {book.rating}</span>
                    <span>Stock: {book.stock}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              No latest books available
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default LatestBooks;

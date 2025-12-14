import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch books from backend
  const fetchBooks = async (searchValue = "", sortValue = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/books?search=${searchValue}&sort=${sortValue}`
      );
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to load books", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(search, sort);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search, sort]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        All Books
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <input
          type="text"
          placeholder="Search by book name..."
          className="input input-bordered w-full md:max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:max-w-xs"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Books Grid */}
      {!loading && (
        <>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`/books/${book._id}`)}
                  className="cursor-pointer card bg-base-100 shadow-md hover:shadow-xl transition-all"
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
                    <p className="text-sm text-gray-500">{book.author}</p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="badge badge-secondary">
                        {book.category}
                      </span>
                      <span className="font-bold text-primary">
                        ৳ {book.price}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                      <span>⭐ {book.rating}</span>
                      <span>Stock: {book.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-10 text-gray-500">No books found</p>
          )}
        </>
      )}
    </div>
  );
};

export default Books;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]); // all books fetched once
  const [books, setBooks] = useState([]); // displayed books
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all books once
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/books");

      // Only show published books
      const publishedBooks = res.data.filter(
        (book) => book.status && book.status.toLowerCase() === "published"
      );

      setAllBooks(publishedBooks);
      setBooks(publishedBooks);
    } catch (error) {
      console.error("Failed to load books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter & sort on frontend
  useEffect(() => {
    let filtered = allBooks.filter((book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "desc") filtered.sort((a, b) => b.price - a.price);

    setBooks(filtered);
  }, [search, sort, allBooks]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center mb-2 text-2xl md:text-4xl font-bold text-secondary">
        All Books
      </h2>
      <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-3 text-center">
        Browse our collection and find the perfect book for your reading
        journey.
      </p>

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
      {/* Total Books Found */}
      <p className="text-gray-600 mb-4 text-sm md:text-base">
        Total Books Found: <span className="font-semibold">{books.length}</span>
      </p>

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

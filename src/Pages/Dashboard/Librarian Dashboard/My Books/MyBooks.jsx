import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const MyBooks = () => {
  const { user } = UseAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // =========================
  // Fetch librarian books
  // =========================
  const fetchBooks = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/librarian/books/${user.email}`
      );
      setBooks(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch books");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  // =========================
  // Unpublish book
  // =========================
  const handleUnpublish = async (id) => {
    if (!window.confirm("Are you sure you want to unpublish this book?"))
      return;

    try {
      await axios.patch(`http://localhost:3000/books/unpublish/${id}`);
      toast.success("Book unpublished successfully");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to unpublish book");
      console.error(error);
    }
  };

  // =========================
  // Loading state
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto  py-6 md:py-10">
      {/* ================= Header ================= */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Books
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Books added by you as a librarian
        </p>
      </div>

      {/* ================= Empty State ================= */}
      {books.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-bold mb-2">No books found</h3>
          <p className="text-gray-500 mb-6">You haven’t added any books yet</p>
          <button onClick={fetchBooks} className="btn btn-primary btn-sm">
            Refresh
          </button>
        </div>
      )}

      {/* ================= Mobile Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
        {books.map((book) => (
          <div key={book._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={book.bookImg_URL}
                alt={book.bookName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="font-bold text-lg line-clamp-2">
                {book.bookName}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`badge ${
                    book.status === "Published"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {book.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(`/dashboard/librarian/books/edit/${book._id}`)
                  }
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>

                {book.status === "Published" && (
                  <button
                    onClick={() => handleUnpublish(book._id)}
                    className="btn btn-warning btn-sm"
                  >
                    Unpublish
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Desktop Table ================= */}
      {books.length > 0 && (
        <div className="hidden md:block card bg-base-100 shadow">
          <div className="overflow-x-auto">
            <table className="table table-zebra min-w-[700px]">
              <thead className="bg-base-200">
                <tr>
                  <th>Image</th>
                  <th>Book Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="hover">
                    <td>
                      <img
                        src={book.bookImg_URL}
                        alt={book.bookName}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </td>

                    <td className="font-semibold max-w-md truncate">
                      {book.bookName}
                    </td>

                    <td>
                      <span
                        className={`badge badge-lg ${
                          book.status === "Published"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex flex-col lg:flex-row gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/librarian/books/edit/${book._id}`
                            )
                          }
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </button>

                        {book.status === "Published" && (
                          <button
                            onClick={() => handleUnpublish(book._id)}
                            className="btn btn-warning btn-sm"
                          >
                            Unpublish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= Footer ================= */}
      <div className="text-center mt-10 text-sm text-gray-500">
        Showing {books.length} book{books.length !== 1 && "s"}
      </div>
    </div>
  );
};

export default MyBooks;

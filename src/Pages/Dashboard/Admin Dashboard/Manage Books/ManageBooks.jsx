import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/books");
      setBooks(res.data);
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const togglePublish = async (bookId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "published" ? "unpublished" : "published";
      await axios.patch(`http://localhost:3000/admin/books/${bookId}`, {
        status: newStatus,
      });
      toast.success(`Book ${newStatus}`);
      fetchBooks();
    } catch (error) {
      toast.error("Failed to update book status");
    }
  };

  const deleteBook = async (bookId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this book and its orders?"
      )
    )
      return;

    try {
      await axios.delete(`http://localhost:3000/admin/books/${bookId}`);
      toast.success("Book deleted");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Books</h2>

      {loading ? (
        <span className="loading loading-spinner loading-lg text-primary"></span>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.status}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => togglePublish(book._id, book.status)}
                      className="btn btn-sm btn-warning"
                    >
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;

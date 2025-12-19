import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth(); // logged-in librarian

  const [bookData, setBookData] = useState({
    bookName: "",
    bookImg_URL: "",
    author: "",
    status: "Published",
    category: "",
    price: 0,
    stock: 0,
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch book data
  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/books/${id}`);
      setBookData(res.data);
    } catch (error) {
      toast.error("Failed to fetch book data");
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!bookData.bookName || !bookData.author || !bookData.price) {
      return toast.error("Book name, author and price are required");
    }

    try {
      setLoading(true);

      const { _id, ...dataToUpdate } = bookData;

      await axios.patch(`http://localhost:3000/books/${id}`, {
        ...dataToUpdate,
        price: Number(bookData.price),
        stock: Number(bookData.stock),
        librarianEmail: user.email,
      });

      toast.success("Book updated successfully");
      navigate("/dashboard/librarian/books");
    } catch (error) {
      toast.error("Failed to update book");
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Book</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="bookName"
          placeholder="Book Name"
          value={bookData.bookName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="bookImg_URL"
          placeholder="Book Image URL"
          value={bookData.bookImg_URL}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <select
          name="status"
          value={bookData.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={bookData.category}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={bookData.price || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={bookData.stock || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="comment"
          placeholder="Short description / comment"
          value={bookData.comment}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;

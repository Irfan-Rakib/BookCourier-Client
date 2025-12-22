// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import axios from "axios";
// import { toast } from "react-toastify";
// import UseAuth from "../../../../Hooks/UseAuth";

// const EditBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = UseAuth(); // logged-in librarian

//   const [bookData, setBookData] = useState({
//     bookName: "",
//     bookImg_URL: "",
//     author: "",
//     status: "Published",
//     category: "",
//     price: 0,
//     stock: 0,
//     comment: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // Fetch book data
//   const fetchBook = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`https://book-courier-server-snowy.vercel.app/books/${id}`);
//       setBookData(res.data);
//     } catch (error) {
//       toast.error("Failed to fetch book data");
//       console.error(error.response?.data || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBook();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookData({ ...bookData, [name]: value });
//   };

//   // Update book
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!bookData.bookName || !bookData.author || !bookData.price) {
//       return toast.error("Book name, author and price are required");
//     }

//     try {
//       setLoading(true);

//       const { _id, ...dataToUpdate } = bookData;

//       await axios.patch(`https://book-courier-server-snowy.vercel.app/books/${id}`, {
//         ...dataToUpdate,
//         price: Number(bookData.price),
//         stock: Number(bookData.stock),
//         librarianEmail: user.email,
//       });

//       toast.success("Book updated successfully");
//       navigate("/dashboard/librarian/books");
//     } catch (error) {
//       toast.error("Failed to update book");
//       console.error(error.response?.data || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-10 max-w-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center">Edit Book</h2>

//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input
//           type="text"
//           name="bookName"
//           placeholder="Book Name"
//           value={bookData.bookName}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <input
//           type="text"
//           name="bookImg_URL"
//           placeholder="Book Image URL"
//           value={bookData.bookImg_URL}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//         />

//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           value={bookData.author}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <select
//           name="status"
//           value={bookData.status}
//           onChange={handleChange}
//           className="select select-bordered w-full"
//         >
//           <option value="Published">Published</option>
//           <option value="Unpublished">Unpublished</option>
//         </select>

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={bookData.category}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={bookData.price || ""}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//           required
//         />

//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={bookData.stock || ""}
//           onChange={handleChange}
//           className="input input-bordered w-full"
//         />

//         <textarea
//           name="comment"
//           placeholder="Short description / comment"
//           value={bookData.comment}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//         />

//         <button
//           type="submit"
//           className="btn btn-primary w-full"
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Book"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBook;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = UseAuth();

  const [bookData, setBookData] = useState({
    bookName: "",
    bookImg_URL: "",
    author: "",
    status: "Published",
    category: "",
    price: "",
    stock: "",
    comment: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // =========================
  // Fetch book
  // =========================
  const fetchBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://book-courier-server-snowy.vercel.app/books/${id}`
      );
      setBookData(res.data);
    } catch (error) {
      toast.error("Failed to fetch book data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  // =========================
  // Input handler
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // =========================
  // Update book
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!bookData.bookName || !bookData.author || !bookData.price) {
      return toast.error("Book name, author & price are required");
    }

    try {
      setUpdating(true);

      const { _id, ...dataToUpdate } = bookData;

      await axios.patch(
        `https://book-courier-server-snowy.vercel.app/books/${id}`,
        {
          ...dataToUpdate,
          price: Number(bookData.price),
          stock: Number(bookData.stock),
          librarianEmail: user?.email,
        }
      );

      toast.success("Book updated successfully");
      navigate("/dashboard/librarian/books");
    } catch (error) {
      toast.error("Failed to update book");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // Loading screen
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-6 ">
      <div className="max-w-3xl mx-auto card bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-black text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Edit Book
          </h2>

          {/* Image Preview */}
          {bookData.bookImg_URL && (
            <div className="flex justify-center mb-6">
              <img
                src={bookData.bookImg_URL}
                alt={bookData.bookName}
                className="h-48 w-36 object-cover rounded-xl shadow"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="bookName"
              placeholder="Book Name"
              value={bookData.bookName}
              onChange={handleChange}
              className="input input-bordered w-full md:col-span-2"
              required
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
              value={bookData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={bookData.stock}
              onChange={handleChange}
              className="input input-bordered w-full"
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
              name="bookImg_URL"
              placeholder="Book Image URL"
              value={bookData.bookImg_URL}
              onChange={handleChange}
              className="input input-bordered w-full md:col-span-2"
            />

            <textarea
              name="comment"
              placeholder="Short description / comment"
              value={bookData.comment}
              onChange={handleChange}
              className="textarea textarea-bordered w-full md:col-span-2"
              rows={3}
            />

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Book"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

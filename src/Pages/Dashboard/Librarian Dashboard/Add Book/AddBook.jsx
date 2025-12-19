// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

// const AddBook = () => {
//   const navigate = useNavigate();
//   const [bookData, setBookData] = useState({
//     bookName: "",
//     bookImg_URL: "",
//     author: "",
//     status: "Published",
//     category: "",
//     price: "",
//     stock: 0,
//     comment: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookData({ ...bookData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!bookData.bookName || !bookData.author || !bookData.price) {
//       return toast.error("Book name, author and price are required");
//     }

//     try {
//       setLoading(true);
//       const newBook = {
//         ...bookData,
//         price: Number(bookData.price),
//         stock: Number(bookData.stock),
//         createdAt: new Date(),
//       };

//       await axios.post("http://localhost:3000/books", newBook);
//       toast.success("Book added successfully!");
//       navigate("/books");
//     } catch (err) {
//       toast.error("Failed to add book");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-10 max-w-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center">Add New Book</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
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
//           <option value="published">Published</option>
//           <option value="unpublished">Unpublished</option>
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
//           value={bookData.price}
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
//           className="input input-bordered w-full placeholder-gray-400"
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
//           {loading ? "Adding..." : "Add Book"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const AddBook = () => {
  const navigate = useNavigate();
  const { user } = UseAuth(); // ✅ get logged-in librarian

  const [bookData, setBookData] = useState({
    bookName: "",
    bookImg_URL: "",
    author: "",
    status: "Published", // ✅ Capital P
    category: "",
    price: "",
    stock: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookData.bookName || !bookData.author || !bookData.price) {
      return toast.error("Book name, author and price are required");
    }

    if (!user?.email) {
      return toast.error("User not authenticated");
    }

    try {
      setLoading(true);

      const newBook = {
        ...bookData,
        price: Number(bookData.price),
        stock: Number(bookData.stock || 0),
        librarianEmail: user.email, // ✅ REQUIRED
      };

      await axios.post("http://localhost:3000/books", newBook);

      toast.success("Book added successfully!");
      navigate("/dashboard/librarian");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;

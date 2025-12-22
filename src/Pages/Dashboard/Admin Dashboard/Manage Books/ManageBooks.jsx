// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ManageBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3000/admin/books");
//       setBooks(res.data);
//     } catch (error) {
//       toast.error("Failed to fetch books");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const togglePublish = async (bookId, currentStatus) => {
//     if (
//       !window.confirm(
//         `Are you sure? ${
//           currentStatus === "Published" ? "Unpublish" : "Publish"
//         } this book?`
//       )
//     )
//       return;

//     try {
//       const newStatus =
//         currentStatus === "Published" ? "Unpublished" : "Published";
//       await axios.patch(`http://localhost:3000/admin/books/${bookId}`, {
//         status: newStatus,
//       });
//       toast.success(`Book ${newStatus.toLowerCase()} successfully!`);
//       fetchBooks();
//     } catch (error) {
//       toast.error("Failed to update book status");
//     }
//   };

//   const deleteBook = async (bookId, bookName) => {
//     if (
//       !window.confirm(
//         `Delete "${bookName}" and ALL its orders permanently? This cannot be undone!`
//       )
//     )
//       return;

//     try {
//       await axios.delete(`http://localhost:3000/admin/books/${bookId}`);
//       toast.success("Book and orders deleted successfully!");
//       fetchBooks();
//     } catch (error) {
//       toast.error("Failed to delete book");
//     }
//   };

//   // Filter & Search
//   const filteredBooks = books.filter((book) => {
//     const matchesSearch =
//       book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       filterStatus === "all" || book.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Published":
//         return "badge-success";
//       case "Unpublished":
//         return "badge-warning";
//       default:
//         return "badge-ghost";
//     }
//   };

//   const stats = {
//     total: books.length,
//     published: books.filter((b) => b.status === "Published").length,
//     unpublished: books.filter((b) => b.status === "Unpublished").length,
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-200">
//         <div className="text-center">
//           <span className="loading loading-spinner loading-lg text-primary mb-4 block mx-auto"></span>
//           <p className="text-lg text-gray-600">Loading books...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       {/* Header & Stats */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4">
//           Manage All Books
//         </h1>
//         <div className="stats shadow-2xl bg-base-100 max-w-4xl mx-auto">
//           <div className="stat">
//             <div className="stat-figure text-primary">📚</div>
//             <div className="stat-title">Total Books</div>
//             <div className="stat-value">{stats.total}</div>
//           </div>
//           <div className="stat">
//             <div className="stat-figure text-success">✅</div>
//             <div className="stat-title">Published</div>
//             <div className="stat-value text-success">{stats.published}</div>
//           </div>
//           <div className="stat">
//             <div className="stat-figure text-warning">⏳</div>
//             <div className="stat-title">Unpublished</div>
//             <div className="stat-value text-warning">{stats.unpublished}</div>
//           </div>
//         </div>
//       </div>

//       {/* Search & Filter */}
//       <div className="card bg-base-100 shadow-xl mb-8">
//         <div className="card-body">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Search books or authors..."
//               className="input input-bordered input-lg w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <select
//               className="select select-bordered select-lg w-full"
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Published">Published</option>
//               <option value="Unpublished">Unpublished</option>
//             </select>
//             <button
//               onClick={fetchBooks}
//               className="btn btn-primary btn-lg"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="loading loading-spinner"></span>
//               ) : (
//                 "Refresh"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Books Table */}
//       {filteredBooks.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="mx-auto w-32 h-32 mb-8 bg-base-200 rounded-2xl flex items-center justify-center">
//             <svg
//               className="w-20 h-20 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//               />
//             </svg>
//           </div>
//           <h3 className="text-3xl font-bold text-gray-700 mb-4">
//             No books found
//           </h3>
//           <p className="text-xl text-gray-500 mb-8">
//             {searchTerm || filterStatus !== "all"
//               ? "Try adjusting your search or filter"
//               : "No books available"}
//           </p>
//           <button onClick={fetchBooks} className="btn btn-primary btn-lg">
//             Refresh Books
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 md:hidden">
//           {/* Mobile Cards */}
//           {filteredBooks.map((book) => (
//             <div key={book._id} className="card bg-base-100 shadow-xl compact">
//               <figure className="px-4 pt-4">
//                 <img
//                   src={book.bookImg_URL}
//                   alt={book.bookName}
//                   className="rounded-xl h-48 object-cover w-full"
//                   onError={(e) => (e.target.src = "/api/placeholder/300/200")}
//                 />
//               </figure>
//               <div className="card-body p-6">
//                 <h2 className="card-title text-xl font-bold line-clamp-2">
//                   {book.bookName}
//                 </h2>
//                 <p className="text-gray-500">By {book.author}</p>
//                 <div className="badge mr-2">{book.category}</div>
//                 <span className={`badge ${getStatusColor(book.status)}`}>
//                   {book.status}
//                 </span>
//                 <div className="card-actions justify-end mt-4 gap-2">
//                   <button
//                     onClick={() => togglePublish(book._id, book.status)}
//                     className="btn btn-sm btn-warning flex-1"
//                   >
//                     {book.status === "Published" ? "Unpublish" : "Publish"}
//                   </button>
//                   <button
//                     onClick={() => deleteBook(book._id, book.bookName)}
//                     className="btn btn-sm btn-error"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Desktop Table */}
//       <div className="hidden md:block card bg-base-100 shadow-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead className="bg-base-200">
//               <tr>
//                 <th>Image</th>
//                 <th>Book Name</th>
//                 <th>Author</th>
//                 <th>Category</th>
//                 <th>Librarian</th>
//                 <th>Price</th>
//                 <th>Stock</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBooks.map((book) => (
//                 <tr key={book._id} className="hover">
//                   <td>
//                     <img
//                       src={book.bookImg_URL}
//                       alt={book.bookName}
//                       className="w-16 h-20 object-cover rounded"
//                       onError={(e) => (e.target.src = "/api/placeholder/64/80")}
//                     />
//                   </td>
//                   <td className="font-semibold max-w-md">
//                     <div className="truncate">{book.bookName}</div>
//                   </td>
//                   <td className="font-medium">{book.author}</td>
//                   <td>{book.category}</td>
//                   <td className="text-sm opacity-75 max-w-xs truncate">
//                     {book.librarianEmail}
//                   </td>
//                   <td className="font-mono text-success font-bold">
//                     ৳{book.price?.toLocaleString()}
//                   </td>
//                   <td
//                     className={`font-mono ${
//                       book.stock === 0 ? "text-error" : "text-success"
//                     }`}
//                   >
//                     {book.stock || 0}
//                   </td>
//                   <td>
//                     <span className={`badge-lg ${getStatusColor(book.status)}`}>
//                       {book.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="flex flex-col sm:flex-row gap-2">
//                       <button
//                         onClick={() => togglePublish(book._id, book.status)}
//                         className="btn btn-sm btn-warning"
//                         title={
//                           book.status === "Published" ? "Unpublish" : "Publish"
//                         }
//                       >
//                         {book.status === "Published" ? "Unpublish" : "Publish"}
//                       </button>
//                       <button
//                         onClick={() => deleteBook(book._id, book.bookName)}
//                         className="btn btn-sm btn-error"
//                         title="Delete book and all orders"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="text-center mt-12 pt-8 border-t border-base-200">
//         <p className="text-sm text-gray-500">
//           Showing {filteredBooks.length} of {books.length} books
//           {searchTerm && ` • Searched: "${searchTerm}"`}
//           {filterStatus !== "all" && ` • Status: ${filterStatus}`}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ManageBooks;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // =========================
  // Fetch books
  // =========================
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/books");
      setBooks(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // =========================
  // Publish / Unpublish
  // =========================
  const togglePublish = async (bookId, currentStatus) => {
    if (
      !window.confirm(
        `Are you sure you want to ${
          currentStatus === "Published" ? "unpublish" : "publish"
        } this book?`
      )
    )
      return;

    try {
      const newStatus =
        currentStatus === "Published" ? "Unpublished" : "Published";

      await axios.patch(`http://localhost:3000/admin/books/${bookId}`, {
        status: newStatus,
      });

      toast.success(`Book ${newStatus.toLowerCase()} successfully`);
      fetchBooks();
    } catch (error) {
      toast.error("Failed to update book status");
    }
  };

  // =========================
  // Delete book
  // =========================
  const deleteBook = async (bookId, bookName) => {
    if (
      !window.confirm(
        `Delete "${bookName}" and ALL its orders permanently?\nThis cannot be undone!`
      )
    )
      return;

    try {
      await axios.delete(`http://localhost:3000/admin/books/${bookId}`);
      toast.success("Book and orders deleted");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  // =========================
  // Filter & Search
  // =========================
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || book.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // Helpers
  // =========================
  const getStatusColor = (status) => {
    if (status === "Published") return "badge-success";
    if (status === "Unpublished") return "badge-warning";
    return "badge-ghost";
  };

  const stats = {
    total: books.length,
    published: books.filter((b) => b.status === "Published").length,
    unpublished: books.filter((b) => b.status === "Unpublished").length,
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* ================= Header ================= */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-6">
          Manage All Books
        </h1>

        <div className="stats stats-vertical sm:stats-horizontal shadow bg-base-100">
          <div className="stat">
            <div className="stat-title">Total Books</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Published</div>
            <div className="stat-value text-success">{stats.published}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Unpublished</div>
            <div className="stat-value text-warning">{stats.unpublished}</div>
          </div>
        </div>
      </div>

      {/* ================= Search & Filter ================= */}
      <div className="card bg-base-100 shadow mb-8">
        <div className="card-body grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by book or author..."
            className="input input-bordered input-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="select select-bordered select-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Published">Published</option>
            <option value="Unpublished">Unpublished</option>
          </select>

          <button onClick={fetchBooks} className="btn btn-primary btn-lg">
            Refresh
          </button>
        </div>
      </div>

      {/* ================= Empty State ================= */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold mb-2">No books found</h3>
          <p className="text-gray-500 mb-6">
            Try changing search or filter options
          </p>
          <button onClick={fetchBooks} className="btn btn-primary">
            Refresh
          </button>
        </div>
      )}

      {/* ================= Mobile Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
        {filteredBooks.map((book) => (
          <div key={book._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={book.bookImg_URL}
                alt={book.bookName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="font-bold text-lg line-clamp-2">
                {book.bookName}
              </h2>
              <p className="text-sm opacity-70">By {book.author}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge">{book.category}</span>
                <span className={`badge ${getStatusColor(book.status)}`}>
                  {book.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => togglePublish(book._id, book.status)}
                  className="btn btn-warning btn-sm"
                >
                  {book.status === "Published" ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => deleteBook(book._id, book.bookName)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block card bg-base-100 shadow mt-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra min-w-[900px]">
            <thead>
              <tr>
                <th>Image</th>
                <th>Book</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.bookImg_URL}
                      alt={book.bookName}
                      className="w-14 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="font-semibold max-w-xs truncate">
                    {book.bookName}
                  </td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td className="font-bold text-success">৳{book.price}</td>
                  <td
                    className={book.stock === 0 ? "text-error" : "text-success"}
                  >
                    {book.stock || 0}
                  </td>
                  <td>
                    <span
                      className={`badge badge-lg ${getStatusColor(
                        book.status
                      )}`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col lg:flex-row gap-2">
                      <button
                        onClick={() => togglePublish(book._id, book.status)}
                        className="btn btn-warning btn-sm"
                      >
                        {book.status === "Published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => deleteBook(book._id, book.bookName)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Footer ================= */}
      <div className="text-center mt-10 text-sm opacity-70">
        Showing {filteredBooks.length} of {books.length} books
      </div>
    </div>
  );
};

export default ManageBooks;

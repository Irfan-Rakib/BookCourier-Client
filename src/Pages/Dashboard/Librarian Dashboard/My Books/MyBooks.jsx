// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";

// const MyBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch all books added by librarian
//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3000/librarian/books");
//       setBooks(res.data);
//     } catch (error) {
//       toast.error("Failed to fetch books");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleUnpublish = async (id) => {
//     try {
//       await axios.patch(`http://localhost:3000/books/unpublish/${id}`);
//       toast.success("Book unpublished successfully");
//       fetchBooks();
//     } catch (error) {
//       toast.error("Failed to unpublish book");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6">My Books</h2>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <span className="loading loading-spinner loading-lg text-primary"></span>
//         </div>
//       ) : books.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Book</th>
//                 <th>Image</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {books.map((book) => (
//                 <tr key={book._id}>
//                   <td>{book.bookName}</td>
//                   <td>
//                     <img
//                       src={book.bookImg_URL}
//                       alt={book.bookName}
//                       className="h-20 w-20 object-cover rounded"
//                     />
//                   </td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         book.status === "Published"
//                           ? "badge-success"
//                           : "badge-warning"
//                       }`}
//                     >
//                       {book.status}
//                     </span>
//                   </td>
//                   <td className="flex gap-2">
//                     <button
//                       onClick={() => navigate(`/books/edit/${book._id}`)}
//                       className="btn btn-sm btn-primary"
//                     >
//                       Edit
//                     </button>
//                     {book.status === "Published" && (
//                       <button
//                         onClick={() => handleUnpublish(book._id)}
//                         className="btn btn-sm btn-warning"
//                       >
//                         Unpublish
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10">No books found</p>
//       )}
//     </div>
//   );
// };

// export default MyBooks;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const MyBooks = () => {
  const { user } = UseAuth(); // get user context
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    if (!user?.email) return; // prevent undefined
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/librarian/books/${user.email}`
      );
      setBooks(res.data);
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

  const handleUnpublish = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/books/unpublish/${id}`);
      toast.success("Book unpublished successfully");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to unpublish book");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Books</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : books.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.bookName}</td>
                  <td>
                    <img
                      src={book.bookImg_URL}
                      alt={book.bookName}
                      className="h-20 w-20 object-cover rounded"
                    />
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        book.status === "Published"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/librarian/books/edit/${book._id}`)
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    {book.status === "Published" && (
                      <button
                        onClick={() => handleUnpublish(book._id)}
                        className="btn btn-sm btn-warning"
                      >
                        Unpublish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No books found</p>
      )}
    </div>
  );
};

export default MyBooks;

// import { useContext, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../../Context/AuthContext";
// import BookReviews from "../../../Components/BookReviews";
// import { useNavigate } from "react-router";

// const OrderModal = ({ book, closeModal }) => {
//   const { user } = useContext(AuthContext);
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleOrder = async () => {
//     const phoneRegex = /^\d{11}$/;
//     if (!phoneRegex.test(phone)) {
//       return toast.error("Phone number must be exactly 11 digits");
//     }

//     if (!address.trim()) {
//       return toast.error("Address is required");
//     }

//     try {
//       setLoading(true);
//       await axios.post("https://book-courier-server-snowy.vercel.app/orders", {
//         bookId: book._id,
//         bookName: book.bookName,
//         price: book.price,
//         userName: user.displayName,
//         email: user.email,
//         image: book.bookImg_URL,
//         phone,
//         address,
//       });

//       toast.success("Order placed successfully");
//       closeModal();
//       navigate("/dashboard/user/my-orders");
//     } catch (error) {
//       toast.error("Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isValidPhone = phone.length === 11 && /^\d{11}$/.test(phone);

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 sm:p-6">
//       <div className="w-full h-full bg-black/20 absolute inset-0 -z-10"></div>

//       <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-sm max-h-[95vh] overflow-y-auto">
//         {/* Header */}
//         <div className="p-6 pb-4 border-b border-base-200">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-2xl font-bold text-secondary">Order Book</h3>
//             <button
//               onClick={closeModal}
//               className="btn btn-ghost btn-sm btn-circle p-1 hover:bg-base-200"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Book Info - FIXED */}
//           <div className="card bg-base-200 p-4 rounded-xl">
//             <div className="flex items-start gap-4">
//               <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-base-100 shadow-md">
//                 <img
//                   src={book.bookImg_URL}
//                   alt={book.bookName}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h4 className="font-bold text-lg mb-1">{book.bookName}</h4>
//                 <p className="text-primary dark:text-secondary font-bold text-xl mb-2">
//                   ৳{book.price}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   by {book.author || "Unknown"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="p-6 space-y-4">
//           <div className="space-y-2">
//             <label className="label">
//               <span className="label-text font-medium text-sm">Name</span>
//             </label>
//             <input
//               value={user?.displayName || ""}
//               readOnly
//               className="input input-bordered w-full bg-base-100 input-sm"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="label">
//               <span className="label-text font-medium text-sm">Email</span>
//             </label>
//             <input
//               value={user?.email || ""}
//               readOnly
//               className="input input-bordered w-full bg-base-100 input-sm"
//             />
//           </div>

//           {/* Phone - FIXED */}
//           <div className="space-y-2">
//             <label className="label">
//               <span className="label-text font-medium text-sm">
//                 Phone <span className="text-red-500">*</span> (11 digits)
//               </span>
//             </label>
//             <input
//               type="tel"
//               placeholder="01XXXXXXXXX"
//               maxLength={11}
//               className={`input input-bordered w-full input-sm focus:input-primary ${
//                 isValidPhone
//                   ? "input-success"
//                   : phone && !isValidPhone
//                   ? "input-error"
//                   : ""
//               }`}
//               value={phone}
//               onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
//             />
//             {phone && !isValidPhone && (
//               <p className="text-error text-xs">Exactly 11 digits required</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="label">
//               <span className="label-text font-medium text-sm">
//                 Address <span className="text-red-500">*</span>
//               </span>
//             </label>
//             <textarea
//               placeholder="Full address"
//               rows={3}
//               className="textarea textarea-bordered w-full textarea-sm"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="p-6 pt-0 border-t border-base-200">
//           <div className="flex flex-col sm:flex-row gap-3 mb-3">
//             <button
//               onClick={closeModal}
//               className="btn btn-outline flex-1 h-12"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleOrder}
//               disabled={loading || !isValidPhone || !address.trim()}
//               className="btn btn-primary hover:bg-secondary flex-1 h-12 disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <span className="loading loading-spinner"></span>
//                   Placing...
//                 </>
//               ) : (
//                 "Place Order"
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Reviews */}
//         <div className="border-t border-base-200">
//           <div className="collapse collapse-arrow bg-base-100">
//             <input type="checkbox" className="peer" />
//             <div className="collapse-title text-sm font-medium px-6 py-4">
//               📖 Reviews ({book?.reviews?.length || 0})
//             </div>
//             <div className="collapse-content">
//               <BookReviews bookId={book._id} userEmail={user?.email} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderModal;

import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import BookReviews from "../../../Components/BookReviews";
import { useNavigate } from "react-router";

const OrderModal = ({ book, closeModal }) => {
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dynamic total price calculation
  const totalPrice = book.price * quantity;
  const isValidPhone = phone.length === 11 && /^\d{11}$/.test(phone);

  const handleOrder = async () => {
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      return toast.error("Phone number must be exactly 11 digits");
    }

    if (!address.trim()) {
      return toast.error("Address is required");
    }

    try {
      setLoading(true);
      await axios.post("https://book-courier-server-snowy.vercel.app/orders", {
        bookId: book._id,
        bookName: book.bookName,
        price: book.price, // Single book price
        quantity: quantity, // Quantity
        totalPrice: totalPrice, // Total price
        userName: user.displayName,
        email: user.email,
        image: book.bookImg_URL,
        phone,
        address,
      });

      toast.success(`Order placed successfully! Total: ৳${totalPrice}`);
      closeModal();
      navigate("/dashboard/user/my-orders");
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 sm:p-6">
      <div className="w-full h-full bg-black/20 absolute inset-0 -z-10"></div>

      <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-sm max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-base-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-secondary">Order Book</h3>
            <button
              onClick={closeModal}
              className="btn btn-ghost btn-sm btn-circle p-1 hover:bg-base-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Book Info + Quantity + Total */}
          <div className="card bg-base-200 p-4 rounded-xl">
            <div className="flex items-start gap-4">
              {/* Book Image */}
              <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-base-100 shadow-md">
                <img
                  src={book.bookImg_URL}
                  alt={book.bookName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Book Details + Quantity + Total */}
              <div className="flex-1 min-w-0 space-y-2">
                <h4 className="font-bold text-lg leading-tight">
                  {book.bookName}
                </h4>
                <p className="text-sm text-gray-500">
                  by {book.author || "Unknown"}
                </p>

                {/* Single Price */}
                <div className="flex items-center gap-1">
                  <span className="text-primary font-bold dark:text-secondary text-base">
                    ৳{book.price}
                  </span>
                  <span className="text-xs text-gray-500 ">/book</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 bg-base-100 p-2 rounded-lg border">
                  <label className="text-xs font-medium w-16">Quantity:</label>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-ghost btn-xs h-8 w-8 p-0"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <div className="w-16 text-center font-mono text-lg font-bold bg-base-200 px-3  rounded">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn btn-ghost btn-xs h-8 w-8 p-0"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="pt-2 mt-2 border-t border-base-300">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold  text-secondary">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-sm">Name</span>
            </label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-base-100 input-sm"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-sm">Email</span>
            </label>
            <input
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-100 input-sm"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-sm">
                Phone <span className="text-red-500">*</span> (11 digits)
              </span>
            </label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              maxLength={11}
              className={`input input-bordered w-full input-sm focus:input-primary transition-colors ${
                isValidPhone
                  ? "input-success border-success"
                  : phone && !isValidPhone
                  ? "input-error border-error"
                  : ""
              }`}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
            {phone && !isValidPhone && (
              <p className="text-error text-xs mt-1">
                Exactly 11 digits required
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-medium text-sm">
                Address <span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              placeholder="Enter your full address (house, road, area, city)"
              rows={3}
              className="textarea textarea-bordered w-full textarea-sm resize-none focus:textarea-primary"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 border-t border-base-200 bg-base-50/50">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline flex-1 h-12 text-sm font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOrder}
              disabled={loading || !isValidPhone || !address.trim()}
              className="btn btn-primary flex-1 h-12 text-sm font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Placing Order...
                </>
              ) : (
                `Place Order • ৳${totalPrice.toLocaleString()}`
              )}
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-base-200">
          <div className="collapse collapse-arrow bg-base-100 border-t-0 rounded-b-none">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-sm font-medium text-secondary px-6 py-4">
              📖 Book Reviews ({book?.reviews?.length || 0})
            </div>
            <div className="collapse-content peer-checked:pb-6">
              <BookReviews bookId={book._id} userEmail={user?.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

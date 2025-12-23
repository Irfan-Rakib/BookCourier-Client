// // import React, { useState } from "react";
// // import { Outlet, useNavigate } from "react-router";
// // import { FaEye, FaEyeSlash, FaTimes, FaUser } from "react-icons/fa";

// // const AdminPrivateRoute = () => {
// //   const [authorized, setAuthorized] = useState(false);
// //   const [userId, setUserId] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [modalVisible, setModalVisible] = useState(true);

// //   const navigate = useNavigate();

// //   const ADMIN_ID = import.meta.env.VITE_ADMIN_UID;
// //   const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     if (userId === ADMIN_ID && password === ADMIN_PASSWORD) {
// //       setAuthorized(true);
// //       setModalVisible(false);
// //     } else {
// //       alert("❌ Invalid ID or Password");
// //     }
// //   };

// //   const handleClose = () => {
// //     setModalVisible(false);
// //   };

// //   const goToUserDashboard = () => {
// //     navigate("/dashboard/user");
// //   };

// //   if (!authorized && modalVisible) {
// //     return (
// //       <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
// //         <div className="relative bg-base-100 dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700">
// //           {/* Close Button */}
// //           <button
// //             onClick={handleClose}
// //             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
// //           >
// //             <FaTimes size={20} />
// //           </button>

// //           <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
// //             🔒 Admin Login Required
// //           </h2>

// //           <form className="flex flex-col gap-4" onSubmit={handleLogin}>
// //             <input
// //               type="text"
// //               placeholder="User ID"
// //               value={userId}
// //               onChange={(e) => setUserId(e.target.value)}
// //               className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
// //               required
// //             />

// //             <div className="relative">
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 pr-10"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
// //               >
// //                 {showPassword ? <FaEyeSlash /> : <FaEye />}
// //               </button>
// //             </div>

// //             <button
// //               type="submit"
// //               className="bg-primary text-white p-3 rounded-lg hover:bg-primary-focus transition-colors duration-200"
// //             >
// //               Enter
// //             </button>
// //           </form>

// //           {/* User Dashboard Button */}
// //           <button
// //             onClick={goToUserDashboard}
// //             className="flex items-center justify-center gap-2 mt-4 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-100"
// //           >
// //             <FaUser /> Go to User Dashboard
// //           </button>

// //           <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
// //             Enter your admin credentials to access dashboard.
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return <Outlet />;
// // };

// // export default AdminPrivateRoute;

// import React, { useState } from "react";
// import { Outlet, useNavigate } from "react-router";
// import { FaEye, FaEyeSlash, FaTimes, FaUser } from "react-icons/fa";

// const AdminPrivateRoute = () => {
//   const [authorized, setAuthorized] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const ADMIN_ID = import.meta.env.VITE_ADMIN_UID;
//   const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (userId === ADMIN_ID && password === ADMIN_PASSWORD) {
//       setAuthorized(true);
//     } else {
//       alert("❌ Invalid ID or Password");
//     }
//   };

//   const goToUserDashboard = () => {
//     navigate("/dashboard/user");
//   };

//   // কেউ authorized না হলে সবসময় modal দেখাবে
//   if (!authorized) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
//         <div className="relative bg-base-100 dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700">
//           {/* Close Button */}
//           <button
//             onClick={goToUserDashboard} // Close = user dashboard
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
//           >
//             <FaTimes size={20} />
//           </button>

//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
//             🔒 Admin Login Required
//           </h2>

//           <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//             <input
//               type="text"
//               placeholder="User ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
//               required
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="bg-primary text-white p-3 rounded-lg hover:bg-primary-focus transition-colors duration-200"
//             >
//               Enter
//             </button>
//           </form>

//           {/* User Dashboard Button */}
//           <button
//             onClick={goToUserDashboard}
//             className="flex items-center justify-center gap-2 mt-4 w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-100"
//           >
//             <FaUser /> Go to User Dashboard
//           </button>

//           <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
//             Enter your admin credentials to access dashboard.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return <Outlet />; // ✅ Only authorized admin can see dashboard
// };

// export default AdminPrivateRoute;

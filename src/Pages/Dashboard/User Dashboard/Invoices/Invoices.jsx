// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import axios from "axios";
// import UseAuth from "../../../../Hooks/UseAuth";
// import { toast } from "react-toastify";

// const Invoices = () => {
//   const { user } = UseAuth();
//   const navigate = useNavigate();
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       if (!user?.email) {
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://book-courier-server-snowy.vercel.app/invoices/${user.email}`
//         );
//         const sortedInvoices = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setInvoices(sortedInvoices);
//       } catch (error) {
//         toast.error("Failed to fetch invoices");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, [user?.email]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   // Calculate totals
//   const totalInvoices = invoices.length;
//   const totalAmount = invoices.reduce(
//     (sum, inv) => sum + (inv.totalPrice || inv.price || 0),
//     0
//   );

//   const formatInvoiceId = (id) => id.slice(-8).toUpperCase();

//   return (
//     <div className="container mx-auto  py-6 md:py-10">
//       {/* Header + Stats */}
//       <div className="text-center mb-10 md:mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
//           My Invoices
//         </h1>

//         {invoices.length > 0 && (
//           <div className="stats shadow-lg bg-base-100 md:max-w-2xl mx-auto">
//             <div className="stat">
//               <div className="stat-figure ">
//                 <svg
//                   className="w-8 h-8"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm3 3a1 1 0 100-2 1 1 0 000 2z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="stat-title">Total Invoices</div>
//               <div className="stat-value ">{totalInvoices}</div>
//             </div>
//             <div className="stat">
//               <div className="stat-figure text-success">
//                 <svg
//                   className="w-8 h-8"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 6.657 6 7v3.5c0 .867.467 1.631 1.165 2.038C7.72 12.792 8.077 13 8.5 13h3c.423 0 .78-.208 1.335-.516.698-.407 1.165-1.171 1.165-2.038V7c0-.343-.602-.766-1.165-1.147a4.535 4.535 0 00-1.676-.662V5z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="stat-title">Total Paid</div>
//               <div className="stat-value ">৳{totalAmount.toLocaleString()}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Empty State */}
//       {invoices.length === 0 ? (
//         <div className="text-center py-20 px-4">
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
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3">
//             No invoices yet
//           </h3>
//           <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
//             Complete your first payment to see invoices here
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <button
//               className="btn btn-primary btn-wide"
//               onClick={() => navigate("/dashboard/user/my-orders")}
//             >
//               View Orders
//             </button>
//             <button
//               className="btn btn-outline btn-wide"
//               onClick={() => navigate("/")}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Mobile: Cards */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 md:hidden">
//             {invoices.map((inv) => (
//               <div
//                 key={inv._id}
//                 className="card bg-gradient-to-r from-base-100 to-base-200 shadow-xl border border-success/20"
//               >
//                 <div className="card-body p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <h3 className="font-bold text-xl text-gray-900 line-clamp-1 mb-1">
//                         {inv.bookName}
//                       </h3>
//                       {inv.quantity && (
//                         <p className="text-sm  mb-2">
//                           Qty: {inv.quantity} • Single: ৳
//                           {inv.price?.toLocaleString()}
//                         </p>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-success mb-1">
//                         ৳{(inv.totalPrice || inv.price || 0).toLocaleString()}
//                       </div>
//                       <span className="badge  badge-outline badge-sm">
//                         PAID
//                       </span>
//                     </div>
//                   </div>

//                   <div className="divider"></div>

//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-500">Invoice ID:</span>
//                       <div className="font-mono bg-base-200 px-2 py-1 rounded text-xs mt-1">
//                         {formatInvoiceId(inv._id)}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <span className="text-gray-500 block">Date:</span>
//                       <span className="font-semibold">
//                         {new Date(inv.createdAt).toLocaleDateString("en-GB")}
//                       </span>
//                     </div>
//                   </div>

//                   {inv.phone && (
//                     <div className="mt-4 pt-4 border-t border-base-200">
//                       <p className="text-xs text-gray-500">
//                         📞 {inv.phone} • {inv.address?.slice(0, 50)}...
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop: Table */}
//           <div className="hidden md:block">
//             <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-200">
//               <table className="table w-full">
//                 <thead className="bg-gradient-to-r from-base-200 to-base-300">
//                   <tr>
//                     <th className="py-4">Book Name</th>
//                     <th>Quantity</th>
//                     <th>Amount</th>
//                     <th>Invoice ID</th>
//                     <th>Date</th>
//                     <th>Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoices.map((inv) => (
//                     <tr
//                       key={inv._id}
//                       className="hover:bg-base-100 transition-colors"
//                     >
//                       <td className="font-semibold max-w-md py-4">
//                         <div className="truncate">{inv.bookName}</div>
//                       </td>
//                       <td className="text-center">{inv.quantity || 1}</td>
//                       <td className="font-bold text-success text-xl">
//                         ৳{(inv.totalPrice || inv.price || 0).toLocaleString()}
//                       </td>
//                       <td className="font-mono text-sm bg-base-200 px-2 py-1 rounded opacity-80">
//                         {formatInvoiceId(inv._id)}
//                       </td>
//                       <td className="text-sm">
//                         {new Date(inv.createdAt).toLocaleDateString("en-GB")}
//                       </td>
//                       <td className="text-xs">
//                         <div className="space-y-1">
//                           <span>📞 {inv.phone || "N/A"}</span>
//                           {inv.address && (
//                             <span className="truncate max-w-[200px]">
//                               📍 {inv.address.slice(0, 30)}...
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Invoices;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import UseAuth from "../../../../Hooks/UseAuth";
import { toast } from "react-toastify";

const Invoices = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH INVOICES =================
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://book-courier-server-snowy.vercel.app/invoices/${user.email}`
        );

        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setInvoices(sorted);
      } catch (error) {
        toast.error("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user?.email]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ================= HELPERS =================
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce(
    (sum, inv) => sum + (inv.totalPrice || inv.price || 0),
    0
  );

  const formatInvoiceId = (id) => id.slice(-8).toUpperCase();

  // ================= UI =================
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* ================= HEADER ================= */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          My Invoices
        </h1>

        {invoices.length > 0 && (
          <div className="stats stats-vertical sm:stats-horizontal shadow bg-base-100 mx-auto">
            <div className="stat">
              <div className="stat-title">Total Invoices</div>
              <div className="stat-value text-primary">{totalInvoices}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Paid</div>
              <div className="stat-value text-success">
                ৳{totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {invoices.length === 0 ? (
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 mb-6 bg-base-200 rounded-2xl flex items-center justify-center">
            <svg
              className="w-14 h-14 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold mb-3">No invoices yet</h3>
          <p className="text-gray-500 mb-8">
            Complete your first payment to see invoices here
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="btn btn-primary btn-wide"
              onClick={() => navigate("/dashboard/user/my-orders")}
            >
              View Orders
            </button>
            <button
              className="btn btn-outline btn-wide"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ================= MOBILE / TABLET CARDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {invoices.map((inv) => (
              <div
                key={inv._id}
                className="card bg-base-100 shadow-xl border border-success/20"
              >
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-base line-clamp-2">
                      {inv.bookName}
                    </h3>
                    <span className="badge badge-success badge-sm">PAID</span>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1 mb-3">
                    <p>Qty: {inv.quantity || 1}</p>
                    <p>
                      Amount:{" "}
                      <b className="text-success">
                        ৳{(inv.totalPrice || inv.price || 0).toLocaleString()}
                      </b>
                    </p>
                    <p>
                      Date:{" "}
                      {new Date(inv.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="divider my-2"></div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono bg-base-200 px-2 py-1 rounded">
                      {formatInvoiceId(inv._id)}
                    </span>
                    <span>{inv.phone || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block">
            <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-200">
              <table className="table table-zebra w-full min-w-[900px]">
                <thead className="bg-base-200/60">
                  <tr>
                    <th>Book</th>
                    <th className="text-center">Qty</th>
                    <th>Amount</th>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv._id}>
                      <td className="font-semibold max-w-xs truncate">
                        {inv.bookName}
                      </td>
                      <td className="text-center">{inv.quantity || 1}</td>
                      <td className="font-bold text-success">
                        ৳{(inv.totalPrice || inv.price || 0).toLocaleString()}
                      </td>
                      <td className="font-mono text-sm">
                        {formatInvoiceId(inv._id)}
                      </td>
                      <td className="text-sm">
                        {new Date(inv.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="text-xs">
                        <div className="space-y-1">
                          <div>📞 {inv.phone || "N/A"}</div>
                          {inv.address && (
                            <div className="truncate max-w-[200px]">
                              📍 {inv.address.slice(0, 30)}...
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoices;

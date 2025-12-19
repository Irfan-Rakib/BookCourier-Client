// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import UseAuth from "../../../../Hooks/UseAuth";
// // import { toast } from "react-toastify";

// // const Invoices = () => {
// //   const { user } = UseAuth();
// //   const [invoices, setInvoices] = useState([]);

// //   useEffect(() => {
// //     const fetchInvoices = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:3000/invoices/${user.email}`
// //         );
// //         setInvoices(res.data);
// //       } catch {
// //         toast.error("Failed to fetch invoices");
// //       }
// //     };
// //     fetchInvoices();
// //   }, []);

// //   return (
// //     <div className="container mx-auto px-4 py-10">
// //       <h2 className="text-3xl font-bold mb-6">Invoices</h2>

// //       {invoices.length === 0 ? (
// //         <p className="text-center text-gray-500 mt-10">No invoices found</p>
// //       ) : (
// //         <table className="table w-full">
// //           <thead>
// //             <tr>
// //               <th>Book</th>
// //               <th>Amount</th>
// //               <th>Payment ID</th>
// //               <th>Date</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {invoices.map((inv) => (
// //               <tr key={inv._id}>
// //                 <td>{inv.bookName}</td>
// //                 <td>৳ {inv.price}</td>
// //                 <td>{inv._id}</td>
// //                 <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default Invoices;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import UseAuth from "../../../../Hooks/UseAuth";
// import { toast } from "react-toastify";

// const Invoices = () => {
//   const { user } = UseAuth();
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/invoices/${user.email}`
//         );
//         // Sort newest first
//         const sortedInvoices = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setInvoices(sortedInvoices);
//       } catch {
//         toast.error("Failed to fetch invoices");
//       }
//     };
//     if (user?.email) fetchInvoices();
//   }, [user?.email]);

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6">Invoices</h2>

//       {invoices.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">No invoices found</p>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-lg">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Book</th>
//                 <th>Amount</th>
//                 <th>Payment ID</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((inv) => (
//                 <tr key={inv._id}>
//                   <td className="truncate max-w-xs">{inv.bookName}</td>
//                   <td>৳ {inv.price}</td>
//                   <td>{inv._id}</td>
//                   <td>{new Date(inv.createdAt).toLocaleDateString("en-GB")}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Invoices;

import { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../../../Hooks/UseAuth";
import { toast } from "react-toastify";

const Invoices = () => {
  const { user } = UseAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/invoices/${user.email}`
        );
        const sortedInvoices = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setInvoices(sortedInvoices);
      } catch {
        toast.error("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchInvoices();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Invoices
      </h2>

      {invoices.length === 0 ? (
        <div className="text-center py-10 bg-base-200 rounded-lg">
          <p className="text-gray-500">No invoices found</p>
        </div>
      ) : (
        <>
          {/* Mobile View: Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {invoices.map((inv) => (
              <div
                key={inv._id}
                className="bg-base-100 p-5 rounded-xl border border-base-300 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-primary truncate max-w-[200px]">
                    {inv.bookName}
                  </h3>
                  <span className="font-bold text-success text-lg">
                    ৳ {inv.price}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment ID:</span>
                    <span className="font-mono text-xs bg-base-200 px-1 rounded">
                      {inv._id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span>
                      {new Date(inv.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl border border-base-200">
            <table className="table w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="py-4">Book Name</th>
                  <th>Amount</th>
                  <th>Payment ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv._id} className="hover">
                    <td className="font-semibold text-base py-4">
                      {inv.bookName}
                    </td>
                    <td className="font-bold text-success">৳ {inv.price}</td>
                    <td className="font-mono text-xs opacity-70">{inv._id}</td>
                    <td>
                      {new Date(inv.createdAt).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Invoices;

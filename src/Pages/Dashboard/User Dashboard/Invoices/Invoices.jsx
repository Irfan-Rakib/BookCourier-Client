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
//         setInvoices(res.data);
//       } catch {
//         toast.error("Failed to fetch invoices");
//       }
//     };
//     fetchInvoices();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6">Invoices</h2>

//       {invoices.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">No invoices found</p>
//       ) : (
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>Book</th>
//               <th>Amount</th>
//               <th>Payment ID</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((inv) => (
//               <tr key={inv._id}>
//                 <td>{inv.bookName}</td>
//                 <td>৳ {inv.price}</td>
//                 <td>{inv._id}</td>
//                 <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/invoices/${user.email}`
        );
        // Sort newest first
        const sortedInvoices = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setInvoices(sortedInvoices);
      } catch {
        toast.error("Failed to fetch invoices");
      }
    };
    if (user?.email) fetchInvoices();
  }, [user?.email]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Invoices</h2>

      {invoices.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No invoices found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv._id}>
                  <td className="truncate max-w-xs">{inv.bookName}</td>
                  <td>৳ {inv.price}</td>
                  <td>{inv._id}</td>
                  <td>{new Date(inv.createdAt).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Invoices;

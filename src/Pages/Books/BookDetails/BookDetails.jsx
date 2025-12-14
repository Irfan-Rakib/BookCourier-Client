import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { toast } from "react-toastify";
import UseAuth from "../../../Hooks/UseAuth";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    phone: "",
    address: "",
  });

  const { user } = UseAuth(); // user object with name & email

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(res.data);
      } catch (error) {
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!orderData.phone || !orderData.address) {
      toast.error("Please fill all fields");
      return;
    }

    const orderPayload = {
      bookId: book._id,
      bookName: book.bookName,
      userName: user.name,
      userEmail: user.email,
      phone: orderData.phone,
      address: orderData.address,
      price: book.price,
    };

    try {
      await axios.post("http://localhost:3000/orders", orderPayload);
      toast.success("Order placed successfully!");
      setModalOpen(false);
      setOrderData({ phone: "", address: "" });
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!book) return <p className="text-center mt-10">Book not found</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <div className="flex-1">
          <img
            src={book.bookImg_URL}
            alt={book.bookName}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {book.bookName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Author: {book.author}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Category: {book.category}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Rating: ⭐ {book.rating}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Stock: {book.stock}
          </p>
          <p className="text-xl font-bold text-primary mb-6">৳ {book.price}</p>

          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-primary px-6 py-2 rounded-lg"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Order Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Place Order
            </h3>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Address</label>
                <textarea
                  name="address"
                  value={orderData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;

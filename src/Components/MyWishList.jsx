import { useEffect, useState } from "react";
import axios from "axios";
import UseAuth from "../../../../Hooks/UseAuth";
import { toast } from "react-toastify";

const MyWishlist = () => {
  const { user } = UseAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/wishlist/${user.email}`
      );
      setWishlist(res.data);
    } catch {
      toast.error("Failed to fetch wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Your wishlist is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md hover:shadow-xl cursor-pointer"
            >
              <img
                src={item.book.bookImg_URL}
                alt={item.book.bookName}
                className="h-56 w-full object-cover rounded-t-xl"
              />
              <div className="card-body">
                <h3 className="card-title">{item.book.bookName}</h3>
                <p className="text-gray-500">{item.book.author}</p>
                <p className="text-primary font-bold">৳ {item.book.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;

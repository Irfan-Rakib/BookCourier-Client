import React from "react";
import AddBook from "./Add Book/AddBook";
import MyBooks from "./My Books/MyBooks";
import Orders from "./Orders/Orders";

const LibrarianDashboard = () => {
  return (
    <div>
      this is Librarian Dashboard
      <div>
        <AddBook />
        <MyBooks />
        <Orders />
      </div>
    </div>
  );
};

export default LibrarianDashboard;

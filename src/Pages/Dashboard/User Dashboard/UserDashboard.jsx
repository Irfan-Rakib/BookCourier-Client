import React from "react";
import MyOrders from "./My Orders/MyOrders";
import Profile from "../UserProfile/Profile";
import Invoices from "./Invoices/Invoices";

const UserDashboard = () => {
  return (
    <div>
      user dashboard section
      <div>
        <MyOrders />
        <Profile />
        <Invoices />
      </div>
    </div>
  );
};

export default UserDashboard;

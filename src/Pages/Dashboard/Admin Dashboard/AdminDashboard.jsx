import React from "react";
import AllUsers from "./All Users/AllUsers";
import ManageBooks from "./Manage Books/ManageBooks";
import MyProfile from "./My Profile/MyProfile";

const AdminDashboard = () => {
  return (
    <div>
      this is Admin Dashboard
      <div>
        <AllUsers />
        <ManageBooks />
        <MyProfile />
      </div>
    </div>
  );
};

export default AdminDashboard;

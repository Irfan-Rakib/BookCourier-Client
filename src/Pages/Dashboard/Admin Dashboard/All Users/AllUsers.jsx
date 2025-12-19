import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await axios.patch(`http://localhost:3000/admin/users/${userId}`, {
        role,
      });
      toast.success(`User role updated to ${role}`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Users</h2>

      {loading ? (
        <span className="loading loading-spinner loading-lg text-primary"></span>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="flex gap-2">
                    {user.role !== "librarian" && (
                      <button
                        onClick={() => handleRoleChange(user._id, "librarian")}
                        className="btn btn-sm btn-primary"
                      >
                        Make Librarian
                      </button>
                    )}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleRoleChange(user._id, "admin")}
                        className="btn btn-sm btn-accent"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;

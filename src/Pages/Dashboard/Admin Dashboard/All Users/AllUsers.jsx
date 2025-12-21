import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeLibrarian = async (userId) => {
    if (!window.confirm("Make this user Librarian?")) return;

    try {
      await axios.patch(`http://localhost:3000/admin/users/${userId}`, {
        role: "librarian",
      });
      toast.success("✅ User promoted to Librarian!");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const makeAdmin = async (userId) => {
    if (!window.confirm("Make this user Admin?")) return;

    try {
      await axios.patch(`http://localhost:3000/admin/users/${userId}`, {
        role: "admin",
      });
      toast.success("✅ User promoted to Admin!");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.displayName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          👥 All Users Management
        </h1>

        {/* Stats */}
        <div className="stats shadow-2xl bg-base-100 max-w-4xl mx-auto">
          <div className="stat">
            <div className="stat-figure text-primary">👥</div>
            <div className="stat-value">{users.length}</div>
            <div className="stat-title">Total Users</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-error">👑</div>
            <div className="stat-value text-error">
              {users.filter((u) => u.role === "admin").length}
            </div>
            <div className="stat-title">Admins</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">📚</div>
            <div className="stat-value text-secondary">
              {users.filter((u) => u.role === "librarian").length}
            </div>
            <div className="stat-title">Librarians</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
              className="input input-bordered input-lg flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={fetchUsers}
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Refresh"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id || user.uid} className="hover">
                  {/* Avatar */}
                  <td>
                    <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="font-bold text-white text-lg">
                        {user.displayName?.charAt(0)?.toUpperCase() ||
                          user.email?.charAt(0)?.toUpperCase() ||
                          "?"}
                      </span>
                    </div>
                  </td>

                  {/* Name */}
                  <td className="font-semibold max-w-xs">
                    <div className="truncate font-bold">
                      {user.displayName || "No Name"}
                    </div>
                  </td>

                  {/* Email */}
                  <td className="font-mono text-sm max-w-lg truncate">
                    {user.email}
                  </td>

                  {/* Role Badge */}
                  <td>
                    <span
                      className={`badge-lg px-6 py-3 font-bold ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "librarian"
                          ? "badge-secondary"
                          : "badge-ghost"
                      }`}
                    >
                      {user.role === "admin"
                        ? "👑 Admin"
                        : user.role === "librarian"
                        ? "📚 Librarian"
                        : "👤 User"}
                    </span>
                  </td>

                  {/* Registered Date */}
                  <td className="text-sm opacity-75">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB")
                      : "Unknown"}
                  </td>

                  {/* Action Buttons */}
                  <td>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => makeLibrarian(user._id || user.uid)}
                        className="btn btn-sm btn-secondary h-12 px-6"
                        disabled={
                          user.role === "librarian" || user.role === "admin"
                        }
                      >
                        📚 Make Librarian
                      </button>
                      <button
                        onClick={() => makeAdmin(user._id || user.uid)}
                        className="btn btn-sm btn-error h-12 px-6"
                        disabled={user.role === "admin"}
                      >
                        👑 Make Admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-3xl font-bold text-gray-700 mb-4">
            No users found
          </h3>
          <p className="text-xl text-gray-500 mb-8">
            {searchTerm
              ? `No users match "${searchTerm}"`
              : "No users registered yet"}
          </p>
          <button onClick={fetchUsers} className="btn btn-primary btn-lg">
            🔄 Refresh Users
          </button>
        </div>
      ) : (
        <div className="text-center mt-12 pt-8 border-t border-base-200">
          <p className="text-lg font-semibold">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      )}
    </div>
  );
};

export default AllUsers;

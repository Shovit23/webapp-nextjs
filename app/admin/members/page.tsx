"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";
import toast from "react-hot-toast";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface User {
  id: number;
  username: string;
  email: string;
  userRoles: UserRole[];
}

interface UserRole {
  id: number;
  userId: number;
  roleName: string;
}

const UserList = () => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState<{ roleName: string }[]>([]);
  const userLoad = Loading("Loading Users.......");
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleRoleChange = (roleName: any, isChecked: any) => {
    if (isChecked) {
      setSelectedRoles((prevRoles) => [...prevRoles, roleName]);
    } else {
      setSelectedRoles((prevRoles) => prevRoles.filter((r) => r !== roleName));
    }
  };

  const toggleRoleModal = (userId: any, userRoles: string[]) => {
    setSelectedUserId(userId);
    setSelectedRoles(userRoles);
    setIsRoleModalOpen(!isRoleModalOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.Data);
        const responseRoles = await axios.get("/api/roles");
        setRoles(responseRoles.data.roles);
        console.log(responseRoles.data.roles);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const updateUserRoles = async (userId: any, roles: string[]) => {
    try {
      const response = await axios.post("/api/roles/updateRole", {
        userId: userId,
        roles: roles,
      });
      console.log(response.data);
      toast.success("Role updated successfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id: any) => {
    try {
      const data = { id };
      const res = await axios.post("/api/users/delete", data);
      console.log(res.data.message);
      toast.success("User deleted sucessfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) {
    return <div>{userLoad}</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(users)) {
    return <div>No users found.</div>;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center min-h-screen p-10">
      <div className="w-full max-w-xxxl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <caption className="bg-gray-50 p-4">User Details</caption>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                colSpan={2}
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.userRoles.length > 0
                    ? user.userRoles.map((role) => (
                      <span key={role.id} className="block mt-1">
                        {role.roleName}
                      </span>
                    ))
                    : "No role"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">Active</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteUser(user.id)}
                    type="reset"
                    className="ml-2 bg-transparent text-gray-400 py-1 px-2 rounded hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                    style={{ position: 'relative' }}
                  >
                  <FontAwesomeIcon icon={faTrash} />
                  <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100"></span>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      toggleRoleModal(
                        user.id,
                        user.userRoles.map((role) => role.roleName)
                      )
                    }
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Change Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow">
          <button
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        {isRoleModalOpen && (
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Change Role
                      </h3>
                      <div className="mt-2">
                        <div className="space-y-2">
                          {roles.map((role) => (
                            <div key={role.roleName} className="mb-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  value={role.roleName}
                                  checked={selectedRoles.includes(
                                    role.roleName
                                  )}
                                  onChange={(e) =>
                                    handleRoleChange(
                                      role.roleName,
                                      e.target.checked
                                    )
                                  }
                                />
                                <span className="ml-2">{role.roleName}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setIsRoleModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      updateUserRoles(selectedUserId, selectedRoles);
                      setIsRoleModalOpen(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;

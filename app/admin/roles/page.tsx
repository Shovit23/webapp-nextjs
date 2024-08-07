"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Role = {
  id: number;
  roleName: string;
};
interface RoleResponse {
  roles: Role[];
}

const Page = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<string>("");
  const [formData, setFormData] = useState({
    role: "",
  });
  const userLoad = Loading("Loading Roles.......");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<RoleResponse>("/api/roles");
        setRoles(response.data.roles);
        console.log(response.data.roles);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const data = JSON.stringify(formData.role);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/roles/addRole", data);
      location.reload();
      toast.success("Role added Sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Role already exists");
    }
  };

  const deleteRole = async (role: any) => {
    try {
      const data = { role };
      const res = await axios.post("/api/roles/deleteRole", data);
      console.log(res.data.message);
      toast.success("Role deleted sucessfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.error("Error deleting Role:", err);
      toast.success("Error deleting Role");
    }
  };
  if (loading) {
    return <div>{userLoad}</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-center">Add Role</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role Name"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 w-full max-w-xs mx-auto transition-transform duration-300 ease-in-out transform scale-95 hover:scale-100"
          >
            Add Role
          </button>
        </form>
      </div>

      <div className="container mx-auto px-4 py-8 bg-gray-50 shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Role Management
          </h1>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              All Roles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span>{role.roleName}</span>
                    <button
                      onClick={() => deleteRole(role.roleName)}
                      className="ml-2 bg-transparent text-gray-400 py-1 px-2 rounded hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                      style={{ position: 'relative' }}
                      >
                     <FontAwesomeIcon icon={faTrash} />
                     <span className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100"></span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

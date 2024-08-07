"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Module = {
  id: number;
  moduleKey: string;
  moduleName: string;
  moduleDescription: string | null;
  moduleOwner: string;
  services: Service[];
};

type Service = {
  serviceId: number;
  serviceName: string;
  serviceDescription: string | null;
  moduleKey: string;
};

interface ModuleResponse {
  modulesWithServices: Module[];
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [modules, setModules] = useState<Module[]>([]);
  const [formData, setFormData] = useState({
    moduleKey: "",
    moduleName: "",
    moduleDescription: "",
    moduleOwner: "",
  });
  const totalPages = Math.ceil(modules.length / itemsPerPage);
  const paginatedModules = modules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const userLoad = Loading("Loading Modules.......");
  const [loading, setLoading] = useState(true);
  const [createModuleLoading, setCreateModuleLoading] = useState(false);
  const moduleLoad = Loading("Creating Module.......");
  const [deleteModuleLoading, setDeleteModuleLoading] = useState(false);
  const moduleDelete = Loading("Deleting Module.......");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get<ModuleResponse>("/api/modules");
        setModules(response.data.modulesWithServices);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Modules:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const data = JSON.stringify(formData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setCreateModuleLoading(true);
      const response = await axios.post("/api/modules/create", data);

      toast.success("Module created Sucessfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error("Module already exists");
    } finally {
      setCreateModuleLoading(false);
    }
  };

  const deleteModule = async (moduleName: any) => {
    try {
      setDeleteModuleLoading(true);
      const data = { moduleName };
      const res = await axios.post("/api/modules/delete", data);
      console.log(res.data.message);
      toast.success("Module deleted sucessfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.error("Error deleting Module:", err);
      toast.error("Error deleting Module");
    } finally {
      setDeleteModuleLoading(false);
    }
  };
  if (loading) {
    return <div>{userLoad}</div>;
  }
  if (createModuleLoading) {
    return <div>{moduleLoad}</div>;
  }
  if (deleteModuleLoading) {
    return <div>{moduleDelete}</div>;
  }

  return (
    <div>
      {/* <div className="container mx-auto px-4 py-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-center">Add Module</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row space-x-2 justify-center items-start"
        >
          <input
            type="text"
            name="moduleKey"
            value={formData.moduleKey}
            onChange={handleChange}
            placeholder="Module Key"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="moduleName"
            value={formData.moduleName}
            onChange={handleChange}
            placeholder="Module Name"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="moduleDescription"
            value={formData.moduleDescription}
            onChange={handleChange}
            placeholder="Module Description"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="moduleOwner"
            value={formData.moduleOwner}
            onChange={handleChange}
            placeholder="Module Owner"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 w-full max-w-xs mx-auto transition-transform duration-300 ease-in-out transform scale-95 hover:scale-100"
          >
            Add Module
          </button>
        </form>
      </div> */}

<div className="container mx-auto px-4 py-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-8">
    <h2 className="text-2xl font-semibold mb-2 text-center">Add Module</h2>
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center space-x-2"
    >
      <input
        type="text"
        name="moduleKey"
        value={formData.moduleKey}
        onChange={handleChange}
        placeholder="Module Key"
        className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="moduleName"
        value={formData.moduleName}
        onChange={handleChange}
        placeholder="Module Name"
        className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="moduleDescription"
        value={formData.moduleDescription}
        onChange={handleChange}
        placeholder="Module Description"
        className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="moduleOwner"
        value={formData.moduleOwner}
        onChange={handleChange}
        placeholder="Module Owner"
        className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out transform scale-95 hover:scale-100"
      >
        Add Module
      </button>
    </form>
  </div>
      <div className="container mx-auto px-4 py-8 bg-gray-50 shadow-lg rounded-lg overflow-hidden mt-8">
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4 text-center">
      Module Management
    </h1>
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2 text-center">
        All Modules
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedModules.map((module) => (
          <div
            key={module.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col justify-between"  // Adjusted to flex column layout
          >
            <div>
              <strong>Module Name:</strong> {module.moduleName}
              <br />
              <strong>Module Description:</strong> {module.moduleDescription}
              <br />
              <strong>Module Owner:</strong> {module.moduleOwner}
            </div>
            <div className="self-end mt-auto"> 
              <button
                onClick={() => deleteModule(module.moduleName)}
                className="bg-transparent text-gray-400 py-1 px-2 rounded hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out"
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
    <div>
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
    </div>
  </div>
</div>

    </div>
  );
};

export default Page;

"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import toast from 'react-hot-toast';

interface Module {
  moduleName: string;
  moduleDescription?: string;
}
interface ModuleResponse {
  list: Module[];
}

const Page = () => { 

  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 6;
  const [modules, setModules] = useState<Module[]>([]);
  const { data: session } = useSession();
  const [deleteModuleLoading, setDeleteModuleLoading] = useState(false);
  const moduleDelete = Loading("Deleting Module.......");
  const totalPages = Math.ceil(modules.length / itemsPerPage);
  const paginatedModules = modules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const email = session?.user.email;
        if (!email) {
          console.error('No email found in session');
          return; 
        }
        const response = await axios.post<ModuleResponse>("/api/modules/findModuleByEmail", { email });
        setModules(response.data.list); 
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, [session]);
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

  

  if (deleteModuleLoading) {
    return <div>{moduleDelete}</div>;
  }
  

  return (
    <div>
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
                  key={module.moduleName}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => deleteModule(module.moduleName)}
                      className="ml-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition-colors duration-200 ease-in-out transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mb-2">
                    <strong>Module Name:</strong> {module.moduleName}
                    <br />
                    <strong>Module Description:</strong>{" "}
                    {module.moduleDescription}
                    <br />
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

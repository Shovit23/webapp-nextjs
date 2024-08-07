"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Service = {
  serviceId: number;
  serviceName: string;
  serviceDescription: string | null;
  moduleKey: string;
};

interface ServiceResponse {
  services: Service[];
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    moduleName: "",
  });
  const [createServiceLoading, setCreateServiceLoading] = useState(false);
  const ServiceCreate = Loading("Creating Service.......");
  const [deleteServiceLoading, setDeleteServiceLoading] = useState(false);
  const ServiceDelete = Loading("Deleting Service.......");
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const paginatedModules = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const serviceLoad = Loading("Loading Services.......");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<ServiceResponse>("/api/services");
        setServices(response.data.services);
        console.log(response.data.services);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const data = JSON.stringify(formData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setCreateServiceLoading(true);
      const response = await axios.post("/api/services/create", data);
      toast.success("Service created Sucessfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error("Module Name Invalid");
    } finally {
      setCreateServiceLoading(false);
    }
  };

  const deleteService = async (serviceId: any) => {
    try {
      setDeleteServiceLoading(true);
      const data = { serviceId };
      const res = await axios.post("/api/services/delete", data);
      console.log(res.data.message);
      toast.success("Service deleted sucessfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      console.error("Error deleting Service:", err);
      toast.error("Error deleting Service");
    } finally {
      setDeleteServiceLoading(false);
    }
  };
  if (loading) {
    return <div>{serviceLoad}</div>;
  }
  if (createServiceLoading) {
    return <div>{ServiceCreate}</div>;
  }
  if (deleteServiceLoading) {
    return <div>{ServiceDelete}</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Add Services
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row space-x-2 justify-center items-start"
        >
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
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            placeholder="Service Description"
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500 w-full max-w-xs mx-auto transition-all duration-300 ease-in-out transform scale-90 hover:scale-100 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 w-full max-w-xs mx-auto transition-transform duration-300 ease-in-out transform scale-95 hover:scale-100"
          >
            Add Service
          </button>
        </form>
      </div>
      <div className="container mx-auto px-4 py-8 bg-gray-50 shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Service Management
          </h1>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              All Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedModules.map((service) => (
                <div
                  key={service.serviceName}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <label className="mr-2 font-bold">Service ID:</label>
                      <span>{service.serviceId}</span>
                    </div>
                    <button
                      onClick={() => deleteService(service.serviceId)}
                      className="ml-2 bg-transparent text-gray-400 py-1 px-2 rounded hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105"
                      style={{ position: 'relative' }}
                      >
                     <FontAwesomeIcon icon={faTrash} />
                     <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100"></span>
                    </button>
                  </div>
                  <div className="mb-2">
                    <strong>Service Name:</strong> {service.serviceName}
                    <br />
                    <strong>Service Description:</strong>{" "}
                    {service.serviceDescription}
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

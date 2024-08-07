"use client"
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  projectname: string;
  projectkey: string;
  username: string;
  permission: string;
}

const CreateProjectForm = () => {
  const [formData, setFormData] = useState<FormData>({
    projectname: "",
    projectkey: "",
    username: "",
    permission: ""
  });

  const loginHandleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const verifyKey = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/sonarqube/verifyKey", { projectkey: formData.projectkey });
      if (res.data.message === 0) {
        toast.success("Valid Key");
      } else if (res.data.message === 1) {
        toast.success("Key already present");
      }
    } catch (error) {
      console.error("Key already Exist", error);
      toast.error("Key already Exist");
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const creationRes = await axios.post("/api/sonarqube/create-project", formData);
      const addUserRes = await axios.post("/api/sonarqube/add-user", formData);
      toast.success(`Project Created Successfully. Project Name: ${formData.projectname}`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Project Creation failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form className="bg-white rounded-lg shadow-lg p-5 space-y-4 w-full max-w-md animate__animated animate__fadeInDown">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Create Project</h1>
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-lg transition duration-300 ease-in-out hover:border-blue-500">
          <input
            type="text"
            placeholder="Project name"
            id="projectname"
            name="projectname"
            className="pl-2 w-full outline-none border-none focus:border-blue-500"
            value={formData.projectname}
            onChange={loginHandleChange}
          />
        </div>
        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-lg transition duration-300 ease-in-out hover:border-blue-500">
          <input
            type="text"
            placeholder="Project Key"
            id="projectkey"
            name="projectkey"
            className="pl-2 w-full outline-none border-none focus:border-blue-500"
            value={formData.projectkey}
            onChange={loginHandleChange}
          />
        </div>
        <label onClick={verifyKey} className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
          Verify Key
        </label>
        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-lg transition duration-300 ease-in-out hover:border-blue-500">
          <input
            type="text"
            placeholder="Project Admin Username"
            id="username"
            name="username"
            className="pl-2 w-full outline-none border-none focus:border-blue-500"
            value={formData.username}
            onChange={loginHandleChange}
          />
        </div>
        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-lg transition duration-300 ease-in-out hover:border-blue-500">
          <select
            name="permission"
            id="permission"
            className="pl-2 w-full outline-none border-none focus:border-blue-500"
            value={formData.permission}
            onChange={loginHandleChange}
          >
            <option defaultValue="none">Select the Permission</option>
            <option value="admin">Project Admin</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProjectForm;

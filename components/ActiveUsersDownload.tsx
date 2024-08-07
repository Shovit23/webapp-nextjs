"use client";
import React, { useState } from "react";
import SideNavbar from "./SideNavbar";

const ActiveUsersDownload = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    token: "",
    environment: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleProjectSelect = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedProject(e.target.value);
    setFormData({ username: "", token: "", environment: "" });
    setUsernameError("");
    setShowForm(true);
    setFileUploaded(false);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleUsernameBlur = () => {
    if (!validateEmail(formData.username)) {
      setUsernameError("Username is not valid");
    } else {
      setUsernameError("");
    }
  };

  const isFormValid = () => {
    return (
      formData.username.length > 0 &&
      formData.token.length > 0 &&
      formData.environment.length > 0 &&
      validateEmail(formData.username)
    );
  };

  const handleFileUpload = () => {
    // Add file upload logic here
    setFileUploaded(true);
  };

  const handleReport = () => {
    // Add report generation logic here
    setFileUploaded(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4">
        <SideNavbar />
      </div>
      <div className="w-full md:w-3/4 flex flex-col justify-center items-center px-4 md:px-0">
        <div className="inline-block px-6 py-2 border-2 border-black rounded-full mb-4">
          <div className="flex justify-center items-center space-x-4 m-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="projectType"
                value="raw"
                checked={selectedProject === "raw"}
                onChange={handleProjectSelect}
                className="form-radio"
              />
              <span>Jira Raw Users</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="projectType"
                value="active"
                checked={selectedProject === "active"}
                onChange={handleProjectSelect}
                className="form-radio"
              />
              <span>Jira Active Users</span>
            </label>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 border border-gray-300 rounded-md shadow-md w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleUsernameBlur}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
              {usernameError && (
                <p className="text-red-500 text-sm">{usernameError}</p>
              )}
            </div>

            {formData.username && validateEmail(formData.username) && (
              <div className="mb-4">
                <label className="block text-gray-700">Token</label>
                <input
                  type="password"
                  name="token"
                  value={formData.token}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {formData.token && (
              <div className="mb-4">
                <label className="block text-gray-700">
                  Please select the Environment
                </label>
                <select
                  name="environment"
                  value={formData.environment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select an Environment
                  </option>
                  <option value="Jira Cloud">Jira Cloud</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            )}

            {selectedProject === "raw" && isFormValid() && (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Download Project
              </button>
            )}

            {selectedProject === "active" && formData.environment && (
              <>
                <button
                  onClick={handleReport}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                >
                  Report
                </button>
                {fileUploaded && (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    View in Graph
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveUsersDownload;
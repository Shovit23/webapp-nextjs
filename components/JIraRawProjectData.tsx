"use client";

import React, { useState } from "react";
import Loading from "./Loading";
import toast from "react-hot-toast";
import "./Background.module.css"

const JiraRawProjectData= () => {
  const [formData, setFormData] = useState({
    username: "",
    token: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toastPosition = '';

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const Data = {
    Usename: formData.username,
    token: formData.token,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.token) {
      toast.error("Please fill all the  fields",{position: "bottom-right"});
    } else {
      setIsLoading(true);

      try {
        const response = await fetch(
          "http://localhost:5000/download_attachments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(Data),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", Data);
        toast.success('Data Downloaded',{position: "bottom-right"}); 
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to connect",{position: "bottom-right"});

      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        {isLoading ? (
          "loading"
        ) : (
          <form
            className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-medium text-center mb-6">
              Please fill the required details
            </h2>

            <div className="flex flex-col mb-4">
              <label htmlFor="token" className="text-sm font-medium mb-1">
                UserName:
              </label>
              <input
                type="password"
                id="token"
                name="token"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="token" className="text-sm font-medium mb-1">
                Token:
              </label>
              <input
                type="password"
                id="token"
                name="token"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.token}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JiraRawProjectData;

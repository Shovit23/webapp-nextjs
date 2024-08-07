"use client";

import React, { useState } from "react";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const forgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ""
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toastPosition = '';
  const load = Loading('')

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const Data = {
    email: formData.email
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email");
    } else {
      setIsLoading(true);

      try {
        const res = await axios.post("/api/users/forgotpassword", Data)
        toast.success("Check your email for reset password link");
        console.log(res.data) 
        router.refresh();
        router.push("/")
      } catch (error) {
        console.error("Error:", error);
        toast.error("User not found");
      } finally{
        setIsLoading(false)
      }
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        {isLoading ? (
         load
        ) : (
          <form
            className="w-full max-w-md px-8 py-6 bg-white rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-medium text-center mb-6">
              Password Reset
            </h2>

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                name="email"
                // className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="border-2 w-full mb-8 py-2 px-3 rounded-2xl bg-blue-500 text-white font-medium hover:bg-blue-700"
            >
             Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default forgotPassword;

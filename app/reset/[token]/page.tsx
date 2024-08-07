"use client";

import React, { useState } from "react";
import Loading from "../../../components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const forgotPassword = ({ params }: any) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toastPosition = "";
  const load = Loading("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter()
  const Data = {
    password: formData.password,
    tokenData: { params },
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmpassword) {
      toast.error("Please enter your password");
    } else if (formData.password !== formData.confirmpassword) {
      toast.error("Password does not match");
    } else {
      setIsLoading(true);

      try {
        const res = await axios.post("/api/users/updatepassword", Data);
        console.log(res.data)
        toast.success("Password changed sucessfully.")
        router.push("/")
        router.refresh
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to connect");
      } finally {
        setIsLoading(false);
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
              Set new password
            </h2>

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">

              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                name="password"
                // className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <input
                type="password"
                placeholder="Confirm new Password"
                id="confirmpassword"
                name="confirmpassword"
                // className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700"
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

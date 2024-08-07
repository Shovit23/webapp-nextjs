"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import Link from "next/link";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupDisabled, setIsSignupDisabled] = useState(true);
  const signupLoad = Loading("Hold on! Signing you up....");
  const [SignupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const signupHandleChange = (e: { target: { name: any; value: any } }) => {
    setSignupFormData({ ...SignupFormData, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  useEffect(() => {
    if (
      SignupFormData.username.length > 0 &&
      SignupFormData.email.length > 0 &&
      SignupFormData.password.length > 0 &&
      SignupFormData.confirmPassword.length > 0
    ) {
      setIsSignupDisabled(false);
    } else {
      setIsSignupDisabled(true);
    }
  }, [SignupFormData]);

  const signupHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !SignupFormData.username ||
      !SignupFormData.email ||
      !SignupFormData.password ||
      !SignupFormData.confirmPassword
    ) {
      toast.error("Please fill all the  fields");
    } else if (SignupFormData.password != SignupFormData.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        setIsLoading(true);
        const res = await axios.post("/api/users/signup", SignupFormData);
        console.log("Signup Success", res.data);
        toast.success("Signup Success, Please try to login now");
        router.push("/");
      } catch (e: any) {
        toast.error("User Already Exist");
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        signupLoad
      ) : (
        <div className="h-screen flex justify-center">
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form className="bg-white rounded-md shadow-2xl p-5"
              onSubmit={signupHandleSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  Don't have an account!
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-8">
                  Sign up with us
                </p>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    type="username"
                    placeholder="Username"
                    id="username"
                    name="username"
                    className="pl-2 w-full outline-none border-none"
                    value={SignupFormData.username}
                    onChange={signupHandleChange}
                  />
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    type="email"
                    placeholder="email"
                    id="email"
                    name="email"
                    className="pl-2 w-full outline-none border-none"
                    value={SignupFormData.email}
                    onChange={signupHandleChange}
                  />
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    className="pl-2 w-full outline-none border-none"
                    value={SignupFormData.password}
                    onChange={signupHandleChange}
                  />
                </div>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="pl-2 w-full outline-none border-none"
                    value={SignupFormData.confirmPassword}
                    onChange={signupHandleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  Sign Up
                </button>
                <div className="flex justify-between mt-4">
                  <Link
                    href={"/login"}
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

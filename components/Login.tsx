"use client";
import React, { useEffect, useState }from "react";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { useSession } from "next-auth/react";
import '/css/form.css';

const Login = () => {
  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
    redirect : false
  });
  const router = useRouter();
  const loginLoad = Loading("Hold on! Logging you in...");
  const loginHandleChange = (e: { target: { name: any; value: any } }) => {
    setloginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const forgotPassword = () => {
    router.push("/reset");
  };
  const [isLoading, setIsLoading] = useState(false);
  const {data: session} = useSession();
  const loginhandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginFormData.email || !loginFormData.password) {
      toast.error("Please fill all the  fields", { position: "bottom-right" });
    } else {
      try {

        setIsLoading(true);
        const response = await signIn('credentials', loginFormData )
        if (response?.status === 200) {
          router.push("/");
          toast.success("Login Successful");
          
        } 
        else{
          toast.error("Invalid Credentials");
        } 
        
      } catch (e: any) {
        console.log("Login Failed", e.message);
        toast.error("Something went wrong. Please try again");
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (loginFormData.email.length > 0 && loginFormData.password.length > 0) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [loginFormData]);

  return (
    <div>
      {isLoading ? (
        loginLoad
      ) : (
        <div className="h-screen flex justify-center">
          <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form
                className="bg-white rounded-md shadow-2xl p-5"
                onSubmit={loginhandleSubmit}
              >
                <h1 className="text-gray-800 font-bold text-2xl mb-1">
                  Hello Again!
                </h1>
                <p className="text-sm font-normal text-gray-600 mb-8">
                  Welcome Back
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
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    className="pl-2 w-full outline-none border-none"
                    value={loginFormData.email}
                    onChange={loginHandleChange}
                  />
                </div>
                <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl">
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
                    value={loginFormData.password}
                    onChange={loginHandleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="button"
                >
                  Login
                </button>
                <div className="flex justify-between mt-4">
                  <Link href={"/reset"}>
                    <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                      Forgot Password ?
                    </span>
                  </Link>

                  <Link
                    href={"/signup"}
                    className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                  >
                    Don't have an account yet? Sign up here
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

export default Login;

"use client";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const [token, setToken] = useState("");
  const { data: session } = useSession();

  const generateToken = async () => {
    const res = await axios.post("/api/token/generate");
    const token = res.data.token;
    setToken(token);
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">
            Welcome back {session?.user.username}
          </h1>
          <h2 className="mb-4 text-xl font-semibold">Your Roles:</h2>
          <ul
            className="list-none p-0"
            style={{ listStyleType: "none", padding: 0 }}
          >
            {session?.user.role.map(
              (role: any, index: Key | null | undefined) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-4 py-2 border-b border-gray-300 last:border-b-0"
                >
                  {role}
                </li>
              )
            )}
          </ul>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-150 ease-in-out"
            onClick={() => generateToken()}
          >
            Generate Token
          </button>
          <div className="mt-4 bg-green-100 p-4 rounded-lg">
            <p className="font-medium">{token}</p>
          </div>
          <Link
            href="/"
            passHref
            className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-150 ease-in-out mr-4" // Added mr-4 for right margin
          >
            HomePage
          </Link>
          <Link
            href="/profile/modules"
            passHref
            className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-150 ease-in-out" // No mr-4 here since it's the last link
          >
            Manage Modules and Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

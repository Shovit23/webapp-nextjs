import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link
        href="/admin/modules"
        passHref
        className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-150 ease-in-out" // No mr-4 here since it's the last link
      >
        Module Management
      </Link>{" "}
      <Link
        href="/admin/services"
        passHref
        className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-150 ease-in-out" // No mr-4 here since it's the last link
      >
        Service Management
      </Link>{" "}

      <Link
        href="/admin/roles"
        passHref
        className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-150 ease-in-out" // No mr-4 here since it's the last link
      >
        Role Management
      </Link>{" "}
      <Link
        href="/admin/members"
        passHref
        className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-150 ease-in-out" // No mr-4 here since it's the last link
      >
        User Management
      </Link>
      
      
    </div>
  );
};

export default page;

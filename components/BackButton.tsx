"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  function onClick() {
    router.back();
  }

  return (
    <div className="flex justify-content-start items-start px-5 py-5 ">
      <button
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-md animate-pop hover:shadow-lg transition duration-300 ease-in-out"
        onClick={onClick}
      >
        Back
      </button>
    </div>
  );
};

export default BackButton;

import React from "react";

const Loading = (a:string) => {
  return (
    <div className="loading flex justify-center items-center min-h-screen bg-gray-200">
      <div className="spinner animate-ping bg-green-500 rounded-full h-10 w-10"></div>
      <p className="text-gray-700 text-center mt-4">{a}</p>
    </div>
  );
};

export default Loading;

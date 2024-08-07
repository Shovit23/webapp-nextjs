import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white flex flex-col md:flex-row justify-between px-4 py-4" style={{position: "fixed",
    width: "-webkit-fill-available",
    bottom: "0px"}}>
        <div className="flex space-x-4">
          <span>© 2024 Deloitte</span>
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Use
          </a>
          <a href="#" className="hover:text-gray-400">
            Security
          </a>
        </div>
        <div>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            ▲
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

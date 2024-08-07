"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "/css/header.css"
import { signOut, useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faSignOutAlt, faInfoCircle, faEnvelopeOpenText, faBars, faUserShield } from '@fortawesome/free-solid-svg-icons';
 
const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
 
  return (
    <div className="bg-black text-white">
      <div className="flex justify-between items-center py-3 px-6">
        {/* Logo and Title */}
        <a href="/"  className="flex items-center">        
          <Image  src="/images/Deloitte.png" alt="Logo" width={96} height={48} />
          <div className="ml-10 hidden md:block">
            <span className="text-lg font-bold">Delivery Excellence Tool Accelerators</span>
          </div>
         
          <div className="ml-10 block md:hidden">
            <span className="text-lg font-bold">DETA's</span>
          </div>
        </a>
       
 
        {/* Navigation Links */}
        <div className="hidden md:flex items-center">
          <div className="sample">
            <FontAwesomeIcon icon={faEnvelopeOpenText} /> {/* Contact Us Icon */}
            <span className="text-sm font-medium ml-2">Contact Us</span>
          </div>
          <div className="sample">
            <FontAwesomeIcon icon={faInfoCircle} /> {/* FAQ's Icon */}
            <span className="text-sm font-medium ml-2">FAQ's</span>
          </div>
          <div className="sample">
            <FontAwesomeIcon icon={faUserAlt} /> {/* About Us Icon */}
            <span className="text-sm font-medium ml-2">About Us</span>
          </div>
          {session?.user.role.includes("Detas-Administrator") && (
            <Link href={"/admin"}>
              <div className="sample">
                <FontAwesomeIcon icon={faUserShield} /> {/* Administrator Icon */}
                <span className="text-sm font-medium ml-2">Administrator</span>
              </div>
            </Link>
          )}
          {session?.user ? (
            <div className="sample">
              <FontAwesomeIcon icon={faSignOutAlt} /> {/* Sign Out Icon */}
              <button onClick={() => signOut()} className="ml-2">
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="sample">
              <a href="/login" className="text-sm font-medium">
                Sign in
              </a>
            </div>
          )}
        </div>
 
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <FontAwesomeIcon icon={faBars} /> {/* Hamburger Menu Icon */}
          </button>
        </div>
      </div>
 
      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden absolute right-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg z-20">
          {/* Menu Items */}
          <Link href="/contact" passHref>
            <div className="flex items-center gap-x-1 py-2 px-4 hover:bg-del-green cursor-pointer">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <span>Contact Us</span>
            </div>
          </Link>
          <Link href="/faq" passHref>
            <div className="flex items-center gap-x-1 py-2 px-4 hover:bg-del-green cursor-pointer">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>FAQ's</span>
            </div>
          </Link>
          <Link href="/about" passHref>
            <div className="flex items-center gap-x-1 py-2 px-4 hover:bg-del-green cursor-pointer">
              <FontAwesomeIcon icon={faUserAlt} />
              <span>About Us</span>
            </div>
          </Link>
          {session?.user.role.includes("Detas-Administrator") && (
            <Link href={"/admin"} passHref>
              <div className="flex items-center gap-x-1 py-2 px-4 hover:bg-del-green cursor-pointer">
                <FontAwesomeIcon icon={faUserShield} />
                <span>Administrator</span>
              </div>
            </Link>
          )}
          {session?.user ? (
            <div className="flex items-center gap-x-1 py-2 px-4 hover:bg-del-green cursor-pointer">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <button onClick={() => signOut()} className="ml-2">
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-x-1 py-2 px-4 hover:bg-del-green cursor-pointer">
              <a href="/login" className="text-sm font-medium">
                Sign in
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
export default Header;  
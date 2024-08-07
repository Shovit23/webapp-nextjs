import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Provider from "../components/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to DETAs",
  description: "Delivery Excelence tool accelarations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-grey-300">
        <Provider>
        <Header/>  
        <Toaster position="bottom-right"/>      
        <div className="">{children}</div>
        <Footer/>
        </Provider>
      </body>
    </html>
  );
}

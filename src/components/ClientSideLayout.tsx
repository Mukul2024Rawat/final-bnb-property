"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import MobileMenu from "./navbar/MobileMenu";

interface ClientSideLayoutProps {
  children: React.ReactNode;
}

const ClientSideLayout: React.FC<ClientSideLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const showNavbarFooter = pathname === "/" || pathname.startsWith("/guest");

  return (
    <>
      {showNavbarFooter && <Navbar />}
      {children}
      {showNavbarFooter && <Footer />}
      {showNavbarFooter && <MobileMenu />}
    </>
  );
};

export default ClientSideLayout;

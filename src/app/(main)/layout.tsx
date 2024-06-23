"use client";

import Navbar from "@/components/Navbar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="max-w-screen-xl mx-auto my-2 p-4">{children}</main>
    </div>
  );
};

export default Layout;

import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import { AuthProvider } from "@/context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <main className="root">
        <Sidebar />
        <MobileNav />
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </main>
    </AuthProvider>
  );
};

export default Layout;

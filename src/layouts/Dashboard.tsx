import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const navigate = useNavigate();

  //   // Verificar si el usuario está autenticado
  //   useEffect(() => {
  //     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //     if (!isLoggedIn) {
  //       navigate("/");
  //     }
  //   }, [navigate]);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}

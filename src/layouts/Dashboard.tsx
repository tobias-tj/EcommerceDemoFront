import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#f6f6f6c7]">
        <AppSidebar />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}

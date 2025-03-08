import {
  Home,
  ShoppingBagIcon,
  ShieldCheck,
  User2,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logoEcommerce from "@/assets/logoEcommerce.png";

const projects = [
  { url: "/", icon: Home, name: "Home" },
  { url: "/list/items", icon: ShoppingBagIcon },
  { url: "/list/items/checkout", icon: ShieldCheck },
  { url: "/account", icon: User2 },
];

const config = [{ url: "/closeAccount", icon: LogOut }];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="flex flex-col h-screen p-4 bg-white shadow-lg w-25 rounded-2xl">
      <SidebarContent className="flex bg-white">
        <motion.img
          src={logoEcommerce}
          alt="Ecommerce"
          width={80}
          height={80}
          className="mx-auto my-4 bg-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <SidebarGroup className="flex-grow">
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <motion.div
                  key={project.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-5"
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a
                        href={project.url}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                          location.pathname === project.url
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <project.icon className="w-6 h-6 text-gray-700" />
                        {/* <span className="text-sm font-medium">
                          {project.name}
                        </span> */}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-4 px-4 py-3 text-white transition-all bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      <item.icon className="w-6 h-6" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

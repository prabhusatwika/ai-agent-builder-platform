"use client"
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Database,
  Headphones,
  User,
  Gem,
} from "lucide-react";
import { usePathname } from "next/navigation";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agents",
    url: "/dashboard/my-agents",
    icon: Headphones,
  },
  {
    title: "Data",
    url: "/data",
    icon: Database,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];

function AppSidebar() {
  const {open}=useSidebar();
  const path=usePathname();
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className="flex gap-2 items-center">
          <Image src="/logo.svg" alt="logo" width={35} height={35} priority />
          {open && <h2 className="font-bold text-lg">AgentMaker</h2>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild size={open?'lg':'default'}
                  isActive={path==menu.url}
                  >
                    <Link href={menu.url} className="flex gap-2 items-center">
                      <menu.icon className="h-4 w-4" />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='mb-10'>
        <div className='flex gap-2 items-center'>
            <Gem/>
            {open && <h2>Unlimited access</h2>}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

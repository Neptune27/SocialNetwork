"use client"

import { IMessageUser } from "@/interfaces/IMessage";
// import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

function Sidebar({ children }: { children: React.ReactNode }) {
  // const currentUser = await getCurrentUser();
  const u : IMessageUser = {
    Id: "",
    Name: "Neptune",
    Picture: ""
  }
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={u!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;

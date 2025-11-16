"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../_components/Sidebar";
import SidebarHeader from "../_components/SidebarHeader";
import Loader from "@/components/Loader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Check if user has an admin role (Assuming role is stored in Clerk metadata)
      if (user?.publicMetadata?.role !== "admin") {
        router.push("/"); // Redirect to homepage if not admin
      } else {
        setIsAdmin(true);
      }
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) return <Loader/>;

  return isAdmin ? (
    <div className="flex min-h-screen">
      <Sidebar className="hidden md:block" />
      <div className="flex-1">
        <SidebarHeader />
        <main className="p-8">{children}</main>
      </div>
    </div>
  ) : null;
}

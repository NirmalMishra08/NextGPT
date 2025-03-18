"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import MainLayout from "./MainLayout";
import LeftSidebar from "./LeftSidebar";

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    const logoutHandler = async () => {
        await signOut({ callbackUrl: "/Login" });
    };

    return (
        <div className="h-screen w-full flex gap-1 overflow-hidden">
            {/* Left Sidebar */}
            <div className="leftsidebar w-[18%] bg-[#F9F9F9] overflow-hidden">
                <LeftSidebar />
            </div>

            {/* Main Layout */}
            <div className="mainlayout w-[82%] h-screen flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
                {/* Navbar - Fixed at Top */}
               
                {/* Main Content */}
                <div className="mt-[70px] p-4"> {/* Push content below Navbar */}
                    <MainLayout />
                </div>
            </div>
        </div>
    );
}

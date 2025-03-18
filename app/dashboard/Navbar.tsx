"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Control modal visibility
    const { data: session } = useSession();
   

    const logoutHandler = async () => {
        setIsOpen(false)
        await signOut({ callbackUrl: "/Login" });
    };

    return (
        <>
            {/* Navbar */}
            <div className="w-full flex justify-between items-center px-6 py-3">
                <h1 className="font-semibold text-2xl text-gray-400">NextGPT</h1>
                <div className="relative flex "> 
                    <button className="mr-4">Share!</button>
                    
                    {/* RN Button */}
                    <div 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="rounded-full w-10 h-10 border border-gray-500 flex justify-center items-center cursor-pointer"
                    >
                        RN
                    </div>

                    {/* Modal - Positioned Below RN */}
                    {isOpen && (
                        <div className="absolute left-0 mt-8 w-32 bg-white text-black border border-gray-300 rounded-md shadow-lg p-2">
                            <button 
                                className="w-full text-left p-2 hover:bg-gray-100 rounded-md" 
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;

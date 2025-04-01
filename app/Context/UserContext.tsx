"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Step 1: Create the context
const UserContext = createContext();

// Step 2: Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);  // Changed from [] to null

    const { data: session } = useSession();

    

    // Step 3: Update the user state when the session changes
    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    // ✅ Create a new chat and update the state immediately
    const createNewChat = async () => {
        try {
            if (!user) {
                return;
            }
            const token = session?.user.id;

            const { data } = await axios.post(
                "/api/v1/chat/create",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                setChats((prevChats) => [...prevChats, data.chat]); // Update chat state
                setSelectedChat(data.chat); // Auto-select the new chat
                toast.success("Chat created successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to create chat");
        }
    };

    // ✅ Fetch user chats on login and update state
    const fetchUserChat = async () => {
        try {
            if (!user) return;
            const token = session?.user.id;

            const { data } = await axios.get("/api/v1/chat/get", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                if (data.data.length === 0) {
                    await createNewChat();  // Create chat if none exists
                    return;
                }

                // Sort chats by `updatedAt` (most recent first)
                const sortedChats = data.data.sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                );

                setChats(sortedChats); // Update chat list
                setSelectedChat(sortedChats[0]); // Auto-select the latest chat
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch chats");
        }
    };

    // Fetch chats when user logs in
    useEffect(() => {
        if (user) {
            fetchUserChat();
        }
    }, [user]);

    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        fetchUserChat,
        createNewChat,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Step 4: Custom hook to use the context
export const useUser = () => useContext(UserContext);

"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Define types for user and chat
interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}

interface Chat {
    _id: string;
    name: string;
    updatedAt: string;
    messages: any[];
    // Add other chat properties if necessary
}

// Define context type
interface UserContextType {
    user: User | null;
    chats: Chat[];
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
    selectedChat: Chat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
    fetchUserChat: () => Promise<void>;
    createNewChat: () => Promise<void>;
}

// Step 1: Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

// Step 2: Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    const { data: session } = useSession();

    // Step 3: Update the user state when the session changes
    useEffect(() => {
        if (session?.user) {
            setUser({
                id: session.user.id as string, // Ensure `id` is treated as a string
                name: session.user.name || "",
                email: session.user.email || "",
                image: session.user.image || "",
            });
        } else {
            setUser(null);
        }
    }, [session]);

    // ✅ Create a new chat and update the state immediately
    const createNewChat = async () => {
        try {
            if (!user) return;

            const token = user.id; // Use user ID as token
            const { data } = await axios.post<{ success: boolean; chat: Chat }>(
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
                toast.error("Failed to create chat");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create chat");
        }
    };

    // ✅ Fetch user chats on login and update state
    const fetchUserChat = async () => {
        try {
            if (!user) return;

            const token = user.id;
            const { data } = await axios.get<{ success: boolean; data: Chat[] }>(
                "/api/v1/chat/get",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data.success) {
                if (data.data.length === 0) {
                    await createNewChat(); // Create chat if none exists
                    return;
                }

                // Sort chats by `updatedAt` (most recent first)
                const sortedChats = data.data.sort(
                    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );

                setChats(sortedChats); // Update chat list
                setSelectedChat(sortedChats[0]); // Auto-select the latest chat
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to fetch chats");
        }
    };

    // Fetch chats when user logs in
    useEffect(() => {
        if (user) {
            fetchUserChat();
        }
    }, [user]);

    const value: UserContextType = {
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
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

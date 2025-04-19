"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Define types for the user, chat, and context value
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface Chat {
  _id: string;
  name: string;
  updatedAt: string;
  messages: { role: string; content: string }[]; // Add this line
}

interface UserContextValue {
  user: User | null;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  selectedChat: Chat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  fetchUserChat: () => Promise<void>;
  createNewChat: () => Promise<void>;
}

// Step 1: Create the context
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Step 2: Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const { data: session } = useSession();

  // Step 3: Update the user state when the session changes
  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
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
      const token = user.id;

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
    } catch (error: unknown) {
      toast.error(((error)as Error ).message || "Failed to create chat");
    }
  };

  // ✅ Fetch user chats on login and update state
  const fetchUserChat = async () => {
    try {
      if (!user) return;
      const token = user.id;

      const { data } = await axios.get("/api/v1/chat/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        if (data.data.length === 0) {
          await createNewChat(); // Create chat if none exists
          return;
        }

        // Sort chats by `updatedAt` (most recent first)
        const sortedChats = data.data.sort(
          (a: Chat, b: Chat) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        setChats(sortedChats); // Update chat list
        setSelectedChat(sortedChats[0]); // Auto-select the latest chat
      }
    } catch (error: unknown) {
      toast.error(((error)as Error ).message || "Failed to fetch chats");
    }
  };

  // Fetch chats when user logs in
  useEffect(() => {
    if (user) {
      fetchUserChat();
    }
  }, [user]);

  const value: UserContextValue = {
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
export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
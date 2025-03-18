"use client";

import React, { useState } from "react";
import { Search, Lightbulb, Mic } from "lucide-react";
import axios from "axios";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return; // Prevent empty messages and multiple requests
    setLoading(true);

    // Add user's message to chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput(""); // Clear input field

    try {
      const response = await axios.post("/api/gemini", { prompt: input });
      
      // Extract the correct response structure
      const botReply = response.data.text || "No response from AI.";

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { text: "Error getting response.", sender: "bot" }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white mt-10">
      {/* Main Content Area */}
      <main className="flex-grow p-4 flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md w-fit max-w-[500px] ${
              msg.sender === "user" ? "bg-gray-200 self-end" : "bg-blue-100 self-start"
            }`}
          >
            <p className="text-gray-700">{msg.text}</p>
          </div>
        ))}
      </main>

      {/* Chat Input - Fixed at Bottom */}
      <div className="fixed bottom-0 w-4/5  bg-white shadow-md ">
        <div className="flex items-center bg-gray-200 rounded-3xl p-3 shadow-sm">
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1  bg-transparent outline-none text-gray-700"
            disabled={loading}
          />
          <div className="flex space-x-3 mr-3">
            <button
              className="flex items-center px-3 py-1.5 bg-gray-300 rounded-full text-gray-700 text-sm hover:bg-gray-400"
              disabled={loading}
            >
              <Search size={16} className="mr-1" />
              Search
            </button>
            <button
              className="flex items-center px-3 py-1.5 bg-gray-300 rounded-full text-gray-700 text-sm hover:bg-gray-400"
              disabled={loading}
            >
              <Lightbulb size={16} className="mr-1" />
              Reason
            </button>
          </div>
          <button
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "..." : <Mic size={16} />}
          </button>
        </div>
        <p className="mt-2 text-center text-sm text-gray-500">
          Gemini AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;

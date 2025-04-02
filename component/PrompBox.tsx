import { useUser } from '@/app/Context/UserContext';
import { assets } from '@/assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PrompBox = ({ isLoading, setLoading }: any) => {
    const [prompt, setPrompt] = useState('');
    const { user, chats, setChats, selectedChat, setSelectedChat } = useUser();


    const sendPrompt = async (e: any) => {
        const promptCopy = prompt;
        try {
            e.preventDefault();
            if (!user) {
                return toast.error("Login to send Message");
            }
            if (isLoading) {
                return toast.error("Wait for the previous prompt response");
            }

            if (!selectedChat) {
                return toast.error("No chat selected");
            }

            setLoading(true);
            setPrompt('');

            const userPrompt = {
                role: "user",
                content: prompt,
                timestamp: Date.now(),
            };

            setChats((prevChats: any) =>
                prevChats.map((chat: any) =>
                    chat._id === selectedChat._id
                        ? { ...chat, messages: [...chat.messages, userPrompt] }
                        : chat
                )
            );

            setSelectedChat((prev: any) => ({
                ...prev,
                messages: [...prev.messages, userPrompt],
            }));

            const { data } = await axios.post("/api/v1/chat/ai", { chatId: selectedChat._id, prompt });

            if (data.success) {
                const message = data.response;
                const messageToken = message.split(" ");
                let assistantMessage = {
                    role: "assistant",
                    content: "",
                    timestamp: Date.now(),
                };
                setSelectedChat((prev) => {
                    if (!prev) return prev;

                    const updatedMessages = [...(prev.messages || [])];
                    updatedMessages.push(assistantMessage);

                    return { ...prev, messages: updatedMessages };
                });

                messageToken.forEach((_: string, i: number) => {
                    setTimeout(() => {
                        setSelectedChat((prev) => {
                            if (!prev) return prev;

                            const updatedMessages = [...prev.messages];
                            updatedMessages[updatedMessages.length - 1] = {
                                ...assistantMessage,
                                content: messageToken.slice(0, i + 1).join(" "),
                            };

                            return { ...prev, messages: updatedMessages };
                        });
                    }, i * 100);
                });

            } else {
                toast.error(data.message);
                setPrompt(promptCopy);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
            setPrompt(promptCopy);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendPrompt(e);
        }
    };

    return (
        <form onSubmit={sendPrompt} className={`w-full  ${selectedChat?.messages?.length ?? 0 > 0 ? "max-w-3xl" : "max-w-2xl"}  bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
            <textarea onKeyDown={handleKeyDown} onChange={(e) => setPrompt(e.target.value)} value={prompt} className='outline-none w-full resize-none bg-transparent' rows={2} placeholder='Message NextGPT' required />
            <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                    <p className='flex items-center gap-2 text-xs border px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20'>
                        <Image className='h-5' src={assets.deepthink_icon} alt='' />
                        Deepthink (R1)
                    </p>
                    <p className='flex items-center gap-2 text-xs border px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20'>
                        <Image className='h-5' src={assets.search_icon} alt='' />
                        Search
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Image className='w-4 cursor-pointer' src={assets.pin_icon} alt='' />
                    <button className={`${prompt ? "bg-primary" : "bg-[#71717a]"} rounded-full p-2`}>
                        <Image className='w-3.5' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt='' />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PrompBox;

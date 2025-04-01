"use client"
import React, { useEffect, useRef, useState } from 'react';
import { assets } from "@/assets/assets"
import Image from 'next/image';

import Sidebar from '@/component/Sidebar';
import PrompBox from '@/component/PrompBox';
import Message from '@/component/Message';

import { useUser } from '../Context/UserContext';




const MainPage = () => {


    const { selectedChat } = useUser();
    const constainerRef = useRef(null);
    const [expand, setExpand] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedChat) {
            setMessages(selectedChat.messages);
        }
    }, [selectedChat])
    useEffect(() => {
        if (constainerRef.current) {
            constainerRef.current.scrollTo({
                top: constainerRef.current.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [messages])




    return (
        <div>
            <div className='flex h-screen'>
                {/* { sidebar} */}
                <Sidebar expand={expand} setExpand={setExpand} />
                <div className='flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a28] text-white relative'>
                    <div className='md:hidden absolute px-4 top-6 flex items-center justify-between w-full'>
                        <Image onClick={() => (expand ? setExpand(false) : setExpand(true))} className='rotate-180 ' src={assets.menu_icon} alt='' />
                        <Image className='opacity-70 ' src={assets.chat_icon} alt='' />
                    </div>
                    {
                        messages?.length === 0 ? (
                            <div className='mt-20'>
                                <div className='flex flex-col items-center gap-3'>
                                   
                                    <div className='flex items-center gap-3'>
                                        <Image src={assets.logo_icon} alt='' className='h-16' />
                                        <p className='text-sm mt-2'>Hi I am deepSeek</p>
                                    </div>
                                    <p>
                                        How can I help you today?
                                    </p>
                                </div>
                            </div>
                        ) : (<div className='relative flex flex-col w-full h-[calc(100vh-180px)] overflow-y-auto' ref={constainerRef}>
                            <div className='flex flex-col items-center w-full'>
                                <p className='sticky top-0 z-10 bg-[#292a28] w-full py-3 px-4 text-md font-semibold text-white text-center'>
                                  {selectedChat?.name}
                                </p>

                                {Array.isArray(messages) && messages.map((msg, index) => (
                                    <Message key={index} role={msg.role} content={msg.content} />
                                ))}
                            </div>
                            {
                                isLoading && (
                                    <div className='flex items-center ml-49 justify-start gap-4 max-w-3xl w-full py-3' >
                                        <Image className='h-9 w-9 p-1 border border-white/15 rounded-full' src={assets.logo_icon} alt='Logo' />
                                        <div className=' loader flex justify-center items-center gap-1'>
                                            <div className='w-1 h-1 rounded-full bg-white animate-bounce'></div>
                                            <div className='w-1 h-1 rounded-full bg-white animate-bounce'></div>
                                            <div className='w-1 h-1 rounded-full bg-white animate-bounce'></div>

                                        </div>

                                    </div>
                                )
                            }

                        </div>)
                    }
                    <PrompBox isLoading={isLoading} setLoading={setLoading} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;

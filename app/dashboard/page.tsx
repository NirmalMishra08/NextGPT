"use client"
import React, { useState } from 'react';
import { assets } from "@/assets/assets"
import Image from 'next/image';
import { Divide } from 'lucide-react';
import Sidebar from '@/component/Sidebar';
import PrompBox from '@/component/PrompBox';



const LeftSidebar = () => {
    const [expand, setExpand] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    return (
        <div>
            <div className='flex h-screen'>
                {/* { sidebar} */}
                <Sidebar expand={expand} setExpand={setExpand}/>
                <div className='flex flex-1 flex-col items-center justify-center px-4 pb-8 bg-[#292a28] text-white relative'>
                    <div className='md:hidden absolute px-4 top-6 flex items-center justify-between w-full'>
                        <Image onClick={() => (expand ? setExpand(false) : setExpand(true))} className='rotate-180 ' src={assets.menu_icon} alt='' />
                        <Image className='opacity-70 ' src={assets.chat_icon} alt='' />
                    </div>
                    {
                        messages.length === 0 ? (
                        <>
                            <div className='flex items-center gap-3'>
                                <Image src={assets.logo_icon} alt='' className='h-16' />
                                <p className='text-sm mt-2'>Hi I am deepSeek</p>
                            </div>
                            <p>
                                How can I help you today?
                            </p>

                        </>)
                            : (<div> </div>)
                    }
                    <PrompBox isLoading={isLoading} setLoading={setLoading}  />
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;

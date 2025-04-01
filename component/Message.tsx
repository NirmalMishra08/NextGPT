import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect } from 'react'
import ReactMarkdown from "react-markdown"
import Prism from "prismjs"
import toast from 'react-hot-toast';

interface roles {
    role: string,
    content: string
}

const Message = ({ role, content }: roles) => {

    useEffect(() => {
        Prism.highlightAll();

    }, [content])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success('Text copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text');
        }
    };

    

    return (
        <div className='w-full max-w-3xl text-sm'>
            <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} w-full mb-8`}>
                <div className={`group relative flex w-fit max-w-[80%] py-3 rounded-xl ${role === "user" ? "bg-[#414158] px-5" : "gap-3"}`}>
                    <div className={`opacity-0 group-hover:opacity-100 absolute ${role === "user" ? "-left-16 top-2.5" : 'left-9 -bottom-6'} transition-all `}>
                        <div className='flex items-center gap-2 opacity-70'>
                            {
                                role === "user" ? (
                                    <>
                                        <Image onClick={handleCopy} src={assets.copy_icon} alt='copy' className='w-4 cursor-pointer hover:opacity-100' />
                                        <Image src={assets.pencil_icon} alt='edit' className='w-4.5 cursor-pointer hover:opacity-100' />
                                    </>
                                ) : (
                                    <>
                                        <Image onClick={handleCopy} src={assets.copy_icon} alt='copy' className='w-4 cursor-pointer hover:opacity-100' />
                                        <Image src={assets.regenerate_icon} alt='regenerate' className='w-4 cursor-pointer hover:opacity-100' />
                                        <Image src={assets.like_icon} alt='like' className='w-4 cursor-pointer hover:opacity-100' />
                                        <Image src={assets.dislike_icon} alt='dislike' className='w-4 cursor-pointer hover:opacity-100' />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {
                        role === "user" ? (
                            <span className='text-white/90'><ReactMarkdown>{content}</ReactMarkdown></span>
                        ) : (
                            <>
                                <Image src={assets.logo_icon} alt=' ' className='h-9 w-9 p-1 border border-white/15 rounded-full' />
                                <div className='space-y-4 w-full overflow-sroll'>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Message
{/* <div className='flex flex-col items-center w-full max-w-3xl text-sm '>
            <div className={`flex flex-col w-full mb-8 `}>
                <div className={`group relative flex max-w-2xl py-3 rounded-xl ${role === "user" ? "bg-[#414158] px-5" : "gap-3"}`}>
                    <div className={`opacity-0 group-hover:opacity-100 absolute ${role === "user" ? "-left-16 top-2.5" : 'left-9 -bottom-6'} transition-all `}>
                        <div className='flex items-center gap-2 opacity-70'>
                            {
                                role === "user" ? (
                                    <>
                                        <Image src={assets.copy_icon} alt='w-4 cursor-pointer' />
                                        <Image src={assets.pencil_icon} alt='w-4.5 cursor-pointer' />
                                    </>
                                ) : (
                                    <>
                                        <Image src={assets.copy_icon} alt='w-4. cursor-pointer' />
                                        <Image src={assets.regenerate_icon} alt='w-4 cursor-pointer' />
                                        <Image src={assets.like_icon} alt='w-4 cursor-pointer' />
                                        <Image src={assets.dislike_icon} alt='w-4 cursor-pointer' />
                                    </>
                                )
                            }
                        </div>
                    </div>
                    {
                        role === "user" ? (
                            <span className='text-white/90'>{content}</span>
                        ) : (
                            <>
                                <Image src={assets.logo_icon} alt=' ' className='h-9 w-9 p-1 border border-white/15 rounded-full' />
                                <div className='space-y-4 w-full overflow-sroll'>
                                    {content}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> */}

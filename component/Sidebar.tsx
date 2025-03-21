import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { useClerk , UserButton } from '@clerk/nextjs'
import { AppContext } from '@/context/AppContext'
import { User } from '@clerk/nextjs/server'
import ChatLabel from './ChatLabel'

const Sidebar = ({ expand, setExpand }: any) => {

  

    const {openSignIn} = useClerk();
    const value = useContext(AppContext)

   

    const user = value.user;

    
    return (
        <>
            {
                expand ? (
                    <div className='bg-[#202327] transition-all duration-1000 ease-in-out h-screen flex flex-col justify-between'>
  
                    {/* Top content */}
                    <div className='flex flex-col m-5 gap-8'>
                      <div className='flex gap-8 mt-2'>
                        <Image width={150} height={150} src={assets.logo_text} alt='' />
                        <div className='flex flex-col gap-8'>
                          <div className="relative group flex items-center">
                            <Image onClick={() => setExpand(!expand)}
                              src={assets.sidebar_icon}
                              alt=""
                              className="cursor-pointer"
                            />
                            <div className="z-100 whitespace-nowrap absolute top-[110%] ml-2 bg-black text-white text-sm px-2 py-1 rounded-e-md rounded-b-md opacity-0 group-hover:opacity-100 transition duration-300">
                              Open sidebar
                            </div>
                          </div>
                        </div>
                      </div>
                  
                      <div className='bg-[#4864E9] w-fit px-2 py-2 rounded-xl flex items-center justify-center gap-2'>
                        <Image src={assets.chat_icon} alt='' />
                        <p className='text-white font-light text-center'>New Chat</p>
                      </div>
                  
                      <div>
                        <p className='text-gray-400'>Recents</p>
                        {/* chatLabel */}
                        <ChatLabel />
                      </div>
                    </div>
                  
                    {/* Bottom content - moved to bottom */}
                    <div className='flex flex-col gap-2 mb-4'>
                      <div className='flex items-center gap-2 border border-[#4864E9] rounded-md p-2 mx-2'>
                        <Image  className='w-7' src={assets.phone_icon} alt='' />
                        <div className='text-gray-300 text-sm'>
                          Get App <span className='bg-[#4864E9] text-white rounded-full px-1 py-0.5 text-xs w-5 ml-0.5'>New</span>
                        </div>
                      </div>
                      <div onClick={user?null:openSignIn} className='flex items-center mx-2 p-2 text-gray-300 gap-2 text-sm'>
                        {
                            user ? <UserButton/> :  <Image className='w-7' src={assets.profile_icon} alt='' />
                        }
                      
                        <div>My Profile</div>
                      </div>
                    </div>
                  
                  </div>
                  
                ) :
                    (
                        <div className='bg-[#202327] transition-all duration-1000 ease-in-out'>
                        <div>
                            <div className='m-auto flex flex-col items-center gap-8 w-20 '>
                                <Image src={assets.logo_icon} alt="" className='w-10 mt-6' />
                                <div className='flex flex-col gap-8'>
                                    <div className="relative group flex items-center">
                                        <Image onClick={()=>setExpand(!expand)}
                                            src={assets.sidebar_icon}
                                            alt=""
                                            className="cursor-pointer hover:bg-gray-700 rounded-xl "
                                        />
                                        <div  className="z-100 whitespace-nowrap absolute -top-[100%]  ml-2 bg-black text-white text-sm px-2 py-1 rounded-e-md rounded-t-md opacity-0 group-hover:opacity-100 transition duration-300">
                                            Open sidebar
                                        </div>
                                    </div>
                                     <div className="relative group flex items-center">
                                        <Image onClick={()=>setExpand(!expand)}
                                            src={assets.chat_icon_dull} 
                                            alt=""
                                            className="cursor-pointer hover:bg-gray-700 rounded-xl "
                                        />
                                        <div  className="z-100 whitespace-nowrap absolute -top-[100%]  ml-2 bg-black text-white text-sm px-2 py-1 rounded-e-md rounded-t-md opacity-0 group-hover:opacity-100 transition duration-300">
                                            New Chat
                                        </div>
                                    </div>
                                   

                                    

                                </div>
                            </div>
                        </div>

                    </div>
                

            )
            }

        </>
    )
}

export default Sidebar

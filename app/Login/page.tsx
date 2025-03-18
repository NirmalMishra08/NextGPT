
"use client"
import React, { useEffect } from 'react'
import { signIn , useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'


const page = () => {
    const router = useRouter()
    const {data:session}=useSession()
    useEffect(()=>{
        if(session){
            router.push('/dashboard')
        }
    },[session,router])
    return (
        <div className='w-full h-screen'>
            <h1 className='text-2xl m-3 font-bold'>NextGPT</h1>
            <div className=' h-1/2 w-96 flex flex-col justify-center items-center gap-5 border-[#099372] border-2 mx-auto'>
                <h1 className='text-center text-2xl font-bold'>Welcome Back!</h1>
                <input className='border-[#099372] border-2 p-1 rounded-md w-72' type="text " placeholder='Email Address' />
                <button className='bg-[#099372] text-white m-2 p-3 w-56 rounded-md'>Continue</button>
                <br />
                <button onClick={()=>signIn("google")} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    <svg className="w-8 h-8 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd" />
                    </svg>
                    Sign in with Google
                </button>

            </div>
        </div>
    )
}

export default page
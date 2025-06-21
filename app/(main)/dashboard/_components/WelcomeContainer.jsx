"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
    const {user} = useUser();
  return (
      <div className='bg-white p-5 rounded-xl flex justify-between items-center border border-gray-200'>
        <div >
              <h1 className='text-xl font-bold'>Welcome Back , <span className='text-primary text-3xl'>{user?.name}</span></h1>
            <h2 className='text-gray-500'>AI-Driven Interviews , Hassel-Free Hiring</h2>
        </div>
        {user && <Image src={user?.picture} alt='userAvatar' height={40} width={40} className='rounded-full'/>}
    </div>
  )
}

export default WelcomeContainer
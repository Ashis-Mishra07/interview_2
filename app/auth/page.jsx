"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

function Login() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth`,
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };
  

  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <div className='flex flex-col items-center border rounded-2xl p-8 '>
        <Image src={'/logo.png'} alt='logo' width={400} height={200} className='w-[180px] ' />
        <div className='flex flex-col items-center'>
          <Image src={'/login.png'} alt='login' width={600} height={400} className='w-[400px] h-[250px] rounded-2xl' />
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AiCruiter</h2>
          <p className='text-gray-500 text-center'>Sign in With Google Authentication</p>
          <Button onClick={signInWithGoogle} className='mt-7 w-full cursor-pointer'> Login With Google </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
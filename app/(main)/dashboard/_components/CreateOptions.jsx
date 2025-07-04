import { FileSearch, Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
      <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'>
        <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
        <h2 className='font-bold'>Create New Interview</h2>
        <p className='text-gray-500'>Create AI Interviews and schedule then with Candidates</p>
      </Link>

      <Link href={'https://ai-pdf-maker.vercel.app/dashboard'} className='bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'>
        <FileSearch className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
        <h2 className='font-bold'>PDF Resume Analyzer</h2>
        <p className='text-gray-500'>Analyze candidate resumes and extract key information automatically</p>
      </Link>
    </div>
  )
}

export default CreateOptions
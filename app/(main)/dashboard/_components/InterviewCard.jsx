import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview, viewDetail = false }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;
    const copyLink = () => {

        navigator.clipboard.writeText(url);
        toast("Link copied to clipboard!");
    }

    const onSend = () => {
        window.location.href = `mailto:${interview?.userEmail}?subject=AiCruiter Interview Link & body=Please join the interview using the following link: ${url}`;
    }
    return (
        <div className='p-5 bg-white rounded-lg border'>
            <div className='flex items-center justify-between '>
                <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM YYYY')}</h2>
            </div>
            <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2 flex justify-between'>{interview?.duration}
                <span className='text-green-400 font-semibold'>{interview['interview-feedback']?.length} Candidates</span>
            </h2>

            {/* Only this part is styled as per your UI */}
            {!viewDetail ?
                <div className='flex w-full mt-5 border border-gray-300 rounded-md overflow-hidden'>
                    <Button onClick={copyLink} variant='ghost' className='w-1/2 justify-center rounded-none border-r border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition-shadow'>
                        <Copy className='w-4 h-4 mr-1 ' /> Copy Link
                    </Button>
                    <Button className='w-1/2 justify-center rounded-none cursor-pointer shadow-md hover:shadow-lg transition-shadow' onClick={onSend}>
                        <Send className='w-4 h-4 mr-1' /> Send
                    </Button>
                </div>
                :
                <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'} >
                    <Button className='mt-5 w-full cursor-pointer' variant='outline'> View Detail <ArrowRight /></Button>
                </Link>
            }
        </div>
    )
}

export default InterviewCard

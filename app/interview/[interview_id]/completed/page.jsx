import React from 'react';
import Image from 'next/image';
import { CheckCircle, Clock, Send } from 'lucide-react';

function InterviewComplete() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            {/* Check Icon and Heading */}
            <div className="flex flex-col items-center">
                <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h1 className="text-4xl font-bold mb-2 text-center">Interview Complete!</h1>
                <p className="text-gray-600 text-center mb-8">
                    Thank you for participating in the AI-driven interview with <span className="font-semibold">AIcruiter</span>
                </p>
            </div>

            {/* Main container with flex layout */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-18 w-full max-w-5xl mx-auto">
                {/* Left side - Illustration */}
                <div className="w-full md:w-1/2">
                    <div className="rounded-lg overflow-hidden">
                        <Image
                            src="/complete.png"
                            alt="Interview Illustration"
                            width={600}
                            height={400}
                            className="object-cover w-full"
                        />
                    </div>
                </div>

                {/* Right side - What's Next Section */}
                <div className="w-full my-auto md:w-1/2 flex flex-col items-center text-center justify-center">
                    <Send className="text-white w-15 h-15 mb-2 border border-primary bg-primary p-3 rounded-full" />
                    <h2 className="text-xl font-semibold mb-2">What's Next?</h2>
                    <p className="text-gray-600 max-w-md text-lg">
                        The recruiter will review your interview responses and will contact you soon regarding the next steps.
                    </p>
                    <p className='flex gap-3 mt-3 text-gray-400'>
                        <Clock className='text-gray-400' /> Response within 2-3 business days
                    </p>
                </div>


            </div>
        </div>
    );
}

export default InterviewComplete;

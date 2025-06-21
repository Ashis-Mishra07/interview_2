"use client";
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {
    const router = useRouter();
    const [step , setStep] = useState(1);
    const [formData, setFormData] = useState();
    const [interviewId , setInterviewId] = useState();

    const onHandleInputChange = (field , value) => {
        setFormData(prev=>({
            ...prev , 
            [field]: value
        }))  
    } 


  const onGoToNext = () =>{
    if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type){
      toast('Please fill all the required fields')
      return;
    }
    setStep(step+1);
  }

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step+1);
    toast.success('Interview created successfully');
  }

  return (
    <div className='mt-1 px-8 md:px-12 lg:px-32 xl:px-44'>
        <div className='flex gap-5 items-center'>
            <ArrowLeft onClick={()=> router.back()} className='cursor-pointer'/>
            <h2 className='font-bold text-2xl'> Create New Interview</h2>
        </div>
          <Progress value={step * 33.33} className='my-5'/>
      {step == 1 ? <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={() => onGoToNext()}/>:
          step==2?<QuestionList formData={formData} onCreateLink={(interview_id)=> onCreateLink(interview_id) }/>: 
          step==3?<InterviewLink  interview_id={interviewId} formData={formData}/>:null}
    </div>
  )
}

export default CreateInterview
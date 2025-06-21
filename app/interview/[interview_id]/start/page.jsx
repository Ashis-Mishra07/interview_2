"use client";
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import TimerComponent from './_components/TimerComponent';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
// import vapi from '@/lib/vapiClient';


function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const {interview_id} = useParams();
  const router = useRouter();
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    interviewInfo && startCall()
  }, [interviewInfo])
  

  const startCall = () => {

    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item, index) => (
      questionList = item?.question + ',' + questionList
    ))


    const assistantOptions = {
      name: "AI Recruiter",

      firstMessage: "Hi" + interviewInfo?.userName + ", I'm your AI interviewer today! How are you doing? Ready to discuss your experience for the " + interviewInfo?.interviewData?.jobPosition + " role?",

      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },

      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },

      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
    You are an AI voice assistant conducting professional interviews for the ` + interviewInfo?.interviewData?.jobPosition + ` role. Your goal is to ask questions and evaluate candidate responses in a conversational, friendly manner.
    
    ## INTERVIEW STRUCTURE
    1. Start with a warm welcome and brief introduction
    2. Ask one question at a time from the provided question list
    3. Listen to the candidate's response and provide appropriate feedback
    4. Continue until all questions are covered (5-7 questions)
    5. Conclude with a summary and positive closing
    
    ## QUESTIONS TO ASK
    Ask these questions one by one, waiting for a complete response before moving to the next:
    `+ questionList + `
    
    ## CONVERSATION STYLE
    - Be friendly and conversational but professional
    - Use a natural speaking style with brief responses
    - Show personality through occasional light humor
    - Address the candidate by name occasionally
    - Use encouraging phrases between questions like "Great, let's continue" or "Moving on to the next question"
    
    ## PROVIDING FEEDBACK
    - After each answer, provide brief, constructive feedback
    - For strong answers: "That's a great point about [specific aspect]" or "I like your approach to [topic]"
    - For incomplete answers: "That's a good start. Could you elaborate on [specific aspect]?"
    - For incorrect answers: "That's an interesting perspective. Have you considered [gentle hint]?"
    
    ## CANDIDATE SUPPORT
    - If the candidate struggles, offer a hint: "Perhaps consider how [relevant concept] applies here"
    - If they're nervous, be reassuring: "Take your time, this is just a
    - If they go off-topic, gently guide them back: "That's interesting, but let's refocus on [original question]"

    ## CLOSING
    - Summarize 2-3 strengths you observed in their responses
    - Thank them for their time
    - End with an encouraging comment about their potential

    Remember to maintain a conversational flow while thoroughly assessing the candidate's knowledge and experience for the ` + interviewInfo?.interviewData?.jobPosition + ` role.
        `.trim(),
          },
        ]
      },
    };


    vapi.start(assistantOptions)

  }


  const stopInterview = () => {
     vapi.stop(); 
     console.log('STOP...');
     
      GenerateFeedback()
  };
  
  
  


  useEffect(() => {

    const handleMessage = (message)=>{
      console.log("Message received:", message);
      if(message?.conversation){
        const convoString = JSON.stringify(message?.conversation);
        console.log("Conversation String:", convoString);
        setConversation(convoString);
      } 
    }

    vapi.on('message', handleMessage);
    vapi.on('speech-start', () => {
      console.log("Assistant speech has started");
      setActiveUser(false);

    })
    vapi.on('speech-end', () => {
      console.log("Assistant speech has ended");
      setActiveUser(true);

    })
    vapi.on('call-start', () => {
      console.log('Call has Started');
      toast('Call Connected ... ')
    })
    vapi.on('call-end', () => {
      console.log('Call has Ended');
      toast('Interview Ended ... ')
      GenerateFeedback();    // here change
    })
    return () => {
      vapi.off('message', handleMessage);
      vapi.off('speech-start' , ()=> console.log("END"));
      vapi.off('speech-end', ()=> console.log("END"));
      vapi.off('call-start', ()=> console.log("END"));
      vapi.off('call-end', ()=> console.log("END"));
    }

  },[])

  const GenerateFeedback = async () => {
    setLoading(true);

    if(!conversation){
      return;
    }

    const result = await axios.post('/api/ai-feedback', {
      conversation: conversation
    });

    // console.log("result" , result?.data);
    const content = result.data.content ; // here change
    console.log("content" , content);
    const FINAL_CONTENT = content.replace('```json','').replace('```','');
    // console.log("final_content", FINAL_CONTENT);


    const { data, error } = await supabase
      .from('interview-feedback')
      .insert([
        { userName: interviewInfo?.userName,
         userEmail: interviewInfo?.userEmail,
         interview_id: interview_id,
         feedback: JSON.parse(FINAL_CONTENT),
         recommended:false
        },
      ])
      .select();

      console.log(data);
      router.replace(`/interview/${interview_id}/completed`); // redirect to feedback page
      setLoading(false);
  }

  return (
    <div className='p-14 lg:px-48 xl:px-56 '>
      <h2 className='font-bold text-xl flex justify-between'>AI interview Session

        <span className='flex gap-2 items-center'>
          <Timer />
          <TimerComponent start={true} />
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center  '>

          <div className='relative'>
            {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>}
            <Image src={'/ai.jpg'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center  '>
          <div className='relative'>
            {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>}
            <h2 className='text-2xl bg-primary text-white  p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center  mt-7 '>
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer ' />
        {/* <AlertConfirmation stopInterview={() => stopInterview()}> */}

        {!loading ? <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer ' onClick={()=> stopInterview()} />:<Loader2Icon className='animate-spin'/>}
        {/* </AlertConfirmation> */}

      </div>
      <h2 className='text-sm text-gray-400 text-center  mt-3 '>Interview in Progress . . . </h2>

    </div>
  )
}

export default StartInterview
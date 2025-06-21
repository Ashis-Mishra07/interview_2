import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData , onCreateLink}) {

    const [loading, setloading] = useState(true);
    const [questionList, setQuestionList] = useState();
    const { user } = useUser();
    const [saveLoading , setSaveLoading] = useState(false);

    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])

    // filepath: f:\All Projects\interview_modified\my-app\app\(main)\dashboard\create-interview\_components\QuestionList.jsx
    const GenerateQuestionList = async () => {
        setloading(true);
        try {
            const result = await axios.post('/api/ai-model', {
                ...formData
            });

            console.log(result.data.content);
            const Content = result.data.content;

            // Extract the JSON content from between ```json and ```
            let jsonContent;
            if (Content.includes('```json')) {
                jsonContent = Content.split('```json')[1].split('```')[0].trim();
            } else {
                jsonContent = Content;
            }

            console.log("Extracted JSON:", jsonContent);
            const parsedData = JSON.parse(jsonContent);
            setQuestionList(parsedData?.interviewQuestions);
            setloading(false);
        }
        catch (e) {
            console.error("Error parsing JSON:", e);
            toast.error('Failed to parse questions. Please try again.');
            setloading(false);
        }
    }

    const onFinish = async () => {
        setSaveLoading(true);
        const interview_id = uuidv4();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    ...formData,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id
                },
            ])
            .select()

        setSaveLoading(false);
        onCreateLink(interview_id);

    }


    return (
        <div>
            {loading &&
                <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
                    <Loader2Icon className='animate-spin' />
                    <div>
                        <h2 className='font-medium'>Generating Interview Questions</h2>
                        <p className='text-primary'>Our AI is crafting personalised questions based on your job position .</p>
                    </div>

                </div>
            }
            {questionList?.length > 0 &&

                <div>
                    <QuestionListContainer questionList={questionList} />
                </div>
            }

            <div className='flex justify-end mt-10'>
                <Button onClick={() => onFinish()} disabled={saveLoading}>
                    {saveLoading && <Loader2 className='animate-spin '/>}
                    Create Interview Link & Finish
                </Button>
            </div>
        </div>
    )
}

export default QuestionList
import OpenAI from 'openai';

interface Options {
    threadId: string;
    asisstantId?: string; 
}


export const createRunUseCase = async(openai: OpenAI, {  threadId, asisstantId = 'asst_xCKrULgkYDOcAhAZFJLmOVr9' }: Options ) => {


    const run = await openai.beta.threads.runs.create( threadId,  {
        assistant_id: asisstantId
    });

    console.log(run);
    
    return run;
}
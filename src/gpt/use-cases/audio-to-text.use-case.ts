import OpenAI from "openai";
import * as fs from "fs";


interface Options {
    prompt?: string;
    audioFile: Express.Multer.File
}



export const audioToTextUseCase = async(openai: OpenAI,  { prompt, audioFile}: Options) => {


    console.log({ prompt, audioFile });

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream( audioFile.path ),
        prompt: prompt, //Mismo idioma del audio
        language: 'es',
        // response_format: 'vtt' // 'srt'
        response_format: 'verbose_json' 
    })

    console.log(response);
    

    return response;
    
}
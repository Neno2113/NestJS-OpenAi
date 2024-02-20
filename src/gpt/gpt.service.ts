import  * as path from 'path';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { audioToTextUseCase, imageGenerationUseCase, generateImageVariationUseCase, orthographyCheckUseCase, prosConstDicusserStreamUseCase, prosConstDicusserUseCase, textToAudioGetterUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { AudioToTextDto, ImageGenerationDto, OrthographyDto, ProConsDiscusserDto, TextToAudioDto, TranslateDto, imageVariationDto } from './dtos';
import OpenAI from 'openai';
import {  } from './use-cases/image-variation.use-case';

@Injectable()
export class GptService {

    private openai =  new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    async orthographyCheck(orthographyDto: OrthographyDto){
        return await orthographyCheckUseCase( this.openai ,{
            prompt: orthographyDto.prompt
        }); 
    }


    async prosConsDicusser({ prompt }: ProConsDiscusserDto){
        return await prosConstDicusserUseCase( this.openai, {
            prompt
        })
    }

    async prosConsDicusserStream({ prompt }: ProConsDiscusserDto){
        return await prosConstDicusserStreamUseCase( this.openai, {
            prompt
        })
    }


    async translate({ lang, prompt }: TranslateDto ) {
        return await translateUseCase( this.openai, { prompt, lang })
    }

    async textToAudio({ prompt, voice = 'nova' }: TextToAudioDto ) {
        return await textToAudioUseCase( this.openai, { prompt, voice })
    }


    async textToAudioGetter( fileName: string ) {
        return await textToAudioGetterUseCase( fileName )
    }

    async audioToText( audioFile: Express.Multer.File, { prompt }: AudioToTextDto ){
        return await audioToTextUseCase( this.openai, { audioFile, prompt })
    }


    async imageGeneration({ prompt, maskImage, originalImage }: ImageGenerationDto ){
        return await imageGenerationUseCase( this.openai, { prompt, maskImage, originalImage })
    }

    async getGeneratedImage( fileName: string ) {

        const filePath = path.resolve( './', './generated/images/', fileName);
        const exists = fs.existsSync( filePath);

        
        if( !exists ) {
            throw new NotFoundException("No se encontro el archivo");
        }

        return filePath;
    }


    async imageVariation({ baseImage }: imageVariationDto){
        return generateImageVariationUseCase( this.openai, { baseImage })
    }

}

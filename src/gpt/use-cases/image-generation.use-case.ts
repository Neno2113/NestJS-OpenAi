

import * as path from "path";
import * as fs from "fs";


import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImageAsPNG } from "src/helpers";


interface Options {
    prompt: string;
    maskImage?: string;
    originalImage?: string;
}



export const imageGenerationUseCase = async(openai: OpenAI,  { prompt, maskImage, originalImage }: Options) => {


    //TODO: verificar original image
    if(!originalImage || !maskImage) {
        const resp = await openai.images.generate({
            prompt: prompt,
            model: 'dall-e-2',
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'url',
    
        });
    
        console.log(resp);
    
        //Todo: guardar la imagen en FS
        const fileName = await downloadImageAsPNG( resp.data[0].url );
        const url = `${process.env.SERVER_URL}/gpt/image-generation/${ fileName }`
    
    
        return {
            url: url,
            openUIUrl: resp.data[0].url,
            revised_prompt: resp.data[0].revised_prompt
        }

    }
    
    const pngImagePath = await downloadImageAsPNG(originalImage, true);
    const maskPath = await downloadBase64ImageAsPng( maskImage, true);

    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    })

    const fileName = await downloadImageAsPNG( response.data[0].url );
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${ fileName }`


    return {
        url: url,
        openUIUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
    }
    
}
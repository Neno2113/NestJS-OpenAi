import * as fs from 'fs';
import OpenAI from "openai";
import { downloadImageAsPNG } from "src/helpers";


interface Options {
    baseImage: string;
}


export const generateImageVariationUseCase = async(openai: OpenAI, { baseImage }: Options) => {

    const pngImagePath = await downloadImageAsPNG(baseImage, true);
    
    const resp = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream( pngImagePath ),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    });

     
    const fileName = await downloadImageAsPNG( resp.data[0].url );
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${ fileName }`

    return {
        url: url,
        openUIUrl: resp.data[0].url,
        revised_prompt: resp.data[0].revised_prompt
    }
    

}
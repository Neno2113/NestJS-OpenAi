import OpenAI from "openai";

interface Options {
    prompt
}



export const translateUseCase = async (openai: OpenAI, { prompt, lang }) => {

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                    Traduce el siguiente texto al idioma ${lang}:${ prompt }

                ` 
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        // max_tokens: 15000
    });

    console.log(completion);
    // const jsonResp = JSON.parse( completion.choices[0].message.content );

    return {
        message: completion.choices[0].message.content
    }

}
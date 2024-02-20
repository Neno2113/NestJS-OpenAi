import OpenAI from "openai";



interface Options {
    prompt: string;
}



export const orthographyCheckUseCase = async( openai: OpenAI, options: Options ) => {


    const { prompt } = options


    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                    Te seran proveidos textos en español con posibles errores ortograficosy gramaticales, 
                    Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
                    Debes de responser en formato JSON, tu tarea es corregirlos y retornar informacion, soluciones,
                    tambien debes de dar un porcentaje de acierto por el usuario,

                    Si no hay errores, debes de retornar un mensaje de felicitaciones.

                    Ejemplo de salida:
                    {
                        userScore: number,
                        errors: string[], // ['error -> solucion']
                        message: string, // Usa emojis y texto para felicitar el usuario

                    }

                ` 
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        max_tokens: 500
    });

    console.log(completion);
    const jsonResp = JSON.parse( completion.choices[0].message.content );

    return jsonResp;


}
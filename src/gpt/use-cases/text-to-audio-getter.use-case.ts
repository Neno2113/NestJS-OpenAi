import * as path from "path";




export const textToAudioGetterUseCase = async (  fileName: string ) => {

    const folderPath = path.resolve( __dirname, `../../../generated/audios/${ fileName}.mp3`)

    return folderPath

}
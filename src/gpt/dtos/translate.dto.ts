import { IsString } from "class-validator";




export class TranslateDto {

    @IsString()
    readonly prompt

    @IsString()
    readonly lang 


}
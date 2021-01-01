import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class GoogleUser {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    lastName?: string;

    @IsString()
    picture?: string;

}
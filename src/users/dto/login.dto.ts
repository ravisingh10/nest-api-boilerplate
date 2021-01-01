import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string;
}
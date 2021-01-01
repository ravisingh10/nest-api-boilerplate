import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    firstname: string;

    @IsOptional()
    @IsString()
    lastname?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    confirmPassword: string;

}
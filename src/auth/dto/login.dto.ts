import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDTO {


    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter a valid email address"})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;


}
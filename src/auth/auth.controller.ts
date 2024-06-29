import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }


    @Post('/signup')
    async signUp(@Body()
    signUpDto: SignUpDTO
    ): Promise<{ token: string }> {
        return await this.authService.signUp(signUpDto)

    }

    @Post('/login')
    async logn(@Body()
    loginDto: LoginDTO
    ): Promise<User> {
        return await this.authService.login(loginDto)

    }
}

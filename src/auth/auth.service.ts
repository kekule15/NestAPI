import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDTO: SignUpDTO): Promise<{token: string}> {
        const {name, email, password} = signUpDTO

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token =  this.jwtService.sign( {id:  user._id})

        return { token }
    }

    async login(loginDto: LoginDTO): Promise<User>{
        const {email, password} = loginDto

        const user = await this.userModel.findOne({email})

        if (!user) {
            throw new UnauthorizedException("Invalid email or No User found")
        }
        const isPasswordMatched = await bcrypt.compare(password, (await user).password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid password")
        }

       //  const token =  this.jwtService.sign( {id: (await user)._id})

        return user
    }
}

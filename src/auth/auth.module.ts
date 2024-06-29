import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>("JWT_SECRETE"),
          signOptions: {
            expiresIn: config.get<string | number>("JWT_EXPIRE")
          }
        }
      }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])

  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }

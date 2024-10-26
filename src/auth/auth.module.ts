import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as process from "node:process";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt-strategy";
import {ProfileController} from "../profile/profile.controller";


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JVT_SECRET,
      signOptions: { expiresIn: '1d' }, // Установка времени действия токена
    }),
    UserModule,PassportModule,
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, UserService, LocalStrategy , JwtStrategy],
})
export class AuthModule {}

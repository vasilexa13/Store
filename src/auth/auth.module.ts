import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getDb } from '../database/db';
import * as process from "node:process";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";


@Module({
  imports: [
      //  надо вынести JWT из AUTH.MODULE
    JwtModule.register({
      secret: process.env.JVT_SECRET,
      // secret: process.env.JVT_SECRET,
      signOptions: { expiresIn: '30d' }, // Установка времени действия токена
    }),
    UserModule,PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}

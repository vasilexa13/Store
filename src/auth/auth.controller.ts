import {Controller, Post, Body, HttpException, HttpStatus, UseGuards, Request, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserDto} from "../user/user.dto";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {request} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto:UserDto) {
        // Проверяем существует ли уже пользователь
        const existingEmail = await this.authService.validateUser(dto.email );
        if (existingEmail) {
            throw new HttpException(`User with ${dto.email} already exists.`, HttpStatus.CONFLICT);
        }

        // Регистрация нового пользователя
        const newUser = await this.authService.register(dto);
        if (newUser) {
            // ВЫДАЮ TOKEN
            const token =  await this.authService.generateAccessToken(dto)
            const refreshToken = await this.authService.generateRefreshToken(newUser._id.toString())
            return {token , refreshToken};
        } else {
            throw new HttpException('User NOT created', HttpStatus.INTERNAL_SERVER_ERROR);        }
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() dto:UserDto) {
        const existingUser = await this.authService.checkUser(dto.email, dto.password);

        if (existingUser) {
            const accessToken = await this.authService.generateAccessToken(dto);
            const refreshToken = await this.authService.generateRefreshToken(existingUser._id.toString())

            // await
            await this.authService.saveToken(existingUser._id.toString(), refreshToken.refreshToken );

            return {accessToken, refreshToken};
        } else {
            throw new HttpException("WRONG email or password WRONG ", HttpStatus.UNAUTHORIZED);
        }
    }


    // ПУТЬ КОТОРЫЙ ЗАЩИЩАЕМ JWT_GUARD
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}

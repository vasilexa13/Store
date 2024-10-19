import {Controller, Post, Body, HttpException, HttpStatus, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ObjectId} from "mongodb";
import {UserDto} from "../user/user.dto";
import {LocalAuthGuard} from "./local-auth.guard";
import {request} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto:UserDto) {
        // Проверяем существует ли уже пользователь
        const existingEmail = await this.authService.validateUser(dto.email );
        // if (existingEmail) {
        //     throw new HttpException(`User with ${dto.email} already exists.`, HttpStatus.CONFLICT);
        // }
        console.log(dto.email)

        // Регистрация нового пользователя
        const newUser = await this.authService.register(dto);
        if (newUser) {
            return { message: `User id ${new ObjectId()} created successfully.` };// ВЫДАЮ TOKEN
        } else {
            throw new HttpException('User NOT created', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    // async login(@Request() req) {
    //
    //     return req.user;
    // }
    async login(@Body() dto:UserDto) {
        const existingUser = await this.authService.checkUser(dto.email, dto.password);
        if (existingUser) {
            return this.authService.generateToken(existingUser)
            // return { message: `COME IN ${dto.email}  Email and password is correct.` };// ВЫДАЮ TOKEN
        } else {
            throw new HttpException("WRONG email or password WRONG ", HttpStatus.UNAUTHORIZED);
        }
    }

}

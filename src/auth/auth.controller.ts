import {Controller, Post, Body, HttpException, HttpStatus, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ObjectId} from "mongodb";
import {UserDto} from "../user/user.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}



    @Post('register')
    async register(@Body() dto:UserDto) {
        // Проверяем существует ли уже пользователь
        const existingEmail = await this.authService.validateUser(dto.email , dto.password);
        // if (existingEmail) {
        //     throw new HttpException(`User with ${dto.email} already exists.`, HttpStatus.CONFLICT);
        // }
        console.log(dto.email)

        // Регистрация нового пользователя
        const newUser = await this.authService.register(dto);
        if (newUser) {
            return { message: `User id ${new ObjectId()} created successfully.` };
        } else {
            throw new HttpException('User NOT created', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
        return req.user;
    }

}

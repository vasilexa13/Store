import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ObjectId} from "mongodb";
import {UserDto} from "../user/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Post('login')
    // async login(@Body() body: { username: string; password: string }) {
    //     const user = await this.authService.validateUser(body.username, body.password);
    //     if (!user) {
    //         throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    //     }
    //     return this.authService.login(user);
    // }

    @Post('register')
    async register(@Body() dto:UserDto) {
        // Проверяем существует ли уже пользователь
        const existingEmail = await this.authService.validateUser(dto.email);
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
}

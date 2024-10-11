import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        // Проверяем существует ли уже пользователь
        const existingUser = await this.authService.validateUser(body.username);
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        // Регистрация нового пользователя
        const newUser = await this.authService.register(body.username, body.password);
        if (newUser) {
            return { message: 'User created successfully.' };
        } else {
            throw new HttpException('User NOT created', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Убедитесь, что путь правильный
import { getDb } from '../database/db'; // Убедитесь, что у вас есть правильная функция для подключения к БД

@Module({
  imports: [
    JwtModule.register({
      secret: 'cookie', // Замените на ваш секрет
      signOptions: { expiresIn: '1000s' }, // Установите время действия токена
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}

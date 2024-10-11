import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getDb } from '../database/db';


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

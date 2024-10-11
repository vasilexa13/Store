import { Module } from '@nestjs/common';
import {AppController,} from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {AuthService} from "./auth/auth.service";
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [ AppController],//ApiController
  providers: [AppService]
})
export class AppModule {}

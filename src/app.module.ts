import { Module } from '@nestjs/common';
import {AppController,} from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {AuthService} from "./auth/auth.service";
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { ProductsModule } from './products/products.module';
import {ProductsController} from "./products/products.controller";
import {ProductsService} from "./products/products.service";

@Module({
  imports: [UserModule, AuthModule, ProductsModule],
  controllers: [ AppController, ProfileController, ProductsController],
  providers: [AppService , ProductsService],
})
export class AppModule {}

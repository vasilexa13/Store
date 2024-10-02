// import {Controller, Get, Param} from '@nestjs/common';
// import { UserService } from './user.service';
// import {getDb} from "../database/db";
// import {ObjectId} from "mongodb";
//
// @Controller('users')
// export class UserController {
//   private db: any;
//   private number: any;
//   constructor(private readonly userService: UserService) {
//   }
//
//     @Get()
//   async getUsers(){
//       return await this.userService.getUsers();
//   }
//
//   @Get(':id')
//   async getUser(@Param('id') id: string) {
//       return await this.userService.getUserById(id)
//      }
//
// }
import {Controller, Delete, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}

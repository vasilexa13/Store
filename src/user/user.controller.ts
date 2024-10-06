import {Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import {UserDto} from "./user.dto";


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

@Post()
@UsePipes(new ValidationPipe())
  async createUser(@Body() dto: UserDto) {
    console.log(`Recived DTO:` , dto)
    return this.userService.createDto(dto)
  }

  @Patch(':id')
  async updateDto(@Param('id') id: string, @Body() dto) {
    return this.userService.updateDto(id, dto);
  }

}

import {Controller, Delete, Get, Param, Post, Redirect, Req, Res} from '@nestjs/common';
import { Db } from 'mongodb'; // Импортируем тип для db
import { getDb } from './database/db'; // Путь к функции получения DB
import { NotFoundException, InternalServerErrorException  } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import {response} from "express";

@Controller('users')
export class AppController {
  private db: Db;

  constructor() {
    this.db = getDb(); // Инициализация базы данных
  }

  @Get()
  async getUsers() {
    const users = await this.db.collection('users').find({}).toArray(); // Получаем всех пользователей
    return users; // Возвращаем пользователей
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userId = new ObjectId(id); // Преобразуем строку в ObjectId
      const user = await this.db.collection('users').findOne({_id: userId});
      return user
     }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userId = new ObjectId(id); // Преобразуем строку в ObjectId
    const user = await this.db.collection('users').deleteOne({_id: userId});
    return user
  }

// @Post (:id)
//   async createUser()

  }//закрытие контроллера






//   @Post(":id")
// async createUser(@Param("id") id:string){
//   const userId = new ObjectId(id);
//
// }






// @Controller('users')
// export class UsersController {
//   private db: Db;
//
//   constructor() {
//     this.db = getDb();
//   }
//
//   @Get(':email')
//   async getUserByEmail(@Param('email') email: string, @Res() res: Response) {
//     try {
//       const user = await this.db.collection('users').findOne({ email: { $eq: email } });
//
//       if (!user) {
//         return res.status(404).json({ message: 'Пользователь не найден' });
//       }
//
//       return res.status(200).json(user);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
//     }
//   }
// }


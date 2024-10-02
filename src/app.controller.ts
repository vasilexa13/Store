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
    // this.db = getDb(); // Инициализация базы данных
  }
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   const userId = new ObjectId(id); // Преобразуем строку в ObjectId
  //   const user = await this.db.collection('users').deleteOne({_id: userId});
  //   return user
  // }


  getHello() {
    return undefined;
  }
}//закрытие контроллера



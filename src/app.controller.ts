import {Controller, Delete, Get, Param, Post, Redirect, Req, Res} from '@nestjs/common';
import { Db } from 'mongodb'; // Импортируем тип для db

@Controller('users')
export class AppController {
  private db: Db;

  constructor() {
  }

  getHello() {
    return undefined;
  }
}//закрытие контроллера



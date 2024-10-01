import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {connectToDb , getDb} from "./database/db";

let db;

connectToDb((err)=>{
    if(!err){
        bootstrap();  // ЗАПУСК ПРИЛОЖЕНИЯ!!!
        db = getDb();
        err? console.log(err):console.log(`listen port 3000`)
    }else {
         console.log(`Error connecting to DB: ${err}`);
    }
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}


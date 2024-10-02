// import { Injectable } from '@nestjs/common';
// import {getDb} from "../database/db";
// import {ObjectId} from "mongodb";
//
// @Injectable()
// export class UserService {
//     private db: any;
//
//     async getUsers() { this.db = getDb()
//         const users = await this.db.collection('users').find({}).toArray(); // Получаем всех пользователей
//         return users; // Возвращаем пользователей
//     }
//
//     async getUserById(id: number) {this.db = getDb()
//         const userId = new ObjectId(id); // Преобразуем строку в ObjectId
//         const user = await this.db.collection('users').findOne({_id: userId});
//     }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { getDb } from "../database/db";
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {
    private db: any;

    async getUsers() {
        this.db = getDb();
        const users = await this.db.collection('users').find({}).toArray();
        return users;
    }

    async getUserById(id: string) {
        this.db = getDb();
        try {
            const userId = new ObjectId(id); // Преобразуем строку в ObjectId
            const user = await this.db.collection('users').findOne({ _id: userId });
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user; // Возвращаем найденного пользователя
        } catch (error) {
            throw new NotFoundException(`User with ID ${id} is not valid or does not exist.`);
        }
    }

    async deleteUserById(id: string) {
        this.db = getDb();
        try {
            const userId = new ObjectId(id); // Преобразуем строку в ObjectId
            const result = await this.db.collection('users').deleteOne({ _id: userId });

            if (result.deletedCount === 0) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return { message: `User with ID ${id} successfully deleted` }; // Возвращаем сообщение об успешном удалении
        } catch (error) {
            throw new NotFoundException(`User with ID ${id} is not valid or does not exist.`);
        }
    }
}


import { Injectable, NotFoundException } from '@nestjs/common';
import { getDb } from "../database/db";
import { ObjectId } from "mongodb";
import { UserDto } from "./user.dto";


@Injectable()
export class UserService {
    private db: any;

    private async initializeDb() {
        this.db = await getDb();
    }

    async getUsers() {
        await this.initializeDb();
        const users = await this.db.collection('users').find({}).toArray();
        return users;
    }

    async getUserById(id: string) {
        await this.initializeDb();
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
        await this.initializeDb();
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

    async createDto(dto: UserDto){
        await this.initializeDb();
        const existingUser = await this.db.collection('users').findOne({ email: dto.email });
        if (existingUser) {
            console.log(`User with this email ${dto.email} already exists`);
        }

        const userData = ({
            email: dto.email,
            token: dto.token,//будет JWT token
            dataCreate: dto.dataCreate,//будет время создания
            password: dto.password,//будет хэш пароля
            accessLevel: dto.accessLevel// пока незнаю откуда брать
        })
        try{
            const result = await this.db.collection('users').insertOne(userData);
            return result;
        }catch (error){
            throw new Error('Database error occurred while creating user');
        }
    }

    async updateDto(id, dto) {
        await this.initializeDb();
        const userId = new ObjectId(id); // Преобразуем строку в ObjectId

        const existUser = await this.db.collection('users').find(userId);

        if (!existUser) {
            throw new Error(`User with this id ${id} does not exist`);
        }

        const updatedUserData = {
            email: dto.email,
            token: dto.token, // будет JWT token
            dataCreate: dto.dataCreate, // будет время создания
            password: dto.password, // будет хэш пароля
            accessLevel: dto.accessLevel // пока незнаю откуда брать
        };

        try {
            // const result = await this.db.collection("users").updateOne({ _id: existUser._id }, { $set: updatedUserData });
            const result = await this.db.collection("users").updateOne({ _id: userId }, { $set: updatedUserData });
            return result;
        } catch (error) {
            throw new Error("Database Error occurred while updating user");
        }
    }
}
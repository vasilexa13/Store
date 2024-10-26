import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { getDb } from "../database/db";
import {UserDto} from "../user/user.dto";
import {ObjectId} from "mongodb";
import {IUser} from "../types/types";
import {request} from "express";

class User {
    _id: string;
    dto: any;
}

@Injectable()
export class AuthService {
    findOne(userName: string) {
        throw new Error('Method not implemented.');
    }
    private db: any;
    private id: string;

    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {
        this.db = getDb();
    }
    async validateUser(email:string): Promise<any> {
        const user = await this.db.collection('users').findOne({email: email});
        if (user){
            throw new Error(`User with email: ${email} already exist`);
        }else {
            return user;
        }
    }

    async checkUser(email:string, password:string) {
        const user = await this.db.collection('users').findOne({email: email});
        if (!user){
            throw new BadRequestException(` EMAIL ${email} incorrect`.toUpperCase());
        }

        const passwordIsMatch  = await bcrypt.compare(password,user.password );

        if (user&&passwordIsMatch){
            return user;
        }else {
            throw new BadRequestException(` User with email ${email} not found or password is incorrect`);
        }
    }

    async register(dto:UserDto) {
    // async register(dto:UserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = {
            _id: new ObjectId(this.id),
            email: dto.email,
            password: hashedPassword,
            userName: dto.userName,
            accessLevel: dto.accessLevel||"guest",
            dataCreate: new Date().toISOString()
        };
        const user = await this.db.collection("users").insertOne(newUser);
        //
        // const token = this.jwtService.sign(newUser.email);
        // return {user : User, token : token};

        return (newUser);
    }

    async generateAccessToken(user: IUser) {

        const { email, _id  } = user;
        return {
            _id,
            email,// ВЫДАЮ EMAIL ПРОСТО ДЛЯ ВИЗУАЛИЗАЦИИ
                token: this.jwtService.sign({
                    id:_id,
                    email:email,
            })
        }
    }

    async generateRefreshToken(_id:string) {
        const id   = _id;
        return {
            id:id,
            refreshToken: this.jwtService.sign({
                id:id,
            }, { expiresIn: '15d' })
        } ;
    }

    async saveToken(userId: string, token: string) {
        try {
            // Обновляем токен пользователя, если он существует, или создаем нового пользователя
            const result = await this.db.collection('users').updateOne(
                { _id: new ObjectId(userId.toString()) },
                { $set: { refreshToken: token } }, // Сохраняем refreshToken
                { upsert: true } // Если документа с указанным id нет, создаем новый
            );

            return result;
        } catch (error) {
            console.error("Error saving token:", error);
            throw new Error("Error saving token");
        }
    }

    async validateToken(userId: string, token: string) {
        const user = await this.db.collection('users').findOne({_id: new ObjectId(userId.toString())});
        console.log(user._id);
    }
}

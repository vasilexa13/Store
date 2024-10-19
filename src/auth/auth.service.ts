import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { getDb } from "../database/db";
import {UserDto} from "../user/user.dto";
import {ObjectId} from "mongodb";
import {IUser} from "../types/types";

class User {
}

@Injectable()
export class AuthService {
    findOne(userName: string) {
        throw new Error('Method not implemented.');
    }
    private db: any;
    // userModel: any;

    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {
        this.db = getDb();
    }
    //..РАБОЧАЯ ВЕРСИЯ
    async validateUser(email:string): Promise<any> {
        const user = await this.db.collection('users').findOne({email: email});
        if (user){
            throw new HttpException(`User with email: ${email} already exist`, HttpStatus.UNAUTHORIZED);
        }else {
            return user;
        }
    }

    // ТЕСТ ВАЛИДАЦИИ С ПАРОЛЕМ и email пользователя
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

    async register(dto:UserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = {
            email: dto.email,
            password: hashedPassword,
            userName: dto.userName,
            accessLevel: dto.accessLevel||"guest",
            dataCreate: new Date().toISOString()
        };
        // ДЛЯ JWT ТОКЕНА
        // const payload = { username: dto.email, sub: new ObjectId() };
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
        return this.db.collection('users').insertOne(newUser);
    }

    async generateToken(user: IUser) {
        const { email, id   } = user;
        return {
            id,
            email,
                token: this.jwtService.sign({
                id:id,
                email:email,
            })
        }
    }

}

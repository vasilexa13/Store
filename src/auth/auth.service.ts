import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { getDb } from "../database/db";
import {UserDto} from "../user/user.dto";

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
        private jwtService: JwtService
    ) {
        this.db = getDb();
    }
    // //..РАБОЧАЯ ВЕРСИЯ
    async validateUser(email:string): Promise<any> {
        const user = await this.db.collection('users').findOne({email: email});
        if (user){
            throw new HttpException(`User with email: ${email} already exist`, HttpStatus.UNAUTHORIZED);
        }else {
            return user;
        }
    }

    // // ТЕСТ НОВОЙ ВАЛИДАЦИИ С ПАРОЛЕМ
    // async validateUser(email:string, password:string) {
    //     const user = await this.db.collection('users').findOne({email: email});
    //     const passwordIsMatch  = await bcrypt.compare(password,user.password );
    //
    //     if (user&&passwordIsMatch){
    //         return user;
    //     }else {
    //         throw new BadRequestException(`User with email ${email} not found or password is incorrect`);
    //     }
    // }

    //  async login(user: any) {
    //     const userId = new ObjectId(user.id);
    //     const payload = { username: user.username, sub: userId };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }

    async register(dto:UserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = {
            email: dto.email,
            password: hashedPassword,
            userName: dto.userName,
            accessLevel: dto.accessLevel||"guest",
            dataCreate: new Date().toISOString()
        };
        return this.db.collection('users').insertOne(newUser);
    }
}

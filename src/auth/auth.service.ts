import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { getDb } from "../database/db";
import {ObjectId} from "mongodb";

class User {
}

@Injectable()
export class AuthService {
    private db: any;
    userModel: any;

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
        this.db = getDb();
    }


    async validateUser(username: string, password?: string): Promise<any> {
        const user = await this.db.collection('users').findOne(username);
        console.log('Found user:', user);

        if (user && (password!=null || password != undefined)) {
            const match = await bcrypt.compare(password, user.password);//НАДО РАЗОБРАТЬСЯ
            console.log('Password match:', match);
            if (match) {
                return user;
            }
        }
        return null;
    }

     async login(user: any) {
        const userId = new ObjectId(user.id);
        const payload = { username: user.username, sub: userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, password: hashedPassword });
        return newUser.save();
    }
}

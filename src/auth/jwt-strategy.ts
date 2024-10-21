import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {IUser} from "../types/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // ДЛЯ ЯСТНОСТИ ЧТО JWT НЕ ИСТЁК
            secretOrKey: process.env.JVT_SECRET,
        });
    }

    async validate(user:IUser) {
        return {id: user._id , email: user.email};
    }
}
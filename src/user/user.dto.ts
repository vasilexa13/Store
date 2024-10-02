import {IsString, IsNumber , IsEmail ,  IsDate, Min,    Max, IsIn} from 'class-validator';

export class UserDto {
    @IsEmail()
    @Min(5)
    @Max(20)
    email: string;

    @IsString()
    // @Min(10)
    token: string;

    @IsDate()
    dataCreate?:Date;

    @IsString()
    @Min(5)
    @Max(20)
    password: string;

    @IsIn(['admin', 'guest'],{message:'accessLevel must be either "admin" or "user"'})
    accessLevel: string;
}
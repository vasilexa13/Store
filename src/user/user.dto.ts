import {
    IsString,
    IsNumber,
    IsEmail,
    IsDate,
    MinLength,
    MaxLength,
    IsIn,
    IsOptional,
    IsNotEmpty
} from 'class-validator';

export class UserDto {

    @IsEmail({}, { message: 'Invalid email format' })
    @MaxLength(50, { message: 'Email must be at most 50 characters long' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Token is required' })
    @MinLength(10, { message: 'Token must be at least 10 characters long' })
    token: string;

    @IsOptional()
    // @IsDate({ message: 'dataCreate must be a valid date' })
    dataCreate?: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'userName is required' })
    @MinLength(3, { message: 'userName must be at least 3 characters long' })
    userName: string;

    @IsIn(['admin', 'guest'], { message: 'accessLevel must be either "admin" or "guest"' })
    @IsOptional()
    accessLevel?: string;// для admin использовать другой путь регистрации


    _id?:string
}
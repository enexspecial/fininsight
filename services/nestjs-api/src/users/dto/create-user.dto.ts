import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John'
    })
    @IsString()
    @IsNotEmpty()
    firstName?: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe'
    })
    @IsString()
    @IsNotEmpty()
    lastName?: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'securePassword123'
    })
    @IsString()
    @IsNotEmpty()
    password?: string;
}

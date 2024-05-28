import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  Matches, 
  MinLength 
} from 'class-validator';

export class CreateUserAccountDto {
  @ApiProperty({ description: 'User email, which will be used as username' })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password must be at least 8 characters long, include at least one symbol, one uppercase letter, one lowercase letter, and one number',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])/,
  { message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
  password: string;
}

import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { CreateUserAccountDto } from './dto/create-user-accountdto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up-user')
  @ApiOkResponse({
    description: 'Sign up new user with username and password',
  })
  async signUpUser(@Body() registerBody: CreateUserAccountDto) {
    return await this.usersService.createUserAccount(registerBody);
  }
}

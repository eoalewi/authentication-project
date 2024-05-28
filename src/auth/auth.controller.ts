import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from './decorators/user.decorator';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  @ApiOkResponse({
    description: 'Log in user',
  })
  async loginUser(
    @AuthUser() user,
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() loginDto: LoginDto,
  ) {
    const result = await this.authService.login(req.user);
    return result;
  }
}

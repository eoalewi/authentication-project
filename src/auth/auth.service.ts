import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { appConstant } from 'src/common/constants/app.constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user: User =
      await this.usersService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Incorrect password');
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      general: user.general || {},
    };

    // Make refresh token
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: appConstant.TOKENS.REFRESH.JWT_DURATION,
    });

    // Generate access token
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { CreateUserAccountDto } from './dto/create-user-accountdto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUserAccount(
    createUserDto: CreateUserAccountDto,
  ): Promise<User> {
    const { username, password} =
      createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User entity
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    // Save the User entity to get its ID
    const savedUser = await this.usersRepository.save(newUser);

    return savedUser;
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}

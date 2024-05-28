import { PartialType } from '@nestjs/swagger';
import { CreateUserAccountDto } from './create-user-accountdto';

export class UpdateUserDto extends PartialType(CreateUserAccountDto) {}

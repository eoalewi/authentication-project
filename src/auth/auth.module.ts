import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: parseInt(
            process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentConstant } from './common/constants/env.constant';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // host: 'localhost',
        host: configService.get(EnvironmentConstant.DATABASE_HOST),
        port: configService.get(EnvironmentConstant.DATABASE_PORT),
        username: configService.get(EnvironmentConstant.DATABASE_USERNAME),
        password: configService.get(EnvironmentConstant.DATABASE_PASSWORD),
        database: configService.get(EnvironmentConstant.DATABASE_NAME),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
        extra: {
          authPlugins: {
            mysql_native_password: () => require('mysql2/lib/auth_plugins').mysql_native_password,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

//Registra Controller y Service en el módulo de usuarios
@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}

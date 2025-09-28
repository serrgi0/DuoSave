import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Get()
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
import { Injectable } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
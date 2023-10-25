import { Controller, Get, Post, Body, Put, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/loginDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  findAll(
    @Query("page") page: number = 1, @Query("limit") limit: number = 5, @Query("keyword") keyword: string,
  ) {
    try {
      const users = this.usersService.findAll({ page, limit, keyword });
      return users;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const user = this.usersService.findOne(+id);
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    try {
      const user = this.usersService.update(+id, updateUserDto);
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const user = this.usersService.remove(+id);
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }


  @Post("login")
  login(@Body() loginDto: loginDto) {
    return this.usersService.login(loginDto);
  }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }
}

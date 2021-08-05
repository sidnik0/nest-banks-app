import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    this.usersService.create(createUserDto);

    console.log(`Create user`);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<void> {
    this.usersService.getById(id);

    console.log(`Get user by id: ${id}`);
  }

  @Get()
  async get(): Promise<void> {
    this.usersService.get();

    console.log(`Get all users`);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    this.usersService.updateById(id, updateUserDto);

    console.log(`Update user by id: ${id}`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    this.usersService.deleteById(id);

    console.log(`Delete user by id: ${id}`);
  }
}

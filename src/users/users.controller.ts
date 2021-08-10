import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserInterface } from './interfaces/user.interface';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserInterface> {
    console.log(`Get user by id: ${id}`);

    const user = this.usersService.getById(id);

    return user || null;
  }

  @Get()
  async get(): Promise<Map<string, UserInterface>> {
    console.log(`Get all users`);

    const users = await this.usersService.get();

    return users.size ? users : null;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    console.log(`Update user by id: ${id}`);

    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    console.log(`Delete user by id: ${id}`);

    return this.usersService.deleteById(id);
  }
}

import { Controller, Body, Post, Get, Param, Delete, HttpException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async signUp(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ): Promise<any> {
    try {
      return this.userService.inerstUser(userEmail, userPassword);
    } catch (error) {
      throw new HttpException("User already exists", 404);
    }
  }

  @Get()
  async getUsers(): Promise<any> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('/:email')
  async getUser(@Param('email') email: string): Promise<any> {
    const user = await this.userService.getUser(email);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    const user = await this.userService.deleteUser(id);
    return 'User has been deleted';
  }
}

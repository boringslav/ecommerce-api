import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post('/new')
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }
}

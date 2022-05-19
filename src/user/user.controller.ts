import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('/new')
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }
}

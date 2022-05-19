import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto';

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

  @Delete('/delete/:id')
  deleteById(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch('/edit/:id')
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(body, id);
  }
}

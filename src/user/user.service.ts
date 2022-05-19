import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private repositoryService: RepositoryService) {}

  async getAllUsers() {
    try {
      const users = await this.repositoryService.user.findMany();
      return users;
    } catch (e) {
      throw e;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.repositoryService.user.findFirst({
        where: { id },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async createUser(body: UserDto) {
    try {
      const { email, password, firstName, lastName, role } = body;
      const user = await this.repositoryService.user.create({
        data: { email, hash: password, firstName, lastName, role },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async updateUser(body: UpdateUserDto, id: string) {
    try {
      const user = await this.repositoryService.user.update({
        where: { id },
        data: { ...body },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.repositoryService.user.delete({
        where: { id },
        select: {
          id: true,
        },
      });
      return deletedUser;
    } catch (e) {
      throw e;
    }
  }
}

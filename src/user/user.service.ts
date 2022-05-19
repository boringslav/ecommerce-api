import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { UserDto } from './dto';

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
}

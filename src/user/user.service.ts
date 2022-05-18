import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private repositoryService: RepositoryService) {}

  createUser(body: UserDto) {
    try {
      const { email, password, firstName, lastName, role } = body;
      const user = this.repositoryService.user.create({
        data: { email, hash: password, firstName, lastName, role },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }
}

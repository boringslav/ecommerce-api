import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { UpdateUserDto, UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

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
      if (!user) {
        throw new NotFoundException('User doesn`t exist!');
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  async createUser(body: UserDto) {
    try {
      const {
        email,
        password: hash,
        firstName,
        lastName,
        role,
        city,
        zip,
        country,
        address,
      } = body;
      const user = await this.repositoryService.user.create({
        data: {
          email,
          hash,
          firstName,
          lastName,
          role,
          city,
          zip,
          country,
          address,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw e;
      }
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
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw e;
      }
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

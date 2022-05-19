import { AppModule } from '../../../app.module';
import { Test } from '@nestjs/testing';
import { RepositoryService } from '../../../repository/repository.service';
import { UserService } from '../../user.service';
import { UserDto, UserRoleDto } from '../../dto';

describe('User Service Integration', () => {
  let repository: RepositoryService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    repository = moduleRef.get(RepositoryService);
    userService = moduleRef.get(UserService);
  });

  beforeEach(async () => {
    await repository.cleanDatabase();
  });

  describe('Create an User', () => {
    it('Should create an User only with email and password', async () => {
      const user: UserDto = {
        email: 'borislav.stoyanov@musala.com',
        password: '123123',
      };

      const savedUser = await userService.createUser(user);
      expect(savedUser.role).toBe('USER');
      expect(savedUser.email).toBe(user.email);
      expect(savedUser.hash).toBeDefined();
    });
    it('Should create an User with all properties and ADMIN role', async () => {
      const user: UserDto = {
        email: 'borislav.stoyanov@musala.com',
        password: '123123',
        firstName: 'Borislav',
        lastName: 'Stoyanov',
        role: UserRoleDto.ADMIN,
      };

      const savedUser = await userService.createUser(user);
      expect(savedUser.email).toBe(user.email);
      expect(savedUser.hash).toBeDefined();
      expect(savedUser.role).toBe(user.role);
      expect(savedUser.firstName).toBe(user.firstName);
      expect(savedUser.lastName).toBe(user.lastName);
    });
    it.todo('Should throw an error if email is taken');
  });
});

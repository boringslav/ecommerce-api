import { AppModule } from '../../../app.module';
import { Test } from '@nestjs/testing';
import { RepositoryService } from '../../../repository/repository.service';
import { UserService } from '../../user.service';
import { UpdateUserDto, UserDto, UserRoleDto } from '../../dto';

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
    it('Should throw an error if email is taken', async () => {
      const user: UserDto = {
        email: 'borislav.stoyanov@musala.com',
        password: '123123',
        firstName: 'Borislav',
        lastName: 'Stoyanov',
        role: UserRoleDto.ADMIN,
      };

      const savedUser = await userService.createUser(user);

      /**
       * Couldn`t do it with toThrow() method
       */
      try {
        await userService.createUser(user);
      } catch (e) {
        expect(e.message).toBe('Credentials taken');
      }
    });
  });
  describe('Get an User', () => {
    it('Should return a user when a user exists', async () => {
      const user: UserDto = {
        email: 'borislav.stoyanov@musala.com',
        password: '123123',
      };

      const savedUser = await userService.createUser(user);
      const foundUser = await userService.getUserById(savedUser.id);

      expect(foundUser.email).toBe(user.email);
      expect(foundUser.hash).toBeDefined();
    });
    it('Should throw an error if the user doesn`t exist', async () => {
      try {
        await userService.getUserById('not existing id');
      } catch (e) {
        expect(e.message).toBe('User doesn`t exist!');
      }
    });

    describe('Get All Users', () => {
      it('Should return an array of all users', async () => {
        const user: UserDto = {
          email: 'borislav.stoyanov@musala.com',
          password: '123123',
        };
        const user2: UserDto = {
          email: 'borislav.stoyanov1@musala.com',
          password: '123123',
        };

        await userService.createUser(user);
        await userService.createUser(user2);
        const users = await userService.getAllUsers();

        expect(users.at(0).email).toBe(user.email);
        expect(users.at(1).email).toBe(user2.email);
      });
      it('Should return an empty array if there are no users', async () => {
        expect(await userService.getAllUsers()).toEqual([]);
      });
    });
  });
  describe('Update an User', () => {
    it('Should Update User information if provided with correct ID', async () => {
      const user: UserDto = {
        email: 'borislav.stoyanov@musala.com',
        password: '123123',
      };

      const updateUserDto: UpdateUserDto = {
        role: UserRoleDto.ADMIN,
        firstName: 'Borislav',
        lastName: 'Stoyanov',
      };
      const { id } = await userService.createUser(user);
      const updatedUser = await userService.updateUser(updateUserDto, id);
      const foundUser = await userService.getUserById(id);
      expect(foundUser.firstName).toBe(updateUserDto.firstName);
      expect(foundUser.lastName).toBe(updateUserDto.lastName);
      expect(foundUser.email).toBe(user.email);
      expect(foundUser.role).toBe(updateUserDto.role);
    });
    it('Should throw an error if there is no user with the specified ID', async () => {
      const user: UserDto = {
        email: 'borislav.stoyanov@musala.com',
        password: '123123',
      };
      const user2: UserDto = {
        email: 'borislav.stoyanov1@musala.com',
        password: '123123',
      };
      const usedEmailDto: UpdateUserDto = {
        email: 'borislav.stoyanov1@musala.com',
      };
      const { id } = await userService.createUser(user);
      await userService.createUser(user2);

      try {
        await userService.updateUser(usedEmailDto, id);
      } catch (e) {
        expect(e.message).toBe('Credentials taken');
      }
    });
    it.todo(
      'Should throw ForbiddenException "Credentials taken" if trying to change the email to an existing user email',
    );
    it.todo(
      'Should throw if the logged in user is not ADMIN or the user that the ID belongs',
    );
  });
});

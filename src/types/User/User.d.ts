import { UserRoleDto } from '../../user/dto';

export interface User {
  id: string;
  email: string;
  hash: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;

  address?: string;
  city?: string;
  country?: string;
  zip?: string;

  createdAt: Date;
  updatedAt?: Date;
  role: UserRoleDto;
}

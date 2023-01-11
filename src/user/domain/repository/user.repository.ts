import { User } from './entity/user.entity';

export interface UserRepository {
  add: (user: User) => Promise<User>;
  getByEmail: (email: string) => Promise<User | null>;
  deleteByEmail: (email: string) => Promise<boolean>;
}

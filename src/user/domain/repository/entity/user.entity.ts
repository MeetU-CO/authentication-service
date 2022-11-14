import { Notification } from './notification.entity';
import { Roles } from './roles.entity';

export interface User {
  email: string;
  password?: string;
  notifications?: Notification[];
  roles?: Roles[];
  name: string;
  isVerified: boolean;
}

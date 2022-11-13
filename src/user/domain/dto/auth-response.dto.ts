import { Roles } from '../repository/entity/roles.entity';
import { Notification } from '../repository/entity/notification.entity';

export interface AuthResponseDTO {
  email: string;
  name: string;
  token?: string;
  password?: undefined | null;
  roles?: Roles[];
  notification?: Notification[];
}

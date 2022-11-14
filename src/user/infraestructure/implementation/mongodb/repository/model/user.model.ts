import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Notification } from 'src/user/domain/repository/entity/notification.entity';
import { Roles } from 'src/user/domain/repository/entity/roles.entity';
import { User } from 'src/user/domain/repository/entity/user.entity';

export type UserDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel implements User {
  @Prop()
  isVerified: boolean;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop()
  password?: string;
  @Prop()
  notifications?: Notification[];
  @Prop()
  roles?: Roles[];
  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

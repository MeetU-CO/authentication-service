import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/domain/repository/entity/user.entity';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserDocument, UserModel } from './model/user.model';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}
  async add(user: User): Promise<User> {
    return this.userModel.create(user);
  }
  async getByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: { $eq: email } }).exec();
  }
}

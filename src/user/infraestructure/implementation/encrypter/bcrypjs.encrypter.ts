import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordEncrypter } from 'src/user/domain/utils/encrypter';

@Injectable()
export class Encrypter implements PasswordEncrypter {
  async encrypt(password: string): Promise<string> {
    const hash: string = await bcrypt.hash(password, 12);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const areEqual: boolean = await bcrypt.compare(password, hash);
    return areEqual;
  }
}

import { Encrypter } from './bcrypjs.encrypter';
import * as bcrypt from 'bcrypt';

describe('Encrypter', () => {
  jest
    .spyOn(bcrypt, 'hash')
    .mockImplementation(async () => 'passwordEncrypted');

  jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

  const encrypter: Encrypter = new Encrypter();
  const password = 'passwordExample';
  const passwordEncrypted = 'passwordEncrypted';

  test('Encrypter encrypt should return hash when encrypting password', async () => {
    expect(await encrypter.encrypt(password)).toBe(passwordEncrypted);
  });

  test('Encrypter compare should return true', async () => {
    expect(await encrypter.compare(password, passwordEncrypted)).toBe(true);
  });
});

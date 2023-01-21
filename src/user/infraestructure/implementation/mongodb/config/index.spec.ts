import { ConfigService } from '@nestjs/config';
import { MissingEnvVariablesException } from '../../../../domain/exception/missing-env-variables.exception';
import { MongooseConfigService } from './';
import { MongoUrlBuilder } from './mongo-url-builder.config';

describe('MongooseConfigService', () => {
  let configService: ConfigService;
  let mongooseConfigService: MongooseConfigService;
  jest.mock('./mongo-url-builder.config', () =>
    jest.fn().mockImplementation(
      () =>
        ({
          setUsername: jest.fn().mockReturnValue('username'),
          setPassword: jest.fn().mockReturnValue('password'),
          setHostname: jest.fn().mockReturnValue('hostname'),
          setPort: jest.fn().mockReturnValue('port'),
          setDatabaseName: jest.fn().mockReturnValue('databaseName'),
          build: jest
            .fn()
            .mockReturnValue(
              'mongodb+srv://username:password@hostname:port/database',
            ),
        } as any),
    ),
  ) as any;

  beforeEach(() => {
    configService = { get: jest.fn() } as any;
  });

  describe('setup', () => {
    it('should set up the MongooseModuleOptions using a connection string', () => {
      (configService.get as jest.Mock).mockReturnValue({
        urlConnection: 'mongodb+srv://connection-string',
      });
      mongooseConfigService = new MongooseConfigService(configService);
      mongooseConfigService.setup();
      expect(mongooseConfigService.getMongooseOptions()).toEqual({
        uri: 'mongodb+srv://connection-string',
      });
    });

    describe('createMongooseOptions', () => {
      it('should return the MongooseModuleOptions', () => {
        (configService.get as jest.Mock).mockReturnValue({
          urlConnection: 'mongodb+srv://connection-string',
        });
        mongooseConfigService = new MongooseConfigService(configService);
        expect(mongooseConfigService.createMongooseOptions()).toEqual({
          uri: 'mongodb+srv://connection-string',
        });
      });
    });

    it('should set up the MongooseModuleOptions using the MongoUrlBuilder', () => {
      (configService.get as jest.Mock).mockReturnValue({
        rootUsername: 'username',
        rootPassword: 'password',
        hostname: 'hostname',
        port: 'port',
        databaseName: 'database',
      });

      mongooseConfigService = new MongooseConfigService(configService);
      mongooseConfigService.setup();
      expect(mongooseConfigService.getMongooseOptions()).toEqual({
        uri: 'mongodb+srv://username:password@hostname:port/database',
      });
    });

    it('should throw MissingEnvVariablesException when any of the properties is missing', () => {
      (configService.get as jest.Mock).mockReturnValue({
        rootUsername: 'username',
        rootPassword: 'password',
        hostname: 'hostname',
      });
      mongooseConfigService = new MongooseConfigService(configService);
      expect(() => mongooseConfigService.setup()).toThrowError(
        MissingEnvVariablesException,
      );
    });
  });
});

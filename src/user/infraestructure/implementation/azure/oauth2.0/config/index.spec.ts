import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MicrosoftOauthConfigService } from '.';
import { MissingEnvVariablesException } from '../../../../../domain/exception/missing-env-variables.exception';

describe('MicrosoftOauthConfigService', () => {
  let configService: ConfigService;
  let microsoftOauthConfigService: MicrosoftOauthConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should throw MissingEnvVariablesException when any of the properties is missing', () => {
    jest.spyOn(configService, 'get').mockReturnValue(undefined);
    expect(() => new MicrosoftOauthConfigService(configService)).toThrowError(
      MissingEnvVariablesException,
    );
  });

  it('should return the oauthOptions if all properties exist', () => {
    jest
      .spyOn(configService, 'get')
      .mockReturnValueOnce('clientId')
      .mockReturnValueOnce('clientSecret')
      .mockReturnValue(1000);

    microsoftOauthConfigService = new MicrosoftOauthConfigService(
      configService,
    );
    const result = microsoftOauthConfigService.getOauthOptions();
    expect(result).toEqual({
      clientID: 'clientId',
      clientSecret: 'clientSecret',
      callbackURL: 'http://localhost:1000/auth/microsoft/redirect',
      scope: ['user.read'],
    });
  });

  it('should return the oauth options', () => {
    const result = microsoftOauthConfigService.getOauthOptions();
    expect(result).toEqual({
      clientID: 'clientId',
      clientSecret: 'clientSecret',
      callbackURL: 'http://localhost:1000/auth/microsoft/redirect',
      scope: ['user.read'],
    });
  });
});

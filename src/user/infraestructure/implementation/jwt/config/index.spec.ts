import { ConfigService } from '@nestjs/config';
import { MissingEnvVariablesException } from '../../../../domain/exception/missing-env-variables.exception';
import { JwtConfigService } from './';

describe('JwtConfigService', () => {
  let jwtConfigService: JwtConfigService;
  let configService: ConfigService;

  beforeEach(() => {
    configService = { get: jest.fn() } as any;
    jwtConfigService = new JwtConfigService(configService);
  });

  describe('createJwtOptions', () => {
    it('should return the JWT options', () => {
      (configService.get as jest.Mock).mockReturnValueOnce('secret-value');
      const jwtOptions = jwtConfigService.createJwtOptions();
      expect(jwtOptions).toEqual({
        secret: 'secret-value',
        signOptions: { expiresIn: '30m' },
      });
    });

    it('should throw an exception if secret is not defined', () => {
      (configService.get as jest.Mock).mockReturnValueOnce(undefined);
      expect(() => jwtConfigService.createJwtOptions()).toThrow(
        MissingEnvVariablesException,
      );
    });
  });

  describe('getJwtOptions', () => {
    it('should return the JWT options', () => {
      (configService.get as jest.Mock).mockReturnValueOnce('secret-value');
      jwtConfigService.createJwtOptions();
      const jwtOptions = jwtConfigService.getJwtOptions();
      expect(jwtOptions).toEqual({
        secret: 'secret-value',
        signOptions: { expiresIn: '30m' },
      });
    });
  });
});

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { MissingEnvVariablesException } from '../../../../domain/exception/missing-env-variables.exception';
import throwExpression from '../../../../domain/utils/throw-expression';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  public static jwtOptions: JwtModuleOptions;
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    JwtConfigService.jwtOptions = {
      secretOrPrivateKey:
        this.configService.get<string>('secret') ??
        throwExpression(new MissingEnvVariablesException('secret of jwt')),
      signOptions: { expiresIn: '30m' },
    };
    return JwtConfigService.jwtOptions;
  }

  getJwtOptions(): JwtModuleOptions {
    return JwtConfigService.jwtOptions;
  }
}

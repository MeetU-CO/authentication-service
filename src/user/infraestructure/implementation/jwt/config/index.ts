import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { MissingEnvVariablesException } from '../../../../domain/exception/missing-env-variables.exception';
import throwExpression from '../../../../domain/utils/throw-expression';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  private static jwtOptions: JwtModuleOptions;
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    JwtConfigService.jwtOptions = {
      secret:
        this.configService.get<string>('jwtOptions.secret') ??
        throwExpression(new MissingEnvVariablesException('secret of jwt')),
      signOptions: { expiresIn: '30m' },
    };
    return this.getJwtOptions();
  }

  getJwtOptions(): JwtModuleOptions {
    return JwtConfigService.jwtOptions;
  }
}

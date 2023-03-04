import { registerAs } from '@nestjs/config';
import { MissingEnvVariablesException } from '../../../domain/exception/missing-env-variables.exception';
import throwExpression from '../../../domain/utils/throw-expression';

const serverEnvConfig = () => ({
  port: process.env.PORT ?? '3001',
  frontEndUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  grafanaLoggerApiKey:
    process.env.GRAFANA_LOGGING_API_KEY ??
    throwExpression(
      new MissingEnvVariablesException('Grafana Logging API Key'),
    ),
});

export default registerAs('server', serverEnvConfig);

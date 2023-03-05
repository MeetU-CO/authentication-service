import { MissingEnvVariablesException } from '../../../domain/exception/missing-env-variables.exception';
import serverEnvConfig from './env.config';

describe('serverEnvConfig', () => {
  const defaultPort = '3001';
  const providedPort = '9999';
  const apiKey = 'apiKey';
  test('serverEnvConfig when PORT in env not exists then setup port with 3001', () => {
    process.env.GRAFANA_LOGGING_API_KEY = apiKey;
    delete process.env.PORT;
    expect(serverEnvConfig().port).toBe(defaultPort);
  });

  test('serverEnvConfig when PORT in env exists then setup port with the variable provided', () => {
    process.env.GRAFANA_LOGGING_API_KEY = apiKey;
    process.env.PORT = providedPort;
    expect(serverEnvConfig().port).toBe(providedPort);
  });

  test('serverEnvConfig when GRAFABA_LOGGING_API_KEY not exists then throw MissingEnvVariablesException', () => {
    delete process.env.GRAFANA_LOGGING_API_KEY;
    process.env.PORT = providedPort;
    expect(() => serverEnvConfig()).toThrow(MissingEnvVariablesException);
  });
});

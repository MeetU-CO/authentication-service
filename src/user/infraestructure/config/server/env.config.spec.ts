import serverEnvConfig from './env.config';

describe('serverEnvConfig', () => {
  const defaultPort = '3001';
  const providedPort = '9999';
  test('serverEnvConfig when PORT in env not exists then setup port with 3001', () => {
    delete process.env.PORT;
    expect(serverEnvConfig().port).toBe(defaultPort);
  });

  test('serverEnvConfig when PORT in env exists then setup port with the variable provided', () => {
    process.env.PORT = providedPort;
    expect(serverEnvConfig().port).toBe(providedPort);
  });
});

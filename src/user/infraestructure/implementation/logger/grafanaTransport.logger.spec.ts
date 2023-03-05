import { GrafanaTransport } from './grafanaTransport.logger';

describe('grafanaTransport', () => {
  const apiKey = 'apiKey';
  const grafanaTransport = new GrafanaTransport(apiKey);
  const expectedTransport = {
    target: 'pino-loki',
    options: {
      batching: true,
      interval: 5,
      host: 'https://logs-prod-017.grafana.net',
      basicAuth: {
        username: '369173',
        password: apiKey,
      },
    },
  };
  it('createTransport should return the object transport', () => {
    expect(grafanaTransport.createTransport()).toStrictEqual(expectedTransport);
  });
});

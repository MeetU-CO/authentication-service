import { TransportLogger } from '../../../domain/utils/logger';
export class GrafanaTransport implements TransportLogger {
  constructor(private apiKey: string) {}
  createTransport() {
    return {
      target: 'pino-loki',
      options: {
        batching: true,
        interval: 5,
        host: 'https://logs-prod-017.grafana.net',
        basicAuth: {
          username: '369173',
          password: this.apiKey,
        },
      },
    };
  }
}

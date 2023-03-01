import { registerAs } from '@nestjs/config';

const serverEnvConfig = () => ({
  port: process.env.PORT ?? '3001',
  frontEndUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  grafanaLoggerApiKey: process.env.GRAFANA_LOGGING_API_KEY,
});

export default registerAs('server', serverEnvConfig);

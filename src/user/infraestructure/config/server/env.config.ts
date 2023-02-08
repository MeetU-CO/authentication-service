import { registerAs } from '@nestjs/config';

const serverEnvConfig = () => ({
  port: process.env.PORT ?? '3001',
  frontEndUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
});

export default registerAs('server', serverEnvConfig);

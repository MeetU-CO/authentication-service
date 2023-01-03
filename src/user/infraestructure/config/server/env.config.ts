import { registerAs } from '@nestjs/config';

const serverEnvConfig = () => ({
  port: process.env.PORT ?? 3001,
});

export default registerAs('server', serverEnvConfig);

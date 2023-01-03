import { registerAs } from '@nestjs/config';

const jwtEnvConfig = () => ({
  secret: process.env.JWT_SECRET,
});

export default registerAs('jwtOptions', jwtEnvConfig);

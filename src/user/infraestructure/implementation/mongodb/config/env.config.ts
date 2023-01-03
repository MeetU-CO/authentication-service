import { registerAs } from '@nestjs/config';
import { MongoConnectionParameters } from './parameters.config';

const mongoEnvConfig = (): Partial<MongoConnectionParameters> => ({
  urlConnection: process.env.MONGO_INITDB_URL_CONNECTION,
  databaseName: process.env.MONGO_INITDB_DATABASE,
  rootUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
  rootPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
  port: process.env.MONGO_INITDB_PORT,
  hostname: process.env.MONGO_INITDB_HOSTNAME,
});

export default registerAs('mongoose', mongoEnvConfig);

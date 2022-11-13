import { MissingEnvVariablesException } from 'src/user/domain/exception/missing-env-variables.exception';

interface MongoConnectionParameters {
  databaseName: string;
  rootUsername: string;
  rootPassword: string;
  port: string;
  hostname: string;
}

const urlConnectionBuilder = (
  mongoConnectionParameters: Partial<MongoConnectionParameters>,
): string => {
  if (
    !mongoConnectionParameters.rootUsername ||
    !mongoConnectionParameters.rootPassword ||
    !mongoConnectionParameters.hostname ||
    !mongoConnectionParameters.port ||
    !mongoConnectionParameters.databaseName
  ) {
    throw new MissingEnvVariablesException();
  }
  return `mongodb://${mongoConnectionParameters.rootUsername}:${mongoConnectionParameters.rootPassword}@${mongoConnectionParameters.hostname}:${mongoConnectionParameters.port}/${mongoConnectionParameters.databaseName}?authSource=admin`;
};

const setup = (): string => {
  const urlConnection: string | undefined =
    process.env.MONGO_INITDB_URL_CONNECTION;
  if (urlConnection) {
    return urlConnection;
  }
  const mongoParameters: Partial<MongoConnectionParameters> = {
    databaseName: process.env.MONGO_INITDB_DATABASE,
    rootUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
    rootPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
    port: process.env.MONGO_INITDB_PORT,
    hostname: process.env.MONGO_INITDB_HOSTNAME,
  };
  return urlConnectionBuilder(mongoParameters);
};

export const urlConnection: string = setup();

import mongoEnvConfig from './env.config';

describe('mongoEnvConfig', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return the MongoDB connection parameters', () => {
    process.env.MONGO_INITDB_URL_CONNECTION = 'mongodb://localhost:27017';
    process.env.MONGO_INITDB_DATABASE = 'test-db';
    process.env.MONGO_INITDB_ROOT_USERNAME = 'root';
    process.env.MONGO_INITDB_ROOT_PASSWORD = 'password';
    process.env.MONGO_INITDB_PORT = '27017';
    process.env.MONGO_INITDB_HOSTNAME = 'localhost';

    const config = mongoEnvConfig();
    expect(config).toEqual({
      urlConnection: 'mongodb://localhost:27017',
      databaseName: 'test-db',
      rootUsername: 'root',
      rootPassword: 'password',
      port: '27017',
      hostname: 'localhost',
    });
  });
});

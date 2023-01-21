import { MongoUrlBuilder } from './mongo-url-builder.config';

describe('MongoUrlBuilder', () => {
  let mongoUrlBuilder: MongoUrlBuilder;

  beforeEach(() => {
    mongoUrlBuilder = new MongoUrlBuilder();
  });

  describe('reset', () => {
    it('should reset the URI to its initial value', () => {
      mongoUrlBuilder.setUsername('username');
      mongoUrlBuilder.reset();
      expect(mongoUrlBuilder.build()).toEqual('mongodb+srv://');
    });
  });

  describe('setUsername', () => {
    it('should set the username in the URI', () => {
      mongoUrlBuilder.setUsername('username');
      expect(mongoUrlBuilder.build()).toEqual('mongodb+srv://username');
    });
  });

  describe('setPassword', () => {
    it('should set the password in the URI', () => {
      mongoUrlBuilder.setPassword('password');
      expect(mongoUrlBuilder.build()).toEqual('mongodb+srv://:password');
    });
  });

  describe('setHostname', () => {
    it('should set the hostname in the URI', () => {
      mongoUrlBuilder.setHostname('localhost');
      expect(mongoUrlBuilder.build()).toEqual('mongodb+srv://@localhost');
    });
  });

  describe('setPort', () => {
    it('should set the port in the MongoDB connection string', () => {
      mongoUrlBuilder.setPort('27017');
      expect(mongoUrlBuilder.build()).toEqual('mongodb+srv://:27017');
    });
  });

  describe('setDatabaseName', () => {
    it('should set the database name in the MongoDB connection string', () => {
      mongoUrlBuilder.setDatabaseName('test-db');
      expect(mongoUrlBuilder.build()).toEqual('mongodb+srv:///test-db');
    });
  });

  describe('build', () => {
    it('should return the MongoDB connection string', () => {
      mongoUrlBuilder
        .setUsername('root')
        .setPassword('password')
        .setHostname('localhost')
        .setPort('27017')
        .setDatabaseName('test-db');
      expect(mongoUrlBuilder.build()).toEqual(
        'mongodb+srv://root:password@localhost:27017/test-db',
      );
    });
  });
});

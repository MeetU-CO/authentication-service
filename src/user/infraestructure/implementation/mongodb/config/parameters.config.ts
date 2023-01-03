export interface MongoConnectionParameters {
  databaseName: string;
  rootUsername: string;
  rootPassword: string;
  port: string;
  hostname: string;
  urlConnection?: string;
}

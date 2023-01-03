export class MongoUrlBuilder {
  private uri: string;
  constructor() {
    this.reset();
  }

  reset() {
    this.uri = 'mongodb+srv://';
    return this;
  }

  setUsername(username: string) {
    this.uri = this.uri + username;
    return this;
  }

  setPassword(password: string) {
    this.uri = this.uri + ':' + password;
    return this;
  }

  setHostname(hostname: string) {
    this.uri = this.uri + '@' + hostname;
    return this;
  }

  setPort(port: string) {
    this.uri = this.uri + ':' + port;
    return this;
  }

  setDatabaseName(databaseName: string) {
    this.uri = this.uri + '/' + databaseName;
    return this;
  }

  build() {
    return this.uri;
  }
}

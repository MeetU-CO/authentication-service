import { ConsoleTransport } from './consoleTransport.logger';

describe('consoleTransport', () => {
  const consoleTransport = new ConsoleTransport();
  const expectedTransport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'UTC:mm/dd/yyy, h:MM:ss TT Z',
    },
  };
  it('createTransport should return the object transport', () => {
    expect(consoleTransport.createTransport()).toStrictEqual(expectedTransport);
  });
});

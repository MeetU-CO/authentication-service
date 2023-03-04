import { TransportLogger } from '../../../domain/utils/logger';
export class ConsoleTransport implements TransportLogger {
  createTranport() {
    return {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'UTC:mm/dd/yyy, h:MM:ss TT Z',
      },
    };
  }
}

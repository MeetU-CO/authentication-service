export interface TransportLogger {
  createTransport: () => Record<'target' | 'options', any>;
}

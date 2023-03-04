export interface TransportLogger {
  createTranport: () => Record<'target' | 'options', any>;
}

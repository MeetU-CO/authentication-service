import throwExpression from '.';

describe('throwExpression', () => {
  it('should throw an exception when is invoked', () => {
    expect(() => throwExpression(new Error('EXAMPLE'))).toThrowError(Error);
  });
});

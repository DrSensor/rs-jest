declare interface RsJest extends jest.Transformer {
  createTransformer(options?: any): jest.Transformer;
}

export = RsJest;

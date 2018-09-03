import { getCacheKey } from './utils';
import process from './preprocess';

const createTransformer = (options?: any): jest.Transformer => {
  // options are always empty, must be the older jest API giving options here
  return {
    canInstrument: true,
    getCacheKey,
    process,
    createTransformer: undefined as any
  };
};

module.exports = createTransformer();
module.exports.createTransformer = createTransformer;

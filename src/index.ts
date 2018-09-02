import getCacheKey from './utils/get-cache-key';
import preprocess from './preprocess';

const createTransformer = (options?: any): jest.Transformer => {
  // options are always empty, must be the older jest API giving options here
  return {
    canInstrument: true,
    getCacheKey,
    process: preprocess,
    createTransformer: undefined as any
  };
};

module.exports = createTransformer();
module.exports.createTransformer = createTransformer;

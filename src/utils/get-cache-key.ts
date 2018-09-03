import { relative } from 'path';
import { readFileSync } from 'fs';

/** This function are copied and modified from
 * {@link https://github.com/kulshekhar/ts-jest/blob/master/src/utils/get-cache-key.ts}.
 * And yes, it's difficult to deduce what parameter is stand for because
 * Jest not documenting on how to write Jest transformer/preprocessor.
 * Also, I don't even know what Jest context function I can use 😞
 * Wondering if this function can be used for something usefull 🤔
 */
export default function getCacheKey(
  fileData: string,
  filePath: string,
  jestConfigString: string,
  { instrument, rootDir }: JestCacheKeyOptions
): string {
  const jestConfig: jest.ProjectConfig = JSON.parse(jestConfigString) || {};
  delete jestConfig.cacheDirectory;
  delete jestConfig.name;
  // jest creates hash under the hoods
  return JSON.stringify([
    readFileSync(__filename),
    fileData,
    relative(rootDir, filePath),
    jestConfig,
    /// TODO: use and modify https://github.com/facebook/jest/blob/8e72341c6df9af92a5e95e4a5784923baf5245de/packages/babel-jest/src/index.js#L35-L79
    /// or just return JSON.stringify(toml2json(Cargo.toml))❓ 🤔
    /* getBabelRC(filePath) */ '',
    instrument
  ]);
}

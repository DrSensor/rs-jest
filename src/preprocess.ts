import { readFileSync } from 'fs';
import { cargoCommand, findSrcDir, handleCargo } from './cargo';

import { flushLogs, logOnce, execPermissive } from './utils';
import { defaultConfig, getConfigFrom } from './options';
import wrap from './wrapper';

//#region helper
const is = (path: string) => ({ rustFile: /\.rs$/.test(path) });
const polyfill = {
  // TODO: convert to Jest context if JestAPI began to provide it
  webpackLoader: {
    emitWarning: (warning: string | Error) => console.warn(warning.toString()),
    emitError: (error: string | Error) => console.error(error.toString()),
    addDependency: (file: string) => (file ? undefined : undefined)
  }
};
//#endregion

/** Main function that do the transformation from Rust code to WebAssembly
 * @param {unused} src the source code, I guess 🤔
 * @param filePath fullpaht of the file that going to be transformed
 * @param jestConfig jest configuration
 * @param {unused} transformOptions.instrument a proxy for collectCoverage {@link https://github.com/kulshekhar/ts-jest/issues/201#issuecomment-300572902}
 * @returns transformed code with sourcemap or just the code
 *
 * However, it's unfortunate that jest will not support Promises for asynchronous transformation 😭
 * @see https://github.com/facebook/jest/issues/5556#issuecomment-365526603
 */
export default function preprocess(
  src: string,
  filePath: jest.Path,
  jestConfig: jest.ProjectConfig,
  transformOptions?: jest.TransformOptions
): jest.TransformedSource | string {
  const rsJestConfig = getConfigFrom(jestConfig);
  logOnce("defined globals['rs-jest']: ", rsJestConfig);

  const options = Object.assign(defaultConfig, rsJestConfig) as RsJestConfig; // diff and merge with predefined config
  logOnce("final globals['rs-jest']: ", options);

  const cmd = cargoCommand(options.target, options.release);
  logOnce('cargoCommand: ', cmd);

  /** In `ts-jest` codebase, it says:
   * ---
   * We can potentially do this faster by using the language service.
   * @see https://github.com/TypeStrong/ts-node/blob/ad6183a1b99df4f535903e7b51ce99571221c95b/src/index.ts#L307
   * ---
   * @todo I wonder if it can be applied here 🤔
   */

  if (!is(filePath).rustFile) throw new Error(`${filePath} is not Rust file`);
  if (!options.target.includes('wasm')) {
    throw new Error(`For now, this transformer only support wasm related target compile!
      For more info see https://kripken.github.io/blog/binaryen/2018/04/18/rust-emscripten.html
    `);
  }

  const cwd = findSrcDir(filePath);
  if (!cwd) {
    throw new Error('No Cargo.toml file found in any parent directory.');
  }

  const result = execPermissive(cmd, cwd);

  const { wasmFile } = handleCargo(polyfill.webpackLoader, result);
  if (!wasmFile) throw new Error('No wasm file produced as build output');

  const wasmCode = readFileSync(wasmFile);
  flushLogs();

  switch (options.export) {
    case 'buffer':
      return wrap(wasmCode).asBuffer;
    case 'instance':
      return wrap(wasmCode).asWebAssembly.Instance;
    case 'module':
      return wrap(wasmCode).asWebAssembly.Module;
    case 'async':
      return wrap(wasmCode).promiseWebAssembly.Both;
    case 'async-instance':
      return wrap(wasmCode).promiseWebAssembly.Instance;
    case 'async-module':
      return wrap(wasmCode).promiseWebAssembly.Module;
  }
}

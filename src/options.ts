import { Constant } from './utils';

/** Default options for rs-jest */
export const defaultConfig: RsJestConfig = {
  target: 'wasm32-unknown-unknown',
  release: true,
  export: 'async'
};

/** Get this transformer configuration from globals['rs-jest']
 * @see https://jestjs.io/docs/en/configuration.html#globals-object
 *
 * @param {jest.ProjectConfig|jest.InitialOptions} jestConfig jest Config Options
 * @returns {RsJestConfig} globals['rs-jest'] parameters/keys
 * @example const {export} = getConfigFrom(jestConfig);
 */
export function getConfigFrom(
  jestConfig: jest.ProjectConfig | jest.InitialOptions
): Partial<RsJestConfig> {
  return (jestConfig.globals && jestConfig.globals[Constant.GLOBALS_KEY]) || {};
}

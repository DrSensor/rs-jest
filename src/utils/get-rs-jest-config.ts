/** Get this plugins configuration from globals['rs-jest']
 * @see https://jestjs.io/docs/en/configuration.html#globals-object
 *
 * @param {jest.ProjectConfig|jest.InitialOptions} jestConfig jest Config Options
 * @returns {RsJestConfig} globals['rs-jest'] parameters/keys
 * @example const {export} = getRSJestConfig(jestConfig);
 */
export default function getRSJestConfig(
  jestConfig: jest.ProjectConfig | jest.InitialOptions
): RsJestConfig {
  return (jestConfig.globals && jestConfig.globals[Config.GLOBALS_KEY]) || {};
}

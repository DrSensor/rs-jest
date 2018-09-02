/// https://stackoverflow.com/a/50856790/5221998
/// https://github.com/facebook/jest/blob/e9350f6121d4bdb378d53b53a07c6d6fba5618c2/types/TestResult.js#L133-L135
import { resolve } from 'path';
import jest_please = require('jest');

describe('dummy test', () => {
  const options = {
    projects: [resolve(__dirname, 'fixtures/should_success')],
    silent: true,
    reporters: []
  };

  test('test jestapi', async () => {
    const { results } = await jest_please.runCLI(options, options.projects);
    expect(results.success).toBe(true);
  });
});

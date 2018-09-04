/// https://stackoverflow.com/a/50856790/5221998
import { resolve } from './utils';
import jest_please = require('jest');

describe('test export mode', () => {
  const options = {
    reporters: [['jest-silent-reporter', { useDots: true }]]
  } as jestCLI.Options;

  test('globals: {"rs-jest": {export: *}}', async () => {
    options.projects = resolve('fixtures/export_*');
    const { results } = await jest_please.runCLI(options, options.projects);
    expect(results.success).toBe(true);
  });
});

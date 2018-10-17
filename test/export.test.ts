/// https://stackoverflow.com/a/50856790/5221998
import { resolve } from './utils';
import { basename } from 'path';
import jest_please = require('jest');

describe('test export mode', () => {
  const options = {
    reporters: [['jest-silent-reporter', { useDots: true }]]
  } as jestCLI.Options;

  const fixture = resolve('fixtures/export_*');
  const projects = fixture.map((s, i) => [basename(s).replace('_', ' as '), i]);

  test.each(projects)(`%s`, async (s, i) => {
    const { results } = await jest_please.runCLI(options, [fixture[i]]);
    expect(results.success).toBe(true);
  });
});

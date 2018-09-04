import { resolve as r } from 'path';
import { hasMagic as globbable, sync as glob } from 'glob';

/** Just like path.resolve(__dirname, path) but can be use for array of path with glob pattern
 * @param relativePaths array of paths that are relative with the current file
 * @returns array of fullpath
 * @example const paths: string[] = resolve(['fixtures/exports/*', 'fixtures/simple'])
 */
export function resolve(relativePaths: string[] | string): string[] {
  if (Array.isArray(relativePaths)) {
    relativePaths.forEach((path, index) => {
      if (globbable(path)) {
        (relativePaths as string[]).splice(index, 1, ...glob(path));
      }
    });
  } else {
    relativePaths = globbable(relativePaths)
      ? glob(r(__dirname, relativePaths))
      : [relativePaths];
  }

  return relativePaths.map(path => r(__dirname, path));
}

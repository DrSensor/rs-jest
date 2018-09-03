/** This file are the synchronous version of cargo.js in rust-native-wasm-loader
 * @see https://github.com/dflemstr/rust-native-wasm-loader/blob/master/src/cargo.js
 */
import fs from 'fs';
import path from 'path';

//#region helpers
const reverseString = (str: string) =>
  str
    .split('')
    .reverse()
    .join('');
//#endregion

export const parseDependencies = (data: string, baseFile: string) =>
  data
    .split('\n')
    .filter(str => str.startsWith(baseFile.replace(/ /g, '\\ ')))
    .map(str => str.slice(str.indexOf(': ') + 2))
    .map(reverseString)
    .map(str => str.split(/(?: (?!\\))/))
    .reduce((allDeps, lineDeps) => [...allDeps, ...lineDeps], [])
    .map(reverseString)
    .map(str => str.replace(/\\ /g, ' '));

export function findSrcDir(childPath: string) {
  let candidate = childPath;

  while (candidate !== path.parse(candidate).root) {
    const maybeCargoFile = path.join(candidate, 'Cargo.toml');
    if (fs.existsSync(maybeCargoFile)) {
      return candidate;
    }

    const newCandidate = path.dirname(candidate);
    if (newCandidate === candidate) {
      break;
    }
    candidate = newCandidate;
  }

  return null;
}

export function cargoCommand(
  target: string,
  release: boolean,
  subcmd = []
): string {
  const cmd = [
    'cargo',
    ...subcmd,
    'build',
    '--message-format=json',
    '--target=' + target
  ];

  if (release) {
    cmd.push('--release');
  }

  return cmd.join(' ');
}

export function handleCargo(
  self: Webpack.Loader.Context,
  result: string
): {
  wasmFile: string;
  jsFile: string;
} {
  let wasmFile;
  let jsFile;
  let hasError = false;
  outer: for (const line of result.split('\n')) {
    if (/^\s*$/.test(line)) {
      continue;
    }
    const data = JSON.parse(line);
    switch (data.reason) {
      case 'compiler-message':
        switch (data.message.level) {
          case 'warning':
            self.emitWarning(new Error(data.message.rendered));
            break;
          case 'error':
            self.emitError(new Error(data.message.rendered));
            hasError = true;
            break;
        }
        break;
      case 'compiler-artifact':
        if (!wasmFile) {
          wasmFile = data.filenames.find((p: string) => p.endsWith('.wasm'));
        }
        if (!jsFile) {
          jsFile = data.filenames.find((p: string) => p.endsWith('.js'));
        }
        if (wasmFile) {
          break outer;
        }
        break;
    }
  }

  if (hasError) {
    throw new Error('Cargo build failed');
  }

  const depFile = wasmFile.slice(0, -'.wasm'.length) + '.d';
  const depContents = fs.readFileSync(depFile, 'utf-8');
  const deps = parseDependencies(depContents, wasmFile);

  for (const dep of deps) {
    self.addDependency(dep);
  }

  return { wasmFile, jsFile };
}

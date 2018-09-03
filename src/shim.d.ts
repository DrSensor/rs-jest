// tslint:disable:no-namespace

//#region polyfill
namespace Webpack {
  namespace Loader {
    interface Context {
      emitWarning(warning: Error);
      emitError(error: Error);
      addDependency(file: string);
    }
  }
}
//#endregion

interface JestCacheKeyOptions {
  rootDir: string;
  instrument: boolean;
}

interface RsJestConfig {
  target: string; // use by rust-native-wasm-loader
  release: boolean; // use by rust-native-wasm-loader
  export:
    | 'buffer'
    | 'instance'
    | 'module'
    | 'async'
    | 'async-instance'
    | 'async-module';
}

declare namespace jest {
  interface ConfigGlobals {
    'rs-jest': Partial<RsJestConfig>;
  }
}

// tslint:disable:no-namespace

//#region polyfill
declare module 'rust-native-wasm-loader/dist/cargo' {
  export const cargoCommand: any;
  export const findSrcDir: any;
  export const handleCargo: any;
}

declare interface JestCacheKeyOptions {
  rootDir: string;
  instrument: boolean;
}
//#endregion

interface RsJestConfig {
}

declare enum Config {
  GLOBALS_KEY = 'rs-jest',
  FILENAME = 'cargo.toml'
}

declare namespace jest {
  interface ConfigGlobals {
    'rs-jest': { [key: string]: string | number };
  }
}

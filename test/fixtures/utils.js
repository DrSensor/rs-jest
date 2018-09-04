exports.rsJestScriptPath = '<rootDir>../../../dist/index.js';

/** Get list of exported functions from instance of `WebAssembly.Module`
 * @param {WebAssembly.Module} wasm_module instance of `WebAssembly.Module`
 * @return {Array<string>} list of exported functions
 * @example const func_list = getExportedFunctions(new WebAssembly.Module([0x00,0x61,0x73,0x6d,0x01,0,0,0]));
 */
exports.getExportedFunctions = wasm_module =>
  WebAssembly.Module.exports(wasm_module)
    .filter(
      obj => obj.kind === 'function' && obj.name !== 'rust_eh_personality'
    )
    .map(obj => obj.name);

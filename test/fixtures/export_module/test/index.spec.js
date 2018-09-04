const { getExportedFunctions } = require('../../utils');

describe('test mode {export: "module"} should export Rust code as WebAssembly.Module', () => {
  test('empty_code', () => {
    const wasm_module = require('../src').from_empty_code;

    const wasm_instance = new WebAssembly.Instance(wasm_module);
    const exported_functions = getExportedFunctions(wasm_module);

    expect(wasm_module).toBeInstanceOf(WebAssembly.Module);
    expect(wasm_instance).toBeInstanceOf(WebAssembly.Instance);
    expect(exported_functions).toEqual([]);
  });

  test('single_function', () => {
    const wasm_module = require('../src').from_single_function;

    const wasm_instance = new WebAssembly.Instance(wasm_module);
    const exported_functions = getExportedFunctions(wasm_module);

    expect(wasm_module).toBeInstanceOf(WebAssembly.Module);
    expect(wasm_instance).toBeInstanceOf(WebAssembly.Instance);
    expect(exported_functions).toEqual(['add']);
    expect(wasm_instance.exports.add(1, 2)).toBe(3);
  });
});

const { getExportedFunctions } = require('../../utils');

describe('test mode {export: "async"} should export Rust code as (() => WebAssembly.instantiate(wasmCode))', () => {
  test('empty_code', async () => {
    const wasm_instantiate = require('../src').from_empty_code;

    const { instance, module } = await wasm_instantiate();
    const exported_functions = getExportedFunctions(module);

    expect(instance).toBeInstanceOf(WebAssembly.Instance);
    expect(module).toBeInstanceOf(WebAssembly.Module);
    expect(exported_functions).toEqual([]);
  });

  test('single_function', async () => {
    const wasm_instantiate = require('../src').from_single_function;

    const { instance, module } = await wasm_instantiate();
    const exported_functions = getExportedFunctions(module);

    expect(instance).toBeInstanceOf(WebAssembly.Instance);
    expect(module).toBeInstanceOf(WebAssembly.Module);
    expect(exported_functions).toEqual(['add']);
    expect(instance.exports.add(1, 2)).toBe(3);
  });
});

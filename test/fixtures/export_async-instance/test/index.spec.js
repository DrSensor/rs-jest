const { getExportedFunctions } = require('../../utils');

describe('test mode {export: "async-instance"} should export Rust code as (() => WebAssembly.instantiate(wasmModule))', () => {
  test('empty_code', async () => {
    const wasm_instantiate = require('../src').from_empty_code;

    const wasm_instance = await wasm_instantiate();

    expect(wasm_instance).toBeInstanceOf(WebAssembly.Instance);
  });

  test('single_function', async () => {
    const wasm_instantiate = require('../src').from_single_function;

    const wasm_instance = await wasm_instantiate();

    expect(wasm_instance).toBeInstanceOf(WebAssembly.Instance);
    expect(wasm_instance.exports.add(1, 2)).toBe(3);
  });
});

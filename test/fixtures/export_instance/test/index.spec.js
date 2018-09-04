const { getExportedFunctions } = require('../../utils');

describe('test mode {export: "instance"} should export Rust code as WebAssembly.Instance', () => {
  test('empty_code', () => {
    const wasm_instance = require('../src').from_empty_code;

    expect(wasm_instance).toBeInstanceOf(WebAssembly.Instance);
  });

  test('single_function', () => {
    const wasm_instance = require('../src').from_single_function;

    expect(wasm_instance).toBeInstanceOf(WebAssembly.Instance);
    expect(wasm_instance.exports.add(1, 2)).toBe(3);
  });
});

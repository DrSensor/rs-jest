it('should be exported as Buffer', () => {
  const wasm_buffer = require('.');

  const module = new WebAssembly.Module(wasm_buffer);
  const instance = new WebAssembly.Instance(module);

  expect(wasm_buffer).toBeInstanceOf(Buffer);
  expect(module).toBeInstanceOf(WebAssembly.Module);
  expect(instance).toBeInstanceOf(WebAssembly.Instance);
});

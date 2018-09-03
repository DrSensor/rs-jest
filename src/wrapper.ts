/** This file is the commonjs version of wrapper.js in rollup-plugin-rust
 * @see https://github.com/DrSensor/rollup-plugin-rust/blob/master/src/wrapper.js
 */

/** Wrap binary data as commonjs module so it can be imported by doing require(module)
 * @param buffer raw binary data to be wrapped as es6 module
 * @return chainable object which represent `wrap this data as...`
 * @example return wrap(arrayBuffer).asWebAssembly.Module
 */
export default function(buffer: Buffer) {
  const data = buffer.toJSON().data.toString();
  return {
    asBuffer: `module.exports = Buffer.from([${data}])`,
    asWebAssembly: {
      Module: `module.exports = new WebAssembly.Module(
          Buffer.from([${data}])
        )`,
      Instance: `module.exports = new WebAssembly.Instance(
          new WebAssembly.Module(
            Buffer.from([${data}])
          )
        )`
    },
    promiseWebAssembly: {
      Module: `module.exports = () => WebAssembly.compile(
          Buffer.from([${data}])
        )`,
      Instance: `module.exports = importObject => WebAssembly.instantiate(
          new WebAssembly.Module(Buffer.from([${data}])),
          importObject
        )`,
      Both: `module.exports = importObject => WebAssembly.instantiate(
            Buffer.from([${data}]), importObject
        )`
    }
  };
}

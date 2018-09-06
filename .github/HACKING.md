# Want to Hack?

Thanks for your interest to tinker this project. Let's make it great!! 🙂

## Basic Overview

This project use rollup to bundle the final result while maintain the code format and it's comments block. Overall, the technology stack that this project uses are (you don't need to install this tools beforehand because it's already in dependecy list):

- static-type checker: [typescript][]
- code-style checker (linter): [tslint][] + [prettier][]
- bundler: [rollup][] + [babel][]
- git hooks: [husky][] + [commitlint][] + [lint-staged][] + [standard-version][]
- test framework: [jest][]

## Start Hacking

### Setup

First, install all dependencies by running

```console
npm install
```

and if you got message about security vulnurability, you can use this command to fix it

```console
npm audit fix
```

### Test

This project has 2 kind of tests, unit-tests and smoke-tests. The unit-tests will use [jest][] which basically will run in `node.js` environment. Run this command to start the unit-tests (choose which one):

```console
npm run test
npm run test:watch
npm run test:coverage
```

The smoke-tests is basically just an example how to use plugin in real simple project. To run the smoke-tests, you need to [build/bundle](#Build) it first, change directory to the example you want to run, then try to build that example. Summary if you want to build `stencil` example, this is what you need to do:

```console
npm run build
cd examples/stencil
npm test
```

### Build

To compile/bundle this project, you can choose between this 2 command

```console
npm run build
npm start
```

## Project Structure

In general, the folder structure of this project follow:

```sh
.
├── examples
│   ├────────────────────
│   │ Bunch of smoke-tests
│   └────────────────────
│
├── src               # scripts that will be build/bundled
│   ├── ...bunch_of_helper_scripts
│   ├── index.ts          # exported module used by Jest
│   └── preprocessor.ts   # main scripts
│
├── test
│   ├── fixtures
│   │   ├──────────────────────────────
│   │   │ Bunch of sample to be tested
│   │   ├──────────────────────────────
│   │   └── utils.js # helper script used in various fixtures
│   │
│   │
│   ├────────────────────────────────────────────────
│   │ Few test-cases with file-extension *.test.ts
│   ├────────────────────────────────────────────────
│   └── utils.ts # helper script used in various test-cases
│
├─────────────────────
│ Bunch of config files
└─────────────────────
```

---

[lint-staged]: https://github.com/okonet/lint-staged
[rollup-plugin]: https://github.com/rollup/rollup/wiki/Plugins#creating-plugins
[rollup]: https://rollupjs.org/guide/en
[typescript]: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
[tslint]: https://palantir.github.io/tslint/
[prettier]: https://prettier.io/docs/en/install.html
[babel]: https://babeljs.io/docs/en
[husky]: https://github.com/typicode/husky
[commitlint]: https://github.com/marionebl/commitlint
[standard-version]: https://github.com/conventional-changelog/standard-version
[conventionalcommits]: https://conventionalcommits.org/
[jest]: https://jestjs.io/docs/en/getting-started.html

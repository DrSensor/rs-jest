/** from {@link https://github.com/facebook/jest/tree/master/types} */

declare module 'jest' {
  type Path = string;
  type Glob = string;
  type Milliseconds = number;
  type Bytes = number;

  // #region temporary polyfill
  type ConsoleBuffer = any;
  type AssertionResult = any;
  type SerializableError = any;
  type RawCoverage = any;
  type ReporterConfig = any;
  type SnapshotUpdateState = any;
  type SnapshotSummary = any;
  type FileCoverage = any;
  type RawCoverage = any;
  type RawFileCoverage = any;
  // #endregion

  interface GlobalConfig {
    bail: boolean;
    changedSince: string;
    changedFilesWithAncestor: boolean;
    collectCoverage: boolean;
    collectCoverageFrom: Glob[];
    collectCoverageOnlyFrom?: null | { [key: string]: boolean };
    coverageDirectory: string;
    coveragePathIgnorePatterns?: string[];
    coverageReporters: string[];
    coverageThreshold: { global: { [key: string]: number } };
    detectLeaks: boolean;
    detectOpenHandles: boolean;
    enabledTestsMap?: null | { [key: string]: { [key: string]: boolean } };
    expand: boolean;
    filter?: null | Path;
    findRelatedTests: boolean;
    forceExit: boolean;
    json: boolean;
    globalSetup?: null | string;
    globalTeardown?: null | string;
    lastCommit: boolean;
    logHeapUsage: boolean;
    listTests: boolean;
    maxWorkers: number;
    noStackTrace: boolean;
    nonFlagArgs: string[];
    noSCM?: null | boolean;
    notify: boolean;
    notifyMode: string;
    outputFile?: null | Path;
    onlyChanged: boolean;
    onlyFailures: boolean;
    passWithNoTests: boolean;
    projects: Glob[];
    replname?: null | string;
    reporters: Array<string | ReporterConfig>;
    runTestsByPath: boolean;
    rootDir: Path;
    silent: boolean;
    skipFilter: boolean;
    errorOnDeprecated: boolean;
    testFailureExitCode: number;
    testNamePattern: string;
    testPathPattern: string;
    testResultsProcessor?: null | string;
    updateSnapshot: SnapshotUpdateState;
    useStderr: boolean;
    verbose?: null | boolean;
    watch: boolean;
    watchAll: boolean;
    watchman: boolean;
    watchPlugins?: null | Array<{ path: string; config: object }>;
  }

  interface Argv {
    _: string[];
    $0: string;
    all: boolean;
    automock: boolean;
    bail: boolean;
    browser: boolean;
    cache: boolean;
    cacheDirectory: string;
    changedFilesWithAncestor: boolean;
    changedSince: string;
    ci: boolean;
    clearCache: boolean;
    clearMocks: boolean;
    collectCoverage: boolean;
    collectCoverageFrom: string[];
    collectCoverageOnlyFrom: string[];
    config: string;
    coverage: boolean;
    coverageDirectory: string;
    coveragePathIgnorePatterns: string[];
    coverageReporters: string[];
    coverageThreshold: string;
    debug: boolean;
    env: string;
    expand: boolean;
    findRelatedTests: boolean;
    forceExit: boolean;
    globals: string;
    globalSetup?: null | string;
    globalTeardown?: null | string;
    h: boolean;
    haste: string;
    help: boolean;
    init: boolean;
    json: boolean;
    lastCommit: boolean;
    logHeapUsage: boolean;
    maxWorkers: number;
    moduleDirectories: string[];
    moduleFileExtensions: string[];
    moduleLoader: string;
    moduleNameMapper: string;
    modulePathIgnorePatterns: string[];
    modulePaths: string[];
    name: string;
    noSCM: boolean;
    noStackTrace: boolean;
    notify: boolean;
    notifyMode: string;
    onlyChanged: boolean;
    outputFile: string;
    preset?: null | string;
    projects: string[];
    replname?: null | string;
    resetMocks: boolean;
    resetModules: boolean;
    resolver?: null | string;
    restoreMocks: boolean;
    rootDir: string;
    roots: string[];
    runInBand: boolean;
    setupFiles: string[];
    setupTestFrameworkScriptFile: string;
    showConfig: boolean;
    silent: boolean;
    snapshotSerializers: string[];
    testEnvironment: string;
    testFailureExitCode?: null | string;
    testMatch: string[];
    testNamePattern: string;
    testPathIgnorePatterns: string[];
    testPathPattern: string[];
    testRegex: string;
    testResultsProcessor?: null | string;
    testRunner: string;
    testURL: string;
    timers: 'real' | 'fake';
    transform: string;
    transformIgnorePatterns: string[];
    unmockedModulePathPatterns?: null | string[];
    updateSnapshot: boolean;
    useStderr: boolean;
    verbose?: null | boolean;
    version: boolean;
    watch: boolean;
    watchAll: boolean;
    watchman: boolean;
    watchPathIgnorePatterns: string[];
  }

  interface TestResult {
    console?: null | ConsoleBuffer;
    coverage?: RawCoverage;
    displayName?: null | string;
    failureMessage?: null | string;
    leaks: boolean;
    memoryUsage?: Bytes;
    numFailingTests: number;
    numPassingTests: number;
    numPendingTests: number;
    openHandles: Error[];
    perfStats: {
      end: Milliseconds;
      start: Milliseconds;
    };
    skipped: boolean;
    snapshot: {
      added: number;
      fileDeleted: boolean;
      matched: number;
      unchecked: number;
      uncheckedKeys: string[];
      unmatched: number;
      updated: number;
    };
    sourceMaps: { [sourcePath: string]: string };
    testExecError?: SerializableError;
    testFilePath: string;
    testResults: AssertionResult[];
  }

  interface AggregatedResultWithoutCoverage {
    numFailedTests: number;
    numFailedTestSuites: number;
    numPassedTests: number;
    numPassedTestSuites: number;
    numPendingTests: number;
    numPendingTestSuites: number;
    numRuntimeErrorTestSuites: number;
    numTotalTests: number;
    numTotalTestSuites: number;
    openHandles: Error[];
    snapshot: SnapshotSummary;
    startTime: number;
    success: boolean;
    testResults: TestResult[];
    wasInterrupted: boolean;
  }

  interface CoverageMap {
    merge: (data: object) => void;
    getCoverageSummary: () => FileCoverage;
    data: RawCoverage;
    addFileCoverage: (fileCoverage: RawFileCoverage) => void;
    files: () => string[];
    fileCoverageFor: (file: string) => FileCoverage;
  }

  type AggregatedResult = AggregatedResultWithoutCoverage & {
    coverageMap?: null | CoverageMap;
  };

  const run: (maybeArgv?: Argv, project?: Path) => void;
  const runCLI: (
    argv: Partial<Argv>,
    projects: Path[]
  ) => Promise<{
    results: AggregatedResult;
    globalConfig: GlobalConfig;
  }>;

  export = {
    run,
    runCLI
  };

  global {
    namespace jestCLI { type Options = Partial<Argv>; }
  }
}

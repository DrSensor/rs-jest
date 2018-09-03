/** This file are partially copied from ts-jest project 💩
 * @see https://github.com/kulshekhar/ts-jest/blob/master/src/utils/logger.ts
 * @todo If jest have lib utils for their own logger (just like webpack), switch to it immedeatly❗️ ️
 */
import fs from 'fs';
import path from 'path';
import { Constant } from './constants';

/**
 * Logger file that enables logging things just once. Does this by traversing the array of previously recorded
 * logs to see if the exact same message has already been logged
 * @type {any[]}
 */

const logs: any[] = [];
let logsFlushed: boolean = false;
// Set this to true to also log to the console. It's very nice for local debugging.
const outputToConsole: boolean = false;

function shouldLog(): boolean {
  // If the env variable is set and the logs have not already been flushed, log the line
  return (
    (Boolean(process.env.RS_JEST_DEBUG) || outputToConsole) && !logsFlushed
  );
}

// Log function. Only logs prior to calls to flushLogs.
export function logOnce(...thingsToLog: any[]): void {
  if (!shouldLog()) {
    return;
  }
  logs.push(thingsToLog);
}

// This function JSONifies logs and flushes them to disk.
export function flushLogs(): void {
  if (!shouldLog()) {
    return; // only output stuff for the first invocation and if logging is enabled.
  }
  logsFlushed = true;
  const rootPath = path.resolve(__dirname, '..', '..');
  const JSONifiedLogs = logs.map(convertToJSONIfPossible);
  const logString = JSONifiedLogs.join('\n');
  const filePath = path.resolve(rootPath, Constant.LOGFILE);
  if (outputToConsole) {
    // tslint:disable-next-line
    console.log(logString);
  } else {
    fs.writeFileSync(filePath, logString);
  }
}

function convertToJSONIfPossible(object: any): string {
  //#region ERROR: cause error when bundling 💢
  // try {
  //   return JSON.stringify(object, null, 2);
  // } catch {
  //   return object.toString();
  // }
  //#endregion
  return JSON.stringify(object, null, 2);
}

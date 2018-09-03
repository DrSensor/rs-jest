import { execSync } from 'child_process';

/** Execute command in permissive environment
 * @param cmd command to execute
 * @param cwd current working directory where the command is executed
 * @example const result = execPermissive('cargo build', '/root/projects/mine')
 */
export default function execPermissive(cmd: string, cwd: string) {
  try {
    return execSync(cmd, {
      cwd,
      encoding: 'utf-8',
      maxBuffer: 2 * 1024 * 1024 * 1024
    });
  } catch (error) {
    return error;
  }
}

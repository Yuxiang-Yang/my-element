/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export function escapeStringRegexp(string = '') {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}

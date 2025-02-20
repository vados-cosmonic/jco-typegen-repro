declare module 'objdiff:core/diff' {
  export { runDiff };
  export type { ObjectData };
  export type { ObjectDiff };
  export type { DiffConfig };
  export type { DiffResult };
}
export function runDiff(left: ObjectData | undefined, right: ObjectData | undefined, config: DiffConfig): DiffResult;
import type { ObjectData } from './objdiff-core-types.js';
export type { ObjectData };
import type { ObjectDiff } from './objdiff-core-types.js';
export type { ObjectDiff };
import type { DiffConfig } from './objdiff-core-types.js';
export type { DiffConfig };
import type { DiffResult } from './objdiff-core-types.js';
export type { DiffResult };

declare module 'objdiff:core/types' {
  export { DiffConfig };
  export { ObjectData };
  export { ObjectDiff };
}
export type PropertyId = string;
/**
 * # Variants
 * 
 * ## `"unknown"`
 * 
 * ## `"elf"`
 * 
 * ## `"macho"`
 * 
 * ## `"pe"`
 */
export type ObjectKind = 'unknown' | 'elf' | 'macho' | 'pe';
export interface ObjectFlags {
  executable?: boolean,
  relocatable?: boolean,
  shared?: boolean,
  stripped?: boolean,
  hasDebug?: boolean,
}
export interface DiffResult {
  left?: ObjectDiff,
  right?: ObjectDiff,
}

export class DiffConfig {
  constructor()
  setProperty(id: PropertyId, value: string): void;
  getProperty(id: PropertyId): string;
}

export class ObjectData {
  /**
   * This type does not have a public constructor.
   */
  private constructor();
  static parse(data: Uint8Array, config: DiffConfig): ObjectData;
  kind(): ObjectKind;
  flags(): ObjectFlags;
}

export class ObjectDiff {
  /**
   * This type does not have a public constructor.
   */
  private constructor();
  encode(): Uint8Array;
}

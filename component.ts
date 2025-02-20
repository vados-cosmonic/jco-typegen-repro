/**
 * The goal of this file is to showcase how usage of the objdiff:core interface would work
 * in a *component*, which can/may be distinct from usage in a host context (i.e. `jco transpile`).
 *
 * The code in this file is what we'd like the user to be able to write as easily as possible,
 * with the caveat that we basically *must* modify `tsconfig.json` to `include` the generated
 * bindings folder.
 *
 * Note that the generated types folder (produced by either `jco types` or `jco guest-types`)
 * do *not* currently produce types that can be picked up properly with a simple `include`,
 * this requires TS Ambient Modules[0] which we're not properly doing yet.
 *
 * By modifying this file and tsconfig.json to import the different forms of generation, you can compare
 * how they interact with tsc, your IDE/LSP, etc.
 *
 * [0]: https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules
 */
import { runDiff } from "objdiff:core/diff";

runDiff()

# Reproduction of generated type differences

This repository contains output of 3 versions of bindgen

- Current ("old") host bindgen (`jco types`)
- Current ("old") guest bindgen (`jco guest-types`)
- New Guest bindgen (`jco types`, w/ the work of [this PR](https://github.com/bytecodealliance/jco/pull/571) )

After `npm intall`ing, you can compare the `tsc` output of these alternatives with:

```console
npm run check-old-host
npm run check-old-guest
npm run check-new
```

**The goal of this repository is to compare the generation and tooling output from using the alternatives.**

> [!NOTE]
> In a real project, inclusion of the generated folder is *required* for any "easy" TS interop/inclusion of necessary types. To that end you can observe the `*.tsconfig.json` files that make things work.:
>
> Another option is to link the paths directly, which we end up doing  option option is to link the modules directly

At current it *seems* like the new method moves us a little further away from the goal of being able to easily import
interfaces by name (the named modules that we were creating), which is more of a problem for guests than hosts, though code that works for *both* is also beneficial/a worthy sidequest.

# Areas to look into

Here are some areas that are not quite what I expected

## Ambient modules

Out of the gate, running `npm run check-all` *should* produce that shows all 3 fail to typecheck, even w/ inclusion of the generated folder(s):

```ts
❯ npm run check-all

> check-all
> npm run check-new; npm run check-old-host; npm run check-old-guest


> check-new
> tsc -p new.tsconfig.json

component.ts:18:25 - error TS2307: Cannot find module 'objdiff:core/diff' or its corresponding type declarations.

18 import { runDiff } from "objdiff:core/diff";
                           ~~~~~~~~~~~~~~~~~~~


Found 1 error in component.ts:18


> check-old-host
> tsc -p old-host.tsconfig.json

component.ts:18:25 - error TS2307: Cannot find module 'objdiff:core/diff' or its corresponding type declarations.

18 import { runDiff } from "objdiff:core/diff";
                           ~~~~~~~~~~~~~~~~~~~


Found 1 error in component.ts:18


> check-old-guest
> tsc -p old-guest.tsconfig.json

component.ts:18:25 - error TS2307: Cannot find module 'objdiff:core/diff' or its corresponding type declarations.

18 import { runDiff } from "objdiff:core/diff";
                           ~~~~~~~~~~~~~~~~~~~


Found 1 error in component.ts:18
```

So far, so bad, but this is expected, because we're not outputting [Ambient Modules][ts-ambient-modules].

However, here is a difference in the ease by which we *get* to Ambient modules for the 3 generation methods.

**At present, the *old* modules get us there quickest -- all we have to do is remove the top level imports/exports, which get considered to be ["module augmentations"](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) by TS**.

If we do that for all three (in `objdiff-core-diff.d.ts`), output looks like this:

```ts
jco/repro on  es-modules [?] via  v22.12.0 took 2s
❯ npm run check-all

> check-all
> npm run check-new; npm run check-old-host; npm run check-old-guest


> check-new
> tsc -p new.tsconfig.json

component.ts:18:25 - error TS2307: Cannot find module 'objdiff:core/diff' or its corresponding type declarations.

18 import { runDiff } from "objdiff:core/diff";
                           ~~~~~~~~~~~~~~~~~~~


Found 1 error in component.ts:18


> check-old-host
> tsc -p old-host.tsconfig.json

component.ts:18:25 - error TS2307: Cannot find module 'objdiff:core/diff' or its corresponding type declarations.

18 import { runDiff } from "objdiff:core/diff";
                           ~~~~~~~~~~~~~~~~~~~


Found 1 error in component.ts:18


> check-old-guest
> tsc -p old-guest.tsconfig.json

component.ts:20:1 - error TS2554: Expected 3 arguments, but got 0.

20 runDiff()
   ~~~~~~~

  generated-old-guest/interfaces/objdiff-core-diff.d.ts:2:27
    2   export function runDiff(left: ObjectData | undefined, right: ObjectData | undefined, config: DiffConfig): DiffResult;
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    An argument for 'left' was not provided.


Found 1 error in component.ts:20
```

A few points:

- Obviously the host generation code isn't doing ES modules so it's irrelevant/not expected to meaningfully change
- Just commenting out a bunch of needed imports/exports is silly
- The old guest code is closest to doing the *right* thing -- even with the incomplete information it puts out a useful TS error.
- The importing/repimporting method in the new code doesn't *quite* work like we'd want it to.

[ts-ambient-modules]: https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules

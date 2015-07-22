## Emitter
There are two `emitters` provided with the TypeScript compiler:

* `emitter.ts`: this is the emitter you are most likely to be interested in. Its the TS -> JavaScript emitter.
* `declarationEmitter.ts`: this is the emitter used to create a *declaration file* (a `.d.ts`) for a *TypeScript source file* (a `.ts` file).

We will look at `emitter.ts` in this section.

### Usage by `program`
Program provides an `emit` function. This function primarily delegates to `emitFiles` function in `emitter.ts`.

# Compiler
The typescript compiler source is located under the [`src/compiler`] folder : https://github.com/Microsoft/TypeScript/tree/master/src/compiler

It is split into the follow key parts:
* Scanner (`scanner.ts`)
* Parser (`parser.ts`)
* Binder (`bindder.ts`)
* Checker (`checker.ts`)
* Emitter (`emitter.ts`)

Each of these get their own unique files in the source. These parts will be explained later on in this chapter.

There are a few additional files in the TypeScript compiler that provide utilities to many of these key portions:

## File: Utilities
core.ts : core utilities used by the TypeScript compiler

## File: Key Data Structures
`types.ts` contains key data structures and interfaces uses throughout the compiler. Here is a sampling of a few key ones:
* `SyntaxKind`
The AST node type is identified by the `SyntaxKind` enum.
* `TypeChecker`
This is the interface provided by the TypeChecker.
* `CompilerHost`
This is used by the `Program` to interact with the `System`

## File: System
All interaction of the TypeScript compiler with the operating system goes through a `System` interface. Both the interface and its implementations (`WScript` and `Node`) are defined in `system.ts`. You can think of it as the *Operating Environment* (OE).

## File: Program
The compilation context ([a concept we covered previously](docs/project/compilation-context.md)) is represented within the TypeScript compiler as a `Program`.

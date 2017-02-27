# Compiler
The typescript compiler source is located under the [`src/compiler`](https://github.com/Microsoft/TypeScript/tree/master/src/compiler) folder.

It is split into the follow key parts:
* Scanner (`scanner.ts`)
* Parser (`parser.ts`)
* Binder (`binder.ts`)
* Checker (`checker.ts`)
* Emitter (`emitter.ts`)

Each of these get their own unique files in the source. These parts will be explained later on in this chapter.

## BYOTS
We have a project called [Bring Your Own TypeScript (BYOTS)](https://github.com/basarat/byots) which makes it easier to play around with the compiler API e.g. by exposing internal APIs. You can use it to expose your local app's version of TypeScript globally.

## Syntax vs. Semantics
Just because something is *syntactically* correct doesn't mean it is *semantically* correct. Consider the following piece of TypeScript code which although *syntactically* valid is *semantically* wrong

```ts
var foo: number = "not a number";
```

`Semantic` means "meaning" in English. This concept is useful to have in your head.

## Processing Overview
The following is a quick review of how these key parts of the TypeScript compiler compose:

```code
SourceCode ~~ scanner ~~> Token Stream
```

```code
Token Stream ~~ parser ~~> AST
```

```code
AST ~~ binder ~~> Symbols
```
`Symbol` is the primary building block of the TypeScript *semantic* system. As shown the symbols are created as a result of binding. Symbols connect declaration nodes in the AST to other declarations contributing to the same entity.

Symbols + AST are what is used by the checker to *semantically* validate the source code
```code
AST + Symbols ~~ checker ~~> Type Validation
```

Finally When a JS output is requested:
```code
AST + Checker ~~ emitter ~~> JS
```

There are a few additional files in the TypeScript compiler that provide utilities to many of these key portions which we cover next.

## File: Utilities
`core.ts` : core utilities used by the TypeScript compiler. A few important ones:

* `let objectAllocator: ObjectAllocator` : is a variable defined as a singleton global. It provides the definitions for `getNodeConstructor` (Nodes are covered when we look at `parser` / `AST`), `getSymbolConstructor` (Symbols are covered in `binder`), `getTypeConstructor` (Types are covered in `checker`), `getSignatureConstructor` (Signatures are the index, call and construct signatures).

## File: Key Data Structures
`types.ts` contains key data structures and interfaces uses throughout the compiler. Here is a sampling of a few key ones:
* `SyntaxKind`
The AST node type is identified by the `SyntaxKind` enum.
* `TypeChecker`
This is the interface provided by the TypeChecker.
* `CompilerHost`
This is used by the `Program` to interact with the `System`.
* `Node`
An AST node.

## File: System
`system.ts`. All interaction of the TypeScript compiler with the operating system goes through a `System` interface. Both the interface and its implementations (`WScript` and `Node`) are defined in `system.ts`. You can think of it as the *Operating Environment* (OE).

Now that you have an overview of the major files, we can look at the concept of `Program`

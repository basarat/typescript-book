# Your JavaScript is TypeScript

There were (and will continue to be) a lot of competitors in *Some syntax* to *JavaScript* compilers. TypeScript is different from them in that *Your JavaScript is TypeScript*. Here's a diagram:

![](https://raw.githubusercontent.com/basarat/typescript-book/master/images/venn.png)

However it does mean that *you need to learn JavaScript* (the good new is *you **only** need to learn JavaScript*). TypeScript is just standardizing all the ways you provide *good documentation* on JavaScript.

* Just giving you a new syntax doesn't help fix bug (looking at you CoffeeScript).
* Creating a new language abstracts you too far from your runtimes, communities (looking at you Dart).

TypeScript is just JavaScript with docs.

## Making JavaScript Better

TypeScript will try to protect you from portions of JavaScript that never worked (so you don't need to remember this stuff):

```ts
[] + []; // JavaScript will give you "" (which makes little sense), TypeScript will error

//
// other things that are nonsensical in JavaScript but don't give an error (but TypeScript will)
//
{} + []; // JS : "[Object object]", TS Error  
[] + {}; // JS : 0, TS Error  
{} + {}; // JS : NaN, TS Error
"hello" - 1; // JS : NaN, TS Error
```

Essentailly TypeScript is linting JavaScript. Just doing a better job at it then other linters that don't have *type information*.

## You still need to learn JavaScript

That said TypeScript is very pragmatic about the fact that *you do write JavaScript* so there are some things about JavaScript that you still need to know in order to not be caught off-guard. Lets discuss them next.

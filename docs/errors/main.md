# Common Errors
In this section we explain a number of common error codes that users experience in the real world.

## TS2304
Samples:
> `Cannot find name ga`

You are probably using a third party library (e.g. google analytics) and don't have it `declare`d. TypeScript tries to save you from *spelling mistakes* and *using variables without declaring them* so you need to be explicit on anything that is *available at runtime* because of you including some external library ([more on how to fix it][ambient]).

## TS2307
Samples:
> `Cannot find module 'underscore'`

You are probably using a third party library (e.g. underscore) as a *module* ([more on modules][modules]) and don't have the ambient declaration file for it ([more on ambient declarations][ambient]).

## TS1148
Sample:
> Cannot compile modules unless the '--module' flag is provided

Checkout the [section on modules][modules].

## Catch clause variable cannot have a type annotation
Sample:
```js
try { something(); }
catch (e: Error) { // Catch clause variable cannot have a type annotation
}
```
TypeScript is protecting you from JavaScript code in the wild being wrong. Use a type guard instead:
```js
try { something(); }
catch (e) {
  if (e instanceof Error){
    // Here you go.
  }
}
```

## Interface `ElementClass` cannot simultaneously extend types `Component` and `Component`
This happens when you have two `react.d.ts` (`@types/react/index.d.ts`) in the compilation context.

**Fix**:
* Delete `node_modules` and any `package-lock` (or yarn lock) and `npm install` again.
* If it doesn't work, find the invalid module (all modules used by your project should have `react.d.ts` as a `peerDependency` and not a hard `dependency`) and report it on their project.


## For search indexing
You can ignore reading this. This section is for search engine indexing.

> Other modules that people tend to use and get errors:
* Cannot find name $
* Cannot find module jquery

[ambient]: ../types/ambient/d.ts.md
[modules]: ../project/modules.md

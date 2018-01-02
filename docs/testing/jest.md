## Using Jest with TypeScript

> [Pro egghead lesson on Jest / TypeScript](https://egghead.io/lessons/typescript-getting-started-with-jest-using-typescript)

No testing solution out there is perfect. That said, jest is an excellent unit testing option which provides great TypeScript support. 

> Note: We assume you start off with a simple node package.json setup. Also all TypeScript files should be in a `src` folder which is always recommended (even without Jest) for a clean project setup.

## Step 1: Install
Install the following using npm: 
```
npm i jest @types/jest ts-jest -D
```

Explanation: 
* Install `jest` framwork (`jest`) 
* Install the types for `jest` (`@types/jest`)
* Install the TypeScript preprocessor for jest (`ts-jest`) which allows jest to transpile TypeScript on the fly and have source-map support built in.
* Save all of these to your dev dependencies (testing is almost always a npm dev-dependency)


## Step 2: Configure Jest
Add the following `jest.config.js` file to the root of your project: 
```js
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
```
Explanation:
* We always recommend having *all* TypeScript files in a `src` folder in your project. We assume this is true and specify this using `roots` option.
* The `transform` config just tells `jest` to use `ts-jest` for ts / tsx files. 
* The `testRegex` tells Jest to look for tests in any `__tests__` folder AND also any files anywhere that use the `(.test|.spec).(js|jsx|ts|tsx)` extension e.g. `asdf.test.tsx` etc.
* The `moduleFileExtensions` tells jest to our file extensions. This is needed as we add `ts`/`tsx` into the defaults (`js|jsx|json|node`).

## Step 3: Run tests
Run `npx jest` from your project root and jest will execute any tests you have.

### Optional: Add script target for npm scripts
Add `package.json`:

```json
{
  "test": "jest"
}
```
* This allows you to run the tests with a simple `npm t`. 
* And even in watch mode with `npm t -- --watch`. 

### Optional: Run jest in watch mode 
* `npx jest -w`


### Example
* For a file `foo.ts`: 
```js
export const sum
  = (...a: number[]) =>
    a.reduce((acc, val) => acc + val, 0);
```

* A simple `foo.test.ts`: 

```js
import { sum } from '../';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Notes: 
* Jest provides the global `test` function.
* Jest comes prebuilt with assertions in the form of the global `expect`.

### Example async
Jest has built-in async/await support. e.g. 

```js
test('basic',async () => {
  expect(sum()).toBe(0);
});

test('basic again', async () => {
  expect(sum(1, 2)).toBe(3);
}, 1000 /* optional timeout */);
```


## Reasons why we like jest 
> [For details on these features see jest website](http://facebook.github.io/jest/)

* Built-in assertion library. 
* Great TypeScript support.
* Very reliable test watcher.
* Snapshot testing.
* Built-in coverage reports.
* Built-in async/await support.

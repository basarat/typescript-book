## Build Toggles

It is common to switch in JavaScript projects based on where they are being run. You can do this quite easily with webpack as its supports *dead code elimination* based on environment variables.

Add different targets in your `package.json` `scripts`:

```json
"build:test": "webpack -p --config ./src/webpack.config.js",
"build:prod": "webpack -p --define process.env.NODE_ENV='\"production\"' --config ./src/webpack.config.js",
```

Of course I am assuming you have `npm install webpack --save-dev`. Now you can run `npm run build:test` etc.

Using this variable is super easy as well:

```ts
/**
 * This interface makes sure we don't miss adding a property to both `prod` and `test`
 */
interface Config {
  someItem: string;
}

/**
 * We only export a single thing. The config.
 */
export let config: Config;

/**
 * `process.env.NODE_ENV` definition is driven from webpack
 *
 * The whole `else` block will be removed in the emitted JavaScript
 *  for a production build
 */
if (process.env.NODE_ENV === 'production') {
  config = {
    someItem: 'prod'
  }
  console.log('Running in prod');
} else {
  config = {
    someItem: 'test'
  }
  console.log('Running in test');
}
```

> We use `process.env.NODE_ENV` just because it is conventional in a lot of JavaScript libraries themselves e.g. `React`.

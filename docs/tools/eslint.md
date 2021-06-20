# ESLint

ESLint existed to lint JavaScript, but now it is also becoming the defacto linter for [TypeScript](https://github.com/Microsoft/TypeScript/issues/29288), thanks to the [collaboration](https://eslint.org/blog/2019/01/future-typescript-eslint) between the two teams.

## Install

To setup ESLint for TypeScript you need the following packages:

```sh
npm i eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> TIP: eslint calls packages that contain lint rules as "plugin"

* eslint : Core eslint 
* eslint-plugin-react : For react rules provided by eslint. [Supported rules list](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)
* @typescript-eslint/parse : To allow eslint to understand ts / tsx files 
* @typescript-eslint/eslint-plugin : For TypeScript rules. [Supported rules list](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)

> As you can see there are two eslint packages (for use with js or ts) and two @typescript-eslint packages (for use with ts). So the overhead for TypeScript is not *that much*.

## Configure 
Create `.eslintrc.js`: 

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules:  {
    // Overwrite rules specified from the extended configs e.g. 
    // "@typescript-eslint/explicit-function-return-type": "off",
  }
}
```

## Run

In your `package.json` add to `scripts`: 

```json
{
  "scripts": {
    "lint": "eslint \"src/**\""
  }
}
```

Now you can `npm run lint` to validate.

## Configure VSCode 

* Install extension https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Add to `settings.json`:
```js
"eslint.validate":  [
  "javascript",
  "javascriptreact",
  {"language":  "typescript",  "autoFix":  true  },
  {"language":  "typescriptreact",  "autoFix":  true  }
],
```

# NPM 

> Fun fact `npm` is [not an acronym](https://twitter.com/npmjs/status/347057301401763840) so it doesn't expand to anything, but among friends it is commonly called `node package manager`.

`npm` is a binary that comes with default `node` installations used to manage community shared JavaScript / TypeScript packages.


* NPM packages are hosted at (and installed from) https://www.npmjs.com/ (the ☁️).

## Quick common setup

* npm packages are configured using `package.json` file. You can generate a quick file using `npm init -y`.
* packages get installed into a `./node_modules` folder. You normally have this folder in your `.gitignore`.

> Even though you might be building an application, having a `package.json` essentially makes your project a package as well. So the terms your `project | package` can be used interchangeably.

When you checkout someone's (your team's) package, it will have a `package.json` that will list the dependencies you need to run the project. You simply run `npm install` and npm will bring them down from the cloud ☁️.
 
## Installing a package
You can run `npm install <something>`. Most people will use the shorthand `npm i <something>` e.g. 

```ts
// Install react
npm i react
```

> This will also automatically add `react` into your `package.json`'s `dependencies`.

## Installing a devDependency
`devDependencies` are dependencies that are only required during *development* if your project and not required after deployment. 

`typescript` is common in `devDependencies` as its only required to build `.ts -> .js`. You normally deploy the built `.js` files:

* into production  
* OR for consumption by other other npm packages

## Security
The public `npm` packages are scanned by security team worldwide and issues get reported to npm team. They then release security advisories detailing the issue and potential fixes. Commonly the fix is simply updating the package. 

You can run an audit on your node project by simply running `npm audit`. This will highlight any vulnerabilities that might exist in the package / dependencies of the package. e.g. 

```
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Low           │ Regular Expression Denial of Service                         │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ debug                                                        │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ jest [dev]                                                   │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ jest > jest-cli > istanbul-lib-source-maps > debug           │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/534                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
```

Note that commonly the issues are found in *development* dependencies (e.g. jest in this case). Since these aren't are a part of your production deployments, most likely your production application is not vulnerable. But still good practice to keep vulnerabilities to `0`.

Simply add `npm audit` (the command exist with error code `1` in case of error) as a part of your deployment to ensure the projects stay up to date.

## NPM Scripts 

### What is with `--` in scripts 
You can build a base script with a limited set of command line arguments e.g. here is a script target that runs `tsc` for the TypeScript compiler: 

```json
{
  "scripts": {
    "build": "tsc -p ."
  }
}
```

You can create a `build:watch` target to run `tsc -p . -w` or alternatively asking npm to run `build` with the additional `-w` flag like so: 

```json
{
  "scripts": {
    "build": "tsc -p .",
    "build:watch": "npm run build -- -w"
  }
}
```
You can pass in as many flags as you want after `--` e.g. in the following example `build:more` has the same effect as `something --foo -f -d --bar`

```json
{
  "scripts": {
    "build": "something --foo",
    "build:more": "npm run build -- -f -d --bar"
  }
}
```

## Public vs. Private packages
You don't need this when *using* any of the common public npm packages. Just know its there for enterprise / commercial customers.

### Public packages
* Packages are public by default. 
* Anyone can deploy a package to npm. 
* You just need an account (which you can get for free).
 
No one needs an account to download a public package. 

This free sharing of packages is one of the key reasons of success for npm 🌹.

### Private packages 

If you want a private package for your company / team / enterprise you need to sign up to a paid plan, details here : https://www.npmjs.com/pricing

Of-course you need an account with the right permissions to download a private package.
 
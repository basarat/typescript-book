# NTypeScript

[![BuildStatus](https://travis-ci.org/TypeStrong/ntypescript.svg)](https://travis-ci.org/TypeStrong/ntypescript)

Nightly build snapshots of [Microsoft/TypeScript](https://github.com/Microsoft/TypeScript).

Niceties:

* Consistent side by side usage (just add an `n` prefix): `require('ntypescript')`, `ntsc`, `ntsserver`
* `package.json` links you to typescript definitions (using `typescript.definition` entry)
* We expose the internal APIs (the ones that have `/* internal */`)
* We expose the global `ts` variable. Just `require('ntypescript')` once and start using `ts` like you are in the actual compiler source code.
* More frequent releases

## Install
Similar to `typescript` you can install and use `ntypescript` globally:

``` sh
npm install ntypescript -g
```

or in your package.json

```sh
npm install ntypescript@latest --save --save-exact
```

Each release is named after the day it was built and the git commit hash in Microsoft/TypeScript/master that it was built from. We recommend adding `save-exact` as there are no guarantees on when stuff might break and you want your users to get the same version you tested.

## Usage

### Globally
You can use `ntsc` and the `ntsserver` command line tools.

### Require
Use `require('ntypescript')`

### Global `ts`
In addition to returning what `typescript` returns we also expose `ts` as a global.

```ts
declare var require: any;
require('ntypescript');
console.log(ts.createScanner);
```
Which makes it easy to use the compiler API if you are using it heavily. Note you only need to `require` *once* from any file.

### Replace TypeScript
For `require('typescript')` you can do that quite simply using your package.json: 

```json
"dependencies": {
    "typescript": "https://github.com/basarat/ntypescript/tarball/<release name>"
}
```
Release name example : `1.201506301047.1+e1c9d28cb0706f81c14ca95b92fa3e2a223cc60b`

### Grunt
This project comes with a built in `grunt` task called `ntypescript`. Just has just one *task* level option: 

* `project` : path to the project directory i.e. the *directory* that contains `tsconfig.json`.

Here is a sample `Gruntfile.js` for usage:

```ts
module.exports = function(grunt) {    
    grunt.loadNpmTasks('ntypescript');
    
    grunt.initConfig({
        ntypescript: {
            options: {
                project: '.'
            }
        },
    });

    grunt.registerTask('default', ['ntypescript']);
};
```

# About
Note that this is a personal endeavor, not officially by Microsoft.

### Basic

필요한 기본 파일로 tsconfig.json을 시작하는 것이 가장 쉽습니다.

```json
{}
```

예: 프로젝트 최상단에 하나의 빈 JSON 파일 생성. 이런식으로 타입스크립트는 폴더에 컴파일 컨텍스트의 일부로 `.ts` 파일을 전부 포함시킵니다. 또한 몇가지 정상적인 기본 컴파일러 옵션을 선택합니다.

### compilerOptions

당신이 원하는대로 컴파일 옵션을 `compilerOptions`을 이용하여 지정할 수 있습니다.

```json
{
    "compilerOptions": {
        /* Basic Options */

        "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */,
        "module": "commonjs" /* Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */,
        "lib": [] /* Specify library files to be included in the compilation:  */,
        "allowJs": true /* Allow JavaScript files to be compiled. */,
        "checkJs": true /* Report errors in .js files. */,
        "jsx": "preserve" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
        "declaration": true /* Generates corresponding '.d.ts' file. */,
        "sourceMap": true /* Generates corresponding '.map' file. */,
        "outFile": "./" /* Concatenate and emit output to single file. */,
        "outDir": "./" /* Redirect output structure to the directory. */,
        "rootDir": "./" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
        "removeComments": true /* Do not emit comments to output. */,
        "noEmit": true /* Do not emit outputs. */,
        "importHelpers": true /* Import emit helpers from 'tslib'. */,
        "downlevelIteration": true /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */,
        "isolatedModules": true /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */,

        /* Strict Type-Checking Options */

        "strict": true /* Enable all strict type-checking options. */,
        "noImplicitAny": true /* Raise error on expressions and declarations with an implied 'any' type. */,
        "strictNullChecks": true /* Enable strict null checks. */,
        "noImplicitThis": true /* Raise error on 'this' expressions with an implied 'any' type. */,
        "alwaysStrict": true /* Parse in strict mode and emit "use strict" for each source file. */,

        /* Additional Checks */

        "noUnusedLocals": true /* Report errors on unused locals. */,
        "noUnusedParameters": true /* Report errors on unused parameters. */,
        "noImplicitReturns": true /* Report error when not all code paths in function return a value. */,
        "noFallthroughCasesInSwitch": true /* Report errors for fallthrough cases in switch statement. */,

        /* Module Resolution Options */

        "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
        "baseUrl": "./" /* Base directory to resolve non-absolute module names. */,
        "paths": {} /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */,
        "rootDirs": [] /* List of root folders whose combined content represents the structure of the project at runtime. */,
        "typeRoots": [] /* List of folders to include type definitions from. */,
        "types": [] /* Type declaration files to be included in compilation. */,
        "allowSyntheticDefaultImports": true /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */,

        /* Source Map Options */

        "sourceRoot": "./" /* Specify the location where debugger should locate TypeScript files instead of source locations. */,
        "mapRoot": "./" /* Specify the location where debugger should locate map files instead of generated locations. */,
        "inlineSourceMap": true /* Emit a single file with source maps instead of having a separate file. */,
        "inlineSources": true /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */,

        /* Experimental Options */

        "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
        "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */
    }
}
```

이러한 컴파일러 옵션은 추후에 의논해야 합니다.

### TypeScript compiler

좋은 IDE는 `ts를`를 `js`로 컴파일합니다. 그러나 `tsconfig.json`을 사용할 때 타입스크립트를 수동으로 컴파일하고 싶다면 당신에게 몇가지 방법이 있습니다.

-   `tsc`만 실행하면 현재폴더와 모든 상위폴더에서 `tsconfig.json`를 찾습니다.
-   `tsc -p ./path-to-project-directory`를 실행하십시요. 물론 경로는 상대경로 또는 절대경로일 수 있습니다.

당신은 타입스크립트 컴파일러를 시작할때 `tsc -w`로 _watch_ 모드를 사용할 수 있습니다. 이것은 타입스크립트 프로젝트 파일들의 변경사항을 볼 수 있습니다.

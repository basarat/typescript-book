## Dynamic import expressions

**동적 표현식 가져오기**는 **ECMAScript**의 새로운 기능으로 프로그램의 임의의 지점에서 사용자가 비동기적으로 모듈을 요청할 수 있도록 합니다.
**TC39** 자바스크립트 위원회는 3단계에 있는 제안서가 있으며 그것은 [자바스크립트에 import()를 제안](https://github.com/tc39/proposal-dynamic-import).

그 대신에, **webpack** 번들러의 특징중 하나는 [**코드 스플리팅**](https://webpack.js.org/guides/code-splitting/)을 허용하고 당신이 번들한 덩어리로 분할하여 나중에 비동기로 다운로드 할 수 있습니다.
다음 사례의 경우는 최소 부트스트랩 번들을 먼저 제공하고 나중에 추가기능을 비동기로 로드할 수 있습니다.

그것은 자연스러운 생각입니다 (만약 우리가 웹팩을 외부에서 구축한다면) [타입스크립트 2.4 동적 표현식 가져오기](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#dynamic-import-expressions)을 번들 덩어리를 **자동으로 생성** 하고 JS 최종 번들을 자동으로 코드 분할합니다. 그러나 그것은 우리가 작업하는 \*\*tsconfig.json 형태\*\* 에 의존하기 때문에 쉬운일이 아닙니다.

웹팩은 코드 분할중에 두개 이상의 유사한 기술을 사용할 수 있습니다. **import()** (ECMAScript에서 우선적으로 제안) 그리고 **require.ensure()** (오래된 웹팩 스펙) 그리고 예상한대로 타입스크립트는 무엇이든 **import()문을 남겨둔 상태** 로 트랜스파일 합니다.

타입스크립트 2.4 + 웹팩을 구성하는 방법을 한번 살펴보겠습니다.

나는 **_moment_ 라이브러리를 lazy 로드** 하고 싶지만 코드 스플리팅에도 관심이 있습니다. 즉 필요할때만 로드되는 별도의 JS 청크에 moment 라이브러리가 있음을 의미합니다.

```ts
import(/* webpackChunkName: "momentjs" */ 'moment')
    .then(moment => {
        // lazyModule has all of the proper types, autocomplete works,
        // type checking works, code references work \o/
        const time = moment().format()
        console.log('TypeScript >= 2.4.0 Dynamic Import Expression:')
        console.log(time)
    })
    .catch(err => {
        console.log('Failed to load moment', err)
    })
```

Here is the tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "lib": ["dom", "es5", "scripthost", "es2015.promise"],
        "jsx": "react",
        "declaration": false,
        "sourceMap": true,
        "outDir": "./dist/js",
        "strict": true,
        "moduleResolution": "node",
        "typeRoots": ["./node_modules/@types"],
        "types": ["node", "react", "react-dom"]
    }
}
```

**중요한 메모**:

-   **"module": "esnext"** 을 사용하면 타입스크립트는 웹팩 코드 스플리팅에 입력 할 import()를 흉내내서 생성합니다.
-   자세한 내용을 보려면 여기를 클릭하십시요. [webpack 2의 동적 표현식 가져오기와 코드 스플리팅 통합 그리고 타입스크립트 2.4](https://blog.josequinto.com/2017/06/29/dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4/).

당신이 볼 수 있는 전체 예제 [여기를 클릭](https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/dynamic-import-expressions/dynamicImportExpression.js)

# global.d.ts

우리는 전역 vs 파일을 언제 모듈화를 해야하는지에 대해서 논의했습니다.[projects](./modules.md) 파일을 기본으로 모듈을 사용하는 것을 추천합니다. 이것은 전역을 오염시키지 않습니다.

그렇기는하지만, 만약 당신이 타입스크립트 개발자로 시작한다면 globals.d.ts파일을 주고 싶습니다. 이것은 interfaces / types 를 전역 네임스페이스로 어떤 타입이든 쉽게 생성하도록 해주고 타입스크립트 코드에서 타입을 쉽게 사용할 수 있도록 해줍니다.

`global.d.ts` 파일은 또 Webpack의 표준 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 플러그인을 사용하여 소스 코드에 삽입시킬 수 있는 컴파일 시간 상수를 선언하는 용도로 사용할 수 있습니다.

```ts
declare const BUILD_MODE_PRODUCTION: boolean; // 조건부 컴파일 용으로 사용할 수 있음
declare const BUILD_VERSION: string;
```

> *JavaScript*로 생성할 모든 코드에 대해서는 *파일 모듈*을 사용하고, 컴파일 시간 상수를 선언 그리고/또는 `lib.d.ts`에 선언되어 있는 표준 타입 선언을 확장할 때는 `global.d.ts`를 사용할 것을 권장합니다.

* 보너스: `global.d.ts` JS to TS 마이그레이션을 할 때 빠르게 `declare module "선언을-찾아보기-귀찮은-어떤-라이브러리";` 하는 용도로 사용할 수도 있습니다.

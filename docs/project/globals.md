# global.d.ts

우리는 전역 vs 파일을 언제 모듈화를 해야하는지에 대해서 논의했습니다.[projects](./modules.md) 파일을 기본으로 모듈을 사용하는 것을 추천합니다. 이것은 전역을 오염시키지 않습니다.

그렇기는 하지만, 만약 당신이 타입스크립트 초보자들과 함께 일해야 하다면 그들에게 `globals.d.ts` 파일을 주고 그 안에 전역 이름 공간의 인터페이스 / 타입들을 넣어서 *전체* TypeScript 코드에서 특정 *타입* 들이 *마법처럼* 나타나게 할 수 있습니다.

`global.d.ts` 파일이 사용되는 또 다른 경우는 Wepack 표준 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 플러그인을 통해 소스 코드에 삽입되는 컴파일 타임 상수들을 선언하는 용도입니다.

```ts
declare const BUILD_MODE_PRODUCTION: boolean; // 조건부 컴파일에 사용될 수 있음
declare const BUILD_VERSION: string;
```

> *JavaScript*가 생성될 모든 코드에 대해서는 *파일 모듈* 을 사용하고, `global.d.ts` 는 컴파일 타임 상수 그리고/또는 `lib.d.ts` 에 선언되어 있는 표준 타입 선언을 확장하는 용도로만 사용할 것을 강력히 권고합니다.

* 보너스: `global.d.ts` 파일은 JS를 TS로 이식하는 작업을 할 때 빠르게 `declare module "some-library-you-dont-care-to-get-defs-for";` 하는 용도로 사용하기에도 좋습니다.

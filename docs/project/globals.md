# globals.d.ts

우리는 전역 vs 파일을 언제 모듈화를 해야하는지에 대해서 논의했습니다.[projects](./modules.md) 파일을 기본으로 모듈을 사용하는 것을 추천합니다. 이것은 전역을 오염시키지 않습니다.

그렇기는하지만, 만약 당신이 타입스크립트 개발자로 시작한다면 `globals.d.ts`파일을 주고 싶습니다. 이것은 interfaces / types 를 전역 네임스페이스로 어떤 타입이든 쉽게 생성하도록 해주고 타입스크립트 코드에서 타입을 쉽게 사용할 수 있도록 해줍니다.

> 모든 코드는 자바스크립트로 생성되고 파일 모듈을 사용하는걸 매우 추천합니다.

-   `globals.d.ts`는 만약 필요하다면 `lib.d.ts`에 확장해서 추가할때 유용합니다.
-   `declare module "some-library-you-dont-care-to-get-defs-for";`은 JS를 TS로 마이그레이션하는 빠르고 좋은 방법입니다.

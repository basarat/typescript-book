### Variables
예를 들어 타입스크립트에게 [`process` 변수](https://nodejs.org/api/process.html) 에 대해 알려주기 위해 이렇게 할 수 있습니다:

```ts
declare var process: any;
```

> 하지만 [커뮤니티에서 `node.d.ts` 를 관리하고 있기 때문에](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts) `process` 에 대해서 이런 식으로 정의할 필요가 없습니다.

따라서 `process` 변수를 Typescript 에서 따로 선언하지 않고 사용할 수 있습니다:

```ts
process.exit();
```

우리는 아래와 같이 interface 를 쓰는 것을 추천합니다:

```ts
interface Process {
    exit(code?: number): void;
}
declare var process: Process;
```

이는 글로벌 변수들을 *extend* 할 수 있게 하면서도, 타입스크립트가 글로벌 변수의 변경사항에 대해 알 수 있게 합니다. 예를 들어, 다음의 예제는 필요에 의해 process 에 `exitWithLogging` 함수를 추가한 예제입니다:

```ts
interface Process {
    exitWithLogging(code?: number): void;
}
process.exitWithLogging = function() {
    console.log("exiting");
    process.exit.apply(process, arguments);
};
```

인터페이스에 대해서는 뒤에서 자세히 다루도록 하겠습니다.

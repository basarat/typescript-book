## 배럴(Barrel)

배럴은 여러 모듈의 익스포트를 편리하게 하나의 모듈로 모으는 방법입니다. 배럴은 다른 모듈의 익스포트를 모아서 다시 익스포트하는 모듈 파일입니다.

라이브러리에 다음과 같은 클래스 구조가 있다고 생각해보세요: 

```ts
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export class Baz {}
```

배럴이 없으면 다음과 같이 세 번 임포트해야 합니다:

```ts
import { Foo } from '../demo/foo';
import { Bar } from '../demo/bar';
import { Baz } from '../demo/baz';
```

대신 `demo/index.ts` 라는 배럴을 다음과 같은 내용으로 만들 수 있습니다: 

```ts
// demo/index.ts
export * from './foo'; // 이 모듈의 모든 익스포트를 다시 익스포트
export * from './bar'; // 이 모듈의 모든 익스포트를 다시 익스포트
export * from './baz'; // 이 모듈의 모든 익스포트를 다시 익스포트
```

이제 사용자는 필요한 것들을 배럴로부터 임포트할 수 있습니다:

```ts
import { Foo, Bar, Baz } from '../demo'; // demo/index.ts 를 가리킴
```

### 이름 붙인 익스포트
익스포트를 `*` 로 하는 대신 이름을 붙여서 익스포트할 수 있습니다. 예를 들어 `baz.ts`에 다음과 같은 함수가 있다면:

```ts
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export function getBaz() {}
export function setBaz() {}
```

`getBaz` / `setBaz` 라고 익스포트하지 않고 변수에 담아서 익스포트하려면 아래 나온 것처럼 먼저 이름을 붙여서 임포트한 다음 익스포트하면 됩니다: 

```ts
// demo/index.ts
export * from './foo'; // 이 모듈의 모든 익스포트를 다시 익스포트
export * from './bar'; // 이 모듈의 모든 익스포트를 다시 익스포트

import * as baz from './baz'; // 이름으로 임포트
export { baz }; // 그 이름을 익스포트
```

다음과 같이 사용하게 됩니다: 

```ts
import { Foo, Bar, baz } from '../demo'; // demo/index.ts 를 가리킴

// usage
baz.getBaz();
baz.setBaz();
// etc. ...
```

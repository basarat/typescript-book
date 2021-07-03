## `export default` 에 대한 걱정

아래와 같은 내용으로 `foo.ts` 이란 파일이 있다고 생각해봅시다:

```ts
class Foo {
}
export default Foo;
```

이 내용은 아래처럼 ES6 구문으로 임포트할 수 있습니다 (`bar.ts` 모듈로):

```ts
import Foo from "./foo";
```

여기에는 유지보수 관점에서 몇가지 문제가 있습니다:
* `foo.ts` 에서 `Foo` 를 리팩토링하더라도 `bar.ts` 파일의 이름은 바뀌지 않습니다.
* `foo.ts` 에서 추가적인 내용을 익스포트해야 할 때 (많은 파일에서 이런 일이 발생할텐데) 임포트 구문을 가지고 씨름해야 합니다.

이런 이유 때문에 필자는 단순 익스포트 + 탈구조화된 임포트를 추천합니다, 예를 들어, `foo.ts`:

```ts
export class Foo {
}
```
그리고:

```ts
import { Foo } from "./foo";
```

아래에 몇가지 이유가 더 나와 있습니다.

### 발견성이 떨어짐
디폴트 익스포트를 사용하면 발견성이 매우 떨어집니다. 어떤 모듈에 디폴트 익스포트가 있는지 없는지 여부를 인텔리센스로 살펴볼 수도 없습니다.

디폴트 익스포트 방식이면 여기서 아무것도 알 수 없습니다 (디폴트 익스포트가 있을 수도 있고 / 아닐 수도 있음 `¯\_(ツ)_/¯`):
```
import /* here */ from 'something';
```

디폴트 익스포트를 사용하지 않으면 인텔리센스가 잘 작동합니다: 

```
import { /* here */ } from 'something';
```

### 자동완성 
익스포트에 신경쓰지 않는다 해도 `import {/*here*/} from "./foo";` 식의 코드는 커서를 올리면 자동 완성이 됩니다. 개발자들 손이 조금 편해지겠죠.

### CommonJS 연동
`default` 를 쓴 경우, commonJS 사용자들은 `const {Foo} = require('module/foo')` 대신 `const {default} = require('module/foo');` 를 써야하기 때문에 엄청 불편합니다. 이렇게 임포트하느니 차라리 `default` 를 다른 이름으로 바꾸고 싶어질 것입니다.

### 오타 방지
한 개발자는 `import Foo from "./foo";` 로 하고 다른 개발자는 `import foo from "./foo";` 로 하는 오타가 발생하지 않습니다.

### TypeScript 자동 임포트
자동 임포트 빠른 수정이 더 잘 동작합니다. `Foo` 를 입력하면 이 이름은 한 모듈에서 익스포트된 잘 정의된 이름으로 자동 임포트가 `import { Foo } from "./foo";` 를 추가해줍니다. 어떤 툴은 마법적으로 파일을 분석해서 디폴트 익스포트의 이름을 *추론* 해주기도 하는데, 마법은 불안하죠.

### 재익스포트
NPM 패키지의 루트 `index` 에서 재익스포트를 하는 경우가 많고, 이런 경우에는 디폴트 익스포트를 수동으로 바꿔줘야 합니다, 이렇게 `export { default as Foo } from "./foo";` (디폴트 사용) vs. 이렇게 `export * from "./foo"` (이름 붙인 익스포트).

### 동적 임포트
디폴트 익스포트는 동적 `import` 일 때 `default` 라는 안 좋은 이름이 붙게 됩니다, 예를 들어: 

```ts
const HighCharts = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
HighCharts.default.chart('container', { ... }); // `.default`가 붙음
```

이름 붙인 익스포트가 훨씬 보기 좋으: 

```ts
const {HighCharts} = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
HighCharts.chart('container', { ... }); // `.default` 안 붙음
```


### 클래스가 아닌 경우 / 함수가 아닌 경우 2줄 필요

함수 / 클래스를 한 문장으로 처리, 예: 

```ts
export default function foo() {
}
```

*이름 없는 / 타입 붙은* 객체를 한 문장으로 처리, 예: 

```ts
export default {
  notAFunction: 'Yeah, I am not a function or a class',
  soWhat: 'The export is now *removed* from the declaration'
};
```

그외에는 두 문장 필요:
```ts
// 로컬에서 사용하기 위해 이름을 붙이거나 (여기서는 `foo`) 타입을 붙여야 할 경우 (여기서는 `Foo`)
const foo: Foo = {
  notAFunction: 'Yeah, I am not a function or a class',
  soWhat: 'The export is now *removed* from the declaration'
};
export default foo;
```

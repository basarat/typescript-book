* [Generics](#generics)
* [동기와 예시](#동기와-예시)

## Generics

Generic의 주된 동기는 멤버 간에 의미 있는 타입 제약을 두기 위해서입니다. 타입 제약을 둘 수 있는 멤버는 다음과 같습니다:

* Class 인스턴스 멤버
* Class 메소드
* 함수 인자
* 함수 리턴 값

## 동기와 예시

간단한 `Queue`(FIFO) 데이터 구조를 만든다고 가정해봅시다. TypeScript/JavaScript로 만들 수 있는 가장 간단한 형태는 아래와 같을 것입니다:

```ts
class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}
```

그러나 위 같은 구현 방식은 한 가지 문제점이 있습니다. 사람들이 *아무 타입의 값을* queue에 추가할 수 있기 때문에, pop을 했을 때 받는 리턴 값 또한 *아무 타입이나* 될 수 있다는 것이죠. 이는 아래에서 확인 가능한데요, queue에서 실제로 사용하는 건 `number`뿐이지만, 누군가 마음만 먹으면 얼마든지 `string`을 푸시할 수 있습니다:

```ts
class Queue {
  private data = [];
  push(item) { this.data.push(item); }
  pop() { return this.data.shift(); }
}

const queue = new Queue();
queue.push(0);
queue.push("1"); // 헐 실수

// 그리고 개발자는 퇴근했습니다...
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR 💣
```

한 가지 해결책(사실 Generic을 지원하지 않는 언어에서는 유일한 솔루션이긴 합니다만)은 *특정* 클래스를 따로 만들어 타입의 제약 사항을 대응하는 것입니다. 예를 들어 빠르고 더럽게(quick and dirty) 만들 수 있는 `number` queue는 이런 모습이겠지요:

```ts
class QueueNumber extends Queue {
  push(item: number) { super.push(item); }
  pop(): number { return this.data.shift(); }
}

const queue = new QueueNumber();
queue.push(0);
queue.push("1"); // ERROR: string을 푸시할 수 없습니다. number만 푸시 가능합니다.

// ^ 위 에러만 수정되면 나머지는 자동으로 잘 작동할 것입니다.
```

물론 이런 방식은 단시간에 우리에게 빅 똥을 안겨 줄 것입니다. 만약 `string` queue가 필요한 상황이 발생하면, 우리는 `number` queue를 만든 과정과 동일한 작업을 또다시 반복해야 하기 때문입니다. 하지만 우리가 진짜 원하는 건 어떠한 타입을 *푸시*하더라도 *pop* 했을 때의 리턴 값이 푸시한 값과 동일한 타입이기를 보장받고 싶은 것 아니겠습니까! 이는 *Generic* 파라미터(아래 예시는 class 레벨에 해당)로 아주 간단하게 해결할 수 있습니다.

```ts
/** Generic 파라니터로 정의한 Class */
class Queue<T> {
  private data = [];
  push(item: T) { this.data.push(item); }
  pop(): T | undefined { return this.data.shift(); }
}

/** 예시*/
const queue = new Queue<number>();
queue.push(0);
queue.push("1"); // ERROR: string은 push할 수 없습니다. number만 허용됩니다.

// ^ 위 에러만 수정되면 나머지는 자동으로 잘 작동할 것입니다.
```

또 다른 예로 *reverse* 함수가 있습니다. reverse 함수의 제약 사항은 함수에 전달된 요소는 반드시 함수가 리턴하는 값이어야 한다는 것입니다.

```ts
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = '1';     // Error!
reversed = ['1', '2']; // Error!

reversed[0] = 1;       // ㅇㅋ
reversed = [1, 2];     // ㅇㅋ
```

이번 섹션에서 우리는 Generic이 *Class*와 *함수* 레벨에서 정의된 예시를 살펴보았습니다. 한 가지 사소하지만 언급할 가치가 있는 추가 사항이 있는데요, 바로 특정 멤버 함수만을 위한 Generic을 만들 수도 있다는 것입니다. 간단한 예시로 `Utility` class의 멤버 함수인 `reverse` 함수를 살펴보겠습니다.

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
      var toreturn = [];
      for (let i = items.length - 1; i >= 0; i--) {
          toreturn.push(items[i]);
      }
      return toreturn;
  }
}
```

> TIP: Generic 파라미터의 이름으로 원하는 대로 지정할 수 있습니다. 간단한 Generic을 정의할 때는 `T`, `U`, `V` 중 하나를 사용하는 것이 관례입니다. 만약 Generic 인자를 여러 개 사용할 경우에는 `TKey`, `TValue`와 같이 좀 더 명시적인 이름을 사용하도록 노력해보세요. (`T`를 Generic의 접두사로 사용하는 것이 관례이고 다른 언어에서는 이를 *템플릿*이라고 부릅니다.)


### 디자인 패턴: 편의성 제네릭(=Convenience generic)

다음 함수를 살펴보겠습니다:

```ts
declare function parse<T>(name: string): T;
```

이 경우 타입 `T`가 한 곳에서만 사용되는 걸 확인하실 수 있습니다. 즉 *멤버들 간의* 제약이 없다는 것이죠. 이는 타입 안정성이라는 측면에서 type assertion과 동일합니다.

```ts
declare function parse(name: string): any;

const something = parse('something') as TypeOfSomething;
```

한 번만 사용되는 Generic은 타입 안정성이란 측면에서는 type assertion보다 딱히 더 나은 점이 없습니다. (그러나) Generic은 API에 *편의성*을 제공합니다.

좀 더 명백한 예로는 json response를 로드하는 함수를 들 수 있습니다. 그 함수는 *당신이 어떤 타입을 전달하든지 간에* 해당 타입의 Promise를 리턴합니다:


```ts
const getJSON = <T>(config: {
    url: string,
    headers?: { [key: string]: string },
  }): Promise<T> => {
    const fetchConfig = ({
      method: 'GET',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(config.headers || {})
    });
    return fetch(config.url, fetchConfig)
      .then<T>(response => response.json());
  }
```

여전히 어떤 타입을 원하는지 주석을 명시적으로 달아야 하긴 하지만, `getJSON<T>` 시그니처 `(config) => Promise<T>`를 사용하면 타이핑을 덜 할 수 있다는 장점이 있습니다. (`loadUsers`의 리턴 타입은 타입 추론이 가능해 주석을 달 필요가 없기 때문입니다.)

```ts
type LoadUsersResponse = {
  users: {
    name: string;
    email: string;
  }[]; // user 객체의 배열
}
function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' });
}
```

그리고 `Promise<T>`를 리턴 값으로 정의하는 것이 `Promise<any>`를 사용하는 것보다 훨씬 낫습니다.

또 다른 예시로 Generic이 함수 인자로만 사용되는 경우가 있습니다:

```ts
declare function send<T>(arg: T): void;
```

Here the generic `T` can be used to annote the type that you want the argument to match e.g.

여기서 Generic `T`는 원하는 인자의 타입에 대한 주석을 다는 데 사용될 수도 있습니다. 가령:

```ts
send<Something>({
  x:123,
  // 또한 자동 완성기능이 가능하죠
}); // `x:123`가 `Something`에서 기대했던 구조와 다를 경우 TSError가 발생합니다.
```

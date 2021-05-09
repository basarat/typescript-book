# 믹스인(Mixin)

TypeScript (그리고 JavaScript) 클래스는 엄격하게 단일 상속만 지원합니다. 그래서 아래와 같이 *할 수 없습니다*:

```ts
class User extends Tagged, Timestamped { // 오류 : 다중 상속 불가
}
```

재사용 가능한 구성요소로 클래스를 구성하는 다른 방법은 믹스인(mixin)이라 부르는 간단한 부분 클래스들로 클래스를 구성/조립하는 것입니다.

아이디어는 단순한데, *클래스 A가 클래스 B를 확장* 해서 그 기능을 받는 것이 아니라 *함수 B가 클래스 A* 를 받고 기능이 추가된 새 클래스를 반환하는 것입니다. 함수 `B`가 믹스인입니다.

> 믹스인은 다음과 같은 함수입니다
>
> 1. 생성자(constructor)를 받음,
> 1. 생성자 확장하여 새 기능을 추가한 클래스 생성
> 1. 새 클래스 반환

전체 내용이 나오는 예제

```ts
// 모든 믹스인에 필요
type Constructor<T = {}> = new (...args: any[]) => T;

////////////////////
// 예제 믹스인
////////////////////

// 속성을 추가하는 믹스인
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 속성과 메소드를 추가하는 믹스인
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

////////////////////
// 클래스를 조립하는 예제
////////////////////

// 간단한 클래스
class User {
  name = '';
}

// Timestamped 적용된 User
const TimestampedUser = Timestamped(User);

// Timestamped와 Activatable이 적용된 User
const TimestampedActivatableUser = Timestamped(Activatable(User));

////////////////////
// 조립된 클래스 사용
////////////////////

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableUserExample = new TimestampedActivatableUser();
console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);

```

이 예제를 분해해봅시다.

## 생성자를 받음

믹스인은 클래스를 받고 새 기능을 더해서 확장시킵니다. 그러므로 무엇이 *생성자(constructor)* 인지 정해야 합니다. 쉬움:

```ts
// 모든 믹스인에 필요
type Constructor<T = {}> = new (...args: any[]) => T;
```

## 클래스를 확장하여 반환

아주 쉬움:

```ts
// 속성을 추가하는 믹스인
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```

이게 전부입니다 🌹

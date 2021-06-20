* [타입-호환성](#타입-호환성)
* [건강성](#건강성)
* [구조적](#구조적)
* [제네릭(Generics)](#제네릭(Generics))
* [변형성(Variance)](#변형성(Variance))
* [함수](#함수)
  * [리턴 타입](#리턴-타입)
  * [인자 갯수](#인자-갯수)
  * [선택적 파라미터와 나머지 파라미터](#선택적-파라미터와-나머지-파라미터)
  * [인자의 타입](#인자의-타입)
* [열거형(Enums)](#열거형(Enums))
* [클래스](#클래스)
* [제네릭(Generics)](#제네릭(Generics))
* [각주: 불변형성(Invariance)](#각주-불변형성(Invariance))

## 타입 호환성

여기서 다루는 타입 호환성은 어떤 것이 다른 것에 할당될 수 있는지 판단하는 것을 말합니다. 예를 들어, `string`과 `number`는 호환되지 않습니다:

```ts
let str: string = "Hello";
let num: number = 123;

str = num; // ERROR: `number` is not assignable to `string`
num = str; // ERROR: `string` is not assignable to `number`
```

## 건강성

TypeScript의 타입 시스템은 간편하도록 설계되었지만 *건강하지 못한* 행위도 허용하며, 예를 들어 `any`에는 무엇이든 할당할 수 있고, 이것은 컴파일러에게 내 마음대로 하고 싶다고 말하는 것과 같습니다:

```ts
let foo: any = 123;
foo = "Hello";

// 그러고 나서
foo.toPrecision(3); // `any` 타입을 썼기 때문에 허용됨
```

## 구조적

TypeScript 객체는 구조적으로 타입이 정해집니다. 이것은 구조가 일치한다면 *이름*이 달라도 문제가 되지 않는 것을 말합니다.

```ts
interface Point {
    x: number,
    y: number
}

class Point2D {
    constructor(public x:number, public y:number){}
}

let p: Point;
// 오케이, 구조적으로 타입이 정해지기 때문에
p = new Point2D(1,2);
```

이 덕택에 바닐라 JS에서처럼 즉석에서 객체를 만들 수 있으면서도 타입 추론이 가능할 때 안전성을 얻을 수 있습니다.

또한 *더 많은* 데이터는 괜찮은 것으로 간주됩니다:

```ts
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* 내용이 있다고 가정 */ }

iTakePoint2D(point2D); // 정확하게 일치, 오케이
iTakePoint2D(point3D); // 추가 정보, 오케이
iTakePoint2D({ x: 0 }); // 오류: `y` 정보 없음
```

## 변형성(Variance)

변형성은 쉽게 이해할 수 있고 타입 호환성을 분석할 때 매우 중요한 개념입니다.

간단한 타입 `Base`와 `Child`가 있다고 했을 때, `Child`가 `Base`의 자식 타입이라면, `Child`의 개체를 `Base` 타입을 갖는 변수에 할당할 수 있습니다.

> 이것이 다형성(polymorphism) 101 입니다

> (역주: 보통 한 과목의 가장 기초가 되는 강의의 강의번호가 101이므로, 가장 기초라는 뜻)

이 `Base`와 `Child` 타입으로 구성된 복합 타입의 호환성은 비슷한 시나리오의 `Base`와 `Child`가 어떤 *변형성(variance)* 에 따라 작동하는지에 따라 달라집니다.

* 공변형(Covariant) : (co, 또는 조인트) *같은* 방향만 가능
* 반변형(Contravariant) : (contra 또는 네거티브) *반대* 방향만 가능
* 양변형(Bivariant) : (bi 또는 둘 다) co, contra 둘 다 가능.
* 불변형(Invariant) : 완전히 일치하는 타입이 아니면 호환되지 않음

> 참고: JavaScript와 같이 변경 가능한 데이터가 존재할 때 완전하게 건강한 타입 시스템을 만들려면 불변형(`invariant`)이 유일하게 유효한 선택지입니다. 하지만 앞서 말한 *편리함* 때문에 건강하지 못한 방식도 선택되었습니다.

## 함수

두 개의 함수를 비교할 때 몇가지 미묘한 고려사항이 있습니다.

### 리턴 타입

양변형(`covariant`): 리턴 타입은 최소한 데이터를 부족하지 않게 담고 있어야 합니다.

```ts
/** 타입 계층 */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** 두 개의 샘플 함수 */
let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

/** 할당 */
iMakePoint2D = iMakePoint3D; // 오케이
iMakePoint3D = iMakePoint2D; // 오류: Point2D를 Point3D에 할당할 수 없음
```

### 인자 갯수

인자 갯수가 더 적은 것은 괜찮습니다 (즉, 함수는 추가적인 파라미터를 무시할 수 있음). 어쨌든 함수 동작에 필요한 인자는 모두 충분히 제공될 것이니까요.

```ts
let iTakeSomethingAndPassItAnErr
    = (x: (err: Error, data: any) => void) => { /* 내용이 있다고 가정 */ };

iTakeSomethingAndPassItAnErr(() => null) // 오케이
iTakeSomethingAndPassItAnErr((err) => null) // 오케이
iTakeSomethingAndPassItAnErr((err, data) => null) // 오케이

// 오류: 타입이 '(err: any, data: any, more: any) => null'인 인자는 타입이 '(err: Error, data: any) => void'인 파라미터로 할당할 수 없음
iTakeSomethingAndPassItAnErr((err, data, more) => null);
```

### 선택적 파라미터와 나머지 피라미터

갯수가 정해져 있는 선택적(Optional) 파라미터와 나머지(Rest) 파라미터(임의 갯수의 인자)는 서로 호환됩니다, 마찬가지로 편리성을 위해.

```ts
let foo = (x:number, y: number) => { /* 내용이 있다고 가정 */ }
let bar = (x?:number, y?: number) => { /* 내용이 있다고 가정 */ }
let bas = (...args: number[]) => { /* 내용이 있다고 가정 */ }

foo = bar = bas;
bas = bar = foo;
```

> 참고: 선택적 파라미터 (예제에서 `bar`) 와 비선택적 파라미터 (예제에서 `foo`) 는 strictNullChecks이 꺼져 있는 경우에만 호환 가능합니다.

### 인자의 타입

양변형(`bivariant`) : 일반적인 이벤트 핸들러 시나리오를 지원할 수 있도록 설계됨

```ts
/** 이벤트 계층 */
interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

/** 샘플 이벤트 리스너 */
enum EventType { Mouse, Keyboard }
function addEventListener(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// 건겅하지 않음, 하지만 실용적이고 일반적. 함수 인자 비교가 양변형이므로 가능
addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// 건강성을 강요한다면 불편한 방식을 써야 함
addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

// 이건 허용되지 않음 (명확한 오류). 완전 별개의 타입 간에는 타입 안전성 강제됨
addEventListener(EventType.Mouse, (e: number) => console.log(e));
```

또한 `Array<Child>`을 `Array<Base>`에 할당하는 것도 허용됩니다 (공변형), 함수가 호환되니까요. 배열의 공변형성(covariance)은 `Array<Child>`의 모든 함수가 `Array<Base>`에 할당 가능한 경우입니다. 즉, `push(t:Child)`를 `push(t:Base)`에 할당할 수 있어야 하고, 함수 인자의 양변형성(bivariance)이 이것을 허용합니다.

**다른 언어 사용자들이 이것 때문에 혼란**스러울 수도 있습니다. 아래에서 오류가 발생할 것이라 생각하지만 TypeScript에서는 오류가 발생하지 않으니까요.

```ts
/** 타입 계층 */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** 두 개의 샘플 함수 */
let iTakePoint2D = (point: Point2D) => { /* 내용이 있다고 가정 */ }
let iTakePoint3D = (point: Point3D) => { /* 내용이 있다고 가정 */ }

iTakePoint3D = iTakePoint2D; // 오케이 : 이해됨
iTakePoint2D = iTakePoint3D; // 오케이 : 이해 안 됨
```

## 열거형(Enums)

* 열거형은 숫자(number)와 호환되고 숫자는 열거형과 호환됩니다.

```ts
enum Status { Ready, Waiting };

let status = Status.Ready;
let num = 0;

status = num; // 오케이
num = status; // 오케이
```

* 서로 다른 열거형 타입의 열거 값은 서로 호환되지 않는 것으로 간주됩니다. 이것은 열거형을 *정형화된* 방식으로 사용하게 만듭니다 (구조적인 방식이 아니라)

```ts
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
let color = Color.Red;

status = color; // 오류
```

## 클래스

* 개체의 멤버와 메소드만 비교됩니다. 생성자(constructor)와 정적(static) 멤버는 무관합니다.

```ts
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { /** 내용이 있다고 가정 */ }
}

class Size {
    feet: number;
    constructor(meters: number) { /** 내용이 있다고 가정 */ }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```

* `private` 및 `protected` 멤버는 *반드시 동일 클래스*에서 온 것이어야 합니다. 이런 멤버가 존재하는 클래스는 사실 상 *정형(nominal)* 이 됩니다.

```ts
/** 클래스 계층 */
class Animal { protected feet: number; }
class Cat extends Animal { }

let animal: Animal;
let cat: Cat;

animal = cat; // OKAY
cat = animal; // OKAY

/** 모양은 Animal과 동일 */
class Size { protected feet: number; }

let size: Size;

animal = size; // 오류
size = animal; // 오류
```

## 제네릭(Generics)

TypeScript는 구조적 타입 시스템을 사용하므로, 타입 파라미터는 멤버로 사용되었을 때만 호환성에 영향을 미칩니다. 예를 들어, 아래에서 `T`는 호환성에 아무 영향을 미치지 않습니다:

```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // 오케이, y는 구조적으로 x와 일치
```

하지만 `T`가 사용되었다면, `T`는 어떻게 실체화되는지에 따라 호환성에 영향을 미치게 됩니다, 아래 처럼:

```ts
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // 오류, x와 y는 호환되지 않음
```

제네릭 인자가 아직 *실체화*되지 않았다면 인자를 `any`로 대치하여 타입 호환성을 검사합니다:

```ts
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // 오케이, (x: any)=>any 와 (y: any)=>any 가 일치
```

제네릭 클래스는 앞서 언급한 클래스 호환성에 따라 판단됩니다. 예를 들면:

```ts
class List<T> {
  add(val: T) { }
}

class Animal { name: string; }
class Cat extends Animal { meow() { } }

const animals = new List<Animal>();
animals.add(new Animal()); // 오케이
animals.add(new Cat()); // 오케이

const cats = new List<Cat>();
cats.add(new Animal()); // 오류
cats.add(new Cat()); // 오케이
```

## 각주: 불변형성(Invariance)

불변형성만이 건강한 시스템이라고 얘기했습니다. 여기 `contra`와 `co` 변형이 배열 사용을 위험하게 만드는 예제가 있습니다.

```ts
/** 계층 */
class Animal { constructor(public name: string){} }
class Cat extends Animal { meow() { } }

/** 각각의 항목 */
var animal = new Animal("animal");
var cat = new Cat("cat");

/**
 * 데모 : 다형성(polymorphism) 101
 * Animal <= Cat
 */
animal = cat; // 오케이
cat = animal; // 오류: cat은 animal을 확장

/** 변형을 보이기 위한 각각의 배열 */
let animalArr: Animal[] = [animal];
let catArr: Cat[] = [cat];

/**
 * 확실히 나쁨 : 공변형성(Contravariance)
 * Animal <= Cat
 * Animal[] >= Cat[]
 */
catArr = animalArr; // 공변형이므로 가능
catArr[0].meow(); // 허용되지만 런타임에 빵🔫


/**
 * 이것도 나쁩 : covariance
 * Animal <= Cat
 * Animal[] <= Cat[]
 */
animalArr = catArr; // 공변형이므로 가능
animalArr.push(new Animal('another animal')); // catArr에 Animal 추가!
catArr.forEach(c => c.meow()); // 허용되지만 런타임에 빵🔫
```

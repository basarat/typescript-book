### 클래스

자바스크립트의 클래스를 첫번째로 사용하는 게 중요한 이유는 다음과 같습니다.

1. [클래스는 구조적으로 유용한 추상화를 제공합니다.](./tips/classesAreUseful.md)
1. 개발자가 자신의 버전으로 올라오는 모든 프레임워크 대신 클레스를 사용할 수 있는 일관된 방법을 제공합니다.
1. 객체 지향 개발자는 이미 클래스를 이해하고 있습니다.

마지막으로 자바스크립트 개발자들은 포인트에 대해서 배울 수 있습니다.

```ts
class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y)
    }
}

var p1 = new Point(0, 10)
var p2 = new Point(10, 20)
var p3 = p1.add(p2) // {x:10,y:30}
```

이 클래스는 ES5에서 다음과 같은 자바스크립트를 생성합니다.

```ts
var Point = (function() {
    function Point(x, y) {
        this.x = x
        this.y = y
    }
    Point.prototype.add = function(point) {
        return new Point(this.x + point.x, this.y + point.y)
    }
    return Point
})()
```

이것은 일류 언어 구조로서 현재 상당히 관용적인 전통적인 자바스크립트 패턴이다.

### 상속

타입스크립트 클래스는 다른 언어들과 비슷합니다. 아래와 같이 `extends` 키워드를 지원하며 단일 상속을 허용합니다.

```ts
class Point3D extends Point {
    z: number
    constructor(x: number, y: number, z: number) {
        super(x, y)
        this.z = z
    }
    add(point: Point3D) {
        var point2D = super.add(point)
        return new Point3D(point2D.x, point2D.y, this.z + point.z)
    }
}
```

클래스에 생성자가 있는 경우 생성자에서 부모 생성자를 호출해야 합니다.(타입스크립트는 이를 사용자에게 알려줍니다.) 이렇게 하면 설정해야 하는 항목이 설정됩니다. `super`를 호출하면 수행할 작업을 추가할 수 있습니다.(여기서 우리는 `z`요소를 추가합니다.)

부모 요소의 함수를 쉽게 오버라이드 하고 (여기서는 `add`에 해당함) 클래스내에서 여전히 super의 기능을 사용할 수 있습니다. (`super.`문법 사용)

### 정적인

타입스크립트 클래스는 클래스의 모든 인스턴스에서 지원되는 `static`속성을 지원합니다.

```ts
class Something {
    static instances = 0
    constructor() {
        Something.instances++
    }
}

var s1 = new Something()
var s2 = new Something()
console.log(Something.instances) // 2
```

정적 요소뿐만 아니라 정적 함수도 가질 수 있습니다.

### 접근 수식어

타입스크립트는 아래와 같이 `class` 요소에 접근 가능성을 결정하는 `public`,`private` 그리고 `protected`와 같은 접근 수식어를 지원합니다.

| accessible on   | `public` | `protected` | `private` |
| --------------- | -------- | ----------- | --------- |
| class           | yes      | yes         | yes       |
| class children  | yes      | yes         | no        |
| class instances | yes      | no          | no        |

자바스크립트 접근 수식어를 명시하지 않은 경우에는 암묵적으로 `public`이 접근 수식어로 동작합니다 🌹.

런타임에서는 이러한 오류가 의미가 없지만 잘못 사용하면 컴파일 단계에서는 에러를 출력합니다. 아래의 예를 참고하십시요.

```ts
class FooBase {
    public x: number
    private y: number
    protected z: number
}

// EFFECT ON INSTANCES
var foo = new FooBase()
foo.x // okay
foo.y // ERROR : private
foo.z // ERROR : protected

// EFFECT ON CHILD CLASSES
class FooChild extends FooBase {
    constructor() {
        super()
        this.x // okay
        this.y // ERROR: private
        this.z // okay
    }
}
```

항상 이러한 수식어는 요소속성과 함수에서 모두 동작합니다.

### Abstract

-   앞에서 언급한 `class`의 접근 수식어와 다르게 `abstract`는 접근 수식어로 생각할 수 있지만 클래스의 모든 구성원뿐 아니라 클래스의 요소일 수도 있기 때문에 별도로 제시합니다. 

* `abstract` 직접 호출할 수 없으며 자식 클래스는 `abstract`에 정의된 기능을 제공해야 함을 의미합니다.

```ts
abstract class FooCommand {}

class BarCommand extends FooCommand {}

const fooCommand: FooCommand = new FooCommand(); // abstract 클래스 인스턴스는 생성할 수 없음.

const barCommand = new BarCommand(); // abstract 클래스를 상속한 클래스의 인스턴스는 생성 가능.
```

-   `abstract`를 이용해서 클래스를 생성하면 직접 접근할 수 없고 자식요소를 이용해서 기능을 제공해야 합니다.

```ts
abstract class FooCommand {
  abstract execute(): string;
}

class BarErrorCommand  extends FooCommand {} // 'BarErrorCommand'는 추상(abstract) 멤버인 'execute'를 제공해야 함.

class BarCommand extends FooCommand {
  execute() {
    return `Command Bar executed`;
  }
}

const barCommand = new BarCommand();

barCommand.execute(); // Command Bar executed 출력
```

### Constructor is optional

클래스는 constructor를 항상 포함하지 않아도 됩니다. 예제를 참조하십시요

```ts
class Foo {}
var foo = new Foo()
```

### constructor 사용방법

아래처럼 클래스 내 멤버를 초기화하십시요

```ts
class Foo {
    x: number
    constructor(x: number) {
        this.x = x
    }
}
```

타입스크립트는 구성원에 엑세스 수식어를 접두어로 사용하는 일반적인 패턴으로 클래스에 자동으로 선언되어 생성자에서 복사됩니다. 따라서 이전에 작성한 예를 (`public x:number`)와 같이 작성할 수 있습니다.

```ts
class Foo {
    constructor(public x: number) {}
}
```

### Property 초기화

이것은 타입스크립트에서 지원되는 멋진 기능입니다. (실제로 ES7에서 지원됨) 클래스 생성자 밖에서 요소를 초기화 할 수 있으며 기본값을 제공하는데 유용합니다. (`members = []`)

```ts
class Foo {
    members = [] // Initialize directly
    add(x) {
        this.members.push(x)
    }
}
```

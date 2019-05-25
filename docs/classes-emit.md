#### 즉시실행함수는 무엇인가?

클래스에 의해 생성된 js는

```ts
function Point(x, y) {
    this.x = x
    this.y = y
}
Point.prototype.add = function(point) {
    return new Point(this.x + point.x, this.y + point.y)
}
```

즉시실행함수가 랩핑된 이유는

```ts
;(function() {
    // BODY

    return Point
})()
```

상속과 관련이 있습니다. 타입스크립트를 사용하여 기본 클래스를 `_super`와 같은 변수로 캡쳐할 수 있습니다.

```ts
var Point3D = (function(_super) {
    __extends(Point3D, _super)
    function Point3D(x, y, z) {
        _super.call(this, x, y)
        this.z = z
    }
    Point3D.prototype.add = function(point) {
        var point2D = _super.prototype.add.call(this, point)
        return new Point3D(point2D.x, point2D.y, this.z + point.z)
    }
    return Point3D
})(Point)
```

즉시실행함수를 통해 타입스크립트가 `_super`변수에서 기본 클래스 `Point`를 쉽게 캡쳐할 수 있으며 클래스 본문에서 일관되게 사용하는 점에 유의하십시요.

### `__extends`

클래스를 상속하는 즉시 타입스크립트는 다음 기능도 생성됨을 알수 있습니다.

```ts
var __extends =
    this.__extends ||
    function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
        function __() {
            this.constructor = d
        }
        __.prototype = b.prototype
        d.prototype = new __()
    }
```

여기서 `d`는 파생 클래스를 참조하고 `b`는 기본 클래스를 참조합니다. 이 함수는 두가지 작업을 수행합니다.

1. 기본 클래스의 정적멤버를 하위클래스로 복사 `for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];`
2. 자식클래스 함수의 프로토타입을 설정하여 선택적으로 부모의 `proto`에 있는 멤버를 조회합니다. `d.prototype.__proto__ = b.prototype`

사람들은 거의 이해하는데 어려움을 겪지만 그러나 2번 순서의 이유에 대해 많은 사람들이 힘들어 합니다.

#### `d.prototype.__proto__ = b.prototype`

이것에 대해 많은 사람들을 가르친후에야 나는 다음과 같은 설명이 가장 단순한 것을 알게되었습니다.
먼저 `__extends`의 코드가 `d.prototype.__proto__ = b.prototype`와 같은지 설명하고 이 모든 것을 이해하려면 다음사항을 알아야 합니다.

1. `__proto__`
2. `prototype`
3. effect of `new` on `this` inside the called function
4. effect of `new` on `prototype` and `__proto__`

자바스크립트의 모든 객체는 `__proto__`안에 있는 멤버입니다. 이 멤버는 오래된 브라우저에서는 접근할 수 없는 경우가 많이 있습니다. (때때로 문서에서는 `[[prototype]]`과 같은 마법같은 속성을 참조합니다). 그것은 하나의 목표를 가지고 있습니다. 검색중에 `obj.property` 객체에 속성이 없으면 `obj.__proto__.property`에서 찾습니다. 그래도 없다면 `obj.__proto__.__proto__.property`에서 찾습니다. 그러면 발견되거나 최신 `.__proto__` 자체가 null입니다. 이것은 자바스크립트가 프로토타입 상속을 즉시 지원하는 이유를 설명합니다. 다음에 나오는 예제는 크롬 콘솔 또는 노드에서 실행해 볼 수 있습니다.

```ts
var foo = {}

// setup on foo as well as foo.__proto__
foo.bar = 123
foo.__proto__.bar = 456

console.log(foo.bar) // 123
delete foo.bar // remove from object
console.log(foo.bar) // 456
delete foo.__proto__.bar // remove from foo.__proto__
console.log(foo.bar) // undefined
```

이제 당신은 `__proto__`을 이해하게 되었습니다. 또하나 유용한 사실은 자바스크립트의 모든 `function`의 속성은 `prototype`그리고 멤버 `constructor`를 포함하고 있습니다. 아래에서 확인할 수 있습니다.

```ts
function Foo() {}
console.log(Foo.prototype) // {} i.e. it exists and is not undefined
console.log(Foo.prototype.constructor === Foo) // Has a member called `constructor` pointing back to the function
```

이제 `new`를 이용해서 생성된 함수가 호출된 함수내부에서 어떤 영향을 미치는지 알아보겠습니다. 근본적으로 `this`는 함수내부에서 호출할 때 생성되고 함수를 반환하고 함수내부에서 `this`를 변경하면 간단합니다.

```ts
function Foo() {
    this.bar = 123
}

// call with the new operator
var newFoo = new Foo()
console.log(newFoo.bar) // 123
```

이제 함수에서 `new`를 호출하면 함수 호출에서 반한된 새로 생성된 객체에 `__proto__`에 함수의 `prototype`이 할당 된다는 점을 알아야 합니다. 완전히 이해하기 위해 실행할 수 있는 코드가 여기에 있습니다.

```ts
function Foo() {}

var foo = new Foo()

console.log(foo.__proto__ === Foo.prototype) // True!
```

이제 다음과 같은 `__extends`를 살펴보십시요 그게 전부입니다.

```ts
1  function __() { this.constructor = d; }
2   __.prototype = b.prototype;
3   d.prototype = new __();
```

이 함수를 역순으로 읽으면 `d.prototype = new __()`는 `d.prototype = {__proto__ : __.prototype}`임을 의미합니다. (왜냐하면 `new`와 `prototype`는 `__proto__`안에 있으므로) 이전 줄과 결합하여 (예: 2번째 줄 `__.prototype = b.prototype;`)과 결합하여 `d.prototype = {__proto__ : b.prototype}`을 얻습니다.

그러나 잠깐 우리는 `d.prototype.__proto__`을 원했습니다. 그러나 오래된 proto가 변경되고 `d.prototype.constructor`를 유지합니다. 이것은 첫번째 줄에 (예: `function __() { this.constructor = d; }`) 들어옵니다. 여기서 우리는 효과적으로 `d.prototype = {__proto__ : __.prototype, constructor : d}` (`new`에 `this`를 가질 것 입니다.) 그래서 우리가 `d.prototype.constructor`를 복원했으므로 진정으로 변이시킨 것은 `__proto__` 따라서 `d.prototype.__proto__ = b.prototype` 입니다.

#### `d.prototype.__proto__ = b.prototype` 중요성

중요한 점은 하위 클래스에 멤버 함수를 추가하고 기본 클래스에서 다른 멤버를 상속할 수 있다는 것 입니다. 이것은 다음의 간단한 예제에 의해 증명됩니다.

```ts
function Animal() {}
Animal.prototype.walk = function() {
    console.log('walk')
}

function Bird() {}
Bird.prototype.__proto__ = Animal.prototype
Bird.prototype.fly = function() {
    console.log('fly')
}

var bird = new Bird()
bird.walk()
bird.fly()
```

기본적으로 `bird.fly`은 `bird.__proto__.fly`을 검색합니다. (`new`를 이용해서 생성하면 `bird.__proto__`에 `Bird.prototype`가 할당되는 것을 기억하고 있나요?) 그리고 `bird.walk`(상속 멤버는) 다음을 통해서 검색할 수 있습니다. `bird.__proto__.__proto__.walk` (as `bird.__proto__ == Bird.prototype` 그리고 `bird.__proto__.__proto__` == `Animal.prototype`)

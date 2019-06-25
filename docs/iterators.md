### Iterators

이터레이터 자체는 타입스크립트 혹은 ES6 기능이 아닙니다. 이터레이터는 객체 지향 프로그래밍 언어에서 동작합니다. 그것은 일반적으로 다음 인터페이스를 구현하는 객체입니다.

```ts
interface Iterator<T> {
    next(value?: any): IteratorResult<T>
    return?(value?: any): IteratorResult<T>
    throw?(e?: any): IteratorResult<T>
}
```

([More on that `<T>` notation later](./types/generics.html))
이 인터페이스를 사용하면 일부 콜렉션 또는 시퀀스에서 값을 검색할 수 있습니다.

그 `IteratorResult`는 단순히 `value`+`done` 쌍입니다.

```ts
interface IteratorResult<T> {
    done: boolean
    value: T
}
```

어떤 프레임의 객체가 있다고 상상해 보십시요, 이 프레임이 구성하는 요소 이터레이터를 사용하면 가능합니다. 아래처럼 프레임 객체에서 컴포넌트를 검색합니다.

```ts
class Component {
    constructor(public name: string) {}
}

class Frame implements Iterator<Component> {
    private pointer = 0

    constructor(public name: string, public components: Component[]) {}

    public next(): IteratorResult<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }
}

let frame = new Frame('Door', [
    new Component('top'),
    new Component('bottom'),
    new Component('left'),
    new Component('right')
])
let iteratorResult1 = frame.next() //{ done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next() //{ done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next() //{ done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next() //{ done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next() //{ done: true, value: null }

//It is possible to access the value of iterator result via the value property:
let component = iteratorResult1.value //Component { name: 'top' }
```

다시 말하자면 이터레이터 자체는 타입스크립트 기능이 아닙니다. 이 코드는 이터레이터 및 IteratorResult를 명시적으로 구현합니다. 그리고 이러한 공통점을 사용하는 것은 매우 유용합니다.
ES6 [interfaces](./types/interfaces.md) for code consistency.

그래 좋아, 그러나 많은 도움이 되었어. ES6는 이터러블 프로토콜을 정의합니다 이터러블 인터페이스가 구현 된 경우 [Symbol.iterator] `symbol`을 포함합니다.

```ts
//...
class Frame implements Iterable<Component> {
    constructor(public name: string, public components: Component[]) {}

    [Symbol.iterator]() {
        let pointer = 0
        let components = this.components

        return {
            next(): IteratorResult<Component> {
                if (pointer < components.length) {
                    return {
                        done: false,
                        value: components[pointer++]
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }
}

let frame = new Frame('Door', [
    new Component('top'),
    new Component('bottom'),
    new Component('left'),
    new Component('right')
])
for (let cmp of frame) {
    console.log(cmp)
}
```

유감스럽게도 `frame.next()`는 이 패턴과 함께 작동하지 않을 것으로 보입니다.

```ts
//...
class Frame implements IterableIterator<Component> {
    private pointer = 0

    constructor(public name: string, public components: Component[]) {}

    public next(): IteratorResult<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }

    [Symbol.iterator](): IterableIterator<Component> {
        return this
    }
}
//...
```

`frame.next()` 그리고 `for` 둘다 이터러블이터레이터 인터페이스로 잘 동작합니다.

이터레이터는 이터레이트 값을 가지고 있지 않습니다. 이 예제는 전형적인 피보나치입니다.

```ts
class Fib implements IterableIterator<number> {
    protected fn1 = 0
    protected fn2 = 1

    constructor(protected maxValue?: number) {}

    public next(): IteratorResult<number> {
        var current = this.fn1
        this.fn1 = this.fn2
        this.fn2 = current + this.fn1
        if (this.maxValue != null && current >= this.maxValue) {
            return {
                done: true,
                value: null
            }
        }
        return {
            done: false,
            value: current
        }
    }

    [Symbol.iterator](): IterableIterator<number> {
        return this
    }
}

let fib = new Fib()

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50)
console.log(Array.from(fibMax50)) // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21)
for (let num of fibMax21) {
    console.log(num) //Prints fibonacci sequence 0 to 21
}
```

#### Building code with iterators for ES5 target

위의 코드 예제에는 ES6가 필요합니다. 그러나 JS엔진이 `Symbol.iterator`을 지원한다면 ES5에서도 사용할 수 있습니다. 컴파일된 코드는 node 4+, 크롬 브라우저에서 작동해야 합니다.

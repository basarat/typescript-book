## 타입 안전한 이벤트 출력

일반적인 Node.js와 전통 JavaScript에서는 단일 이벤트 출력기를 사용합니다. 이 이벤트 출력기는 내부적으로 여러 이벤트 종류에 대한 리스너를 관리합니다. 예를 들어:

```ts
const emitter = new EventEmitter();
// Emit: 
emitter.emit('foo', foo);
emitter.emit('bar', bar);
// Listen: 
emitter.on('foo', (foo)=>console.log(foo));
emitter.on('bar', (bar)=>console.log(bar));
```
기본적으로 `EventEmitter` 내부에는 데이터가 매핑된 배열로 저장됩니다: 
```ts
{foo: [fooListeners], bar: [barListeners]}
```
대신, 순전히 *이벤트 * 타입 안전성을 위해 이벤트 타입별로 출력기를 만들 수도 있습니다:
```ts
const onFoo = new TypedEvent<Foo>();
const onBar = new TypedEvent<Bar>();

// Emit: 
onFoo.emit(foo);
onBar.emit(bar);
// Listen: 
onFoo.on((foo)=>console.log(foo));
onBar.on((bar)=>console.log(bar));
```

이렇게 하면 다음과 같은 장점이 있습니다: 
* 이벤트의 타입이 변수 값을 통해 쉽게 파악됨.
* 이벤트 출력기 변수를 독립적으로 손쉽게 리팩토링할 수 있음.
* 이벤트 자료 구조의 타입 안전성.

### TypedEvent 예시
```ts
export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose();
}

/** 발생하는 이벤트를 지켜봄. 리스닝을 시작하기 전에 발생한 이벤트는 받지 못함 */
export class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  }

  once = (listener: Listener<T>): void => {
    this.listenersOncer.push(listener);
  }

  off = (listener: Listener<T>) => {
    var callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit = (event: T) => {
    /** 범용 리스너 모두에게 알림 */
    this.listeners.forEach((listener) => listener(event));

    /** `once` 큐 처리 */
    if (this.listenersOncer.length > 0) {
      const toCall = this.listenersOncer;
      this.listenersOncer = [];
      toCall.forEach((listener) => listener(event));
    }
  }

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  }
}
```

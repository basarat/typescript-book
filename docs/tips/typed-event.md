## Типизированный эмиттер событий

Обычно в Node.js и традиционном JavaScript у вас есть один эмиттер событий. Этот эмиттер событий внутри отслеживает слушателя для разных типов событий, например:

```ts
const emitter = new EventEmitter();
// Издать: 
emitter.emit('foo', foo);
emitter.emit('bar', bar);
// Слушать: 
emitter.on('foo', (foo)=>console.log(foo));
emitter.on('bar', (bar)=>console.log(bar));
```
По сути, `EventEmitter` хранит данные в виде сопоставленных массивов:
```ts
{foo: [fooListeners], bar: [barListeners]}
```
Вместо этого, в целях типизации *события*, вы можете создать эмиттер *для* определённого типа события:
```ts
const onFoo = new TypedEvent<Foo>();
const onBar = new TypedEvent<Bar>();

// Издать: 
onFoo.emit(foo);
onBar.emit(bar);
// Слушать: 
onFoo.on((foo)=>console.log(foo));
onBar.on((bar)=>console.log(bar));
```

Это дает следующие преимущества:
* Типы событий легко обнаруживаются как переменные.
* Переменные генератора событий легко рефакторятся независимо.
* Типизация структур данных событий.

### Ссылка TypedEvent
```ts
export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose();
}

/** проходит через события по мере их возникновения. Вы не будете получать события до того, как начнете слушать */
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
    /** Обновить слушателей */
    this.listeners.forEach((listener) => listener(event));

    /** Очистить очередь единожды */
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

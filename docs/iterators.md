### Итераторы

Итератор - это не особенность TypeScript или ES6, итератор - это поведенческий паттерн проектирования, общий для объектно-ориентированных языков программирования. Фактически, это объект, который имплементирует следующий интерфейс:

```ts
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
```
([Подробнее о `<T>` позже](./types/generics.html))  
Этот интерфейс позволяет получить значение из некоторой коллекции или последовательности, которая принадлежит объекту.

`IteratorResult` - это просто `value`+`done` пара: 
```ts
interface IteratorResult<T> {
    done: boolean;
    value: T;
}
```

Представьте, что есть объект Frame, который содержит список элементов Component. С помощью интерфейса Iterator вы можете получить каждый Component из этого объекта Frame, как показано ниже:

```ts
class Component {
  constructor (public name: string) {}
}

class Frame implements Iterator<Component> {

  private pointer = 0;

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

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); //{ done: true, value: null }

//Вы можете получить значение результата итерации через value свойство:
let component = iteratorResult1.value; //Component { name: 'top' }
```
Итератор - это не особенность TypeScript, этот код может работать и без имплементации Iterator и IteratorResult интерфейсов. Однако, намного удобнее использовать для этого ES6 [интерфейсы](./types/interfaces.md) для согласованности кода.

Отлично, но можно сделать еще лучше. ES6 определяет *итерируемый протокол*, который включает [Symbol.iterator] `symbol`, если Iterable интерфейс имплементирован: 

```ts
//...
class Frame implements Iterable<Component> {

  constructor(public name: string, public components: Component[]) {}

  [Symbol.iterator]() {
    let pointer = 0;
    let components = this.components;

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

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
for (let cmp of frame) {
  console.log(cmp);
}
```

К несчастью, `frame.next()` не будет работать с этим паттерном и это выглядит также немного неуклюже. Нам поможет IterableIterator интерфейс!
```ts
//...
class Frame implements IterableIterator<Component> {

  private pointer = 0;

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
    return this;
  }

}
//...
```
Оба `frame.next()` и `for` циклы теперь прекрасно работают с IterableIterator интерфейсом.

Итератор не должен повторять конечное значение.
Типичный пример - последовательность Фибоначчи:
```ts
class Fib implements IterableIterator<number> {

  protected fn1 = 0;
  protected fn2 = 1;

  constructor(protected maxValue?: number) {}

  public next(): IteratorResult<number> {
    var current = this.fn1;
    this.fn1 = this.fn2;
    this.fn2 = current + this.fn1;
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
    return this;
  }

}

let fib = new Fib();

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21);
for(let num of fibMax21) {
  console.log(num); //Вывод последовательности от 0 до 21
}
```

#### Генерация кода с итераторами для версии до ES6
Приведенные выше примеры кода требуют именно использования ES6. Однако, они могут работать и для ES5, если используемый JS движок поддерживает `Symbol.iterator`. Этого можно добиться использованием ES6 библиотеки с ES5 целевой версией (добавьте es6.d.ts в ваш проект) для успешной компиляции. Скомпилированный код должен работать в node 4+, Google Chrome и некоторых других браузерах.

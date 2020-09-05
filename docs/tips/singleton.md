# Паттерн синглтон

Традиционный синглтон паттерн используется для решения кейсов, когда код должен быть упакован в `классе`.

```ts
class Singleton {
    private static instance: Singleton;
    private constructor() {
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            // ... здесь единожды выполняется инициализация ... 
        }
        return Singleton.instance;
    }
    someMethod() { }
}

let something = new Singleton() // Ошибка: конструктор 'Singleton' является приватным.

let instance = Singleton.getInstance() // сделать что-нибудь с экземпляром...
```

Однако, если вам не нужна ленивая инициализация, вы можете вместо этого просто использовать `namespace`:

```ts
namespace Singleton {
    // ... здесь единожды выполняется инициализация ...
    export function someMethod() { }
}
// Использование
Singleton.someMethod();
```

> Предупреждение: Синглтон - это просто причудливое название для [global](http://stackoverflow.com/a/142450/390330)

Для большинства проектов `namespace` можно заменить на *module*.

```ts
// someFile.ts
// ... здесь единожды выполняется инициализация ...
export function someMethod() { }

// Использование
import {someMethod} from "./someFile";
```

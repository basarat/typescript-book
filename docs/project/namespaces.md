## Пространства имен
Пространства имен предоставляют вам удобный синтаксис для общепринятого шаблона, используемого в JavaScript:

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))
```

В основном `something || (something = {})` позволяет анонимной функции `function(something) {}` *добавлять что-либо к существующему объекту* (часть `something ||`) или *стартовать новый объект, а затем добавлять что-либо к этому объекту* (часть `|| (something = {})`). Это означает, что у вас может быть два таких блока, разделенных по некоторой границе выполнения:

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))

console.log(something); // {foo:123}

(function(something) {

    something.bar = 456;

})(something || (something = {}))

console.log(something); // {foo:123, bar:456}

```

Это обычно используется в JavaScript, чтобы убедиться, что содержимое не просачивается в глобальное пространство имен. С файловыми модулями вам не нужно беспокоиться об этом, но шаблон все еще полезен для *логической группировки* набора функций. Поэтому TypeScript предоставляет ключевое слово `namespace`, чтобы сгруппировать их, например:

```ts
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}

// использование
Utility.log('Call me');
Utility.error('maybe!');
```

Ключевое слово `namespace` генерирует тот же JavaScript, который мы видели ранее:

```ts
(function (Utility) {

// Добавить в Utility

})(Utility || (Utility = {}));
```

Следует отметить, что пространства имен могут быть вложенными, поэтому вы можете использовать такие вещи, как `namespace Utility.Messaging`, для вложения пространства имен `Messaging` в `Utility`.

Для большинства проектов мы рекомендуем использовать внешние модули, а `namespace` использовать  для быстрой демонстрации и переноса старого кода JavaScript.

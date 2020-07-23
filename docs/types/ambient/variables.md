### Переменные
К примеру, чтобы рассказать TypeScript о [`process` variable](https://nodejs.org/api/process.html), вы *можете* сделать:

```ts
declare var process: any;
```

> Но вам не *нужно* делать это для `process`, поскольку уже существует [поддерживающийся сообществом `node.d.ts`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts).

Это позволяет вам использовать переменную `process` без руганий от TypeScript'а:

```ts
process.exit();
```

Мы рекомендуем использовать интерфейс везде, где это возможно, например:

```ts
interface Process {
    exit(code?: number): void;
}
declare var process: Process;
```

Это позволяет другим разработчикам *расширять* сущность этих глобальных переменных, в то же время сообщая TypeScript о таких модификациях. Например. рассмотрим следующий случай, когда мы добавляем функцию `exitWithLogging` к процессу чтобы поиграться:

```ts
interface Process {
    exitWithLogging(code?: number): void;
}
process.exitWithLogging = function() {
    console.log("выход");
    process.exit.apply(process, arguments);
};
```

Давайте посмотрим на интерфейсы чуть более подробно далее.

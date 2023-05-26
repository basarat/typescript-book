## Еміттер
Існує два `еміттера` в компіляторі TypeScript:

* `emitter.ts`: це еміттер, який ймовірно вас цікавить найбільше. Він виконує перетворення з TS у JavaScript.
* `declarationEmitter.ts`: це еміттер, який використовується для створення *файлу оголошення* (`.d.ts`) для *файлу з вихідним кодом TypeScript* (`.ts`).

У цьому розділі ми розглянемо `emitter.ts`.

### Використання класом `Program`
Клас `Program` надає функцію `emit`. Ця функція переважно делегує виклик до функції `emitFiles` у файлі `emitter.ts`. Нижче наведено стек викликів:

```
Program.emit ->
    `emitWorker` (local in program.ts createProgram) ->
        `emitFiles` (function in emitter.ts)
```

Одним з аргументів, який `emitWorker` передає еміттеру (через `emitFiles`), є `EmitResolver`. `EmitResolver` надається від програми TypeChecker і, по суті, він є підмножиною *локальних* функцій з `createChecker`.

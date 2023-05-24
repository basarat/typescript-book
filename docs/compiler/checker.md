## Checker
Як ми вже згадували раніше *checker* - це те, що робить TypeScript унікально потужним у порівнянні з *просто ще одним транспілером JavaScript*.   `Checker` розташований у файлі `checker.ts`  і на даний момент складається з понад 23 тис. рядків коду на TypeScript (найбільша частина компілятора).

### Використання програмою
`Checker` ініціалізується об'єктом `program`. Нижче наведений невеликий приклад стеку викликів (ми використовували той самий приклад при дослідженні  `binder`):

```
program.getTypeChecker ->
    ts.createTypeChecker (in checker)->
        initializeTypeChecker (in checker) ->
            for each SourceFile `ts.bindSourceFile` (in binder)
            // followed by
            for each SourceFile `ts.mergeSymbolTable` (in checker)
```

### Пов'язаність з генератором коду
Справжня перевірка типу відбувається після виклику `getDiagnostics`.  Ця функція викликається наприклад, коли запит зроблений до `Program.emit`, в такому випадку `checker` повертає `EmitResolver` (програма викликає функцію `getEmitResolver` чекера)  який представляє собою набір функцій, локальних для `createTypeChecker`. Ми ще повернемося до цього, коли будемо розглядати `emitter`.

Нижче наведений стек викликів, що веде до `checkSourceFile` (функції, що локально присутня у  `createTypeChecker`).

```
program.emit ->
    emitWorker (program local) ->
        createTypeChecker.getEmitResolver ->
            // First call the following functions local to createTypeChecker
            call getDiagnostics ->
                getDiagnosticsWorker ->
                    checkSourceFile

            // then
            return resolver
            (already initialized in createTypeChecker using a call to local createResolver())
```

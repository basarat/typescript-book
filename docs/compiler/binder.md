## Байндер (Binder)
Більшість існуючих JavaScript транспіляторів (інструменти, які перетворюють код, написаний на одній версії JS, в код, сумісний з іншою або попередньою версією) простіші за TypeScript, оскільки вони надають обмежені можливості аналізу коду. Типові транспілятори JavaScript мають лише такий потік роботи:

```ts
SourceCode ~~Scanner~~> Tokens ~~Parser~~> AST ~~Emitter~~> JavaScript
```
Хоча наведена вище архітектура вірна як спрощене розуміння генерації TypeScript, ключовою особливістю є його *семантична* система. `binder` (у `binder.ts`) використовується для з’єднання різних частин вихідного коду в узгоджену систему типів, яку згодом використовує `checker`(який ці типи і перевіряє). Основна відповідальність байндера полягає у створенні _Symbols_.


### Символи (Symbol)
Символи з'єднують вузли декларацій в AST з іншими деклараціями, що вносять внесок у саму сутність. Символи є основними будівельними блоками семантичної системи. Конструктор символа визначений у файлі `core.ts`. В свою чергу `binder` використовує `objectAllocator.getSymbolConstructor`, щоб отримати доступ до конструктора. Нижче наведений Symbol конструктор: 

```ts
function Symbol(flags: SymbolFlags, name: string) {
    this.flags = flags;
    this.name = name;
    this.declarations = undefined;
}
```

`SymbolFlags` є перерахуванням (enum) прапорців і фактично використовується для ідентифікацій додаткових класифікацій символів (наприклад, прапорців області видимості змінної, таких як `FunctionScopedVariable` або `BlockScopedVariable`).

### Usage by Checker
Внутрішньо `binder` використовується типом `checker`, який в свою чергу використовується `program`. Спрощений стек викликів виглядає так:

```
program.getTypeChecker ->
    ts.createTypeChecker (in checker)->
        initializeTypeChecker (in checker) ->
            for each SourceFile `ts.bindSourceFile` (in binder)
            // followed by
            for each SourceFile `ts.mergeSymbolTable` (in checker)
```

Одиницею роботи для `binder` є `SourceFile`. `binder.ts` керується `checker.ts`.

### Функції синтаксичного аналізатора (Parser Functions)

Як вже згадувалося, `parseSourceFile` встановлює початковий стан і передає роботу функції `parseSourceFileWorker`.

#### Функція `parseSourceFileWorker`

Починається зі створення вузла AST `SourceFile`. Потім починає синтаксичний аналіз вихідного коду, починаючи з функції `parseStatements`. Після повернення результату вона доповнює вузол `SourceFile` додатковою інформацією, такою як `nodeCount`, `identifierCount` тощо.

#### Функція `parseStatements`
Одна з найважливіших функцій стилю `parseFoo` (концепція, яку ми розглянемо далі). Вона перемикається за поточним `токеном`, поверненим зі сканера. Наприклад, якщо поточна лексема є `SemilonToken`, вона викличе `parseEmptyStatement` для створення вузла AST для порожнього оператора.

### Створення вузла (Node creation)

Синтаксичний аналізатор має набір функцій `parserFoo` з тілами, які створюють вузли `Foo`. Зазвичай вони викликаються (з інших функцій синтаксичного аналізатора) у той момент, коли очікується поява вузла `Foo`. Типовим прикладом цього процесу є функція `parseEmptyStatement()`, яка використовується для розбору порожніх операторів типу `;;;;;;`. Нижче наведено повний текст функції

```ts
function parseEmptyStatement(): Statement {
    let node = <Statement>createNode(SyntaxKind.EmptyStatement);
    parseExpected(SyntaxKind.SemicolonToken);
    return finishNode(node);
}
```

Він показує три критичні функції `createNode`, `parseExpected` та `finishNode`.

#### Функція`createNode`
Функція `createNode` парсера `function createNode(kind: SyntaxKind, pos?: number): Node` відповідає за створення вузла, встановлення його `SyntaxKind` переданого значення та задання початкової позиції (якщо передано) або використання позиції з поточного стану сканера.

#### Функція `parseExpected`
Функція `parseExpected` парсера `function parseExpected(kind: SyntaxKind, diagnosticMessage?: DiagnosticMessage): boolean` перевірить, чи відповідає поточний токен у стані синтаксичного аналізатора бажаному `SyntaxKind`. Якщо ні, він або повідомить про надіслане `diagnosticMessage`, або створить узагальнене повідомлення у вигляді `foo expected`. Внутрішньо він використовує функцію `parseErrorAtPosition` (яка використовує позиції сканування) для отримання якісних звітів про помилки.

### Функція `finishNode`
Функція `finishNode` синтаксичного аналізатора `function finishNode<T extends Node>(node: T, end?: number): T` встановлює `кінцеву` позицію для вузла і додаткові корисні речі, такі як `parserContextFlags`, під якими він був розібраний, а також чи були помилки перед розбором цього вузла (якщо були, то ми не зможемо повторно використати цей вузол AST в інкрементному розборі).

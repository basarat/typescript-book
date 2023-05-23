### AST Tip: Visit Children

Існує допоміжна функція `ts.forEachChild` яка дозволяє відвідувати всі дочірні вузли будь-якого Node  в AST.

Нижче наведений спрощений фрагмент вихідного (програмного) коду, щоб продемонструвати, як він працює:

```ts

export function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodeArray?: (nodes: Node[]) => T): T {
        if (!node) {
            return;
        }
        switch (node.kind) {
            case SyntaxKind.BinaryExpression:
                return visitNode(cbNode, (<BinaryExpression>node).left) ||
                    visitNode(cbNode, (<BinaryExpression>node).operatorToken) ||
                    visitNode(cbNode, (<BinaryExpression>node).right);
            case SyntaxKind.IfStatement:
                return visitNode(cbNode, (<IfStatement>node).expression) ||
                    visitNode(cbNode, (<IfStatement>node).thenStatement) ||
                    visitNode(cbNode, (<IfStatement>node).elseStatement);

            // .... lots more
```

На практиці ця функція перевіряє значення `node.kind`  та, виходячи з цього, вважає, який інтерфейс пропонується `node` і викликає `cbNode` для дочірніх елементів вузла. Зверніть увагу, що ця функція не викликає `visitNode` для *всіх* дочірніх елементів (наприклад, SyntaxKind.SemicolonToken). Якщо вам потрібно отримати *всі* дочірні елементи вузла у AST, просто викличте метод `.getChildren` об'єкта Node.

Наприклад, ось функція, яка виводить докладний AST вузла: 

```ts
function printAllChildren(node: ts.Node, depth = 0) {
    console.log(new Array(depth+1).join('----'), ts.syntaxKindToName(node.kind), node.pos, node.end);
    depth++;
    node.getChildren().forEach(c=> printAllChildren(c, depth));
}
```

Ми побачимо приклад використання цієї функції, коли будемо детальніше обговорювати парсер.

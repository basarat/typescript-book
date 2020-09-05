# Статические конструкторы в TypeScript

TypeScript `class` (как и JavaScript `class`) не может иметь статического конструктора. Однако вы можете довольно легко получить тот же эффект, просто вызвав его самостоятельно:

```ts
class MyClass {
    static initialize() {
        // Инициализация
    }
}
MyClass.initialize();
```

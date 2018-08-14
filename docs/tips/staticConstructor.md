# Static Constructors in TypeScript

TypeScript `class` (like JavaScript `class`) cannot have a static constructor. However, you can get the same effect quite easily by just calling it yourself: 

```ts
class MyClass {
    static initialize() {
        // Initialization
    }
}
MyClass.initialize();
```

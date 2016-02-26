## Stateful Functions
A common feature in other programming languages is usage of the `static` keyword to increase the *lifetime* (not *scope*) of a function variable to live beyond function invocations. Here is a `C` sample that achieves this:

```c
void called() {
    static count = 0;
    count++;
    printf("Called : %d", count);
}

int main () {
    called(); // Called : 1
    called(); // Called : 2
    return 0;
}
```

Since JavaScript (or TypeScript) doesn't have function statics you can achieve the same thing using various abstractions that wrap over a local variable e.g. using a `class` :

```ts
const {called} = new class {
    count = 0;
    called = () => {
        this.count++;
        console.log(`Called : ${this.count}`);
    }
};

called(); // Called : 1
called(); // Called : 2
```

> C++ developers also try and achieve this using a pattern they call `functor` (a class that overrides the operator `()`).

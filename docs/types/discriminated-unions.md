### Discriminated Union

If you have a class with a *literal member* (the literal TypeScript supports at the moment are string literals) then you can use that property to discriminate between union members.

As an example consider the union of a `Square` and `Rectangle`, here we have a member `kind` that exists on both union members and is of a particular *literal type*:

```ts
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
type Shape = Square | Rectangle;
```

If you use a type guard style check (`==`, `===`, `!=`, `!==`) or `switch` on the *discriminant property* (here `kind`) TypeScript will realize that it means that the object must of the type that has that literal and do a type narrowing for you :)

```
function area(s: Shape) {
    if (s.kind === "square") {
        // Now TypeScript *knows* that `s` must a square ;)
        // So you can use its members safely :)
        return s.size * s.size;
    }
    else {
        // Wasn't a square? So TypeScript will figure out that it must be a Rectangle ;)
        // So you can use its members safely :)
        return s.width * s.height;
    }
}
```

### Exhaustive Checks
Quite commonly you want to make sure that all members of a union have some code(action) against them.

```
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

// Someone just added this new `Circle` Type
// We would like to let TypeScript give an error at any place that *needs* to cater for this
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;
```

As an example of where stuff goes bad:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    // Would it be great if you could get TypeScript to give you an error?
}
```

You can do that by simply adding a fall through and making sure that the inferred type in that block is compatible with the `never` type. For example:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else {
        // ERROR : `Circle` is not assignable to `never`
        const _exhaustiveCheck: never = s;
    }
}
```

### Switch
TIP: of course you can also do it in a `switch` statement:

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: const _exhaustiveCheck: never = s;
    }
}
```

[references-discriminated-union]:https://github.com/Microsoft/TypeScript/pull/9163

### strictNullChecks 

If using strictNullChecks and doing exhaustive checks you should return the `_exhaustiveCheck` variable (of type `never`) as well, otherwise TypeScirpt infers a possible return of `undefined`. So: 

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: 
          const _exhaustiveCheck: never = s;
          return _exhaustiveCheck;
    }
}
```
